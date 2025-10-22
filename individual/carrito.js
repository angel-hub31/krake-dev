// Función: mostrar productos disponibles para añadir al carrito
function mostrarProductosDisponibles() {
  /*
      - Mostrar lista de productos con botón para añadir al carrito
    */
   /*
      - Mostrar lista de productos con botón para añadir al carrito
    */
  let htmlLista = "<ul>";

  // Recorrer la lista global de productos
  productos.forEach(producto => {
    // Si el producto está en stock
    if (producto.stock > 0) {
      htmlLista += `
        <li class="producto-item">
          <strong>${producto.nombre}</strong> - $${producto.precio.toFixed(2)} (Stock: ${producto.stock})
          <button type="button" onclick="agregarAlCarrito('${producto.nombre}')">Añadir al Carrito</button>
        </li>
      `;
    }
  });

  htmlLista += "</ul>";
  // Mostrar el HTML en el elemento 'productosDisponibles'
  mostrarTextoHTML("productosDisponibles", htmlLista);
}



// Función: añadir producto al carrito
function agregarAlCarrito(nombreProducto) {
  /*
      - Validar cantidad y stock disponible
      - Añadir producto o aumentar cantidad en carrito
      - Actualizar resumen y total del carrito
    */
   const productoEnStock = productos.find(p => p.nombre === nombreProducto);

  if (!productoEnStock || productoEnStock.stock <= 0) {
    alert(`El producto "${nombreProducto}" no está disponible o no tiene stock.`);
    return;
  }

  // Se pide la cantidad al usuario (podría ser un input en la UI)
  const cantidadStr = prompt(`¿Cuántas unidades de "${nombreProducto}" desea agregar? (Stock disponible: ${productoEnStock.stock})`);
  const cantidad = parseInt(cantidadStr, 10);

  if (isNaN(cantidad) || !Number.isInteger(cantidad) || cantidad <= 0) {
    alert("Cantidad inválida. Debe ingresar un número entero positivo.");
    return;
  }

  // 1. Validar cantidad contra stock disponible
  if (cantidad > productoEnStock.stock) {
    alert(`Solo hay ${productoEnStock.stock} unidades de "${nombreProducto}" en stock.`);
    return;
  }

  // 2. Añadir producto o aumentar cantidad en carrito
  const productoEnCarrito = carrito.find(item => item.nombre === nombreProducto);

  if (productoEnCarrito) {
    const nuevaCantidad = productoEnCarrito.cantidad + cantidad;
    
    // Validar que el total a comprar no exceda el stock original (aunque ya se validó antes, es una doble verificación)
    if (nuevaCantidad > productoEnStock.stock) {
      alert(`No puedes añadir ${cantidad} unidades más. Excederías el stock disponible (${productoEnStock.stock}).`);
      return;
    }
    productoEnCarrito.cantidad = nuevaCantidad;
  } else {
    // Agregar nuevo producto al carrito
    carrito.push({
      nombre: nombreProducto,
      cantidad: cantidad,
      precio: productoEnStock.precio // Usar el precio del producto en stock
    });
  }

  alert(`${cantidad} unidad(es) de "${nombreProducto}" agregadas al carrito.`);

  // 3. Actualizar resumen y total del carrito
  mostrarCarrito();


}




// Función: mostrar resumen del carrito
function mostrarCarrito() {
  /*
      - Mostrar tabla con productos en carrito, cantidades y subtotal
      - Mostrar total general
    */


      let htmlTablaBody = "";
  let totalGeneral = 0;

  // Recorrer los productos en el carrito
  carrito.forEach((item, index) => {
    const subtotal = item.cantidad * item.precio;
    totalGeneral += subtotal;

    // Se asume que la función 'editarCantidadCarrito' recibirá el índice
    htmlTablaBody += `
      <tr>
        <td>${item.nombre}</td>
        <td>
          <input type="number" 
                 value="${item.cantidad}" 
                 min="1" 
                 id="cantidad-carrito-${index}"
                 onchange="editarCantidadCarrito(${index})" 
                 style="width: 60px; text-align: center;">
        </td>
        <td>$${subtotal.toFixed(2)}</td>
        <td>
          <button type="button" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });

  // Mostrar el cuerpo de la tabla
  mostrarTextoHTML("tablaCarrito", `
    <thead>
        <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
      ${htmlTablaBody}
    </tbody>
  `);

  // Mostrar el total general
  mostrarTexto("totalCarrito", totalGeneral.toFixed(2));
}
// Función: editar cantidad de producto en carrito
function editarCantidadCarrito(index) {
  /*
      - Validar nueva cantidad contra stock
      - Actualizar cantidad en carrito
      - Actualizar tabla y total
    */
   const nuevoValorTexto = recuperarTexto(`cantidad-carrito-${index}`);
  const nuevaCantidad = parseInt(nuevoValorTexto, 10);
  const item = carrito[index];

  if (!item) return; // Si el índice no existe

  // 1. Validar nueva cantidad
  if (isNaN(nuevaCantidad) || !Number.isInteger(nuevaCantidad) || nuevaCantidad <= 0) {
    alert("Cantidad inválida. Debe ingresar un número entero positivo.");
    // Restaurar el valor previo en el input
    mostrarTextoEnCaja(`cantidad-carrito-${index}`, item.cantidad);
    return;
  }

  // Buscar el stock disponible (asumiendo que los productos siempre están sincronizados con el carrito)
  const productoEnStock = productos.find(p => p.nombre === item.nombre);
  if (!productoEnStock) {
    alert("Error: Producto no encontrado en el inventario.");
    mostrarCarrito();
    return;
  }

  // 2. Validar nueva cantidad contra stock
  if (nuevaCantidad > productoEnStock.stock) {
    alert(`Solo hay ${productoEnStock.stock} unidades de "${item.nombre}" en stock. La cantidad se ajustará al máximo disponible.`);
    item.cantidad = productoEnStock.stock;
    // Restaurar el valor en el input al máximo stock
    mostrarTextoEnCaja(`cantidad-carrito-${index}`, item.cantidad);
  } else {
    // 3. Actualizar cantidad en carrito
    item.cantidad = nuevaCantidad;
  }

  // 4. Actualizar tabla y total
  mostrarCarrito();
}



// Función: eliminar producto del carrito
function eliminarDelCarrito(index) {
  /*
      - Eliminar producto del carrito
      - Actualizar tabla y total
    */
   if (confirm(`¿Estás seguro de que quieres eliminar "${carrito[index].nombre}" del carrito?`)) {
    // 1. Eliminar producto del carrito
    carrito.splice(index, 1);

    // 2. Actualizar tabla y total
    mostrarCarrito();
  }
}

// Inicializar la vista del carrito y productos disponibles al cargar
document.addEventListener('DOMContentLoaded', () => {
    // mostrarProductosDisponibles es para la sección de productos (sección 3)
    mostrarProductosDisponibles(); 
    // mostrarCarrito es para el resumen (sección 3)
    mostrarCarrito();
});
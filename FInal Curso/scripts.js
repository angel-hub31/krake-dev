// =======================
// LISTAS BASE
// =======================

// Lista de productos iniciales con sus propiedades
const productos = [
  { nombre: "Camisa", descripcion: "Camisa blanca de algodón", categoria: "Ropa", precio: 25.99, stock: 50 },
  { nombre: "Pantalón", descripcion: "Pantalón azul jeans", categoria: "Ropa", precio: 40.0, stock: 30 },
  { nombre: "Zapatos", descripcion: "Zapatos deportivos", categoria: "Calzado", precio: 60.5, stock: 20 },
];

// Lista de categorías con su descripción
const categorias = [
  { nombre: "Ropa", descripcion: "Prendas de vestir" },
  { nombre: "Calzado", descripcion: "Zapatos, sandalias y más" },
];

// Lista vacía para el carrito de compras
const carrito = [];

// Lista vacía para registrar ventas
const ventas = [];

// Objeto para guardar información del cliente actual
let clienteActual = {};


// =======================
// FUNCIONES DE PRODUCTOS
// =======================

// Función para agregar o actualizar un producto
function agregarProducto() {
  // Recupera los valores ingresados por el usuario desde los inputs de la página
  let nombre = recuperarTexto("txtNombre");
  let descripcion = recuperarTexto("tXtDescripcion");
  let categoria = recuperarTexto("txtCategoria:");
  let precio = recuperarFloat("txtPrecio");
  let stock = recuperarInt("txtStock");

  // Obtiene referencias a los elementos donde se mostrarán los mensajes de error
  let errorNombre = document.getElementById("lblErrorNombre");
  let errorDescripcion = document.getElementById("lblErrorDescripcion");
  let errorCategoria = document.getElementById("lblErrorCategoria");
  let errorPrecio = document.getElementById("lblErrorPrecio");
  let errorStock = document.getElementById("lblErroStock");

  // Limpia los mensajes de error antes de validar
  errorNombre.textContent = "";
  errorDescripcion.textContent = "";
  errorCategoria.textContent = "";
  errorPrecio.textContent = "";
  errorStock.textContent = "";

  // Variable que indica si todos los datos son válidos
  let valido = true;

  // =================
  // Validación del nombre del producto
  // =================
  for (let i = 0; i < nombre.length; i++) {
    let codigo = nombre.charCodeAt(i); // Obtiene el código ASCII del caracter
    if (codigo >= 32 && codigo <= 63) { // Si contiene símbolos o números
      errorNombre.textContent = "El nombre de producto debe de ser solo letras";
      valido = false;
      break;
    }
    if (i == 0 && !(codigo >= 65 && codigo <= 90)) { // Primera letra debe ser mayúscula
      errorNombre.textContent = "La primera letra debe ser mayúscula";
      valido = false;
      break;
    }
  }
  if (nombre == "" || nombre == " ") { // No puede estar vacío
    errorNombre.textContent = "El nombre no puede estar vacío";
    valido = false;
  }

  // =================
  // Validación de la descripción
  // =================
  for (let i = 0; i < descripcion.length; i++) {
    let codigo = descripcion.charCodeAt(i);
    if (codigo >= 33 && codigo <= 63) { // Evita caracteres inválidos
      errorDescripcion.textContent = "La descripción es obligatoria y válida";
      valido = false;
      break;
    }
  }
  if (descripcion == "" || descripcion == " ") { // No puede estar vacía
    errorDescripcion.textContent = "La descripción es obligatoria y válida";
    valido = false;
  }

  // =================
  // Validación de la categoría
  // =================
  for (let i = 0; i < categoria.length; i++) {
    let codigo = categoria.charCodeAt(i);
    if (codigo >= 32 && codigo <= 63) { // Evita caracteres inválidos
      errorCategoria.textContent = "La categoría debe tener formato válido";
      valido = false;
      break;
    }
    if (i == 0 && !(codigo >= 65 && codigo <= 90)) { // Primera letra mayúscula
      errorCategoria.textContent = "La categoría debe iniciar con mayúscula";
      valido = false;
      break;
    }
  }
  if (categoria == "") { // Campo obligatorio
    errorCategoria.textContent = "La categoría es obligatoria";
    valido = false;
  }

  // =================
  // Validación de precio y stock
  // =================
  if (isNaN(precio) || precio < 0) { // Debe ser un número >= 0
    errorPrecio.textContent = "Ingrese un número válido mayor o igual a cero";
    valido = false;
  }
  if (isNaN(stock) || stock < 0 || stock % 1 != 0) { // Debe ser entero >= 0
    errorStock.textContent = "Stock inválido (entero >= 0)";
    valido = false;
  }

  // Si todos los datos son válidos, se agrega o actualiza el producto
  if (valido) {
    // Verifica si ya existe un producto con ese nombre
    let existe = false;
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].nombre === nombre) {
        // Actualiza los datos del producto existente
        productos[i].descripcion = descripcion;
        productos[i].categoria = categoria;
        productos[i].precio = precio;
        productos[i].stock = stock;
        existe = true;
        break;
      }
    }

    // Si no existe, crea un nuevo producto
    if (!existe) {
      let nuevoProducto = {};
      nuevoProducto.nombre = nombre;
      nuevoProducto.descripcion = descripcion;
      nuevoProducto.categoria = categoria;
      nuevoProducto.precio = precio;
      nuevoProducto.stock = stock;
      productos.push(nuevoProducto); // Se agrega a la lista
    }

    alert("PRODUCTO AGREGADO O ACTUALIZADO"); // Mensaje de éxito
    mostrarProductos(); // Actualiza la tabla de productos
    mostrarProductosDisponibles(); // Función adicional (no mostrada aquí) para filtrar disponibles
    limpiarCamposProducto(); // Limpia los inputs del formulario
  }
}

// =======================
// Función para mostrar todos los productos en una tabla
// =======================
function mostrarProductos() {
  let cmpTabla = document.getElementById("tablaProductos"); // Obtiene el contenedor de la tabla
  let contenidoTabla = "<table><tr><th>NOMBRE PRODUCTO</th><th>DESCRIPCION</th><th>CATEGORIA</th><th>PRECIO</th><th>STOCK</th></tr>";

  for (let i = 0; i < productos.length; i++) {
    contenidoTabla += "<tr><td>" + productos[i].nombre + "</td>"
      + "<td>" + productos[i].descripcion + "</td>"
      + "<td>" + productos[i].categoria + "</td>"
      + "<td>" + productos[i].precio + "</td>"
      + "<td>" + productos[i].stock + "</td></tr>";
  }
  contenidoTabla += "</table>";
  cmpTabla.innerHTML = contenidoTabla; // Inserta la tabla en el HTML

  actualizarEstadisticasProductos(); // Actualiza estadísticas como total de productos, stock y valor de inventario
}

// =======================
// Función para eliminar un producto
// =======================
function eliminarProducto() {
  let nombreEliminar = recuperarTexto("txtEliminar"); // Obtiene el nombre a eliminar
  let errorEliminar = document.getElementById("lblEliminar");
  errorEliminar.textContent = "";

  if (nombreEliminar == "" || nombreEliminar == " ") { // Validación simple
    errorEliminar.textContent = "Debe ingresar un nombre válido para eliminar.";
    return;
  }

  let encontrado = false;
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre === nombreEliminar) { // Busca el producto por nombre
      encontrado = true;
      if (confirm("¿Eliminar producto '" + nombreEliminar + "'?")) { // Confirma eliminación
        productos.splice(i, 1); // Elimina el producto del array
        alert("Producto eliminado correctamente.");
        mostrarProductos(); // Actualiza la tabla
        mostrarProductosDisponibles(); // Actualiza la lista de productos disponibles
      }
      break;
    }
  }

  if (!encontrado) { // Si no se encuentra el producto
    errorEliminar.textContent = "No se encontró un producto con ese nombre.";
  }
}

// =======================
// Función para actualizar estadísticas de productos
// =======================
function actualizarEstadisticasProductos() {
  let totalProductos = productos.length; // Total de productos
  let totalStock = 0; // Inicializa el contador de stock total
  let valorInventario = 0; // Inicializa el valor total del inventario

  for (let i = 0; i < productos.length; i++) {
    totalStock += productos[i].stock; // Suma el stock de cada producto
    valorInventario += productos[i].precio * productos[i].stock; // Calcula valor total
  }

  // Muestra los resultados en el HTML
  document.getElementById("totalProductos").textContent = totalProductos;
  document.getElementById("stockTotal").textContent = totalStock;
  document.getElementById("valorInventario").textContent = valorInventario.toFixed(2);
}

// =======================
// Función para limpiar los campos del formulario
// =======================
function limpiarCamposProducto() {
  mostrarTextoEnCaja("txtNombre", ""); // Limpia campo nombre
  mostrarTextoEnCaja("tXtDescripcion", ""); // Limpia campo descripción
  mostrarTextoEnCaja("txtCategoria:", ""); // Limpia campo categoría
  mostrarTextoEnCaja("txtPrecio", ""); // Limpia campo precio
  mostrarTextoEnCaja("txtStock", ""); // Limpia campo stock
}


// =======================
// CATEGORÍAS
// =======================

// Función para agregar una nueva categoría
function agregarCategoria() {
  // Recupera los valores ingresados por el usuario desde los inputs
  let nombreCategoria = recuperarTexto("nombreCategoria");
  let descripcionCategoria = recuperarTexto("descripcionCategoria");

  // Referencias a los elementos donde se mostrarán los mensajes de error
  let errorNombreCategoria = document.getElementById("errorNombreCategoria");
  let errorDescripcionCategoria = document.getElementById("errorDescripcionCategoria");

  // Limpia los mensajes de error antes de validar
  errorNombreCategoria.textContent = "";
  errorDescripcionCategoria.textContent = "";

  // Variable que indica si los datos son válidos
  let valido = true;

  // =================
  // Validaciones básicas
  // =================
  if (nombreCategoria == "" || nombreCategoria == " ") { // Nombre obligatorio
    errorNombreCategoria.textContent = "El nombre es obligatorio";
    valido = false;
  }
  if (descripcionCategoria == "" || descripcionCategoria == " ") { // Descripción obligatoria
    errorDescripcionCategoria.textContent = "La descripción es obligatoria";
    valido = false;
  }

  // =================
  // Verificar que la categoría no exista ya
  // =================
  for (let i = 0; i < categorias.length; i++) {
    if (categorias[i].nombre === nombreCategoria) { // Comparar nombres
      alert("Ya existe una categoría con ese nombre.");
      valido = false;
      break;
    }
  }

  // =================
  // Si los datos son válidos, se agrega la categoría
  // =================
  if (valido) {
    let nuevaCategoria = {}; // Creamos un objeto para la nueva categoría
    nuevaCategoria.nombre = nombreCategoria;
    nuevaCategoria.descripcion = descripcionCategoria;
    categorias.push(nuevaCategoria); // La agregamos al arreglo de categorías
    alert("CATEGORÍA AGREGADA"); // Mensaje de éxito
    mostrarCategorias(); // Actualiza la lista en pantalla
  }
}

// Función para mostrar todas las categorías en una lista HTML
function mostrarCategorias() {
  let lista = document.getElementById("listaCategorias"); // Contenedor donde se mostrará la lista
  lista.innerHTML = ""; // Limpia el contenido previo
  for (let i = 0; i < categorias.length; i++) {
    // Agrega cada categoría como un elemento <li>
    lista.innerHTML += "<li>" + categorias[i].nombre + " - " + categorias[i].descripcion + "</li>";
  }
}

// Función para eliminar una categoría
function eliminarCategoria(index) {
  /*
      Pasos:
      - Confirmar con el usuario
      - Eliminar categoría de la lista
      - Actualizar lista en pantalla
  */

  // Recuperamos el texto del input donde el usuario escribe el nombre de la categoría a eliminar
  let nombreEliminarCategoria = recuperarTexto("txtEliminarCategoria");

  // Obtenemos la referencia al elemento donde se mostrarán mensajes de error
  let errorEliminarCategoria = document.getElementById("lblEliminarCategoria");

  // Limpiamos mensajes de error anteriores
  errorEliminarCategoria.textContent = "";

  // Variables para saber si la categoría fue encontrada y su posición en el arreglo
  let encontrado = false;
  let posicion = -1;

  // =================
  // Validación: campo vacío
  // =================
  if (nombreEliminarCategoria == "" || nombreEliminarCategoria == " ") {
    errorEliminarCategoria.textContent = "Debe ingresar un nombre válido para eliminar.";
    return; // Sale de la función si no hay valor
  }

  // =================
  // Buscar la categoría en el arreglo
  // =================
  for (let i = 0; i < categorias.length; i++) {
    if (categorias[i].nombre === nombreEliminarCategoria) { // Compara nombres
      encontrado = true;   // Marcamos que se encontró
      posicion = i;        // Guardamos la posición en el arreglo
      break;               // Salimos del bucle
    }
  }

  // =================
  // Si no se encontró, mostramos un error
  // =================
  if (!encontrado) {
    errorEliminarCategoria.textContent = "No se encontró un producto con ese nombre.";
    return; // Sale de la función
  }

  // =================
  // Confirmar eliminación con el usuario
  // =================
  let confirmacion = confirm("¿Está seguro que desea eliminar el producto '" + nombreEliminarCategoria + "'?");

  // =================
  // Si confirma, eliminamos la categoría
  // =================
  if (confirmacion == true) {
    categorias.splice(posicion, 1); // Elimina 1 elemento en la posición encontrada

    // Limpiamos el input donde se escribió el nombre de la categoría
    document.getElementById("txtEliminarCategoria").value = "";

    // Actualizamos la lista en pantalla
    mostrarCategorias();

    // Mensaje de éxito
    alert("Categoria eliminada correctamente.");
  }
}

// =======================
// CARRITO
// =======================

// Función para mostrar los productos disponibles con stock
function mostrarProductosDisponibles() {
  let htmlLista = "<ul>"; // Creamos un contenedor tipo lista
  for (let i = 0; i < productos.length; i++) { // Recorremos todos los productos
    if (productos[i].stock > 0) { // Solo mostramos productos con stock
      htmlLista += "<li><strong>" + productos[i].nombre + "</strong> - $" + productos[i].precio.toFixed(2) +
        " (Stock: " + productos[i].stock + ") " +
        // Botón para agregar al carrito, llamando a la función agregarAlCarrito con el nombre del producto
        "<button type='button' onclick=\"agregarAlCarrito('" + productos[i].nombre + "')\">Añadir al Carrito</button></li>";
    }
  }
  htmlLista += "</ul>"; // Cerramos la lista
  mostrarTextoHTML("productosDisponibles", htmlLista); // Mostramos el HTML en el contenedor de la página
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombreProducto) {
  let productoEnStock = null;

  // Buscamos el producto en la lista de productos
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre === nombreProducto) {
      productoEnStock = productos[i]; // Lo encontramos
      break;
    }
  }

  // Validamos que el producto exista y tenga stock
  if (productoEnStock == null || productoEnStock.stock <= 0) {
    alert("El producto \"" + nombreProducto + "\" no está disponible o no tiene stock.");
    return; // Salimos si no hay stock
  }

  // Preguntamos al usuario cuántas unidades desea agregar
  let cantidadStr = prompt("¿Cuántas unidades de \"" + nombreProducto + "\" desea agregar? (Stock disponible: " + productoEnStock.stock + ")");
  let cantidad = parseInt(cantidadStr, 10);

  // Validamos que la cantidad sea un número positivo
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Cantidad inválida.");
    return;
  }

  // Validamos que no exceda el stock disponible
  if (cantidad > productoEnStock.stock) {
    alert("Solo hay " + productoEnStock.stock + " unidades disponibles.");
    return;
  }

  // Verificamos si el producto ya está en el carrito
  let productoEnCarrito = null;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === nombreProducto) {
      productoEnCarrito = carrito[i];
      break;
    }
  }

  // Si el producto ya existe en el carrito, actualizamos la cantidad
  if (productoEnCarrito != null) {
    if (productoEnCarrito.cantidad + cantidad > productoEnStock.stock) {
      alert("Excede el stock disponible.");
      return;
    }
    productoEnCarrito.cantidad += cantidad;
  } else {
    // Si no existe en el carrito, lo agregamos como nuevo objeto
    let nuevoItem = {};
    nuevoItem.nombre = nombreProducto;
    nuevoItem.cantidad = cantidad;
    nuevoItem.precio = productoEnStock.precio;
    carrito.push(nuevoItem);
  }

  alert(cantidad + " unidad(es) de \"" + nombreProducto + "\" agregadas al carrito.");
  mostrarCarrito(); // Actualizamos la tabla del carrito
}

// Función para mostrar el contenido del carrito en pantalla
function mostrarCarrito() {
  let htmlTabla = "<table><thead><tr><th>Producto</th><th>Cantidad</th><th>Subtotal</th><th>Acciones</th></tr></thead><tbody>";
  let total = 0; // Variable para acumular el total

  for (let i = 0; i < carrito.length; i++) {
    let subtotal = carrito[i].cantidad * carrito[i].precio; // Calculamos subtotal
    total += subtotal; // Sumamos al total

    // Creamos fila de la tabla con input editable para cantidad y botón para eliminar
    htmlTabla += "<tr><td>" + carrito[i].nombre + "</td>"
      + "<td><input type='number' min='1' value='" + carrito[i].cantidad + "' id='cantidad-carrito-" + i + "' onchange='editarCantidadCarrito(" + i + ")'></td>"
      + "<td>$" + subtotal.toFixed(2) + "</td>"
      + "<td><button onclick='eliminarDelCarrito(" + i + ")'>Eliminar</button></td></tr>";
  }

  htmlTabla += "</tbody></table>";
  mostrarTextoHTML("tablaCarrito", htmlTabla); // Mostramos la tabla en el contenedor
  mostrarTexto("totalCarrito", total.toFixed(2)); // Mostramos el total del carrito
}

// Función para editar la cantidad de un producto en el carrito
function editarCantidadCarrito(index) {
  let nuevoValorTexto = recuperarTexto("cantidad-carrito-" + index); // Obtenemos el valor del input
  let nuevaCantidad = parseInt(nuevoValorTexto, 10); // Convertimos a número
  let item = carrito[index]; // Referencia al item del carrito

  // Validación básica
  if (isNaN(nuevaCantidad) || nuevaCantidad <= 0) {
    alert("Cantidad inválida.");
    mostrarTextoEnCaja("cantidad-carrito-" + index, item.cantidad); // Restauramos cantidad anterior
    return;
  }

  // Buscamos el producto en inventario para validar stock
  let productoEnStock = null;
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre === item.nombre) {
      productoEnStock = productos[i];
      break;
    }
  }

  if (productoEnStock == null) {
    alert("Producto no encontrado en inventario.");
    return;
  }

  // Validación: no exceder stock
  if (nuevaCantidad > productoEnStock.stock) {
    alert("Solo hay " + productoEnStock.stock + " unidades disponibles.");
    item.cantidad = productoEnStock.stock;
  } else {
    item.cantidad = nuevaCantidad;
  }

  mostrarCarrito(); // Actualizamos la tabla
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
  if (confirm("¿Eliminar '" + carrito[index].nombre + "' del carrito?")) {
    carrito.splice(index, 1); // Eliminamos el producto del arreglo
    mostrarCarrito(); // Actualizamos la tabla
  }
}

// =======================
// EVENTOS INICIALES
// =======================
document.addEventListener('DOMContentLoaded', function () {
  mostrarProductosDisponibles(); // Mostramos productos al cargar la página
  mostrarCarrito(); // Mostramos carrito vacío al inicio
});


// =======================
// CLIENTE Y VENTAS
// =======================

// Función para guardar los datos del cliente
function guardarDatosCliente() {
  // Obtener valores de los inputs del formulario
  let nombre = document.getElementById('nombreCliente').value;
  let email = document.getElementById('emailCliente').value;
  let telefono = document.getElementById('telefonoCliente').value;
  let direccion = document.getElementById('direccionCliente').value;

  let errores = false; // Bandera para controlar si hay errores en el formulario

  // Validar nombre
  if (nombre == "" || nombre == " ") {
    document.getElementById('errorNombreCliente').innerText = "Ingrese nombre";
    errores = true;
  } else {
    document.getElementById('errorNombreCliente').innerText = "";
  }

  // Validar email sin usar includes, solo con bucle
  let tieneArroba = false;
  for (let i = 0; i < email.length; i++) {
    if (email.charAt(i) == "@") {
      tieneArroba = true;
      break;
    }
  }

  if (email == "" || tieneArroba == false) {
    document.getElementById('errorEmailCliente').innerText = "Ingrese email válido";
    errores = true;
  } else {
    document.getElementById('errorEmailCliente').innerText = "";
  }

  // Validar teléfono
  if (telefono == "" || telefono == " ") {
    document.getElementById('errorTelefonoCliente').innerText = "Ingrese teléfono";
    errores = true;
  } else {
    document.getElementById('errorTelefonoCliente').innerText = "";
  }

  // Validar dirección
  if (direccion == "" || direccion == " ") {
    document.getElementById('errorDireccionCliente').innerText = "Ingrese dirección";
    errores = true;
  } else {
    document.getElementById('errorDireccionCliente').innerText = "";
  }

  // Si hay errores, no guardamos
  if (errores) return;

  // Guardamos datos del cliente en variable global
  clienteActual = {
    nombre: nombre,
    email: email,
    telefono: telefono,
    direccion: direccion
  };

  alert("Datos del cliente guardados correctamente.");
}


// Función para finalizar la compra
function finalizarCompra() {
  // Validar que el carrito tenga productos
  if (carrito.length == 0) {
    alert("El carrito está vacío. Agrega productos antes de finalizar.");
    return;
  }

  // Validar que se hayan guardado datos del cliente
  if (!clienteActual || clienteActual.nombre == undefined || clienteActual.nombre == "") {
    alert("Debes guardar los datos del cliente antes de finalizar la compra.");
    return;
  }

  let total = 0; // Inicializamos total de la compra

  // Recorremos carrito para calcular total y actualizar stock
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio * carrito[i].cantidad;

    // Actualizamos stock en productos
    for (let j = 0; j < productos.length; j++) {
      if (productos[j].nombre == carrito[i].nombre) {
        productos[j].stock -= carrito[i].cantidad;
        break;
      }
    }
  }

  // Creamos copia del carrito para guardar en la venta
  let copiaCarrito = [];
  for (let i = 0; i < carrito.length; i++) {
    let item = {
      nombre: carrito[i].nombre,
      cantidad: carrito[i].cantidad,
      precio: carrito[i].precio
    };
    copiaCarrito.push(item);
  }

  // Creamos objeto de venta con cliente, productos, total y fecha
  let nuevaVenta = {
    cliente: {
      nombre: clienteActual.nombre,
      email: clienteActual.email,
      telefono: clienteActual.telefono,
      direccion: clienteActual.direccion
    },
    productos: copiaCarrito,
    total: total,
    fecha: new Date().toLocaleString()
  };

  // Guardamos venta en arreglo global de ventas
  ventas.push(nuevaVenta);

  alert("Compra finalizada exitosamente.");

  // Limpiamos formulario del cliente
  document.getElementById('nombreCliente').value = "";
  document.getElementById('emailCliente').value = "";
  document.getElementById('telefonoCliente').value = "";
  document.getElementById('direccionCliente').value = "";

  clienteActual = {}; // Reiniciamos variable global

  // Vaciamos carrito
  while (carrito.length > 0) {
    carrito.pop();
  }

  // Actualizamos interfaces
  mostrarCarrito();
  mostrarProductosDisponibles();
  mostrarVentas();
}


// Función para mostrar resumen de todas las ventas
function mostrarVentas() {
  let html = ""; // Contenido de la tabla
  let totalVentas = 0;

  for (let i = 0; i < ventas.length; i++) {
    totalVentas += ventas[i].total; // Sumamos total de todas las ventas

    // Creamos string de productos vendidos en esta venta
    let productosStr = "";
    for (let j = 0; j < ventas[i].productos.length; j++) {
      productosStr += ventas[i].productos[j].nombre + " x" + ventas[i].productos[j].cantidad;
      if (j < ventas[i].productos.length - 1) productosStr += ", ";
    }

    html += "<tr>" +
      "<td>" + ventas[i].cliente.nombre + "</td>" +
      "<td>" + productosStr + "</td>" +
      "<td>$" + ventas[i].total.toFixed(2) + "</td>" +
      "</tr>";
  }

  // Mostramos tabla y total ventas
  document.getElementById("tablaVentas").querySelector("tbody").innerHTML = html;
  document.getElementById("totalVentas").innerText = totalVentas.toFixed(2);

  // Mostramos producto más vendido
  let masVendido = calcularProductoMasVendido();
  if (masVendido == "") masVendido = "-";
  document.getElementById("productoMasVendido").innerText = masVendido;
}


// Función para calcular producto más vendido
function calcularProductoMasVendido() {
  let contador = {}; // Objeto para contar cantidades vendidas
  let maxCantidad = 0;
  let productoMasVendido = "";

  // Recorremos todas las ventas
  for (let i = 0; i < ventas.length; i++) {
    let productosVenta = ventas[i].productos;

    for (let j = 0; j < productosVenta.length; j++) {
      let nombreProducto = productosVenta[j].nombre;
      let cantidadVendida = productosVenta[j].cantidad;

      if (contador[nombreProducto] == undefined) {
        contador[nombreProducto] = 0;
      }

      contador[nombreProducto] += cantidadVendida; // Sumamos cantidad
    }
  }

  // Buscamos el producto con mayor cantidad vendida
  for (let nombre in contador) {
    if (contador[nombre] > maxCantidad) {
      maxCantidad = contador[nombre];
      productoMasVendido = nombre;
    }
  }

  return productoMasVendido;
}

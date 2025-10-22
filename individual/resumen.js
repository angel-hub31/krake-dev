


// Función: mostrar resumen de ventas
function mostrarVentas() {
  /*
      - Mostrar tabla con ventas registradas
      - Calcular y mostrar totales globales y producto más vendido
    */

      let htmlTablaBody = "";
    let totalGlobalVentas = 0;

    // 1. Mostrar tabla con ventas registradas
    // El array 'ventas' se asume que es el global definido en 'scripts.js'
    ventas.forEach(venta => {
        totalGlobalVentas += venta.total;

        // Crear una cadena con los detalles de los productos comprados para mostrar en una celda
        const detallesProductos = venta.productosComprados.map(item => 
            `${item.nombre} x${item.cantidad} ($${(item.cantidad * item.precio).toFixed(2)})`
        ).join('<br>');
        
        htmlTablaBody += `
            <tr>
                <td>
                    <strong>${venta.cliente.nombre}</strong><br>
                    <small>${venta.fecha || 'N/D'}</small>
                </td>
                <td>${detallesProductos}</td>
                <td>$${venta.total.toFixed(2)}</td>
            </tr>
        `;
    });

    // Mostrar el cuerpo de la tabla (Se asume la existencia del contenedor #tablaVentas en index.html)
    // Se asume que mostrarTextoHTML viene de utilitarios.js
    mostrarTextoHTML("tablaVentas", `
        <thead>
            <tr>
                <th>Cliente y Fecha</th>
                <th>Productos</th>
                <th>Total ($)</th>
            </tr>
        </thead>
        <tbody>
            ${htmlTablaBody}
        </tbody>
    `);

    // 2. Mostrar totales globales y producto más vendido
    // Se asume que mostrarTexto viene de utilitarios.js
    mostrarTexto("totalVentas", totalGlobalVentas.toFixed(2));
    
    const productoMasVendido = calcularProductoMasVendido();
    mostrarTexto("productoMasVendido", productoMasVendido);
}


function calcularProductoMasVendido() {
  /*
      - Contar cantidades vendidas de cada producto en todas las ventas
      - Retornar nombre de producto con mayor cantidad vendida
    */
    const conteoVentas = {}; // { 'NombreProducto': CantidadTotalVendida }
    let maxCantidad = 0;
    let productoMasVendido = "-";
    
    // El array 'ventas' se asume que es el global definido en 'scripts.js'
    ventas.forEach(venta => {
        // 'productosComprados' es un array de objetos { nombre, cantidad, precio }
        venta.productosComprados.forEach(item => {
            const nombre = item.nombre;
            conteoVentas[nombre] = (conteoVentas[nombre] || 0) + item.cantidad;
        });
    });

    // Encontrar el producto con la cantidad más alta
    for (const nombreProducto in conteoVentas) {
        const cantidadVendida = conteoVentas[nombreProducto];
        if (cantidadVendida > maxCantidad) {
            maxCantidad = cantidadVendida;
            productoMasVendido = nombreProducto;
        }
    }

    return productoMasVendido;
}


// Función auxiliar para actualizar solo las estadísticas
function actualizarEstadisticasVentas() {
     // Se asume que mostrarTexto viene de utilitarios.js
    let totalGlobalVentas = 0;
    ventas.forEach(venta => {
        totalGlobalVentas += venta.total;
    });
    
    mostrarTexto("totalVentas", totalGlobalVentas.toFixed(2));
    
    const productoMasVendido = calcularProductoMasVendido();
    mostrarTexto("productoMasVendido", productoMasVendido);
}

// Inicializar la vista de ventas al cargar el script o al cargar el DOM si es necesario.
document.addEventListener('DOMContentLoaded', mostrarVentas);
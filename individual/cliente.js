

let clienteDatos = {};


function validarEmail(email) {
  if (!email || email.trim() === "") {
    return { error: "El correo electrónico es obligatorio.", valido: false };
  }
  // Regex simple para email: algo@algo.algo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { error: "Formato de correo electrónico inválido.", valido: false };
  }
  return { error: "", valido: true, valor: email.trim() };
}

// Función de validación de teléfono simple (solo números y longitud)
function validarTelefono(telefono) {
  if (!telefono || telefono.trim() === "") {
    return { error: "El teléfono es obligatorio.", valido: false };
  }
  const telefonoLimpio = telefono.replace(/[\s-()]/g, ''); // Remover espacios, guiones, paréntesis
  // Verifica que sean solo dígitos y tenga entre 7 y 15 caracteres
  if (!/^\d{7,15}$/.test(telefonoLimpio)) {
    return { error: "Teléfono inválido (solo dígitos, 7-15 caracteres).", valido: false };
  }
  return { error: "", valido: true, valor: telefonoLimpio };
}

// Función de validación de dirección simple
function validarDireccion(direccion) {
  if (!direccion || direccion.trim() === "") {
    return { error: "La dirección es obligatoria.", valido: false };
  }
  if (direccion.trim().length < 5) {
    return { error: "La dirección debe tener al menos 5 caracteres.", valido: false };
  }
  return { error: "", valido: true, valor: direccion.trim() };
}
// Función: guardar datos cliente
function guardarDatosCliente() {
  /*
      - Obtener y validar campos del cliente (nombre, email, teléfono, dirección)
      - Guardar datos para la compra
    */

let esValido = true;

  // 1. Obtener datos cliente (se asume que 'recuperarTexto' viene de utilitarios.js)
  const nombreTexto = recuperarTexto("nombreCliente");
  const emailTexto = recuperarTexto("emailCliente");
  const telefonoTexto = recuperarTexto("telefonoCliente");
  const direccionTexto = recuperarTexto("direccionCliente");

  // 2. Validar campos (se asume que 'validarNombre' viene de scripts.js)
  const valNombre = validarNombre(nombreTexto);
  const valEmail = validarEmail(emailTexto);
  const valTelefono = validarTelefono(telefonoTexto);
  const valDireccion = validarDireccion(direccionTexto);

  // 3. Mostrar errores (se asume que 'mostrarTexto' viene de utilitarios.js)
  mostrarTexto("errorNombreCliente", valNombre.error);
  mostrarTexto("errorEmailCliente", valEmail.error);
  mostrarTexto("errorTelefonoCliente", valTelefono.error);
  mostrarTexto("errorDireccionCliente", valDireccion.error);

  // 4. Verificar validez general
  if (!valNombre.valido || !valEmail.valido || !valTelefono.valido || !valDireccion.valido) {
    esValido = false;
    alert("Por favor, corrige los errores en los datos del cliente.");
  }

  // 5. Guardar datos para la compra
  if (esValido) {
    clienteDatos = {
      nombre: valNombre.valor,
      email: valEmail.valor,
      telefono: valTelefono.valor,
      direccion: valDireccion.valor,
    };
    alert("Datos del cliente guardados correctamente.");
  }

  return esValido;




}
// Función: finalizar compra
function finalizarCompra() {
  /*
      - Validar carrito y datos cliente completos
      - Crear registro de venta con productos, cliente, total y fecha
      - Actualizar stock de productos vendidos
      - Vaciar carrito
      - Actualizar tablas y estadísticas
      - Mostrar mensaje éxito y limpiar formulario cliente
    */
if (carrito.length === 0) {
    alert("El carrito de compras está vacío. Agrega productos para finalizar la compra.");
    return;
  }

  // Llama a guardarDatosCliente para validar y guardar/actualizar los datos
  if (!guardarDatosCliente()) {
    // Si la validación falla, guardarDatosCliente ya mostró el error
    return;
  }

  // Recalcular total antes de finalizar (por si acaso el totalCarrito no está actualizado)
  let totalCompra = 0;
  carrito.forEach(item => {
    totalCompra += item.cantidad * item.precio;
  });
  
  if (totalCompra <= 0) {
      alert("El total de la compra es cero o negativo, no se puede finalizar.");
      return;
  }

  // 2. Crear registro de venta con productos, cliente, total y fecha
  const nuevaVenta = {
    cliente: { ...clienteDatos }, // Copia los datos del cliente
    productosComprados: JSON.parse(JSON.stringify(carrito)), // Copia profunda del carrito
    total: parseFloat(totalCompra.toFixed(2)),
    fecha: new Date().toLocaleDateString(),
  };

  // Se asume que 'ventas' es el array global definido en 'scripts.js'
  ventas.push(nuevaVenta);

  // 3. Actualizar stock de productos vendidos
  carrito.forEach(itemCarrito => {
    const productoEnStock = productos.find(p => p.nombre === itemCarrito.nombre);
    if (productoEnStock) {
      // Se asume que la validación inicial de stock se realizó al agregar al carrito
      productoEnStock.stock -= itemCarrito.cantidad;
    }
  });

  // 4. Vaciar carrito
  carrito.length = 0; // Método rápido para vaciar el array

  // 5. Actualizar tablas y estadísticas
  // Se asume la existencia de funciones para estas actualizaciones:
  // - mostrarProductos/actualizarEstadisticasProductos (de scripts.js)
  // - mostrarCarrito (de carrito.js)
  // - mostrarVentas/actualizarEstadisticasVentas (a implementar en otra parte, o se asume su existencia)
  
  // Refresca las vistas relevantes
  if (typeof mostrarProductos === 'function') mostrarProductos();
  if (typeof actualizarEstadisticasProductos === 'function') actualizarEstadisticasProductos();
  if (typeof mostrarCarrito === 'function') mostrarCarrito();
  if (typeof mostrarProductosDisponibles === 'function') mostrarProductosDisponibles(); // Actualiza stock visible en carrito
  if (typeof mostrarVentas === 'function') mostrarVentas(); // Función para mostrar la tabla de ventas
  if (typeof actualizarEstadisticasVentas === 'function') actualizarEstadisticasVentas(); // Función para actualizar el resumen de ventas

  // 6. Mostrar mensaje éxito y limpiar formulario cliente
  alert(`¡Compra finalizada con éxito!\nTotal: $${nuevaVenta.total.toFixed(2)}`);
  
  limpiarFormularioCliente();
  
  // Opcional: Navegar a la sección de Resumen de Ventas
  if (typeof mostrarSeccion === 'function') mostrarSeccion('seccion5');



}


/////////////////////////////////////////////////////////////////////////////

// Función auxiliar para limpiar el formulario del cliente
function limpiarFormularioCliente() {
  // Se asume que 'mostrarTextoEnCaja' y 'mostrarTexto' vienen de utilitarios.js
  mostrarTextoEnCaja("nombreCliente", "");
  mostrarTextoEnCaja("emailCliente", "");
  mostrarTextoEnCaja("telefonoCliente", "");
  mostrarTextoEnCaja("direccionCliente", "");

  // Limpiar mensajes de error
  mostrarTexto("errorNombreCliente", "");
  mostrarTexto("errorEmailCliente", "");
  mostrarTexto("errorTelefonoCliente", "");
  mostrarTexto("errorDireccionCliente", "");
  
  clienteDatos = {}; // Limpiar datos guardados temporalmente
}




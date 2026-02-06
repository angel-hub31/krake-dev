// ====================================================================
// FUNCIÓN PRINCIPAL: calcularValorTotal
// Controla la obtención de datos, validación, cálculos y la visualización de resultados.
// ====================================================================
calcularValorTotal = function () {
    let nombreProducto = recuperarTexto("txtProducto");    // 1. Recupera el texto del nombre del producto del campo "txtProducto".
    let precioProducto = recuperarFloat("txtPrecio");    // 2. Recupera el precio del campo "txtPrecio" y lo convierte a número flotante.
    let cantidad = recuperarInt("txtCantidad");    // 3. Recupera la cantidad del campo "txtCantidad" y lo convierte a número entero.
    // 4. Llama a las funciones de validación de negocio para cada campo.
    // Las funciones deben retornar un mensaje de error (String) o una cadena vacía ("") si es válido.
    let msjProducto = esProductoValido(nombreProducto);
    let msjCantidad = esCantidadValida(cantidad);
    let msjPrecio = esPrecioValido(precioProducto);
    mostrarTexto("lblError1", msjProducto);    // 5. Muestra los mensajes de error/éxito (vacío) para cada campo en la interfaz.
    mostrarTexto("lblError2", msjCantidad);
    mostrarTexto("lblError3", msjPrecio);
    if (msjProducto == "" && msjCantidad == "" && msjPrecio == "") {    // 6. Condicional principal: Procede con los cálculos SOLO si todos los mensajes de error están vacíos.
        let valorSubtotal = calcularSubtotal(precioProducto, cantidad);        // 7. Calcula el subtotal (se asume que existe la función calcularSubtotal).
        mostrarTexto("lblSubtotal", valorSubtotal.toFixed(2));        // 8. Muestra el subtotal formateado a 2 decimales.
        let valorDescuento = calcularDescuentoPorVolumen(valorSubtotal, cantidad);        // 9. Calcula el descuento (se asume lógica de descuento por volumen basada en subtotal y cantidad).
        mostrarTexto("lblDescuento", valorDescuento.toFixed(2));        // 10. Muestra el descuento formateado a 2 decimales.
        let valorIVA = calcularIva(valorSubtotal - valorDescuento);        // 11. Calcula el IVA (se asume que se aplica al subtotal menos el descuento).
        mostrarTexto("lblValorIVA", valorIVA.toFixed(2));        // 12. Muestra el IVA formateado a 2 decimales.
        let valorTotal = calcularTotal(valorSubtotal, valorDescuento, valorIVA);        // 13. Calcula el total final a pagar.
        mostrarTexto("lblTotal", valorTotal.toFixed(2));        // 14. Muestra el total formateado a 2 decimales.
        let mensajeResumen =        // 15. Construye la cadena de resumen de la transacción.
            cantidad + " " + nombreProducto +
            " Subtotal: $" + valorSubtotal.toFixed(2) +
            " Descuento: $" + valorDescuento.toFixed(2) +
            " Total: $" + valorTotal.toFixed(2);
        mostrarTexto("lblResumen", mensajeResumen);        // 16. Muestra el resumen completo.
    } else {
        // --- CASO DE ERROR: Limpieza de resultados ---
        mostrarTexto("lblSubtotal", "0.0");        // 17. Si hubo errores de validación, se establecen todos los campos de resultado a "0.0".
        mostrarTexto("lblDescuento", "0.0");
        mostrarTexto("lblValorIVA", "0.0");
        mostrarTexto("lblTotal", "0.0");
        mostrarTexto("lblResumen", "");        // 18. Se limpia el resumen.
    }
}
// ====================================================================
// FUNCIÓN DE VALIDACIÓN: esProductoValido
// Verifica que el nombre del producto cumpla con formato y longitud.
// ====================================================================
esProductoValido = function (producto) {
    if (producto.trim() == "") {    // 1. Validación de campo obligatorio (después de eliminar espacios).
        return "CAMPO OBLIGATORIO";
    }
    let soloLetras = /^[a-zA-Z]+$/;    // 2. Define una expresión regular para aceptar solo letras minúsculas o mayúsculas.
    if (!soloLetras.test(producto)) {    // 3. Validación de contenido: Si no cumple con el patrón de solo letras.
        return "INGRESE SOLO PALABRAS (LETRAS)";
    }
    if (producto.length > 10) {    // 4. Validación de longitud máxima.
        return "MÁXIMO 10 CARACTERES";
    }
    return "";    // 5. Si pasa todas las validaciones, retorna cadena vacía (indicando éxito).
}
// ====================================================================
// FUNCIÓN DE VALIDACIÓN: esCantidadValida
// Verifica que la cantidad sea un número dentro del rango permitido.
// ====================================================================
esCantidadValida = function (cantidad) {
    if (isNaN(cantidad)) {
        return "DEBE INGRESAR UN NÚMERO";    // 1. Validación de tipo: Verifica si el valor no es un número (NaN - Not a Number).
    }
    if (cantidad < 1 || cantidad > 100) {    // 2. Validación de rango: Verifica que la cantidad esté entre 1 y 100 (ambos inclusive).
        return "INGRESE CANTIDAD ENTRE 1 Y 100";
    }
    return "";    // 3. Retorna cadena vacía (éxito).
}
// ====================================================================
// FUNCIÓN DE VALIDACIÓN: esPrecioValido
// Verifica que el precio sea un número positivo dentro del rango permitido.
// ====================================================================
esPrecioValido = function (precio) {
    if (isNaN(precio)) {    // 1. Validación de tipo: Verifica si el valor no es un número.
        return "DEBE INGRESAR UN NÚMERO";
    }
    if (precio <= 0 || precio > 50) {    // 2. Validación de rango: Verifica que el precio sea positivo (> 0) y no exceda 50.
        return "INGRESE PRECIO ENTRE 0 Y 50";
    }
    return "";    // 3. Retorna cadena vacía (éxito).
}
// ====================================================================
// FUNCIÓN DE CONTROL: limpiar
// Restablece los campos de entrada y los resultados a sus valores iniciales/vacíos.
// ====================================================================
limpiar = function () {
    // 1. Limpia los campos de entrada de la caja de texto.
    mostrarTextoEnCaja("txtProducto", "");
    mostrarTextoEnCaja("txtCantidad", "");
    mostrarTextoEnCaja("txtPrecio", "");
    // 2. Restablece las etiquetas de resultado a 0.0 o vacío.
    mostrarTexto("lblSubtotal", "0.0");
    mostrarTexto("lblDescuento", "0.0");
    mostrarTexto("lblValorIVA", "0.0");
    mostrarTexto("lblTotal", "0.0");
    mostrarTexto("lblResumen", "");
    // 3. Limpia los mensajes de error mostrados.
    mostrarTexto("lblError1", "");
    mostrarTexto("lblError2", "");
    mostrarTexto("lblError3", "");
}







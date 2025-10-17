// ====================================================================
// FUNCIÓN PRINCIPAL: calcularValorTotal
// Controla la obtención de datos, validación, cálculos y la visualización de resultados.
// ====================================================================
calcularValorTotal = function () {
    // 1. Recupera el texto del nombre del producto del campo "txtProducto".
    let nombreProducto = recuperarTexto("txtProducto");
    
    // 2. Recupera el precio del campo "txtPrecio" y lo convierte a número flotante.
    let precioProducto = recuperarFloat("txtPrecio");
    
    // 3. Recupera la cantidad del campo "txtCantidad" y lo convierte a número entero.
    let cantidad = recuperarInt("txtCantidad");

    // 4. Llama a las funciones de validación de negocio para cada campo.
    // Las funciones deben retornar un mensaje de error (String) o una cadena vacía ("") si es válido.
    let msjProducto = esProductoValido(nombreProducto);
    let msjCantidad = esCantidadValida(cantidad);
    let msjPrecio = esPrecioValido(precioProducto);

    // 5. Muestra los mensajes de error/éxito (vacío) para cada campo en la interfaz.
    mostrarTexto("lblError1", msjProducto);
    mostrarTexto("lblError2", msjCantidad);
    mostrarTexto("lblError3", msjPrecio);

    // 6. Condicional principal: Procede con los cálculos SOLO si todos los mensajes de error están vacíos.
    if (msjProducto == "" && msjCantidad == "" && msjPrecio == "") {
        
        // --- CÁLCULOS ---
        
        // 7. Calcula el subtotal (se asume que existe la función calcularSubtotal).
        let valorSubtotal = calcularSubtotal(precioProducto, cantidad);
        // 8. Muestra el subtotal formateado a 2 decimales.
        mostrarTexto("lblSubtotal", valorSubtotal.toFixed(2));

        // 9. Calcula el descuento (se asume lógica de descuento por volumen basada en subtotal y cantidad).
        let valorDescuento = calcularDescuentoPorVolumen(valorSubtotal, cantidad);
        // 10. Muestra el descuento formateado a 2 decimales.
        mostrarTexto("lblDescuento", valorDescuento.toFixed(2));

        // 11. Calcula el IVA (se asume que se aplica al subtotal menos el descuento).
        let valorIVA = calcularIva(valorSubtotal - valorDescuento);
        // 12. Muestra el IVA formateado a 2 decimales.
        mostrarTexto("lblValorIVA", valorIVA.toFixed(2));

        // 13. Calcula el total final a pagar.
        let valorTotal = calcularTotal(valorSubtotal, valorDescuento, valorIVA);
        // 14. Muestra el total formateado a 2 decimales.
        mostrarTexto("lblTotal", valorTotal.toFixed(2));

        // 15. Construye la cadena de resumen de la transacción.
        let mensajeResumen =
            cantidad + " " + nombreProducto +
            " Subtotal: $" + valorSubtotal.toFixed(2) +
            " Descuento: $" + valorDescuento.toFixed(2) +
            " Total: $" + valorTotal.toFixed(2);

        // 16. Muestra el resumen completo.
        mostrarTexto("lblResumen", mensajeResumen);
    } else {
        // --- CASO DE ERROR: Limpieza de resultados ---
        
        // 17. Si hubo errores de validación, se establecen todos los campos de resultado a "0.0".
        mostrarTexto("lblSubtotal", "0.0");
        mostrarTexto("lblDescuento", "0.0");
        mostrarTexto("lblValorIVA", "0.0");
        mostrarTexto("lblTotal", "0.0");
        // 18. Se limpia el resumen.
        mostrarTexto("lblResumen", "");
    }
}

// ====================================================================
// FUNCIÓN DE VALIDACIÓN: esProductoValido
// Verifica que el nombre del producto cumpla con formato y longitud.
// ====================================================================
esProductoValido = function (producto) {
    // 1. Validación de campo obligatorio (después de eliminar espacios).
    if (producto.trim() == "") {
        return "CAMPO OBLIGATORIO";
    }
    
    // 2. Define una expresión regular para aceptar solo letras minúsculas o mayúsculas.
    let soloLetras = /^[a-zA-Z]+$/;
    
    // 3. Validación de contenido: Si no cumple con el patrón de solo letras.
    if (!soloLetras.test(producto)) {
        return "INGRESE SOLO PALABRAS (LETRAS)";
    }
    
    // 4. Validación de longitud máxima.
    if (producto.length > 10) {
        return "MÁXIMO 10 CARACTERES";
    }
    
    // 5. Si pasa todas las validaciones, retorna cadena vacía (indicando éxito).
    return "";
}

// ====================================================================
// FUNCIÓN DE VALIDACIÓN: esCantidadValida
// Verifica que la cantidad sea un número dentro del rango permitido.
// ====================================================================
esCantidadValida = function (cantidad) {
    // 1. Validación de tipo: Verifica si el valor no es un número (NaN - Not a Number).
    if (isNaN(cantidad)) {
        return "DEBE INGRESAR UN NÚMERO";
    }
    
    // 2. Validación de rango: Verifica que la cantidad esté entre 1 y 100 (ambos inclusive).
    if (cantidad < 1 || cantidad > 100) {
        return "INGRESE CANTIDAD ENTRE 1 Y 100";
    }
    
    // 3. Retorna cadena vacía (éxito).
    return "";
}

// ====================================================================
// FUNCIÓN DE VALIDACIÓN: esPrecioValido
// Verifica que el precio sea un número positivo dentro del rango permitido.
// ====================================================================
esPrecioValido = function (precio) {
    // 1. Validación de tipo: Verifica si el valor no es un número.
    if (isNaN(precio)) {
        return "DEBE INGRESAR UN NÚMERO";
    }
    
    // 2. Validación de rango: Verifica que el precio sea positivo (> 0) y no exceda 50.
    if (precio <= 0 || precio > 50) {
        return "INGRESE PRECIO ENTRE 0 Y 50";
    }
    
    // 3. Retorna cadena vacía (éxito).
    return "";
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







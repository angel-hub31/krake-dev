
calcularValorTotal = function () {
    let nombreProducto = recuperarTexto("txtProducto");
    let precioProducto = recuperarFloat("txtPrecio");
    let cantidad = recuperarInt("txtCantidad");

    let msjProducto = esProductoValido(nombreProducto);
    let msjCantidad = esCantidadValida(cantidad);
    let msjPrecio = esPrecioValido(precioProducto);

    mostrarTexto("lblError1", msjProducto);
    mostrarTexto("lblError2", msjCantidad);
    mostrarTexto("lblError3", msjPrecio);

    if (msjProducto == "" && msjCantidad == "" && msjPrecio == "") {
        let valorSubtotal = calcularSubtotal(precioProducto, cantidad);
        mostrarTexto("lblSubtotal", valorSubtotal.toFixed(2));

        let valorDescuento = calcularDescuentoPorVolumen(valorSubtotal, cantidad);
        mostrarTexto("lblDescuento", valorDescuento.toFixed(2));

        let valorIVA = calcularIva(valorSubtotal - valorDescuento);
        mostrarTexto("lblValorIVA", valorIVA.toFixed(2));

        let valorTotal = calcularTotal(valorSubtotal, valorDescuento, valorIVA);
        mostrarTexto("lblTotal", valorTotal.toFixed(2));

        let mensajeResumen =
            cantidad + " " + nombreProducto +
            " Subtotal: $" + valorSubtotal.toFixed(2) +
            " Descuento: $" + valorDescuento.toFixed(2) +
            " Total: $" + valorTotal.toFixed(2);

        mostrarTexto("lblResumen", mensajeResumen);
    } else {
        mostrarTexto("lblSubtotal", "0.0");
        mostrarTexto("lblDescuento", "0.0");
        mostrarTexto("lblValorIVA", "0.0");
        mostrarTexto("lblTotal", "0.0");
        mostrarTexto("lblResumen", "");
    }
}
esProductoValido = function (producto) {
  if (producto.trim() == "") {
    return "CAMPO OBLIGATORIO";
  }
  let soloLetras = /^[a-zA]+$/;
  if (!soloLetras.test(producto)) {
    return "INGRESE SOLO PALABRAS (LETRAS)";
  }
  if (producto.length > 10) {
    return "MÁXIMO 10 CARACTERES";
  }
  return "";
}

esCantidadValida = function (cantidad) {
  if (isNaN(cantidad)) {
    return "DEBE INGRESAR UN NÚMERO";
  }
  if (cantidad < 1 || cantidad > 100) {
    return "INGRESE CANTIDAD ENTRE 1 Y 100";
  }
  return "";
}

esPrecioValido = function (precio) {
  if (isNaN(precio)) {
    return "DEBE INGRESAR UN NÚMERO";
  }
  if (precio <= 0 || precio > 50) {
    return "INGRESE PRECIO ENTRE 0 Y 50";
  }
  return "";
}



limpiar = function () {
    mostrarTextoEnCaja("txtProducto", "");
    mostrarTextoEnCaja("txtCantidad", "");
    mostrarTextoEnCaja("txtPrecio", "");

    mostrarTexto("lblSubtotal", "0.0");
    mostrarTexto("lblDescuento", "0.0");
    mostrarTexto("lblValorIVA", "0.0");
    mostrarTexto("lblTotal", "0.0");
    mostrarTexto("lblResumen", "");

    mostrarTexto("lblError1", "");
    mostrarTexto("lblError2", "");
    mostrarTexto("lblError3", "");
}

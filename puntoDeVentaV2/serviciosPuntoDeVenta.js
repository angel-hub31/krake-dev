calcularDescuentoPorVolumen = function (subtotal, cantidad) {
  let descuento = 0;
  if (cantidad >= 3 && cantidad <= 5) {
    descuento = subtotal * 0.03; 
  } else if (cantidad >= 6 && cantidad <= 11) {
    descuento = subtotal * 0.04; 
  } else if (cantidad >= 12) {
    descuento = subtotal * 0.05; 
  }
  return descuento;
}

calcularIva = function (monto) {
  return monto * 0.12; 
}

calcularSubtotal = function (precio, cantidad) {
  return precio * cantidad;
}

calcularTotal = function (subtotal, descuento, iva) {
  return subtotal - descuento + iva;
}


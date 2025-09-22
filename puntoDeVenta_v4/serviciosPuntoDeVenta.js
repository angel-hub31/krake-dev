CalcularValorDescuento=function(monto,porcentajeDescuento){
  let valorDescuento=(monto*porcentajeDescuento)/100;
  return valorDescuento;
}
calcularIva=function(monto,descuento){
    valorIva=(monto-descuento)*0.12;
  return valorIva

}
calcularSubtotal=function(precio,cantidad){
  let totaAPagar=precio*cantidad;
  return totaAPagar;
}
calcularTotal=function(subtotal,descuento,iva){
  valorTotal=(subtotal-descuento)+iva;
  return valorTotal;
}
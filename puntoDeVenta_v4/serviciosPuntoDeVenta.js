CalcularValorDescuento=function(monto,porcentajeDescuento){
  let valorDescuento=(monto*porcentajeDescuento)/100;
  return valorDescuento;
}
calcularIva=function(monto,descuento){
    valorIva=(monto-descuento)*0.12;
  

}
calcularSubtotal=function(precio,cantidad){
  let totaAPagar=precio*cantidad;
  totaAPagar=parseFloat(totaAPagar);
  return totaAPagar;
}
calcularTotal=function(subtotal,descuento,iva){
  valorTotal=(subtotal-descuento)+iva;
  return valorTotal;
}
CalcularValorDescuento=function(idComponente,monto,porcentajeDescuento){
  let valorDescuento=(monto*porcentajeDescuento)/100;
  return valorDescuento;
}
calcularIva=function(idComponente,monto){
    valorIva=(monto*12)/100;

}
calcularSubtotal=function(idComponente,precio,cantidad){
  let totaAPagar=precio*cantidad;
  return totaAPagar;
}
calcularTotal=function(idComponente,subtotal,descuento,iva){
  valorTotal=subtotal-descuento+iva;
  return valorTotal;
}
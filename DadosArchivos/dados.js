jugar = function () {
    let aleatorio;
    aleatorio = lanzarDado();
    cambiarTexto("lblNumero", aleatorio);

    if (aleatorio > 3) {
        console.log("ES MAYOR A 3");
        console.log("GANASTE");

        // Mostrar en pantalla
        cambiarTexto("lblNumero", "ES MAYOR A 3");
        cambiarTexto("lblNumero", "ES MAYOR A 3 GANASTE");
    } else {
        console.log("ES MENOR A 3");
        console.log("PERDISTE");

        // Mostrar en pantalla
        cambiarTexto("lblNumero", "ES MENOR A 3");
        cambiarTexto("lblNumero", "ES MENOR A 3 PERDISTE");
    }


}
//crear una funcion llamada lanzaDado
//no recibe parametros
//retorna un numero aleatorio entre 1 y 6
lanzarDado=function(){
    let aleatorio;
    let numeroMultiplicado;
    let numeroEntero;
    let valorDado;
    aleatorio=Math.random();// entre 0 y 1
    numeroMultiplicado=aleatorio*6; //
    
    numeroEntero=parseInt(numeroMultiplicado);//entre 0 y 5
  
    valorDado=numeroEntero+1;// valor que retorna entre 1 y 6

    return valorDado;
}
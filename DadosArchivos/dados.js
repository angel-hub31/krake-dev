// ===============================================
// FUNCIÓN PRINCIPAL: JUGAR AL DADO Y DETERMINAR GANADOR
// ===============================================
jugar = function () {
    let aleatorio;
    aleatorio = lanzarDado();
    cambiarTexto("lblNumero", aleatorio);

    if (aleatorio > 3) {
        console.log("ES MAYOR A 3");
        console.log("GANASTE");

        cambiarTexto("lblNumero", "ES MAYOR A 3"); 
        
        cambiarTexto("lblNumero", "ES MAYOR A 3 GANASTE"); 
    } else {
        console.log("ES MENOR A 3");
        console.log("PERDISTE");

        cambiarTexto("lblNumero", "ES MENOR A 3");
        
        cambiarTexto("lblNumero", "ES MENOR A 3 PERDISTE");
    }
}

lanzarDado = function () {
    let aleatorio;
    let numeroMultiplicado;
    let numeroEntero;
    let valorDado;
    aleatorio = Math.random(); 
    numeroMultiplicado = aleatorio * 6; 
    numeroEntero = parseInt(numeroMultiplicado); 
    valorDado = numeroEntero + 1; 
    return valorDado;
}

















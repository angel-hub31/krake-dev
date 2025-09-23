let puntos = 0;
let lanzamientos = 5;

jugar = function () {
    if (lanzamientos <= 0) {
        return; 
    }

    let resultado = lanzarDado();
    console.log(resultado);

    mostrarCara(resultado);
    modificarPuntos(resultado);
    modificarLanzamientos();
}
    //si el jugador obtiene mas de 20 puntos, 
    //mostrar un mensaje GANASTE!!
    //colocar puntaje en  0 y lanzamieto en 4


modificarPuntos = function (numero) {
    puntos = puntos + numero;
    cambiarTexto("lblPuntos", puntos);

    if (puntos >= 20) {
        cambiarTexto("lblGanar", " Ganaste!");
        cambiarTexto("lblPerder", " ");
        lanzamientos = 0; 
    } else {
        cambiarTexto("lblGanar", " ");
    }
}
//no recibe parametros
//resta 1 a la variable lanzamientos, guarda el resultado en la misma variable
//y muestra en pantalla

modificarLanzamientos = function () {
    lanzamientos = lanzamientos - 1;
    cambiarTexto("lblLanzamientos", lanzamientos);

    if (lanzamientos === 0 && puntos < 20) {
        cambiarTexto("lblPerder", " Game Over");
        cambiarTexto("lblGanar", " ");
    } else {
        cambiarTexto("lblPerder", " ");
    }
}


// colocar puntaje en 0 y el lanzamiento en 5
    //en las variable y en pantalla

limpiar = function () {
    puntos = 0;
    lanzamientos = 5;

    cambiarTexto("lblPuntos", puntos);
    cambiarTexto("lblLanzamientos", lanzamientos);
    cambiarImagen("imgDado", "");
    cambiarTexto("lblGanar", " ");
    cambiarTexto("lblPerder", " ");
}
//funcion mostrar cara, recibe el numero que quiere mostrar
//muestra la imagen correspondiente al numero que recibe
//no retorna nada
mostrarCara = function (numero) {
    cambiarImagen("imgDado", "dados" + numero + ".png");
}

lanzarDado = function () {
    let aleatorio = Math.random();
    let aleatorioMultiplicado = aleatorio * 6;
    let aleatorioEntero = parseInt(aleatorioMultiplicado);
    let valorDado = aleatorioEntero + 1;
    return valorDado;
}

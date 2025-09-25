ejecutarPrueba1 = function () {
    let mensaje;
    mensaje = recuperarTexto("txtCadena");
    recorerCadena(mensaje);
    mostrarTexto("lblResultado", mensaje);


}

ejecutarPrueba2 = function () {
    let mensaje;
    let resultado;
    mensaje = recuperarTexto("txtCadena");
    resultado = invertirCadena(mensaje);
    mostrarTexto("lblResultado", resultado);

}

recorerCadena = function (cadena) {
    //0123456
    //juanito
    let caracter;

    for (let posicion = 0; posicion < cadena.length; posicion++) {
        caracter = cadena.charAt(posicion);
        console.log("Caracter  " + caracter + " posicion " + posicion);
    }

/*
    for (let posicion = 0; posicion <= cadena.length - 1; posicion++) {
        caracter = cadena.charAt(posicion);
        console.log("CARACTER  " +  caracter  + " posicion " +  posicion );
    }
*/}

invertirCadena = function (cadena) {
    let cadenaInvertida = "";
    for (let i = cadena.length - 1; i >= 0; i--) {
        cadenaInvertida += cadena.charAt(i);
    }
    return cadenaInvertida;
}

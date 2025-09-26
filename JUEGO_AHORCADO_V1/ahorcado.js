//No se olvide de respirar, mantenga la calma y demuestre lo que sabe
esMayuscula = function (caracter) {
    if (caracter.length == 0) {
        return false;

    }
    let ascii = caracter.charCodeAt(0);
    return ascii >= 65 && ascii <= 90;
}

guardarPalabra = function () {
    let palabraSecreta = ' ';
    let mayuscula = 0;
    palabraSecreta = recuperarTexto("txtSecreta");
    if (palabraSecreta.length != 5) {
        alert("La palabra debe tener 5 caracteres");
        return;

    }
    for (let i = 0; i < palabraSecreta.length; i++) {
        let caracter = palabraSecreta.charAt(i);
        if (!esMayuscula(caracter)) {
            mayuscula += 1;
        }

    }
    if (mayuscula > 0) {
        alert("los caracteres deben se MAYUSCULAS");

    } else {
        alert("palabra guardada correctamente");
    }
    mayuscula = 0;
}
mostrarLetra = function (letra, posicion) {
    let cmpDiv = "div" + posicion;
    mostrarTexto(cmpDiv, letra);

}
validar = function () {
    let letrasEncontradas = 0;
    let intentos = 0;
    let coincidencias = 0;
    let errores = 0;
    letrasEncontradas = false;
    let caracter;
    for (let i = 0; i < palabraSecreta.length; i++) {
        caracter = palabraSecreta.charAt(i);
        if (letra == caracter) {
            mostrarLetra(letra, i);
            letrasEncontradas += 1;
            coincidencias += 1;
            letrasEncontradas = true;

        }

    }
    if (!letrasEncontradas) {
        alert("la letra no es parrte de la palabra");
        errores += 1;
        mostrarAhorcado();

    }
    intentos += 1;
}
ingresarLetra = function () {
    let letra;
    letra = recuperarTexto("txtLetra");
    if (letra.length != 1) {
        alert("debe ingresar una sola letra");
        return;

    }
    if (esMayuscula(letra)) {
        validar(letra);
        if (coincidencias == palabraSecreta.length) {
            mostrarImagen("ahorcadoImagen", "ganador.gif");

        }
        if (intentos == 10) {
            mostrarImagen("ahorcadoImagen", "gameOver.gif");
        }
    } else {
        alert("solo se aceptam MAYUSCULAS");
    }

}

mostrarAhorcado = function () {
    if (errore == 1)
    mostrarImagen("ahorcadoImagen", "Ahorcado_01.pn");
    
    mostrarImagen("ahorcadoImagen", "Ahorcado_01.pn");

    mostrarImagen("ahorcadoImagen", "Ahorcado_02.pn");

    mostrarImagen("ahorcadoImagen", "Ahorcado_03.pn");

    mostrarImagen("ahorcadoImagen", "Ahorcado_04.pn");

    mostrarImagen("ahorcadoImagen", "Ahorcado_05.pn");

    mostrarImagen("ahorcadoImagen", "Ahorcado_06.pn");

    mostrarImagen("ahorcadoImagen", "Ahorcado_07.pn");

    mostrarImagen("ahorcadoImagen", "Ahorcado_08.pn");

    mostrarImagen("ahorcadoImagen", "Ahorcado_09.pn");


}

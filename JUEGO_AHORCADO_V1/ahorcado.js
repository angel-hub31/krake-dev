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
// PASO 0
esMayuscula = function (caracter) {
    if (caracter.length === 0) {
        return false;
    }
    let ascii = caracter.charCodeAt(0);
    return ascii >= 65 && ascii <= 90;
}

// PASO 1
let palabraSecreta = '';
let mayuscula = 0;

guardarPalabra = function () {
    palabraSecreta = recuperarTexto('txtSecreta');
    if (palabraSecreta.length != 5) {
        alert('La palabra debe tener 5 caracteres');
        return;
    }
    for (let i = 0; i < palabraSecreta.length; i++) {
        let caracter = palabraSecreta.charAt(i);
        if (!esMayuscula(caracter)) {
            mayuscula += 1;
        }
    }
    if (mayuscula > 0) {
        alert('Los caracteres deben ser MAYÚSCULAS');
    } else {
        alert('Palabra guardada correctamente');
    }
    mayuscula = 0;
}

// PASO 2
mostrarLetra = function (letra, posicion) {
    let cmpDiv = 'div' + posicion;
    mostrarTexto(cmpDiv, letra);
}

// PASO 3
let letrasEncontradas = 0;
let intentos = 0;
let coincidencias = 0;
let errores = 0;

validar = function (letra) {
    let letraEncontrada = false;
    for (let i = 0; i < palabraSecreta.length; i++) {
        let caracter = palabraSecreta.charAt(i);
        if (letra == caracter) {
            mostrarLetra(letra, i);
            letrasEncontradas += 1;
            coincidencias += 1;
            letraEncontrada = true;
        }
    }
    if (!letraEncontrada) {
        alert('La letra no es parte de la palabra');
        errores += 1;
        mostrarAhorcado();
    }
    intentos += 1;
}

ingresarLetra = function () {
    let letra = recuperarTexto('txtLetra');
    if (letra.length != 1) {
        alert('Debe ingresar una sola letra');
        return;
    }
    if (esMayuscula(letra)) {
        validar(letra);
        if (coincidencias == palabraSecreta.length) {
            mostrarImagen('ahorcadoImagen', 'ganador.gif');
        }
        if (intentos == 10) {
            mostrarImagen('ahorcadoImagen', 'gameOver.gif');
        }
    } else {
        alert('Solo se aceptan MAYÚSCULAS');
    }
}

mostrarAhorcado = function () {
    if (errores == 1) mostrarImagen('ahorcadoImagen', 'Ahorcado_01.png');
    if (errores == 2) mostrarImagen('ahorcadoImagen', 'Ahorcado_02.png');
    if (errores == 3) mostrarImagen('ahorcadoImagen', 'Ahorcado_03.png');
    if (errores == 4) mostrarImagen('ahorcadoImagen', 'Ahorcado_04.png');
    if (errores == 5) mostrarImagen('ahorcadoImagen', 'Ahorcado_05.png');
    if (errores == 6) mostrarImagen('ahorcadoImagen', 'Ahorcado_06.png');
    if (errores == 7) mostrarImagen('ahorcadoImagen', 'Ahorcado_07.png');
    if (errores == 8) mostrarImagen('ahorcadoImagen', 'Ahorcado_08.png');
    if (errores == 9) mostrarImagen('ahorcadoImagen', 'Ahorcado_09.png');
}


reiniciarJuego = function () {
    palabraSecreta = '';
    letrasEncontradas = 0;
    intentos = 0;
    coincidencias = 0;
    errores = 0;
    mostrarTextoEnCaja("txtSecreta", "");
    mostrarTextoEnCaja("txtLetra", "");
    for (let i = 0; i < 5; i++) {
        mostrarTexto("div" + i, "");
    }
    mostrarImagen("ahorcadoImagen", "");
    alert("Juego reiniciado. Ingresa una nueva palabra secreta.");
}

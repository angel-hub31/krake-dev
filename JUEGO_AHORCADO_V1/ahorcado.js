// La primera parte del código (comentada aquí) es una versión duplicada y con errores de ámbito:

/*
//No se olvide de respirar, mantenga la calma y demuestre lo que sabe
esMayuscula = function (caracter) {
    if (caracter.length == 0) {
        return false;

    }
    let ascii = caracter.charCodeAt(0);
    return ascii >= 65 && ascii <= 90;
}

guardarPalabra = function () {
    // ESTA DECLARACIÓN HACE QUE palabraSecreta SEA LOCAL Y SE PIERDA FUERA DE LA FUNCIÓN
    let palabraSecreta = ' '; 
    let mayuscula = 0;
    palabraSecreta = recuperarTexto("txtSecreta");
    if (palabraSecreta.length != 5) {
        alert("La palabra debe tener 5 caracteres");
        return;

    }
    // ... (El resto de la lógica de guardarPalabra)
}
// ... (El resto de las funciones con problemas de ámbito)
*/

// ===================================================================================
// INICIO DE LA VERSIÓN REVISADA Y MEJOR ORGANIZADA DEL CÓDIGO
// ===================================================================================

// PASO 0
esMayuscula = function (caracter) {
    // Define la función para verificar si el carácter es mayúscula.
    if (caracter.length === 0) {
        // Si la cadena está vacía, no es mayúscula.
        return false;
    }
    let ascii = caracter.charCodeAt(0); // Obtiene el código ASCII del primer carácter.
    // Retorna true si el ASCII está en el rango de A (65) a Z (90).
    return ascii >= 65 && ascii <= 90;
}

// PASO 1
let palabraSecreta = ''; // Variable global para almacenar la palabra secreta.
let mayuscula = 0;       // Variable global temporal para contar caracteres no mayúsculas en 'guardarPalabra'.

guardarPalabra = function () {
    // Asigna el valor del campo 'txtSecreta' a la variable global 'palabraSecreta'.
    palabraSecreta = recuperarTexto('txtSecreta'); 
    if (palabraSecreta.length != 5) {
        // Valida que la palabra tenga 5 caracteres.
        alert('La palabra debe tener 5 caracteres');
        return;
    }
    for (let i = 0; i < palabraSecreta.length; i++) {
        let caracter = palabraSecreta.charAt(i);
        if (!esMayuscula(caracter)) {
            // Cuenta cuántos caracteres NO son mayúsculas.
            mayuscula += 1;
        }
    }
    if (mayuscula > 0) {
        // Si el contador es mayor a 0, hubo minúsculas.
        alert('Los caracteres deben ser MAYÚSCULAS');
    } else {
        alert('Palabra guardada correctamente');
    }
    mayuscula = 0; // Reinicia el contador para futuros usos.
}

// PASO 2
mostrarLetra = function (letra, posicion) {
    // Muestra la letra revelada en el DIV correcto.
    let cmpDiv = 'div' + posicion; // Crea el ID del DIV (ej: 'div0', 'div1').
    mostrarTexto(cmpDiv, letra);   // Llama a la función de interfaz para mostrar la letra.
}

// PASO 3
// Variables globales de estado del juego:
let letrasEncontradas = 0; // Contador de aciertos totales (redundante con coincidencias).
let intentos = 0;          // Contador de letras ingresadas (aciertos + fallos).
let coincidencias = 0;     // Contador de aciertos totales.
let errores = 0;           // Contador de errores (fallos).

validar = function (letra) {
    // Valida si la letra ingresada existe en la palabra secreta.
    let letraEncontrada = false; // Flag local para saber si esta letra ha coincidido alguna vez.
    for (let i = 0; i < palabraSecreta.length; i++) {
        let caracter = palabraSecreta.charAt(i);
        if (letra == caracter) {
            // Si la letra coincide con un caracter en la posición 'i':
            mostrarLetra(letra, i);
            letrasEncontradas += 1; // Incrementa el primer contador de aciertos.
            coincidencias += 1;     // Incrementa el segundo contador de aciertos.
            letraEncontrada = true; // Marca que se encontró la letra.
        }
    }
    if (!letraEncontrada) {
        // Si la letra no se encontró después de revisar toda la palabra:
        alert('La letra no es parte de la palabra');
        errores += 1;       // Incrementa el contador de errores.
        mostrarAhorcado();  // Actualiza la imagen del ahorcado.
    }
    intentos += 1; // Incrementa el contador total de intentos (siempre se ejecuta).
}

ingresarLetra = function () {
    let letra = recuperarTexto('txtLetra'); // Obtiene la letra del input.
    if (letra.length != 1) {
        // Valida que solo sea un carácter.
        alert('Debe ingresar una sola letra');
        return;
    }
    if (esMayuscula(letra)) {
        // Si es mayúscula, continúa con la validación:
        validar(letra); // Llama a 'validar' con la letra.
        if (coincidencias == palabraSecreta.length) {
            // Lógica de victoria: si los aciertos igualan la longitud de la palabra.
            mostrarImagen('ahorcadoImagen', 'ganador.gif');
        }
        if (intentos == 10) {
            // Lógica de derrota: si se alcanzan 10 intentos (límite establecido).
            mostrarImagen('ahorcadoImagen', 'gameOver.gif');
        }
    } else {
        // Si no es mayúscula:
        alert('Solo se aceptan MAYÚSCULAS');
    }
}

mostrarAhorcado = function () {
    // Muestra la imagen del ahorcado correspondiente al número actual de errores.
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
    // Función para reiniciar el estado del juego.
    palabraSecreta = '';      // Reinicia la palabra secreta.
    letrasEncontradas = 0;    // Reinicia contadores de estado.
    intentos = 0;
    coincidencias = 0;
    errores = 0;
    mostrarTextoEnCaja("txtSecreta", ""); // Limpia el input de la palabra secreta.
    mostrarTextoEnCaja("txtLetra", "");   // Limpia el input de la letra.
    for (let i = 0; i < 5; i++) {
        // Bucle para limpiar los DIVs donde se muestran las letras.
        mostrarTexto("div" + i, "");
    }
    mostrarImagen("ahorcadoImagen", ""); // Borra la imagen del ahorcado/resultado.
    alert("Juego reiniciado. Ingresa una nueva palabra secreta."); // Notifica al usuario.
}
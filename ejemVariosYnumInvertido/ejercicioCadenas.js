// ===============================================
// FUNCIÓN DE PRUEBA 1: RECORRER CADENA
// ===============================================
ejecutarPrueba1 = function () {
    let mensaje;
    mensaje = recuperarTexto("txtCadena");    // 1. Recupera la cadena de texto ingresada por el usuario desde el componente 'txtCadena'.
    recorerCadena(mensaje);    // 2. Llama a la función 'recorerCadena' para iterar sobre los caracteres y mostrarlos en la consola.
    mostrarTexto("lblResultado", mensaje);    // 3. Muestra el mensaje original (sin modificar) en el componente 'lblResultado'.
}
// ===============================================
// FUNCIÓN DE PRUEBA 2: INVERTIR CADENA
// ===============================================
ejecutarPrueba2 = function () {
    let mensaje;
    let resultado; 
    mensaje = recuperarTexto("txtCadena");    // 1. Recupera la cadena de texto ingresada por el usuario desde el componente 'txtCadena'.
    resultado = invertirCadena(mensaje);    // 2. Llama a la función 'invertirCadena', que devuelve la cadena invertida.
    mostrarTexto("lblResultado", resultado);    // 3. Muestra la cadena invertida en el componente 'lblResultado'.
}
// ===============================================
// FUNCIÓN AUXILIAR: RECORRER CADENA E IMPRIMIR CARACTERES
// ===============================================
recorerCadena = function (cadena) {
    // Ejemplo de indexación: juanito
    // Posiciones: 0123456
    let caracter;
    // 1. Bucle 'for' para iterar desde el índice 0 hasta un índice antes de la longitud total.
    //    Esto asegura que se recorran todos los caracteres (índices 0 hasta length - 1).
    for (let posicion = 0; posicion < cadena.length; posicion++) {
        caracter = cadena.charAt(posicion);        // 2. Obtiene el carácter en la posición actual.
        console.log("Caracter  " + caracter + " posicion " + posicion);        // 3. Imprime el carácter y su posición en la consola.
    }
/*
    // Este bloque de código comentado muestra una forma alternativa de escribir la condición del bucle:
    for (let posicion = 0; posicion <= cadena.length - 1; posicion++) {
        caracter = cadena.charAt(posicion);
        console.log("CARACTER  " +  caracter  + " posicion " +  posicion );
    }
*/
}
// ===============================================
// FUNCIÓN AUXILIAR: INVERTIR CADENA
// ===============================================
invertirCadena = function (cadena) {
    let cadenaInvertida = "";    // 1. Inicializa una cadena vacía para construir el resultado invertido.    
    // 2. Bucle 'for' para iterar la cadena AL REVÉS.
    //    - Inicializa 'i' en la última posición (cadena.length - 1).
    //    - Continúa mientras 'i' sea mayor o igual a 0.
    //    - Decrementa 'i' en cada paso.
    for (let i = cadena.length - 1; i >= 0; i--) {
        // 3. Obtiene el carácter en la posición actual (de atrás hacia adelante).
        // 4. Concatena ese carácter al final de 'cadenaInvertida'.
        cadenaInvertida += cadena.charAt(i);
    }
    // 5. Devuelve la cadena que ahora está invertida.
    return cadenaInvertida;
}
// ===============================================
// FUNCIÓN AUXILIAR: BUSCAR LETRA
// ===============================================
buscarLetra = function (cadena, letra) {
    let letraIterada;
    let existeLetra = false;    // 1. Bandera para rastrear si se ha encontrado la letra.
    for (let i = 0; i < cadena.length; i++) {    // 2. Itera sobre toda la cadena.
        letraIterada = cadena.charAt(i);        // 3. Obtiene el carácter actual.
        if (letraIterada == letra) {        // 4. Comprueba si el carácter actual es igual a la 'letra' que se busca.
            existeLetra = true;            // 5. Si coincide, activa la bandera.
            // NOTA: Para optimizar, se podría usar 'break' aquí para salir del bucle.
        }
    }
    if (existeLetra == true) {    // 6. Devuelve el resultado basado en el valor final de la bandera 'existeLetra'.
        return true;
    } else {
        return false;
    }
}
// ===============================================
// FUNCIÓN AUXILIAR: CONTAR LETRAS MAYÚSCULAS
// ===============================================
contarLetrasMayusculas = function () {
    // NOTA: Esta función asume que la variable 'cadena' está definida globalmente o es accesible,
    // ya que no la recibe como parámetro. (Problema potencial si no existe).
    let letra;
    let contadorMayusculas = 0;
    for (let i = 0; i < cadena.length; i++) {    // 1. Itera sobre cada carácter de la cadena.
        letra = cadena.charAt(i);        // 2. Obtiene el carácter actual.
        if (esMayuscula(letra)) {        // 3. Llama a una función externa 'esMayuscula' para verificar si el carácter es mayúscula.
            contadorMayusculas = contadorMayusculas + 1;            // 4. Si es mayúscula, incrementa el contador.
        }
    }
    console.log(contadorMayusculas);    // 5. Imprime el recuento total de mayúsculas en la consola.
}
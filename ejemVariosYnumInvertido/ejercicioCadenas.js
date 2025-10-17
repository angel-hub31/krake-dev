// ===============================================
// FUNCIÓN DE PRUEBA 1: RECORRER CADENA
// ===============================================
ejecutarPrueba1 = function () {
    let mensaje;
    
    // 1. Recupera la cadena de texto ingresada por el usuario desde el componente 'txtCadena'.
    mensaje = recuperarTexto("txtCadena");
    
    // 2. Llama a la función 'recorerCadena' para iterar sobre los caracteres y mostrarlos en la consola.
    recorerCadena(mensaje);
    
    // 3. Muestra el mensaje original (sin modificar) en el componente 'lblResultado'.
    mostrarTexto("lblResultado", mensaje);
}

// ===============================================
// FUNCIÓN DE PRUEBA 2: INVERTIR CADENA
// ===============================================
ejecutarPrueba2 = function () {
    let mensaje;
    let resultado;
    
    // 1. Recupera la cadena de texto ingresada por el usuario desde el componente 'txtCadena'.
    mensaje = recuperarTexto("txtCadena");
    
    // 2. Llama a la función 'invertirCadena', que devuelve la cadena invertida.
    resultado = invertirCadena(mensaje);
    
    // 3. Muestra la cadena invertida en el componente 'lblResultado'.
    mostrarTexto("lblResultado", resultado);
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
        // 2. Obtiene el carácter en la posición actual.
        caracter = cadena.charAt(posicion);
        // 3. Imprime el carácter y su posición en la consola.
        console.log("Caracter  " + caracter + " posicion " + posicion);
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
    // 1. Inicializa una cadena vacía para construir el resultado invertido.
    let cadenaInvertida = "";
    
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
    // 1. Bandera para rastrear si se ha encontrado la letra.
    let existeLetra = false;
    
    // 2. Itera sobre toda la cadena.
    for (let i = 0; i < cadena.length; i++) {
        // 3. Obtiene el carácter actual.
        letraIterada = cadena.charAt(i);
        // 4. Comprueba si el carácter actual es igual a la 'letra' que se busca.
        if (letraIterada == letra) {
            // 5. Si coincide, activa la bandera.
            existeLetra = true;
            // NOTA: Para optimizar, se podría usar 'break' aquí para salir del bucle.
        }
    }
    
    // 6. Devuelve el resultado basado en el valor final de la bandera 'existeLetra'.
    if (existeLetra == true) {
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
    
    // 1. Itera sobre cada carácter de la cadena.
    for (let i = 0; i < cadena.length; i++) {
        // 2. Obtiene el carácter actual.
        letra = cadena.charAt(i);
        
        // 3. Llama a una función externa 'esMayuscula' para verificar si el carácter es mayúscula.
        if (esMayuscula(letra)) {
            // 4. Si es mayúscula, incrementa el contador.
            contadorMayusculas = contadorMayusculas + 1;
        }
    }
    // 5. Imprime el recuento total de mayúsculas en la consola.
    console.log(contadorMayusculas);
}
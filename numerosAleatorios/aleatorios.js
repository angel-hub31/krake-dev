// ===============================================
// FUNCIÓN AUXILIAR: GENERAR NÚMERO ALEATORIO
// ===============================================
numeroAleatorio = function () {
    // 1. Math.random() genera un número decimal pseudo-aleatorio entre 0 (inclusive) y 1 (exclusive).
    // 2. Multiplicamos por 100 para obtener un rango de 0 a 99.99...
    // 3. Math.floor() redondea hacia abajo al entero más cercano (ej: convierte 99.99 a 99).
    //    El resultado está entre 0 y 99.
    // 4. Sumamos 1 para desplazar el rango, obteniendo un número entero entre 1 y 100 (ambos inclusive).
    return Math.floor(Math.random() * 100) + 1;
}

// ===============================================
// FUNCIÓN PRINCIPAL: GENERAR ARREGLO DE ALEATORIOS
// ===============================================
generarAleatorios = function () {
    let aleatorios = []; // 1. Inicializa un arreglo (lista) vacío para guardar los números generados.
    
    // 2. Recupera el texto del input con id "txtCantidad" y lo convierte a entero ('parseInt').
    let cantidad = parseInt(recuperarTexto("txtCantidad"));
    
    // 3. Validación de la entrada 'cantidad'.
    //    Verifica si: a) No es un número válido (isNaN) O b) Está fuera del rango [5, 20].
    if (isNaN(cantidad) || cantidad < 5 || cantidad > 20) {
        // 3a. Si falla la validación, muestra un mensaje de error al usuario.
        alert("Ingrese un numero valido entre 5 y 20");
        // 3b. Detiene la ejecución de la función.
        return;
    }
    
    // 4. Bucle 'for' para generar la cantidad de números solicitada.
    //    El bucle se repite desde i = 0 hasta i < cantidad.
    for (let i = 0; i < cantidad; i++) {
        // 4a. Muestra el índice actual en la consola (para seguimiento o depuración).
        console.log("Indice:", i); 
        
        // 4b. Llama a la función auxiliar para obtener un número aleatorio entre 1 y 100.
        let num = numeroAleatorio(); 
        
        // 4c. Agrega el número generado al final del arreglo 'aleatorios'.
        aleatorios.push(num);
    }
    
    // 5. Llama a la función para mostrar el arreglo generado en la interfaz de usuario.
    mostrarResultados(aleatorios);
}


// ===============================================
// FUNCIÓN AUXILIAR: MOSTRAR RESULTADOS EN TABLA HTML
// ===============================================
mostrarResultados = function (arregloNumeros) {
    // 1. Obtiene la referencia al elemento HTML (generalmente un div o span) donde se mostrará la tabla.
    let cmpTabla = document.getElementById("lblResultado"); 
    
    // 2. Inicializa la cadena HTML para la tabla, incluyendo la fila de encabezados.
    let tabla = "<table><tr><th>Indice</th><th>Numero</th></tr>";
    
    // 3. Itera sobre cada elemento del arreglo pasado como argumento.
    for (let i = 0; i < arregloNumeros.length; i++) {
        // 4. Concatena una nueva fila (<tr>) a la tabla en cada iteración:
        //    4a. Columna 1 (<td>): Muestra el índice actual (i).
        //    4b. Columna 2 (<td>): Muestra el número almacenado en esa posición del arreglo (arregloNumeros[i]).
        tabla += "<tr><td>" + i + "</td><td>" + arregloNumeros[i] + "</td></tr>";
    }
    
    // 5. Cierra la etiqueta de la tabla.
    tabla += "</table>";
    
    // 6. Inserta la cadena HTML completa dentro del elemento 'lblResultado', renderizando la tabla en la página.
    cmpTabla.innerHTML = tabla;
}




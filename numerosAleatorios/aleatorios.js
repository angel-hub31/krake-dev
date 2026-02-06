
numeroAleatorio = function () {
    return Math.floor(Math.random() * 100) + 1;
}
// ===============================================
// FUNCIÓN PRINCIPAL: GENERAR ARREGLO DE ALEATORIOS
// ===============================================
generarAleatorios = function () {
    let aleatorios = []; // 1. Inicializa un arreglo (lista) vacío para guardar los números generados.
    let cantidad = parseInt(recuperarTexto("txtCantidad"));    // 2. Recupera el texto del input con id "txtCantidad" y lo convierte a entero ('parseInt').
    if (isNaN(cantidad) || cantidad < 5 || cantidad > 20) {        //    Verifica si: a) No es un número válido (isNaN) O b) Está fuera del rango [5, 20].
        alert("Ingrese un numero valido entre 5 y 20");        // 3a. Si falla la validación, muestra un mensaje de error al usuario.
        return;        // 3b. Detiene la ejecución de la función.
    }
    for (let i = 0; i < cantidad; i++) {    //    El bucle se repite desde i = 0 hasta i < cantidad.
        console.log("Indice:", i);         // 4a. Muestra el índice actual en la consola (para seguimiento o depuración).
        let num = numeroAleatorio();         // 4b. Llama a la función auxiliar para obtener un número aleatorio entre 1 y 100.
        aleatorios.push(num);        // 4c. Agrega el número generado al final del arreglo 'aleatorios'.
    }
    mostrarResultados(aleatorios);    // 5. Llama a la función para mostrar el arreglo generado en la interfaz de usuario.
}
// ===============================================
// FUNCIÓN AUXILIAR: MOSTRAR RESULTADOS EN TABLA HTML
// ===============================================
mostrarResultados = function (arregloNumeros) {
    let cmpTabla = document.getElementById("lblResultado");     // 1. Obtiene la referencia al elemento HTML (generalmente un div o span) donde se mostrará la tabla.
    let tabla = "<table><tr><th>Indice</th><th>Numero</th></tr>";    // 2. Inicializa la cadena HTML para la tabla, incluyendo la fila de encabezados.
    // 3. Itera sobre cada elemento del arreglo pasado como argumento.
    for (let i = 0; i < arregloNumeros.length; i++) {
        // 4. Concatena una nueva fila (<tr>) a la tabla en cada iteración:
        //    4a. Columna 1 (<td>): Muestra el índice actual (i).
        //    4b. Columna 2 (<td>): Muestra el número almacenado en esa posición del arreglo (arregloNumeros[i]).
        tabla += "<tr><td>" + i + "</td><td>" + arregloNumeros[i] + "</td></tr>";
    }
    tabla += "</table>";    // 5. Cierra la etiqueta de la tabla.
    cmpTabla.innerHTML = tabla;    // 6. Inserta la cadena HTML completa dentro del elemento 'lblResultado', renderizando la tabla en la página.
}




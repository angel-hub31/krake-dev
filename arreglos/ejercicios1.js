// ===============================================
// VARIABLE GLOBAL
// ===============================================
let notas = []; // 1. Inicializa un arreglo (lista) vacío para almacenar las notas.

// ===============================================
// FUNCIÓN PARA AGREGAR ELEMENTOS DE PRUEBA
// ===============================================
agreagarlementos = function () {
    // 1. Agrega el número 5 al final del arreglo 'notas'.
    notas.push(5);
    // 2. Agrega el número 10 al final del arreglo 'notas'.
    notas.push(10);
    // 3. Imprime la longitud actual del arreglo en la consola (en este punto será 2).
    console.log(notas.length);
}

// ===============================================
// FUNCIÓN PARA RECORRER EL ARREGLO
// ===============================================
recorrerArreglo = function () {
    let notaR;
    // 1. Inicia un bucle 'for' que va desde el índice 0 hasta el último índice del arreglo.
    for (let indice = 0; indice < notas.length; indice++) {
        // 2. Accede al elemento (nota) en la posición actual del índice.
        notaR = notas[indice];
        // 3. Imprime el valor de la nota recuperada en la consola.
        console.log(notaR);
    }
}

// ===============================================
// FUNCIÓN PARA INVOCAR LA RECUPERACIÓN Y AGREGACIÓN DE NOTAS
// ===============================================
probarAgregar = function () {
    let notaRecuperada;
    // 1. Recupera el valor del componente con id "txtNotas" y lo convierte a entero ('recuperarInt').
    notaRecuperada = recuperarInt("txtNotas");
    // 2. Llama a la función 'agregarNota', pasando el valor recuperado.
    agregarNota(notaRecuperada);
}

// ===============================================
// FUNCIÓN PARA AGREGAR UNA NOTA Y ACTUALIZAR LA VISTA
// ===============================================
agregarNota = function (nota) {
    // 1. Agrega la 'nota' recibida como parámetro al final del arreglo 'notas'.
    notas.push(nota);
    // 2. Llama a 'mostrarNotas' para refrescar la tabla en la interfaz de usuario con la nueva nota.
    mostrarNotas();
}

// ===============================================
// FUNCIÓN PARA CALCULAR EL PROMEDIO DEL ARREGLO
// ===============================================
calcularPromedio = function () {
    let sumaNotas = 0;
    let promedio = 0;

    // 1. Itera sobre todos los elementos del arreglo 'notas'.
    for (let i = 0; i < notas.length; i++) {
        // 2. Acumula el valor de cada nota en la variable 'sumaNotas'.
        sumaNotas = sumaNotas + notas[i];
    }

    // 3. Verifica que haya al menos una nota en el arreglo para evitar división por cero.
    if (notas.length > 0) {
        // 4. Calcula el promedio dividiendo la suma total por la cantidad de notas.
        promedio = sumaNotas / notas.length;
    }

    // 5. Retorna el valor del promedio (será 0 si no hay notas).
    return promedio;
}

// ===============================================
// FUNCIÓN PARA EJECUTAR EL CÁLCULO Y MOSTRAR EL PROMEDIO
// ===============================================
ejecutarPromedio = function () {
    // 1. Llama a 'calcularPromedio' para obtener el resultado.
    let resultado = calcularPromedio();
    // 2. Muestra el texto del promedio en el componente 'lblPromedio'.
    mostrarTexto("lblPromedio", "Promedio: " + resultado);
}

// ===============================================
// FUNCIÓN DE PRUEBA DE GENERACIÓN DE TABLA (Funcionalidad fija, no usa las notas)
// ===============================================
generarTabla = function () {
    let contenidoTabla = " ";
    // 1. Obtiene la referencia al elemento HTML con id "divTabla".
    let cmpTabla = document.getElementById("divTabla");
    // 2. Construye una cadena HTML para una tabla fija de 2 filas y 1 columna.
    contenidoTabla += "<table><tr><td>UNO</td></tr>" + "<tr><td>DOS</td></tr></table>";
    // 3. Inserta la tabla fija en el elemento "divTabla".
    cmpTabla.innerHTML = contenidoTabla;
}

// ===============================================
// FUNCIÓN PARA MOSTRAR LAS NOTAS EN UNA TABLA DINÁMICA
// ===============================================
mostrarNotas = function () {
    // 1. Obtiene la referencia al elemento HTML con id "divTabla".
    let cmpTabla = document.getElementById("divTabla");
    // 2. Inicializa la cadena HTML con la estructura de la tabla y la fila de encabezado.
    let contenidoTabla = "<table><tr><th>NOTA</th></tr>";
    let miNota;
    
    // 3. Recorre todo el arreglo 'notas'.
    for (let i = 0; i < notas.length; i++) {
        // 4. Recupera la nota actual.
        miNota = notas[i];
        
        // 5. Concatena el HTML para la fila y la celda, insertando el valor de la nota.
        contenidoTabla += "<tr><td>";
        contenidoTabla += miNota;
        contenidoTabla += "</td></tr>"; // Nota: La etiqueta </tr> debe ir antes del </td>
        // Corrigiendo la estructura HTML: <tr><td>VALOR</td></tr>
    }
    
    // 6. Cierra la etiqueta de la tabla.
    contenidoTabla += "</table>";
    // 7. Inserta la tabla HTML completa en el elemento "divTabla".
    cmpTabla.innerHTML = contenidoTabla;
}







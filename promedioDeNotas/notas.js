// ===============================================
// FUNCIÓN BÁSICA DE CÁLCULO (Lógica pura)
// ===============================================
calcularPromedio = function (nota1, nota2, nota3) {
    let promedio;
    promedio = (nota1 + nota2 + nota3) / 3;    // 1. Calcula el promedio sumando las tres notas y dividiendo por 3.
    return promedio;    // 2. Retorna el valor calculado del promedio.
}
// ===============================================
// FUNCIÓN DE CÁLCULO VERSIÓN 1: Validación Anidada (Flujo de control rígido)
// ===============================================
calcular1 = function () {
    let nota1;
    let nota2;
    let nota3;
    let resultado;
    let resultadoFormato;
    nota1 = recuperarFloat("txtNota1");    // 1. Recupera la Nota 1 (asumiendo que 'recuperarFloat' obtiene y convierte el valor del input 'txtNota1').
    if (isNaN(nota1)) {
        alert("ERROR");        // 2a. Si la Nota 1 NO es un número, muestra una alerta genérica.
    } else {
        nota2 = recuperarFloat("txtNota2");        // 3. Si Nota 1 es válida, recupera la Nota 2.
        if (isNaN(nota2)) {        // 4. Comienza la validación de la Nota 2 (ANIDADA dentro de la validación de Nota 1).
            alert("ERROR");            // 4a. Si la Nota 2 NO es un número, muestra una alerta y detiene la ejecución del bloque.
        } else {
            nota3 = recuperarFloat("txtNota3");            // 5. Si Nota 2 es válida, recupera la Nota 3.
            if (isNaN(nota3)) {            // 6. Comienza la validación de la Nota 3.
                alert("ERROR");                // 6a. Si la Nota 3 NO es un número, muestra una alerta y detiene la ejecución.
            } else {
                resultado = calcularPromedio(nota1, nota2, nota3);                // 7a. Llama a la función 'calcularPromedio'.
                resultadoFormato = resultado.toFixed(2);                // 7b. Formatea el resultado a dos decimales.
                mostrarTexto("lblResultado", resultadoFormato);                // 7c. Muestra el resultado formateado en el componente 'lblResultado'.

            }
        }
    }

}
// ===============================================
// FUNCIÓN DE CÁLCULO VERSIÓN 2: Validación Secuencial con Bandera (Mejora en visibilidad de errores)
// ===============================================
calcular2 = function () {
    let nota1;
    let nota2;
    let nota3;
    let resultado;
    let resultadoFormato;
    let existeError = false;     // 1. Bandera (flag) para registrar si se detecta CUALQUIER error en las notas.
    nota1 = recuperarFloat("txtNota1");    // 2. Proceso de validación para NOTA 1:

    if (isNaN(nota1)) {
        mostrarTexto("lblError1", "DEBE INGRESAR UN NUMERO");        // 2a. Si es NaN, muestra error en 'lblError1' y activa la bandera.
        existeError = true;
    } else {
        mostrarTexto("lblError1", "")        // 2b. Si es válido, limpia el mensaje de error para esa nota.
    }
    nota2 = recuperarFloat("txtNota2",);    // 3. Proceso de validación para NOTA 2:
    if (isNaN(nota2)) {
        mostrarTexto("lblError2", "DEBE INGRESAR UN NUMERO");        // 3a. Si es NaN, muestra error en 'lblError2' y activa la bandera.
        existeError = true;
    } else {
        mostrarTexto("lblError2", "")        // 3b. Si es válido, limpia el mensaje de error para esa nota.
    }
    nota3 = recuperarFloat("txtNota3");    // 4. Proceso de validación para NOTA 3:
    if (isNaN(nota3)) {
        mostrarTexto("lblError3", "DEBE INGRESAR UN NUMERO");        // 4a. Si es NaN, muestra error en 'lblError3' y activa la bandera.
        existeError = true;
    } else {
        mostrarTexto("lblError3", "")        // 4b. Si es válido, limpia el mensaje de error para esa nota.
    }
    if (existeError == false) {    // 5. Verifica el estado final de la bandera de errores.
        resultado = calcularPromedio(nota1, nota2, nota3);        // 5a. Si la bandera es FALSE (ninguna nota fue NaN), procede al cálculo y muestra el resultado.
        resultadoFormato = resultado.toFixed(2);
        mostrarTexto("lblResultado", resultadoFormato);
    }
}
// ===============================================
// FUNCIÓN AUXILIAR DE VALIDACIÓN (Refactorización)
// ===============================================
esNotaValida = function (nota, idComponenteError) {
    let hayErrores = false;
    if (isNaN(nota)) {    // 1. Validación de TIPO: Verifica si NO es un número (NaN).
        mostrarTexto(idComponenteError, "DEBE INGRESAR UN NUMERO");
        hayErrores = true;
    }
    if (nota < 0 || nota > 10) {    // 2. Validación de RANGO: Verifica si está fuera del rango permitido (0 a 10).
        mostrarTexto(idComponenteError, "El NUMERO DEBE ESTAR ENTRE 0 Y 10");
        hayErrores = true;
    }
    if (hayErrores == false) {    // 3. Limpieza de error: Si NINGUNO de los IF anteriores activó 'hayErrores'.
        mostrarTexto(idComponenteError, " ");
    }
    return !hayErrores;// ! ese signo es la negacion    // 4. Retorna el estado: Devuelve TRUE si la nota es válida, FALSE si hubo errores.
}
// ===============================================
// FUNCIÓN DE CÁLCULO VERSIÓN 3: Validación Refactorizada (Óptima)
// ===============================================
calcular = function () {
    let nota1;
    let nota2;
    let nota3;
    let resultado;
    let resultadoFormato;
    let existeError = false; // Variable no utilizada en este flujo, se podría omitir.
    // 1. Recupera las tres notas.
    nota1 = recuperarFloat("txtNota1");
    nota2 = recuperarFloat("txtNota2",);
    nota3 = recuperarFloat("txtNota3");
    // El operador '&' (AND a nivel de bits en JS) asegura que las TRES llamadas a 'esNotaValida' se ejecuten,
    // incluso si la primera devuelve false, garantizando que todos los mensajes de error se muestren.
    if (esNotaValida(nota1, "lblError1") & esNotaValida(nota2, "lblError2") & esNotaValida(nota3, "lblError3")) {
        resultado = calcularPromedio(nota1, nota2, nota3);        // 3a. Si la expresión completa es TRUE (todas las notas son válidas), calcula el promedio y lo muestra.
        resultadoFormato = resultado.toFixed(2);
        mostrarTexto("lblResultado", resultadoFormato);
    } else {
        mostrarTexto("lblResultado", "0.0");        // 3b. Si la expresión es FALSE (una o más notas tienen errores), muestra "0.0" como resultado.
    }
}





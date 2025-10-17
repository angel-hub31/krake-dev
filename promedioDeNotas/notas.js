// ===============================================
// FUNCIÓN BÁSICA DE CÁLCULO (Lógica pura)
// ===============================================
calcularPromedio = function (nota1, nota2, nota3) {
    let promedio;
    // 1. Calcula el promedio sumando las tres notas y dividiendo por 3.
    promedio = (nota1 + nota2 + nota3) / 3;
    // 2. Retorna el valor calculado del promedio.
    return promedio;
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
    
    // 1. Recupera la Nota 1 (asumiendo que 'recuperarFloat' obtiene y convierte el valor del input 'txtNota1').
    nota1 = recuperarFloat("txtNota1");
    
    // 2. Comienza la validación de la Nota 1.
    if (isNaN(nota1)) {
        // 2a. Si la Nota 1 NO es un número, muestra una alerta genérica.
        //    IMPORTANTE: La ejecución se detiene aquí; no se valida ni se recupera Nota 2 o Nota 3.
        alert("ERROR");
    } else {
        // 3. Si Nota 1 es válida, recupera la Nota 2.
        nota2 = recuperarFloat("txtNota2");
        
        // 4. Comienza la validación de la Nota 2 (ANIDADA dentro de la validación de Nota 1).
        if (isNaN(nota2)) {
            // 4a. Si la Nota 2 NO es un número, muestra una alerta y detiene la ejecución del bloque.
            alert("ERROR");
        } else {
            
            // 5. Si Nota 2 es válida, recupera la Nota 3.
            nota3 = recuperarFloat("txtNota3");
            
            // 6. Comienza la validación de la Nota 3.
            if (isNaN(nota3)) {
                // 6a. Si la Nota 3 NO es un número, muestra una alerta y detiene la ejecución.
                alert("ERROR");
            } else {
                
                // 7. Si las 3 notas pasaron TODAS las validaciones anidadas:
                // 7a. Llama a la función 'calcularPromedio'.
                resultado = calcularPromedio(nota1, nota2, nota3);
                // 7b. Formatea el resultado a dos decimales.
                resultadoFormato = resultado.toFixed(2);
                // 7c. Muestra el resultado formateado en el componente 'lblResultado'.
                mostrarTexto("lblResultado", resultadoFormato);
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
    // 1. Bandera (flag) para registrar si se detecta CUALQUIER error en las notas.
    let existeError = false; 
    
    // 2. Proceso de validación para NOTA 1:
    nota1 = recuperarFloat("txtNota1");
    if (isNaN(nota1)) {
        // 2a. Si es NaN, muestra error en 'lblError1' y activa la bandera.
        mostrarTexto("lblError1", "DEBE INGRESAR UN NUMERO");
        existeError = true;
    } else {
        // 2b. Si es válido, limpia el mensaje de error para esa nota.
        mostrarTexto("lblError1", "")
    }

    // 3. Proceso de validación para NOTA 2:
    nota2 = recuperarFloat("txtNota2",);
    if (isNaN(nota2)) {
        // 3a. Si es NaN, muestra error en 'lblError2' y activa la bandera.
        mostrarTexto("lblError2", "DEBE INGRESAR UN NUMERO");
        existeError = true;
    } else {
        // 3b. Si es válido, limpia el mensaje de error para esa nota.
        mostrarTexto("lblError2", "")
    }

    // 4. Proceso de validación para NOTA 3:
    nota3 = recuperarFloat("txtNota3");
    if (isNaN(nota3)) {
        // 4a. Si es NaN, muestra error en 'lblError3' y activa la bandera.
        mostrarTexto("lblError3", "DEBE INGRESAR UN NUMERO");
        existeError = true;
    } else {
        // 4b. Si es válido, limpia el mensaje de error para esa nota.
        mostrarTexto("lblError3", "")
    }
    
    // 5. Verifica el estado final de la bandera de errores.
    if (existeError == false) {
        // 5a. Si la bandera es FALSE (ninguna nota fue NaN), procede al cálculo y muestra el resultado.
        resultado = calcularPromedio(nota1, nota2, nota3);
        resultadoFormato = resultado.toFixed(2);
        mostrarTexto("lblResultado", resultadoFormato);
    }
    // NOTA: Esta versión solo valida que sea un número (NaN), no el rango (ej. 0-10).

}


// ===============================================
// FUNCIÓN AUXILIAR DE VALIDACIÓN (Refactorización)
// ===============================================
esNotaValida = function (nota, idComponenteError) {
    let hayErrores = false;
    
    // 1. Validación de TIPO: Verifica si NO es un número (NaN).
    if (isNaN(nota)) {
        mostrarTexto(idComponenteError, "DEBE INGRESAR UN NUMERO");
        hayErrores = true;
    }
    
    // 2. Validación de RANGO: Verifica si está fuera del rango permitido (0 a 10).
    // NOTA: Si ya falló en el punto 1 (NaN), la bandera ya es 'true', y este IF puede mostrar un mensaje de rango.
    if (nota < 0 || nota > 10) {
        mostrarTexto(idComponenteError, "El NUMERO DEBE ESTAR ENTRE 0 Y 10");
        hayErrores = true;
    }
    
    // 3. Limpieza de error: Si NINGUNO de los IF anteriores activó 'hayErrores'.
    if(hayErrores==false){
        mostrarTexto(idComponenteError," ");
    }
    
    // 4. Retorna el estado: Devuelve TRUE si la nota es válida, FALSE si hubo errores.
    return !hayErrores;// ! ese signo es la negacion
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
    
    // 2. Ejecuta la validación de las 3 notas simultáneamente.
    // El operador '&' (AND a nivel de bits en JS) asegura que las TRES llamadas a 'esNotaValida' se ejecuten,
    // incluso si la primera devuelve false, garantizando que todos los mensajes de error se muestren.
    if (esNotaValida(nota1, "lblError1") & esNotaValida(nota2, "lblError2") & esNotaValida(nota3, "lblError3")) {
        // 3a. Si la expresión completa es TRUE (todas las notas son válidas), calcula el promedio y lo muestra.
        resultado = calcularPromedio(nota1, nota2, nota3);
        resultadoFormato = resultado.toFixed(2);
        mostrarTexto("lblResultado", resultadoFormato);
    } else {
        // 3b. Si la expresión es FALSE (una o más notas tienen errores), muestra "0.0" como resultado.
        mostrarTexto("lblResultado", "0.0");
    }
}





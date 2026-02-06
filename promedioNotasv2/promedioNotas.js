calcularPromedioNotas = function () {
    let nota1 = recuperarFlotante("txtNota1");    // 1. Recupera el valor del campo "txtNota1" y lo convierte a un número flotante.
    let nota2 = recuperarFlotante("txtNota2");    // 2. Recupera el valor del campo "txtNota2" y lo convierte a un número flotante.
    let nota3 = recuperarFlotante("txtNota3");    // 3. Recupera el valor del campo "txtNota3" y lo convierte a un número flotante.
    promedio = calcularPromedio(nota1, nota2, nota3);    // 4. Llama a la función auxiliar para calcular el promedio de las tres notas.
    resultadoFormateado = promedio.toFixed(2);    // 5. Formatea el promedio a una cadena con exactamente dos decimales.
    mostrarTexto("lblPromedio", resultadoFormateado);    // 6. Muestra el promedio formateado en la etiqueta con ID "lblPromedio".

    
    // 7. Inicia la lógica condicional para determinar el mensaje y la imagen (REPROBADO).
    // Condición: Si el promedio está entre 0 (no inclusivo) y 5 (no inclusivo).
    if (resultadoFormateado < 5 && resultadoFormateado > 0) {
        mostrarTexto("lblMensaje", "REPROBADO"); // Muestra el mensaje de reprobado.
        cambiarImagen("imgFoto", "mal.gif");     // Cambia la imagen a 'mal.gif'.
    } 
    // 8. Condición alternativa (BUEN TRABAJO).
    // Condición: Si el promedio es mayor o igual a 5 Y menor o igual a 8.
    else if (resultadoFormateado >= 5 && resultadoFormateado <= 8) {
        mostrarTexto("lblMensaje", "BUEN TRABAJO"); // Muestra el mensaje de buen trabajo.
        cambiarImagen("imgFoto", "bien.gif");       // Cambia la imagen a 'bien.gif'.
    } 
    // 9. Condición alternativa (EXCELENTE).
    // Condición: Si el promedio es mayor a 8 Y menor o igual a 10.
    else if (resultadoFormateado > 8 && resultadoFormateado <= 10) {
        mostrarTexto("lblMensaje", "excelente"); // Muestra el mensaje de excelente.
        cambiarImagen("imgFoto", "excelente.gif"); // Cambia la imagen a 'excelente.gif'.
    } 
    // 10. Condición alternativa (DATOS INCORRECTOS / ERROR).
    // Condición: Si el promedio es menor o igual a 0. (Asume que notas mayores a 10 no deberían ocurrir o se manejan implícitamente).
    else if (resultadoFormateado <= 0) {
        mostrarTexto("lblMensaje", "DATOS INCORRECTOS"); // Muestra el mensaje de datos incorrectos.
        cambiarImagen("imgFoto", "homero.gif");         // Cambia la imagen a 'homero.gif'.
    }
}
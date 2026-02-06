validarPlaca = function () {
    let placa = document.getElementById("idPlaca").value.trim();    // 1. Obtiene el valor del campo de texto con ID "idPlaca" y usa .trim() para quitar espacios al inicio/final.
    // 2. Llama a la función auxiliar para verificar el formato de la placa (LLL-NNNN o LLLNNNN).
    // Esta función retorna un mensaje de error (String) o null si la estructura es correcta.
    let erroresEstructura = validarEstructura(placa);
    let cmpValidacion = document.getElementById("lblValida");    // 3. Obtiene las referencias a los elementos (etiquetas/labels) de la interfaz donde se mostrarán los resultados.
    let cmpError = document.getElementById("lblErrores");
    let cmpProvincia = document.getElementById("lblProvincia");
    let cmpVehiculo = document.getElementById("lblVehiculo");
    let cmpPicoPlaca = document.getElementById("lblPicoPlaca");
    if (erroresEstructura == null) {    // 4. Inicia la lógica principal: Comprueba si la estructura de la placa es válida (erroresEstructura es null).
        cmpValidacion.innerText = "ESTRUCTURA VALIDA";        // 5. Muestra el mensaje de validación correcta.
        cmpError.innerText = "";        // 6. Limpia la etiqueta de errores.
        let provincia = obtenerProvincia(placa);        // 7. Llama a la función auxiliar para obtener la provincia basada en la primera letra.
        cmpProvincia.innerText = provincia ?? "PROVINCIA INCORRECTA";        // 8. Muestra la provincia. Usa el operador de anulación nula (??) para mostrar "PROVINCIA INCORRECTA" si 'provincia' es null/undefined.
        let vehiculo = obtenerTipoVehiculo(placa);        // 9. Llama a la función auxiliar para obtener el tipo de vehículo (particular, comercial, etc.).
        cmpVehiculo.innerText = vehiculo ?? "TIPO INCORRECTO";        // 10. Muestra el tipo de vehículo. Usa ?? para manejar casos de tipo desconocido.
        let picoPlaca = obtenerDiaPicoYPlaca(placa);        // 11. Llama a la función auxiliar para obtener el día de restricción Pico y Placa.
        cmpPicoPlaca.innerText = picoPlaca ?? "";        // 12. Muestra el día de restricción. Usa ?? para mostrar una cadena vacía si no hay día de restricción.
    } else {
        cmpValidacion.innerText = "ESTRUCTURA INVALIDA";        // 13. Muestra el mensaje de validación incorrecta.
        cmpError.innerText = erroresEstructura;        // 14. Muestra el mensaje de error retornado por validarEstructura.        
        cmpProvincia.innerText = "";        // 15. Limpia todas las etiquetas de información detallada, ya que la placa no es procesable.
        cmpVehiculo.innerText = "";
        cmpPicoPlaca.innerText = "";
    }
}
limpiarDatos = function () {
    // 16. Limpia el valor del campo de texto de la placa.
    document.getElementById("idPlaca").value = "";
    
    // 17. Limpia el contenido de todas las etiquetas de resultado.
    document.getElementById("lblValida").innerText = "";
    document.getElementById("lblErrores").innerText = "";
    document.getElementById("lblProvincia").innerText = "";
    document.getElementById("lblVehiculo").innerText = "";
    document.getElementById("lblPicoPlaca").innerText = "";
    // 18. Coloca el foco (cursor) en el campo de la placa para que el usuario pueda ingresar nuevos datos.
    document.getElementById("idPlaca").focus();
}
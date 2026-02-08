// utilitarios.js - Funciones de soporte al DOM
mostrarTextoEnCaja = function(idComponente, mensaje) {
    document.getElementById(idComponente).value = mensaje;
}

recuperarTexto = function(idComponente) {
    return document.getElementById(idComponente).value;
}

recuperarFloat = function(idComponente) {
    let valorCaja = recuperarTexto(idComponente);
    return parseFloat(valorCaja);
}

mostrarComponente = function(idComponente) {
    document.getElementById(idComponente).style.display = "block";
}

ocultarComponente = function(idComponente) {
    document.getElementById(idComponente).style.display = "none";
}

deshabilitarComponente = function(idComponente) {
    document.getElementById(idComponente).disabled = true;
}

habilitarComponente = function(idComponente) {
    document.getElementById(idComponente).disabled = false;
}

// Funciones para recuperar valores de un DIV (Parte 5)
recuperarTextoDiv = function(idComponente) {
    return document.getElementById(idComponente).textContent;
}

recuperarFloatDiv = function(idComponente) {
    let valor = recuperarTextoDiv(idComponente);
    return parseFloat(valor);
}

mostrarTextoEnDiv = function(idComponente, mensaje) {
    document.getElementById(idComponente).textContent = mensaje;
}
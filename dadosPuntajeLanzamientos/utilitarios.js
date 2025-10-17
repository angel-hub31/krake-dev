recuperarTexto = function (idComponente) {
    let cmpTexto = document.getElementById(idComponente);
    return cmpTexto.value;
}

recuperarEntero = function (idComponente) {
    return parseInt(recuperarTexto(idComponente));
}

recuperarFlotante = function (idComponente) {
    return parseFloat(recuperarTexto(idComponente));
}

cambiarTexto = function (idComponente, mensaje) {
    let componente = document.getElementById(idComponente);
    componente.innerHTML = mensaje; 
}

cambiarImagen = function (idComponente, imagen) {
    let componente = document.getElementById(idComponente);
    componente.src = imagen;
}

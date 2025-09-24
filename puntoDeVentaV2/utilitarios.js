
mostrarImagen = function(idComponente, rutaImagen) {
    let componente = document.getElementById(idComponente);
    if (componente) {
        componente.src = rutaImagen;
    }
}

mostrarTexto = function(idComponente, mensaje) {
    let componente = document.getElementById(idComponente);
    if (componente) {
        componente.textContent = mensaje;
    }
}

mostrarTextoEnCaja = function(idComponente, mensaje) {
    let componente = document.getElementById(idComponente);
    if (componente) {
        componente.value = mensaje;
    }
}

recuperarTexto = function(idComponente) {
    let componente = document.getElementById(idComponente);
    return componente ? componente.value : "";
}

recuperarInt = function(idComponente) {
    let valorCaja = recuperarTexto(idComponente);
    let valorEntero = parseInt(valorCaja);
    return isNaN(valorEntero) ? 0 : valorEntero;
}

recuperarFloat = function(idComponente) {
    let valorCaja = recuperarTexto(idComponente);
    let valorFlotante = parseFloat(valorCaja);
    return isNaN(valorFlotante) ? 0.0 : valorFlotante;
}

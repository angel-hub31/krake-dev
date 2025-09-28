
recuperarTexto = function (idComponente) {
    const componente = document.getElementById(idComponente);
    if (componente) {
        if ('value' in componente) {
            return componente.value;
        } 
        return componente.textContent || componente.innerText || '';
    }
    return '';
}

recuperarInt = function (idComponente) {
    let valorCaja = recuperarTexto(idComponente);
    return parseInt(valorCaja);
}

recuperarFloat = function (idComponente) {
    let valorCaja = recuperarTexto(idComponente);
    return parseFloat(valorCaja);
}

mostrarTexto = function (idComponente, mensaje) {
    const componente = document.getElementById(idComponente);
    if (componente) {
        if (componente.tagName === 'INPUT' || componente.tagName === 'TEXTAREA') {
            componente.value = mensaje; 
        } else {
            componente.innerHTML = mensaje; 
        }
    }
}

mostrarTextoEnCaja = function (idComponente, mensaje) {
    mostrarTexto(idComponente, mensaje);
}

mostrarImagen = function (idComponente, rutaImagen) {
    const componente = document.getElementById(idComponente);
    if (componente) {
        componente.src = rutaImagen;
    }
}

limpiarTexto = function (idComponente) {
    mostrarTexto(idComponente, '');
}



mostrarComponente = function (idComponente) {
    const componente = document.getElementById(idComponente);
    if (componente) {
        componente.style.display = "block";
    }
}

ocultarComponente = function (idComponente) {
    const componente = document.getElementById(idComponente);
    if (componente) {
        componente.style.display = "none";
    }
}

deshabilitarComponente = function (idComponente) {
    const componente = document.getElementById(idComponente);
    if (componente) {
        componente.disabled = true;
    }
}

habilitarComponente = function (idComponente) {
    const componente = document.getElementById(idComponente);
    if (componente) {
        componente.disabled = false;
    }
}

esNumero = function (valor) {
    return !isNaN(parseFloat(valor)) && isFinite(valor);
}
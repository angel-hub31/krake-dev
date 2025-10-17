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
    return esNumero(valorCaja) ? parseInt(valorCaja, 10) : 0;
}

recuperarFloat = function (idComponente) {
    let valorCaja = recuperarTexto(idComponente);
    return esNumero(valorCaja) ? parseFloat(valorCaja) : 0.0;
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

mostrarError = function (idComponente, mensaje) {
    const componente = document.getElementById(idComponente);
    if (componente) {
        componente.innerHTML = mensaje;
        componente.style.display = "block"; 
    }
}

ocultarError = function (idComponente) {
    const componente = document.getElementById(idComponente);
    if (componente) {
        componente.innerHTML = "";
        componente.style.display = "none"; 
    }
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
    if (typeof valor !== 'string') return !isNaN(parseFloat(valor)) && isFinite(valor);
    const trimmed = valor.trim();
    if (trimmed === '') return false;
    return !isNaN(parseFloat(trimmed)) && isFinite(trimmed);
}

recuperarTextoDiv = function (idComponente) {
    const componente = document.getElementById(idComponente);
    if (componente) {
        
        return componente.textContent || componente.innerText || '';
    }
    return '';
}

recuperarIntDiv = function (idComponente) {
    let valorCaja = recuperarTextoDiv(idComponente);
    return esNumero(valorCaja) ? parseInt(valorCaja, 10) : 0;
}

recuperarFloatDiv = function (idComponente) {
    let valorCaja = recuperarTextoDiv(idComponente);
    return esNumero(valorCaja) ? parseFloat(valorCaja) : 0.0;
}
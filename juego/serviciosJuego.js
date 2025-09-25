obtenerAleatorio = function() {
    return Math.floor(Math.random() * 3);
}

generarElemento = function() {
    const opciones = ['piedra', 'papel', 'tijera'];
    return opciones[obtenerAleatorio()];
}

determinarGanador = function (eleccionJugador, eleccionPc) {
    if (eleccionJugador == eleccionPc) {
        return 0;
    }

    if (
        (eleccionJugador =='piedra' && eleccionPc == 'tijera') ||
        (eleccionJugador == 'papel' && eleccionPc == 'piedra') ||
        (eleccionJugador == 'tijera' && eleccionPc == 'papel')
    ) {
        return 1; 
    }

    return 2; 
}

generarRuta = function(nombre) {
    const rutas = {
        piedra: './imagenes/piedra.png',
        papel: './imagenes/papel.png',
        tijera: './imagenes/tijera.png'
    };
    return rutas[nombre];
}

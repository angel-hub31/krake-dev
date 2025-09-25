let puntosJugador = 0;
let puntosComputador = 0;
let juegoTerminado = false;

jugar = function (seleccionado) {
    if (juegoTerminado) return; 

    let elemento = generarElemento();
    let imagen = generarRuta(elemento);
    let ganador = determinarGanador(seleccionado, elemento);

    let cmpResultado = document.getElementById('resultado');
    let cmpPuntosJug = document.getElementById('puntosJug');
    let cmpPuntosPc = document.getElementById('puntosPc');
    let cmpPartida = document.getElementById('partida');
    let cmpImgPc = document.getElementById('imgPc');

    cmpPartida.innerText = '';
    if (cmpImgPc) cmpImgPc.src = imagen;

    if (ganador !== 0) {
        if (ganador === 1) {
            cmpPartida.innerText = 'Ganaste la partida';
            puntosJugador++;
            if (cmpPuntosJug) cmpPuntosJug.innerText = puntosJugador;

            if (puntosJugador == 5) {
                if (cmpResultado) cmpResultado.innerText = ' HAS GANADO EL JUEGO';
                juegoTerminado = true;
            }
        } else {
            cmpPartida.innerText = 'Perdiste la partida';
            puntosComputador++;
            if (cmpPuntosPc) cmpPuntosPc.innerText = puntosComputador;

            if (puntosComputador == 5) {
                if (cmpResultado) cmpResultado.innerText = ' EL COMPUTADOR TE HA VENCIDO';
                juegoTerminado = true;
            }
        }
    } else {
        cmpPartida.innerText = 'EMPATE';
    }
}

limpiarDatos = function () {
    let cmpResultado = document.getElementById('resultado');
    let cmpPuntosJug = document.getElementById('puntosJug');
    let cmpPuntosPc = document.getElementById('puntosPc');
    let cmpPartida = document.getElementById('partida');
    let cmpImgPc = document.getElementById('imgPc');

    puntosComputador = 0;
    puntosJugador = 0;
    juegoTerminado = false;

    if (cmpPuntosJug) cmpPuntosJug.innerText = '0';
    if (cmpPuntosPc) cmpPuntosPc.innerText = '0';
    if (cmpPartida) cmpPartida.innerText = '';
    if (cmpImgPc) cmpImgPc.src = './imagenes/2.png';
    if (cmpResultado) cmpResultado.innerText = '';
}

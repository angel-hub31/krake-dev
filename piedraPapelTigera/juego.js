// ====================================================================
// VARIABLES GLOBALES (ESTADO DEL JUEGO)
// ====================================================================

let puntosJugador = 0;      // Puntuación acumulada del jugador.
let puntosComputador = 0;   // Puntuación acumulada del computador.
let juegoTerminado = false; // Bandera que indica si el juego ha finalizado (alguien llegó a 5 puntos).

// Se asume la existencia de las siguientes funciones, que no están definidas en el extracto:
// - generarElemento(): Retorna la selección del computador (e.g., 'PIEDRA', 'PAPEL', 'TIJERA').
// - generarRuta(elemento): Retorna la ruta de la imagen correspondiente al elemento (e.g., './imagenes/piedra.png').
// - determinarGanador(jugador, computador): Retorna 1 (gana jugador), 2 (gana computador), o 0 (empate).


// ====================================================================
// FUNCIÓN PRINCIPAL DE JUEGO (Se llama en cada turno/selección)
// ====================================================================

jugar = function (seleccionado) {
    // 1. **Control de Estado:** Si el juego ya terminó (alguien llegó a 5), sale de la función inmediatamente.
    if (juegoTerminado) return; 

    // 2. **Lógica de la Partida (PC):** Genera la jugada y la imagen del computador.
    let elemento = generarElemento();
    let imagen = generarRuta(elemento);
    
    // 3. **Determinación del Ganador:** Compara las selecciones para ver el resultado de esta partida.
    //    'seleccionado' es la jugada del jugador (parámetro).
    let ganador = determinarGanador(seleccionado, elemento);

    // 4. **Obtener Componentes UI:** Referencias a los elementos HTML para actualizar la pantalla.
    let cmpResultado = document.getElementById('resultado'); // Mensaje final del juego
    let cmpPuntosJug = document.getElementById('puntosJug'); // Puntos del jugador
    let cmpPuntosPc = document.getElementById('puntosPc');   // Puntos del computador
    let cmpPartida = document.getElementById('partida');     // Resultado de la partida actual
    let cmpImgPc = document.getElementById('imgPc');         // Imagen de la jugada del computador

    // 5. **Actualización Inicial UI:** Limpia el mensaje de partida anterior y muestra la jugada del PC.
    cmpPartida.innerText = '';
    if (cmpImgPc) cmpImgPc.src = imagen;

    // 6. **Procesar Resultado de la Partida:** Verifica si hubo un ganador (ganador != 0).
    if (ganador !== 0) {
        if (ganador === 1) { // Gana el Jugador
            cmpPartida.innerText = 'Ganaste la partida';
            puntosJugador++;
            if (cmpPuntosJug) cmpPuntosJug.innerText = puntosJugador; // Actualiza el marcador

            // **Verificación de Victoria Final (Juego):**
            if (puntosJugador == 5) {
                if (cmpResultado) cmpResultado.innerText = ' HAS GANADO EL JUEGO';
                juegoTerminado = true; // Establece la bandera de fin de juego
            }
        } else { // Gana el Computador (ganador === 2)
            cmpPartida.innerText = 'Perdiste la partida';
            puntosComputador++;
            if (cmpPuntosPc) cmpPuntosPc.innerText = puntosComputador; // Actualiza el marcador

            // **Verificación de Victoria Final (Juego):**
            if (puntosComputador == 5) {
                if (cmpResultado) cmpResultado.innerText = ' EL COMPUTADOR TE HA VENCIDO';
                juegoTerminado = true; // Establece la bandera de fin de juego
            }
        }
    } else {
        // Empate (ganador === 0)
        cmpPartida.innerText = 'EMPATE';
    }
}


// ====================================================================
// FUNCIÓN DE REINICIO
// ====================================================================

limpiarDatos = function () {
    // 1. **Obtener Componentes UI:** Referencias a los elementos HTML para resetearlos.
    let cmpResultado = document.getElementById('resultado');
    let cmpPuntosJug = document.getElementById('puntosJug');
    let cmpPuntosPc = document.getElementById('puntosPc');
    let cmpPartida = document.getElementById('partida');
    let cmpImgPc = document.getElementById('imgPc');

    // 2. **Resetear Variables Globales:** Restablece el estado del juego.
    puntosComputador = 0;
    puntosJugador = 0;
    juegoTerminado = false;

    // 3. **Resetear UI:** Restablece la visualización en pantalla.
    if (cmpPuntosJug) cmpPuntosJug.innerText = '0';
    if (cmpPuntosPc) cmpPuntosPc.innerText = '0';
    if (cmpPartida) cmpPartida.innerText = '';
    // Muestra una imagen por defecto para el PC al inicio (se asume que './imagenes/2.png' es la imagen por defecto).
    if (cmpImgPc) cmpImgPc.src = './imagenes/2.png'; 
    if (cmpResultado) cmpResultado.innerText = '';
}





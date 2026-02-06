// ================== CONSTANTES ==================
const CASILLA_INICIO = 0;
const CASILLA_META = 20;

// Auto 1
const capacidadAuto1 = 40;
const consumoAuto1 = 3;
const imagenAuto1 = 'img/auto1.png';

// Auto 2
const capacidadAuto2 = 50;
const consumoAuto2 = 4;
const imagenAuto2 = 'img/auto2.png';

// ================== ESTADO ==================
let posicionAuto1 = 0;
let posicionAuto2 = 0;

let gasolinaAuto1 = capacidadAuto1;
let gasolinaAuto2 = capacidadAuto2;

let turnoActual = 1;
let juegoTerminado = false;

let gasolinaPendiente = false;
let autoPendienteGasolina = 0;

// ================== DOM ==================
const btnAuto1 = document.getElementById('btnAuto1');
const btnAuto2 = document.getElementById('btnAuto2');
const btnLanzarGasolina = document.getElementById('btnLanzarGasolina');

const imgDadoMovimiento = document.getElementById('imgDadoMovimiento');
const valorDadoMovimiento = document.getElementById('valorDadoMovimiento');

const cajaGasolina = document.getElementById('cajaGasolina');
const imgDadoGasolina = document.getElementById('imgDadoGasolina');
const valorGasolinaCargada = document.getElementById('valorGasolinaCargada');

const pos1 = document.getElementById('pos1');
const pos2 = document.getElementById('pos2');

const barraGasolina1 = document.getElementById('gasolina1');
const barraGasolina2 = document.getElementById('gasolina2');
const textoGasolina1 = document.getElementById('textoGasolina1');
const textoGasolina2 = document.getElementById('textoGasolina2');

const tableroEl = document.getElementById('tablero');

const modalFondo = document.getElementById('modalFondo');
const tituloModal = document.getElementById('tituloModal');
const mensajeModal = document.getElementById('mensajeModal');
const btnCerrarModal = document.getElementById('btnCerrarModal');

// ================== EVENTOS ==================
btnAuto1.onclick = () => jugarTurno(1);
btnAuto2.onclick = () => jugarTurno(2);
btnCerrarModal.onclick = cerrarModal;

btnLanzarGasolina.onclick = () => {
  if (!gasolinaPendiente || turnoActual !== autoPendienteGasolina) return;

  lanzarDadoGasolina();
  gasolinaPendiente = false;
  autoPendienteGasolina = 0;
  desactivarDadoGasolinaUI();

  renderizarTodo();
  if (revisarFinDelJuego()) return;

  cambiarTurno();
};

// ================== INICIO ==================
desactivarDadoGasolinaUI();
renderizarTodo();

// ================== FUNCIONES ==================
function reiniciarJuego() {
  // 1. Resetear variables de estado
  posicionAuto1 = 0;
  posicionAuto2 = 0;
  gasolinaAuto1 = capacidadAuto1;
  gasolinaAuto2 = capacidadAuto2;
  turnoActual = 1;
  juegoTerminado = false;
  gasolinaPendiente = false;
  autoPendienteGasolina = 0;

  // 2. Resetear UI de dados y modales
  desactivarDadoGasolinaUI();
  imgDadoMovimiento.src = 'img/dado1.png';
  valorDadoMovimiento.textContent = '1';
  
  // 3. Habilitar botones de juego
  btnAuto1.disabled = false;
  btnAuto2.disabled = true; // Empieza el auto 1, el 2 debe estar deshabilitado

  // 4. Redibujar todo el tablero y HUD
  renderizarTodo();
  
  console.log("Juego reiniciado");
}
function lanzarDado(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function jugarTurno(auto) {
  if (juegoTerminado) return;
  if (auto !== turnoActual) {
    mostrarModal('Turno incorrecto', 'No es tu turno');
    return;
  }
  if (gasolinaPendiente) {
    mostrarModal('Gasolina pendiente', 'Debes lanzar el dado de gasolina');
    return;
  }

  const resultado = lanzarDado(1, 6);
  mostrarDadoMovimiento(resultado);

  if (resultado >= 1 && resultado <= 4) {
    moverAuto(auto, resultado);
  } else if (resultado === 5) {
    moverAuto(auto, -1);
  } else {
    gasolinaPendiente = true;
    autoPendienteGasolina = auto;
    activarDadoGasolinaUI();
    mostrarModal(' Gasolina', 'Lanza el dado de gasolina');
    return;
  }

  renderizarTodo();
  if (revisarFinDelJuego()) return;
  cambiarTurno();
}

function moverAuto(auto, pasos) {
  const casillas = Math.abs(pasos);

  if (auto === 1) {
    const gasto = casillas * consumoAuto1;
    if (gasolinaAuto1 < gasto) {
      gasolinaAuto1 = 0;
      return;
    }
    posicionAuto1 = limitarPosicion(posicionAuto1 + pasos);
    gasolinaAuto1 -= gasto;
  } else {
    const gasto = casillas * consumoAuto2;
    if (gasolinaAuto2 < gasto) {
      gasolinaAuto2 = 0;
      return;
    }
    posicionAuto2 = limitarPosicion(posicionAuto2 + pasos);
    gasolinaAuto2 -= gasto;
  }
}

function lanzarDadoGasolina() {
  const opciones = [1, 3, 5, 10];
  const litros = opciones[lanzarDado(0, 3)];
  valorGasolinaCargada.textContent = litros;

  if (turnoActual === 1) {
    gasolinaAuto1 = Math.min(capacidadAuto1, gasolinaAuto1 + litros);
  } else {
    gasolinaAuto2 = Math.min(capacidadAuto2, gasolinaAuto2 + litros);
  }
}

function revisarFinDelJuego() {
  if (posicionAuto1 === CASILLA_META) {
    terminarJuego(' Auto 1 ganó la carrera');
    return true;
  }
  if (posicionAuto2 === CASILLA_META) {
    terminarJuego(' Auto 2 ganó la carrera');
    return true;
  }
  if (gasolinaAuto1 === 0) {
    terminarJuego(' Auto 1 se quedó sin gasolina: GANA EL AUTO 2');
    return true;
  }
  if (gasolinaAuto2 === 0) {
    terminarJuego(' Auto 2 se quedó sin gasolina: GANA EL AUTO 1');
    return true;
  }
  return false;
}

function terminarJuego(mensaje) {
  juegoTerminado = true;
  btnAuto1.disabled = true;
  btnAuto2.disabled = true;
  btnLanzarGasolina.disabled = true;
  mostrarModal('Fin del juego', mensaje);
}

function cambiarTurno() {
  turnoActual = turnoActual === 1 ? 2 : 1;
  renderizarHUD();
}

function limitarPosicion(pos) {
  if (pos < 0) return 0;
  if (pos > 20) return 20;
  return pos;
}

// ================== UI ==================
function mostrarDadoMovimiento(valor) {
  if (valor <= 4) imgDadoMovimiento.src = `img/dado${valor}.png`;
  else if (valor === 5) imgDadoMovimiento.src = 'img/dadoSad.png';
  else imgDadoMovimiento.src = 'img/dadoGasolina.png';
  valorDadoMovimiento.textContent = valor;
}

function activarDadoGasolinaUI() {
  cajaGasolina.classList.remove('oculta');
  btnLanzarGasolina.disabled = false;
}

function desactivarDadoGasolinaUI() {
  cajaGasolina.classList.add('oculta');
  btnLanzarGasolina.disabled = true;
  valorGasolinaCargada.textContent = '0';
}

function mostrarModal(titulo, mensaje) {
  tituloModal.textContent = titulo;
  mensajeModal.textContent = mensaje;
  modalFondo.classList.add('show');
}

function cerrarModal() {
  modalFondo.classList.remove('show');
}

function renderizarTodo() {
  renderizarHUD();
  renderizarTablero();
}

function renderizarHUD() {
  pos1.textContent = posicionAuto1;
  pos2.textContent = posicionAuto2;

  barraGasolina1.value = gasolinaAuto1;
  barraGasolina2.value = gasolinaAuto2;

  textoGasolina1.textContent = `${gasolinaAuto1}/${capacidadAuto1}`;
  textoGasolina2.textContent = `${gasolinaAuto2}/${capacidadAuto2}`;

  btnAuto1.disabled = turnoActual !== 1 || juegoTerminado || gasolinaPendiente;
  btnAuto2.disabled = turnoActual !== 2 || juegoTerminado || gasolinaPendiente;
}

function renderizarTablero() {
  tableroEl.innerHTML = '';

  for (let i = 0; i <= 20; i++) {
    const casilla = document.createElement('div');
    casilla.className = 'casilla';
    if (i === 20) casilla.classList.add('meta');

    const numero = document.createElement('div');
    numero.className = 'numeroCasilla';
    numero.textContent = i;
    casilla.appendChild(numero);

    const zona = document.createElement('div');
    zona.className = 'zonaAutos';

    if (posicionAuto1 === i) zona.appendChild(crearAuto(imagenAuto1));
    if (posicionAuto2 === i) zona.appendChild(crearAuto(imagenAuto2));

    casilla.appendChild(zona);
    tableroEl.appendChild(casilla);
  }
}

function crearAuto(img) {
  const i = document.createElement('img');
  i.src = img;
  i.className = 'autoImg';
  return i;
}

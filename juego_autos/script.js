// ==========================
// Variables globales
// ==========================

const LONGITUD_PISTA = 20;
const META = LONGITUD_PISTA - 1;

const CAPACIDAD_TANQUE_AUTO1 = 50;
const CAPACIDAD_TANQUE_AUTO2 = 50;

// Casillas con distinta gasolina
const CASILLAS_GASOLINA_5 = [3, 11];
const CASILLAS_GASOLINA_10 = [6, 14, 17];

// Casilla especial: llenar tanque
const CASILLA_LLENA_TANQUE = 5;

let posicionAuto1 = 0;
let posicionAuto2 = 0;

// Empiezan con el tanque a la mitad
let gasolinaAuto1 = CAPACIDAD_TANQUE_AUTO1 / 2; // 15
let gasolinaAuto2 = CAPACIDAD_TANQUE_AUTO2 / 2; // 20

// Turno: 1 o 2
let turnoActual = 1;

// Últimos datos para mostrar en cada panel
let ultimoDadoAuto1 = 0;
let ultimoDadoAuto2 = 0;
let ultimoGastoGasolinaAuto1 = 0;
let ultimoGastoGasolinaAuto2 = 0;
let ultimoExtraGasolinaAuto1 = 0;
let ultimoExtraGasolinaAuto2 = 0;

let juegoTerminado = false;

// ==========================
// Funciones de lógica básica
// ==========================

function tirarDadoPasos() {
  return Math.floor(Math.random() * 6) + 1;
}

function obtenerCantidadGasolinaPorCasilla(posicion) {
  if (CASILLAS_GASOLINA_5.indexOf(posicion) !== -1) {
    return 5;
  }
  if (CASILLAS_GASOLINA_10.indexOf(posicion) !== -1) {
    return 10;
  }
  return 0;
}

function esCasillaGasolina(posicion) {
  return obtenerCantidadGasolinaPorCasilla(posicion) > 0;
}

function esCasillaLlenarTanque(posicion) {
  return posicion === CASILLA_LLENA_TANQUE;
}

function cargarGasolina(gasolinaActual, cantidad, capacidadMaxima) {
  let total = gasolinaActual + cantidad;
  if (total > capacidadMaxima) {
    total = capacidadMaxima;
  }
  return total;
}






// ==========================
// Vista
// ==========================

function crearPista() {
  const pistaDiv = document.getElementById("pista");
  pistaDiv.innerHTML = "";

  for (let i = 0; i < LONGITUD_PISTA; i++) {
    const casilla = document.createElement("div");
    casilla.className = "casilla";

    if (i === META) {
      casilla.classList.add("meta");
      casilla.textContent = "META";
    } else if (esCasillaLlenarTanque(i)) {
      casilla.classList.add("tanque");
      casilla.textContent = "FULL";
    } else {
      const cant = obtenerCantidadGasolinaPorCasilla(i);
      if (cant === 5) {
        casilla.classList.add("gasolina5");
        casilla.textContent = "+5";
      } else if (cant === 10) {
        casilla.classList.add("gasolina10");
        casilla.textContent = "+10";
      } else {
        casilla.textContent = i;
      }
    }

    pistaDiv.appendChild(casilla);
  }
}

function actualizarPista() {
  const casillas = document.querySelectorAll("#pista .casilla");

  casillas.forEach(function (c) {
    const autos = c.querySelectorAll(".auto-img");
    autos.forEach(function (img) {
      img.remove();
    });
  });

  const casilla1 = casillas[posicionAuto1];
  const img1 = document.createElement("img");
  img1.src = "auto.jpg";
  img1.alt = "Auto 1";
  img1.className = "auto-img auto1-img";
  casilla1.appendChild(img1);

  const casilla2 = casillas[posicionAuto2];
  const img2 = document.createElement("img");
  img2.src = "auto2.jpg";
  img2.alt = "Auto 2";
  img2.className = "auto-img auto2-img";
  casilla2.appendChild(img2);
}

function actualizarBarrasGasolina() {
  const barra1 = document.getElementById("barra-gasolina-1");
  const barra2 = document.getElementById("barra-gasolina-2");

  const porcentaje1 = (gasolinaAuto1 / CAPACIDAD_TANQUE_AUTO1) * 100;
  const porcentaje2 = (gasolinaAuto2 / CAPACIDAD_TANQUE_AUTO2) * 100;

  barra1.style.width = porcentaje1 + "%";
  barra2.style.width = porcentaje2 + "%";

  document.getElementById("texto-gasolina-1").textContent =
    "Gasolina: " + gasolinaAuto1 + " / " + CAPACIDAD_TANQUE_AUTO1 + " litros";
  document.getElementById("texto-gasolina-2").textContent =
    "Gasolina: " + gasolinaAuto2 + " / " + CAPACIDAD_TANQUE_AUTO2 + " litros";
}

function actualizarInfoAutos() {
  document.getElementById("texto-posicion-1").textContent =
    "Posición: " + posicionAuto1;
  document.getElementById("texto-posicion-2").textContent =
    "Posición: " + posicionAuto2;

  document.getElementById("texto-dado-1").textContent =
    "Último lanzamiento: " + (ultimoDadoAuto1 || "-");
  document.getElementById("texto-gasto-1").textContent =
    "Gasolina gastada en el turno: " + (ultimoGastoGasolinaAuto1 || 0);
  document.getElementById("texto-extra-1").textContent =
    "Gasolina adicional: " + (ultimoExtraGasolinaAuto1 || 0);

  document.getElementById("texto-dado-2").textContent =
    "Último lanzamiento: " + (ultimoDadoAuto2 || "-");
  document.getElementById("texto-gasto-2").textContent =
    "Gasolina gastada en el turno: " + (ultimoGastoGasolinaAuto2 || 0);
  document.getElementById("texto-extra-2").textContent =
    "Gasolina adicional: " + (ultimoExtraGasolinaAuto2 || 0);
}

function actualizarTurnoYBotones() {
  const textoTurno = document.getElementById("turno");
  const btn1 = document.getElementById("btn-jugar-1");
  const btn2 = document.getElementById("btn-jugar-2");

  if (juegoTerminado) {
    textoTurno.textContent = "Juego terminado.";
    btn1.disabled = true;
    btn2.disabled = true;
    return;
  }

  textoTurno.textContent = "Turno del Auto " + turnoActual;

  if (turnoActual === 1) {
    btn1.disabled = false;
    btn2.disabled = true;
  } else {
    btn1.disabled = true;
    btn2.disabled = false;
  }
}

function actualizarVista() {
  actualizarPista();
  actualizarBarrasGasolina();
  actualizarInfoAutos();
  actualizarTurnoYBotones();
}

function mostrarMensaje(texto) {
  document.getElementById("mensajes").textContent = texto;
}

function mostrarMensajeExtra(extra) {
  const mensajesDiv = document.getElementById("mensajes");
  mensajesDiv.textContent = mensajesDiv.textContent + " " + extra;
}

// ==========================
// Juego normal (botones Jugar)
// ==========================

function jugarAuto1() {
  if (juegoTerminado || turnoActual !== 1) return;
  jugarTurnoCompleto();
}

function jugarAuto2() {
  if (juegoTerminado || turnoActual !== 2) return;
  jugarTurnoCompleto();
}

function jugarTurnoCompleto() {
  if (juegoTerminado) return;

  const nombreAuto = (turnoActual === 1) ? "Auto 1" : "Auto 2";

  if (turnoActual === 1 && gasolinaAuto1 <= 0) {
    mostrarMensaje("Auto 1 se quedó sin gasolina. Juego terminado.");
    juegoTerminado = true;
    actualizarVista();
    return;
  }
  if (turnoActual === 2 && gasolinaAuto2 <= 0) {
    mostrarMensaje("Auto 2 se quedó sin gasolina. Juego terminado.");
    juegoTerminado = true;
    actualizarVista();
    return;
  }

  let pasos = tirarDadoPasos();

  if (turnoActual === 1) {
    ultimoDadoAuto1 = pasos;
    ultimoExtraGasolinaAuto1 = 0;
    avanzar1(pasos);

    const cant = obtenerCantidadGasolinaPorCasilla(posicionAuto1);
    if (esCasillaLlenarTanque(posicionAuto1)) {
      const antes = gasolinaAuto1;
      llenarTanque1();
      const cargado = gasolinaAuto1 - antes;
      mostrarMensajeExtra("Auto 1 llena el tanque (+" + cargado + " litros).");
    } else if (cant > 0) {
      cargarGasolina1(cant);
      mostrarMensajeExtra("Auto 1 carga +" + cant + " litros de gasolina.");
    }

  } else {
    ultimoDadoAuto2 = pasos;
    ultimoExtraGasolinaAuto2 = 0;
    avanzar2(pasos);

    const cant = obtenerCantidadGasolinaPorCasilla(posicionAuto2);
    if (esCasillaLlenarTanque(posicionAuto2)) {
      const antes = gasolinaAuto2;
      llenarTanque2();
      const cargado = gasolinaAuto2 - antes;
      mostrarMensajeExtra("Auto 2 llena el tanque (+" + cargado + " litros).");
    } else if (cant > 0) {
      cargarGasolina2(cant);
      mostrarMensajeExtra("Auto 2 carga +" + cant + " litros de gasolina.");
    }
  }

  mostrarMensaje(nombreAuto + " avanza " + pasos + " casillas.");

  if (turnoActual === 1 && posicionAuto1 >= META) {
    mostrarMensaje(nombreAuto + " llegó a la meta. ¡Ganó!");
    juegoTerminado = true;
    actualizarVista();
    return;
  }
  if (turnoActual === 2 && posicionAuto2 >= META) {
    mostrarMensaje(nombreAuto + " llegó a la meta. ¡Ganó!");
    juegoTerminado = true;
    actualizarVista();
    return;
  }

  if (turnoActual === 1 && gasolinaAuto1 <= 0) {
    mostrarMensaje("Auto 1 se quedó sin gasolina. Juego terminado.");
    juegoTerminado = true;
    actualizarVista();
    return;
  }
  if (turnoActual === 2 && gasolinaAuto2 <= 0) {
    mostrarMensaje("Auto 2 se quedó sin gasolina. Juego terminado.");
    juegoTerminado = true;
    actualizarVista();
    return;
  }

  turnoActual = (turnoActual === 1) ? 2 : 1;

  actualizarVista();
}
// ==========================
// Funciones creadas en CLASE
// ==========================

function restarGasolina1(casillas){
  cantidadResta=casillas*3;
  gasolinaAuto1-=cantidadResta;
  ultimoGastoGasolinaAuto1=cantidadResta;
}
function restarGasolina2(casillas){
  cantidadResta=casillas*4;
  gasolinaAuto2-=cantidadResta;
  ultimoGastoGasolinaAuto2=cantidadResta;
}
function llenarTanque1(){
  gasolinaAuto1 = CAPACIDAD_TANQUE_AUTO1;
  ultimoExtraGasolinaAuto1=CAPACIDAD_TANQUE_AUTO1;
}
function llenarTanque2(){
  gasolinaAuto2=CAPACIDAD_TANQUE_AUTO2;
  ultimoGastoGasolinaAuto2=CAPACIDAD_TANQUE_AUTO2;
}
function cargarGasolina1(cantidadGasolina){
  gasolinaAuto1=gasolinaAuto1+cantidadGasolina;
  ultimoExtraGasolinaAuto1=cantidadGasolina;
}
function cargarGasolina2(cantidadGasolina){
  gasolinaAuto2=gasolinaAuto2+cantidadGasolina;
  ultimoExtraGasolinaAuto1=cantidadGasolina;

}
function avanzar1(casillas){   
  posicionAuto1+=casillas;
  restarGasolina1(casillas)
}
function avanzar2(casillas){
  posicionAuto2+=casillas;
  restarGasolina2(casillas)
}
function reiniciar(){
  posicionAuto1=0;
  posicionAuto2=0;
  gasolinaAuto1=CAPACIDAD_TANQUE_AUTO1/2;
  gasolinaAuto2=CAPACIDAD_TANQUE_AUTO2/2;
  ultimoGastoGasolinaAuto1=0;
  ultimoGastoGasolinaAuto2=0;
  ultimoExtraGasolinaAuto1=0;
  ultimoExtraGasolinaAuto2=0;
  actualizarVista();

}

// ==========================
// Botones de PRUEBA
// ==========================

function probarLlenarTanque1() {
  llenarTanque1();
  mostrarMensaje("Prueba: se llamó a llenarTanque1().");
  actualizarVista();
}

function probarLlenarTanque2() {
  llenarTanque2();
  mostrarMensaje("Prueba: se llamó a llenarTanque2().");
  actualizarVista();
}

function probarCargarGasolina1() {
  const input = document.getElementById("input-gas-1");
  const cantidad = parseInt(input.value, 10) || 0;
  cargarGasolina1(cantidad);
  mostrarMensaje("Prueba: se llamó a cargarGasolina1(" + cantidad + ").");
  actualizarVista();
}

function probarCargarGasolina2() {
  const input = document.getElementById("input-gas-2");
  const cantidad = parseInt(input.value, 10) || 0;
  cargarGasolina2(cantidad);
  mostrarMensaje("Prueba: se llamó a cargarGasolina2(" + cantidad + ").");
  actualizarVista();
}

function probarAvanzar1() {
  const input = document.getElementById("input-pasos-1");
  const pasos = parseInt(input.value, 10) || 0;
  avanzar1(pasos);
  ultimoDadoAuto1 = pasos;
  mostrarMensaje("Prueba: se llamó a avanzar1(" + pasos + ").");
  actualizarVista();
}

function probarAvanzar2() {
  const input = document.getElementById("input-pasos-2");
  const pasos = parseInt(input.value, 10) || 0;
  avanzar2(pasos);
  ultimoDadoAuto2 = pasos;
  mostrarMensaje("Prueba: se llamó a avanzar2(" + pasos + ").");
  actualizarVista();
}

function probarReiniciar() {
  reiniciar();
  mostrarMensaje("Prueba: se llamó a reiniciar().");
  // reiniciar ya llama a actualizarVista()
}

// ==========================
// Inicialización
// ==========================

window.onload = function () {
  crearPista();
  mostrarMensaje("Empieza el Auto 1. Haz clic en su botón para jugar.");
  actualizarVista();
};

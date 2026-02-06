// Variables globales (para que sea simple para alumnos)
var nombreInput;
var modalOverlay;
var modalMessage;

// Al cargar, tomar referencias
window.onload = function () {
  nombreInput = document.getElementById("nombreInput");
  modalOverlay = document.getElementById("modalOverlay");
  modalMessage = document.getElementById("modalMessage");
};

abrirModal = function (mensaje) {
  modalMessage.innerText = mensaje;
  modalOverlay.classList.remove("hidden");
  modalOverlay.setAttribute("aria-hidden", "false");
};

cerrarModal = function () {
  modalOverlay.classList.add("hidden");
  modalOverlay.setAttribute("aria-hidden", "true");
};

iniciar = function () {
  var nombre = nombreInput.value;
  var nombreFinal = "";

  if (nombre.trim().length > 0) {
    nombreFinal = nombre.trim();
  } else {
    nombreFinal = "coder";
  }

  // Sin template literal: concatenación con +
  var mensaje = nombreFinal ;
  abrirModal(mensaje);
};

// Para cerrar si hacen clic fuera del cuadro modal
clicFondo = function (e) {
  // Si el clic fue en el overlay (fondo oscuro), cerrar
  if (e.target.id === "modalOverlay") {
    cerrarModal();
  }
};

// Cerrar con tecla ESC (sin addEventListener)
document.onkeydown = function (e) {
  if (e.key === "Escape") {
    if (!modalOverlay.classList.contains("hidden")) {
      cerrarModal();
    }
  }
};

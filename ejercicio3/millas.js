// CONFIGURACIÓN
let millas = 0;
// ELEMENTOS
var h1Millas;
var pCategoria;
var pMensaje;
var txtCantidad;
var imgCategoria;
// MODAL
var modalOverlay;
var modalMessage;

window.onload = function () {
  h1Millas = document.getElementById("h1Millas");
  pCategoria = document.getElementById("pCategoria");
  pMensaje = document.getElementById("pMensaje");
  txtCantidad = document.getElementById("txtCantidad");
  imgCategoria = document.getElementById("imgCategoria");
  modalOverlay = document.getElementById("modalOverlay");
  modalMessage = document.getElementById("modalMessage");
  actualizarPantalla("Mensaje: listo");
};

/* =========================
   FUNCIONES DE APOYO
   ========================= */

var leerCantidadEntera = function () {
  
  var n = parseInt(txtCantidad.value, 10);
  if (isNaN(n)) {
    n = 0;
  }
  return n;
};
var actualizarPantalla = function (mensaje) {
  h1Millas.innerText = "Millas: " + millas;
  pMensaje.innerText = mensaje;
  actualizarImagen();
};
var actualizarImagen=function(){
  if (millas>=0 && millas<=20){
    imgCategoria.src="bronce.jpg";
  pCategoria.innerText="Categoria: Basico";
}else if(millas>=21 && millas<=40){
imgCategoria.src="plata.jpg";
pCategoria.innerText="Categoria PLATA";

}else if(millas>=41 && millas<=50){
  imgCategoria.src="oro.jpg";
  pCategoria.innerText="Categoria ORO";


}


}

/* =========================
   FUNCIONES DE LÓGICA
   ========================= */
var ganarCincoMillas=function(){
  if (millas+5<=50){
    millas+=5;

  }else{
    millas=50;
    alert("Has alcanzado el maximo de 50 millas");

  }
}
var perderDiezMillas=function(){
  if (millas-10>=0){
    millas-=10;

  }else{
    
    alert("No se puede tener menos de 0 millas");
    
  }
}
var ganarMillas=function(){
  if(millas+cantidad<=50){
    millas+=cantidad;
  }else{
    millas=50;
    alert("has llegado al limite de 50 millas");

  }
}
var perderMillas=function(){
  if(millas-cantidad>=0){
    millas-=cantidad;
  }else{
    
    alert("no tiene suficientes millas");
    
  }
}
var convertirMillas=function(){
  if(cantidadMillas<30){
    return cantidadMillas*5;
  }else{
    return cantidadMillas+10;
  }
}
/* =========================
   MODAL
   ========================= */

abrirModal = function (mensaje) {
  modalMessage.innerText = mensaje;
  modalOverlay.classList.remove("hidden");
};

cerrarModal = function () {
  modalOverlay.classList.add("hidden");
};

clicFondo = function (e) {
  if (e.target.id === "modalOverlay") {
    cerrarModal();
  }
};

/* =========================
   BOTONES
   ========================= */
   var probarGanar=function(){
    var cant=leerCantidadEntera();
    ganarMillas(cant);
    actualizarPantalla("ganaste MILLAS");
   }
var probarCanjear=function(){
    var cant=leerCantidadEntera();
    perderMillas(cant);
    actualizarPantalla("canjeaste MILLAS");
   }

probarGanar5 = function () {
  ganarCincoMillas();
  actualizarPantalla("+5 millas");
};

probarPerderDiez = function () {
  perderDiezMillas();
  actualizarPantalla("- 10 millas");
};

probarConvertir = function () {
  var dolares = convertirMillas(millas);
  abrirModal("Tienes " + millas + " millas. Equivalen a $" + dolares);
};

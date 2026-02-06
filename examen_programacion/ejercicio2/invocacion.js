// Inputs
var txtNombre;
var txtApellido;
var txtNum1;
var txtNum2;

// Salidas
var h1Resultado;
var pMensaje;
var pEstado;


/* =========================
   FUNCIONES DE LÓGICA (8)
   ========================= */

/*
  cambiarMayusculas: recibe dos textos, retorna los textos concatenados en mayúsculas 
*/
cambiarMayusculas = function (texto1, texto2) {
  let completo = texto2 + " " + texto1;
  let mayusculas = completo.toUpperCase();
  return mayusculas;
};

/*
  cambiarMayusculas: recibe dos textos, retorna los textos concatenados en mayúsculas 
*/
generarSaludo = function (nombre) {
  let saludo = "Feliz Navidad "+nombre;
  return saludo;
};

/*
  sumar: recibe dos enteros, retorna la suma
*/
sumar = function (a, b) {
  return a + b;
};

/*
  restar: recibe dos enteros, retorna la resta
*/
restar = function (a, b) {
  return a - b;
};

/*
  calcularPromedio: recibe dos flotantes, retorna promedio 
*/
calcularPromedio = function (a, b) {
  var prom = (a + b) / 2;
  return prom;
};

/*
  esParOImpar: recibe un número, retorna "PAR" o "IMPAR" (string)
*/
esParOImpar = function (n) {
  if (n % 2 === 0) {
    return "PAR";
  } else {
    return "IMPAR";
  }
};



/*
  funcion6: recibe dos números, retorna el mayor (number)
*/
esMayor = function (a, b) {
  if (a > b) {
    return a;
  } else {
    return b;
  }
};

/*
  cambiarMensajeDirecto: NO recibe, NO retorna, cambia el texto de un elemento (usa pMensaje global)
*/
cambiarMensajeDirecto = function () {
  let h1Resultado = document.getElementById("h1Resultado");
  h1Resultado.innerText="YA CASI TERMINAS";
};


/*
  cambiarMensaje: NO recibe, NO retorna, cambia el texto de un elemento (usa pMensaje global)
*/
cambiarMensaje = function (nombre) {
  let h1Resultado = document.getElementById("h1Resultado");
  h1Resultado.innerText="Eso fue todo "+nombre;
};
pc1111pc1
multiplicar=function(num1,num2){
  let producto=num1*num2;
  return producto;
}



/*
  Toma los valores de las cajas de texto txtCadena1 y txtCadena2 y las guarda en variables
  Invoca a la función cambiarMayusculas pasándole como parámetros los valores obtenidos y guarda el retorno en una variable
  Muestra el valor obtenido en pantalla en el componente h1Resultado 
*/
probar1 = function () {
  //Recupera de las cajas de texto txtCadena1 y txtCadena2 y los guarda en variables llamadas 
  //nombreTxt y apellidoTxt respectivamente.
  let nombreTxt = document.getElementById("txtCadena1");
  let apellidoTxt = document.getElementById("txtCadena2");
  
  //De cada caja, recupera los valores y los guarda en variables llamadas nombre y apellido respectivamente
  let nombre = nombreTxt.value;
  let apellido = apellidoTxt.value;
  

  //Invoca a la función cambiarMayusculas pasándole los parámetros respectivos, guarda el retorno en una variable
  //llamada mensaje
  
  let mensaje = cambiarMayusculas(nombre, apellido);

  //  Recupera la caja de texto h1Resultado y la guarda en la variable h1Resultado
  let h1Resultado = document.getElementById("h1Resultado");

  //Cambia el valor de h1Resultado, colocando el valor que tiene en mensaje
  h1Resultado.innerText = mensaje;

};

/*
  Recupera el valor de la caja txtCadena1 y lo guarda en una variable
  Invoca a la funcion generarSaludo y guarda el retorno en una variable
  Muestra el valor obtenido en h1Resultado
*/
probar2 = function () {
  let txt1=document.getElementById("txtCadena1")
  let valor=txt1.value;
  let saludo=generarSaludo(valor);
  let h1Resultado=document.getElementById("h1Resultado");
  h1Resultado.innerText=saludo
  
};

/*
  Recupera el valor de las cajas txtNum1 y txtNum2 y los guarda en variables.
  Transforma los valores obtenidos a ENTEROS!!
  Invoca a la función sumar pasándole como parámetros los valores enteros y guarda el resultado en una variable
  Muestra el resultado en h1Resultado
*/
probar3 = function () {
  let num1Txt = document.getElementById("txtNum1");
  let num2Txt = document.getElementById("txtNum2");
  let num1 = num1Txt.value;
  let num2 = num2Txt.value;
  let num1Entero = parseInt(num1);
  let num2Entero = parseInt(num2);
  let resultado = sumar(num1Entero,num2Entero);
  let h1Resultado = document.getElementById("h1Resultado");
  h1Resultado.innerText=resultado;

};

/*
  Recupera el valor de las cajas txtNum1 y txtNum2 y los guarda en variables.
  Transforma los valores obtenidos a FLOTANTES!!
  Invoca a la función calcularPromedio pasándole como parámetros los valores enteros y guarda el resultado en una variable
  Muestra el resultado en h1Resultado
*/
probar4 = function () {
  let n1=document.getElementById("txtNum1").value;
  let n2=document.getElementById("txtNum2").value;
  let num1=parseFloat(n1);
  let num2=parseFloat(n2);
  let resultado=calcularPromedio(num1,num2);
  document.getElementById("h1Resultado").innerText=resultado

};

/*
  probar5: toma el valor de txtNum1 e invoca a la función esParOImpar, muestra el resultado obtenido en h1Resultado
*/
probar5 = function () {
  let n1=document.getElementById("txtNum1").value;
  let num=parseInt(n1)
  let resultado=esParOImpar(num);
  document.getElementById("h1Resultado").innerText=resultado;
};

/*
  probar6: toma num1 y num2 como flotantes, invoca a esMayor y muestra el resultado en h1Resultado
*/
probar6 = function () {
  let num1=parseFloat(document.getElementById("txtNum1").value)
  let num2=parseFloat(document.getElementById("txtNum2").value)
  let mayor=esMayor(num1,num2);
  document.getElementById("h1Resultado").innerText="El mayor es: " + mayor;

};

/*
  probar7: invoca a cambiarMensajeDirecto 
*/
probar7 = function () {
  cambiarMensajeDirecto();


};

/*
  probar8: toma el valor de txtCadena1 y con el valor obtenido invoca a cambiarMensaje
*/
probar8 = function () {
  let cajaNombre=document.getElementById("txtCadena1");
  let nombreCapturado=cajaNombre.value;
  cambiarMensaje(nombreCapturado)
  let valor=document.getElementById("txtCadena1").value;
  cambiarMensaje(valor);
 
};
probar9=function(){
  let valor1=document.getElementById("txtNum1").value;
  let valor2=document.getElementById("txtNum2").value;
  let n1=parseFloat(valor1);
  let n2=parseFloat(valor2);
  let resultado=multiplicar(n1,n2);
  document.getElementById("h1Resultado").innerText=resultado;


}

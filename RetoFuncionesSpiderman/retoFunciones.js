sumar=function(num1,num2,num3){
    let resultadoN;
    resultadoN=num1+num2+num3;
    return resultadoN;
}
obtenerInfo=function(nombre,apellido,profesion){
    let infoPersona;
    infoPersona=nombre +" "+ apellido + " - " + profesion;
    return infoPersona;
}
mostrarResultado=function(sumando1,sumando2,resultado){
    console.log("El resultado de sumar "+ sumando1+" + "+ sumando2 +" es "+ resultado);
}
hackearNasaEnPelicula=function(){
    console.log("Hackeando nasa 0%");
    console.log("Hackeando nasa 20%");
    console.log("Hackeando nasa 40%");
    console.log("Hackeando nasa 60%");
    console.log("Hackeando nasa 80%");
    console.log("Hackeando nasa 90%");
    console.log("Hackeando nasa 99%");
    console.log("La nasa ha sido hackeada");
}
calcularEdad=function(anio){
    let anioActual;
    anioActual=new Date().getFullYear();
    anioActual=anioActual-anio;
    return anioActual;
}
calcularIVA=function(precioSinIva){
    let resultado;
    resultado=precioSinIva+(precioSinIva*12)/100 ;
    return resultado;
}
repasar=function(){
    console.log("Esta función fue creada solo para hacer un ejemplo de una función que no recibe nada y no retorna nada");
}
repasarMas=function(){
    let mensaje;
    mensaje="En este punto debemos estar super claros en crear funciones";
    console.log(mensaje);
    return mensaje;
}
llamarAtencion=function(nombre,mensaje){
    let resultado;
    resultado=nombre+" "+ mensaje+ " !!";
    alert(resultado);
    return resultado;
}
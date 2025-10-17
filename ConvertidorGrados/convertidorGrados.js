//Crear una funcion llamada convertirCelsiusAFarenheit 
//que reciba como parámetro la temperatura en grados celsius
//y RETORNE la temperatura en grados farenheit
convertirCelsiusAfarenheit=function(gCelcius){
    let farenheit;
    farenheit=(gCelcius*9/5)+32;
    return farenheit;

}
mostrarConversion=function(){
    let cmpValor;
    let valor;
    let gradosCelsius;
    let cmpResultado;
    let resultadoFormateado;
    let cmpImagen1;

    cmpValor=document.getElementById("txtCelsius");
    valor=cmpValor.value;
    valor=parseFloat(valor);
    gradosCelsius=convertirCelsiusAfarenheit(valor);
    resultadoFormateado=gradosCelsius.toFixed(2);
    cmpResultado=document.getElementById("lblFarenheit");
    cmpResultado.innerHTML=resultadoFormateado;
    
    cmpImagen1=document.getElementById("imgBandera");
    cmpImagen1.src="ok.jpg";

}
reiniciar=function(){
    let cmpValor;
    let cmpImagen1;
    let cmpFarenheit;

    cmpValor=document.getElementById("txtCelsius");
    valor=cmpValor.value=" ";
    cmpFarenheit=document.getElementById("lblFarenheit");
    cmpFarenheit.innerHTML=" 0 ";
    cmpImagen1=document.getElementById("imgBandera");
    cmpImagen1.src="pensando.jpg";


}
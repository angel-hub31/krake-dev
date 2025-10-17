    convertirEnPesosMx=function(dolares){
    let pesosMexicanos;                         //Crear una funcion llamada convertirEnPesosMx
    pesosMexicanos=dolares*18.35;               //que reciba como parámetro el valor en dolares
    return pesosMexicanos;                      //y RETORNE el equivalente en Pesos Mexicanos
}
mostrarPesosMx=function(){
    let cmpValor;
    let valor;
    let valorPesosMx;
    let cmpResultado;
    let resultadoFormateado;
    let cmpMoneda;
    let cmpImagenBandera;
    cmpValor= document.getElementById("txtValor");
    valor=cmpValor.value;
    valor=parseFloat(valor);
    valorPesosMx=convertirEnPesosMx(valor);
    resultadoFormateado= valorPesosMx.toFixed(2);
    cmpResultado=document.getElementById("lblValor");
    cmpResultado.innerHTML=resultadoFormateado;
    cmpMoneda=document.getElementById("lblMoneda");
    lblMoneda.innerHTML="PESOS MEXICANOS";
    cmpImagenBandera=document.getElementById("imgBandera");
    cmpImagenBandera.src="banderaMx.png";
}
convertirEnEuros=function(dolares){
    let monedaEuro;
    monedaEuro=dolares*0.84;
    return monedaEuro
}
mostrarEnEuros=function(){
    let cmpValor;
    let valor;
    let valorEuro;
    let cmpResultado;
    let resultadoFormateado;
    let cmpMoneda;
    let cmpImagenBandera;
    cmpValor= document.getElementById("txtValor");
    valor=cmpValor.value;
    valor=parseFloat(valor);
    valorEuro=convertirEnEuros(valor);
    resultadoFormateado= valorEuro.toFixed(2);
    cmpResultado=document.getElementById("lblValor");
    cmpResultado.innerHTML=resultadoFormateado;
    cmpMoneda=document.getElementById("lblMoneda");
    lblMoneda.innerHTML="EUROS";
    cmpImagenBandera=document.getElementById("imgBandera");
    cmpImagenBandera.src="unionEuropea.jpg";
}
convertirPesosCol=function(dolares){
    let PesosCol;
    pesoCol=dolares*3.867,63;
    return pesoCol;
}
mostrarPesosCol=function(){
    let cmpValor;
    let valor;
    let pesoColombiano;
    let cmpResultado;
    let resultadoFormateado;
    let cmpMoneda;
    let cmpImagenBandera;
    cmpValor= document.getElementById("txtValor");
    valor=cmpValor.value;
    valor=parseFloat(valor);
    pesoColombiano=convertirPesosCol(valor);
    resultadoFormateado= pesoColombiano.toFixed(2);
    cmpResultado=document.getElementById("lblValor");
    cmpResultado.innerHTML=resultadoFormateado;
    cmpMoneda=document.getElementById("lblMoneda");
    lblMoneda.innerHTML="PESOS COLOMBIANOS";
    cmpImagenBandera=document.getElementById("imgBandera");
    cmpImagenBandera.src="banderaColombia.png";
}
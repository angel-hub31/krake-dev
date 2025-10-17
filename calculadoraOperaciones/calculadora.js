let cmpCaja1;  
let valor1;
let cmpCaja2; 
let valor2;
let resultado;
let lblResultado;

sumar=function(){
    
    //1.Recuperar el valor de la primera caja de texto
    cmpCaja1=document.getElementById("txtValor1");
    valor1=cmpCaja1.value;

    //2.Recuperar el valor de la segunda caja de texto
    cmpCaja2=document.getElementById("txtValor2");
    valor2=cmpCaja2.value;
    
    //3.Sumar los dos valores
    resultado=parseInt(valor1) + parseInt(valor2);
    //4.Mostrar el valor en pantalla
    document.getElementById("lblResultado").innerText = " Resultado:" + resultado;
 
}
restar=function(){
    cmpCaja1=document.getElementById("txtValor1");
    valor1=cmpCaja1.value;
    cmpCaja2=document.getElementById("txtValor2");
    valor2=cmpCaja2.value;
    
    resultado=parseInt(valor1) - parseInt(valor2);
    document.getElementById("lblResultado").innerText = " Resultado:" + resultado;

}
multiplicar=function(){
    cmpCaja1=document.getElementById("txtValor1");
    valor1=cmpCaja1.value;
    cmpCaja2=document.getElementById("txtValor2");
    valor2=cmpCaja2.value;
    
    resultado=parseInt(valor1) * parseInt(valor2);
    document.getElementById("lblResultado").innerText = " Resultado:" + resultado;

}
dividir=function(){
    cmpCaja1=document.getElementById("txtValor1");
    valor1=cmpCaja1.value;
    cmpCaja2=document.getElementById("txtValor2");
    valor2=cmpCaja2.value;
    
    resultado=parseInt(valor1) / parseInt(valor2);
    document.getElementById("lblResultado").innerText = " Resultado:" + resultado;

}

    limpiar=function(){
        cmpCaja1=document.getElementById("txtValor1");
        valor1=cmpCaja1.value;
        cmpCaja2=document.getElementById("txtValor2");
        valor2=cmpCaja2.value;
        cmpCaja1.value= " 0";
        cmpCaja2.value= "0 ";
        lblResultado=document.getElementById("lblResultado");
        lblResultado.innerText= "  ";

    
        
    }
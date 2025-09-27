let notas=[];
agreagarlementos=function(){
    notas.push(5);
    notas.push(10);
console.log(notas.length);
}
recorrerArreglo=function(){
    let notaR;
    for(let indice=0;indice<notas.length;indice++){
       notaR=notas[indice];
       console.log(notaR);

    }
}
probarAgregar=function(){
    let notaRecuperada;
    notaRecuperada=recuperarInt("txtNotas");
    agregarNota(notaRecuperada);

}

agregarNota=function(nota){
notas.push(nota);
mostrarNotas();

}
calcularPromedio = function () {
    let sumaNotas = 0;
    let promedio = 0;

    for (let i = 0; i < notas.length; i++) {
        sumaNotas = sumaNotas + notas[i];
    }

    if (notas.length > 0) {
        promedio = sumaNotas / notas.length;
    }

    return promedio;
}
ejecutarPromedio = function () {
    let resultado = calcularPromedio();
    mostrarTexto("lblPromedio", "Promedio: " + resultado);
}
generarTabla=function(){
    let contenidoTabla=" ";
    let cmpTabla=document.getElementById("divTabla");
    contenidoTabla+="<table><tr><td>UNO</td></tr>"+"<tr><td>DOS</td></tr></table>";
    cmpTabla.innerHTML=contenidoTabla;
}
mostrarNotas=function(){
        let cmpTabla=document.getElementById("divTabla");
        let contenidoTabla="<table><tr><th>NOTA</th></tr>";
        let miNota;
        for(let i=0;i<notas.length;i++){
            miNota=notas[i];
            contenidoTabla+="<tr><td>";
            contenidoTabla+=miNota;
            contenidoTabla+="</tr></td>";
        }
        contenidoTabla+="</table>";
        cmpTabla.innerHTML=contenidoTabla;
}


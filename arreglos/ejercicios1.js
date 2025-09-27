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
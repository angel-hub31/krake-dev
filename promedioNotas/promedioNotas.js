calcularPromedioNotas=function(){
    let nota1=recuperarFlotante("txtNota1");
    let nota2=recuperarFlotante("txtNota2");
    let nota3=recuperarFlotante("txtNota3");
    promedio=calcularPromedio(nota1,nota2,nota3);
    resultadoFormateado=promedio.toFixed(2);

    mostrarTexto("lblPromedio",resultadoFormateado);
    if(resultadoFormateado<5 && resultadoFormateado>0){
            mostrarTexto("lblMensaje","REPROBADO");
            cambiarImagen("imgFoto","mal.gif");
    }else if(resultadoFormateado>=5 && resultadoFormateado<=8){
       mostrarTexto("lblMensaje","BUEN TRABAJO");
       cambiarImagen("imgFoto","bien.gif");  
    }else if(resultadoFormateado>8 && resultadoFormateado<=10){
        mostrarTexto("lblMensaje","excelente");
        cambiarImagen("imgFoto","excelente.gif");  

    }else if(resultadoFormateado<=0){
        mostrarTexto("lblMensaje","DATOS INCORRECTOS");
        cambiarImagen("imgFoto","homero.gif");  
    }
}



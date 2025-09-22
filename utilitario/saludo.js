saludar=function(){
    //  recuperamos la caja de texto txtNombre
    let  nombre=recuperarTexto("txtNombre");
    //  recuperamos la caja de texto txtApellido
    let apellido=recuperarTexto("txtApellido");
     //  recuperamos la caja de texto txtEdad
    let edad=recuperarTexto("txtEdad");
    //  recuperamos la caja de texto txtEstatura
    let estatura=recuperarTexto("txtEstatura");
    
    let mensajeBienvenida="Bienvenido "+nombre+" "+apellido;
    mostrarTexto("lblResultado", mensajeBienvenida);
}

mostrarTexto=function(idComponente,mensaje){
    let componente;
    componente=document.getElementById(idComponente);
    componente.innerText=mensaje;
}
recuperarTexto=function(idComponente){
   let componente;    
   let valorIngresado;
   componente=document.getElementById(idComponente);
   valorIngresado=componente.value;
   return valorIngresado;
}
recuperarInt=function(idComponente){
   let valorCaja =recuperarTexto(idComponente);
   let valorEntero=parseInt(valorCaja);
   return valorEntero;
}
recuperarFloat=function(idComponente){
   let valorCaja =recuperarTexto(idComponente);
   let valorFlotante=parseFloat(valorCaja);
   return valorFlotante;
}

recuperarTexto=function(idComponente){
   let componente;    
   let valorIngresado;
   componente=document.getElementById(idComponente);

   valorIngresado=componente.value;
   return valorIngresado;

}
saludar=function(){
    //  recuperamos la caja de texto txtNombre
  let  nombre=recuperarTexto("txtNombre");
    //  recuperamos la caja de texto txtNombre
   let apellido=recuperarTexto("txtApellido");
}

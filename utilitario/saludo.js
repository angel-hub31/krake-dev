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
    mostarImagen("imgSaludo","./imagenes/7NcB.gif");
    mostarTextoEnCaja("txtNombre", "");
}

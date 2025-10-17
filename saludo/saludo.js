saludar=function(){
    // Recupera el texto ingresado en el campo de texto (input) con el ID "txtNombre".
    let nombre=recuperarTexto("txtNombre"); 
    
    // Recupera el texto ingresado en el campo de texto (input) con el ID "txtApellido".
    let apellido=recuperarTexto("txtApellido"); 
    
    // Recupera el texto ingresado en el campo de texto (input) con el ID "txtEdad".
    // Nota: Aunque la edad generalmente es un número, se recupera como texto.
    let edad=recuperarTexto("txtEdad"); 
    
    // Recupera el texto ingresado en el campo de texto (input) con el ID "txtEstatura".
    // Nota: Aunque la estatura generalmente es un número, se recupera como texto.
    let estatura=recuperarTexto("txtEstatura"); 
    
    // Construye la cadena de texto del mensaje de bienvenida, concatenando "Bienvenido", el nombre y el apellido.
    let mensajeBienvenida="Bienvenido "+nombre+" "+apellido; 
    
    // Muestra la cadena 'mensajeBienvenida' en el componente (típicamente una etiqueta o div) con el ID "lblResultado".
    mostrarTexto("lblResultado", mensajeBienvenida); 
    
    // Muestra una imagen en el componente (típicamente una etiqueta <img>) con el ID "imgSaludo", usando la ruta especificada.
    mostarImagen("imgSaludo","./imagenes/7NcB.gif");
    
    // Limpia el contenido del campo de texto con el ID "txtNombre", estableciendo su valor a una cadena vacía.
    mostarTextoEnCaja("txtNombre", ""); 
}
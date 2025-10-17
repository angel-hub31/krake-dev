// ===============================================
// FUNCIÓN: SALUDAR (Cambia una imagen y registra un mensaje)
// ===============================================
saludar = function () {
    let cmpImagenSaludo;
    
    // 1. Obtiene la referencia al elemento HTML (asumiblemente una etiqueta <img>) 
    //    que tiene el id "imgSaludo".
    cmpImagenSaludo = document.getElementById("imgSaludo");
    
    // 2. Modifica la propiedad 'src' (source/fuente) de ese elemento.
    //    Esto cambia la imagen visible en la página web por el archivo "./imagenes/giphy.gif".
    cmpImagenSaludo.src = "./imagenes/giphy.gif"
    
    // 3. Imprime un mensaje en la consola del navegador.
    //    Esto sirve como una pista o registro para el desarrollador que la función se ejecutó.
    console.log("Ingresa a saludar");
}







let testNumber = 0;
let imagenPordefecto = "https://www.latercera.com/resizer/sDZWiBfVXmWWAXUy2SQ9l2ax12w=/arc-anglerfish-arc2-prod-copesa/public/AWZCXRQ2GNBCNEEMYD6CBRQYX4.jpg"
let testCorrecto = "https://media.tenor.com/lHaSX49JtGwAAAAC/ta-bien-esta-bien.gif"
let testIncorrecto = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWJkNnZrMG9lbGkzeTZ3M3hjdTZnbXZsZWs3c3MzYmE5Y28zc2tkMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eBi558sgJjdn2/giphy.gif"
let testCompletado = "https://media.tenor.com/30Q2AgaXvBgAAAAC/minions-animo.gif"

testSumar = function() {
    let resultadoSuma;
    mostrarDatosTest();
    setTextoComponente("Testear Suma","nombreTest")
    
    resultadoSuma = sumar(5,8,10)
    setTextoComponente(23,"respuestaEsperada")
    setTextoComponente(resultadoSuma,"respuestaRecibida")
    if(resultadoSuma == 23){
        setImagen(testCorrecto)
        testNumber = 1;
        mostrarButton();
    }else{
        setImagen(testIncorrecto)
    }
}

testObtenerInfo = function() {
    let resultadoObtenerInfo;
    mostrarDatosTest()
    resultadoObtenerInfo = obtenerInfo("Richie","Carapaz","Ciclista")
    setTextoComponente("Testear Obtener Info","nombreTest")

    setTextoComponente("Richie Carapaz - Ciclista","respuestaEsperada")
    setTextoComponente(resultadoObtenerInfo,"respuestaRecibida")
    if(resultadoObtenerInfo == "Richie Carapaz - Ciclista"){
        setImagen(testCorrecto)
        testNumber = 2;
    }else{
        setImagen(testIncorrecto)
    }
}

testMostrarResultado = function() {
    const resultadoEsperado = "El resultado de sumar 10 + 5 es 15";
    const resultadoCapturado = captureConsoleLog(() => {
        mostrarResultado(10, 5, 15);
    });
    mostrarDatosTest()
    setTextoComponente("Testear Mostrar Resultado","nombreTest")

    setTextoComponente(resultadoEsperado,"respuestaEsperada")
    setTextoComponente(resultadoCapturado,"respuestaRecibida")
    if(resultadoCapturado === resultadoEsperado){
        setImagen(testCorrecto)
        testNumber = 3;
    }else{
        setImagen(testIncorrecto)
    }
}

function captureConsoleLog(callback) {
    const originalConsoleLog = console.log;
    let capturedMessage = '';
    console.log = (message) => {
        capturedMessage += message + '\n';
    };
    callback();
    console.log = originalConsoleLog;
    return capturedMessage.trim();
}

testHackearNasaEnPelicula = function() {
    let resultadosCapturados;
    const resultadosEsperados = 
        "Hackeando nasa 0%\nHackeando nasa 20%\nHackeando nasa 40%\nHackeando nasa 60%\nHackeando nasa 80%\nHackeando nasa 90%\nHackeando nasa 99%\nLa nasa ha sido hackeada"
    ;
    resultadosCapturados = captureConsoleLog(() => {
        hackearNasaEnPelicula();
    });
    mostrarDatosTest()
    setTextoComponente("Testear Hackear Nasa En Pelicula","nombreTest")

    setTextoComponente(resultadosEsperados,"respuestaEsperada")
    setTextoComponente(resultadosCapturados,"respuestaRecibida")

    if(JSON.stringify(resultadosCapturados) === JSON.stringify(resultadosEsperados)){
        setImagen(testCorrecto)
        testNumber = 4;
    }else{
        setImagen(testIncorrecto)
    }
}

function captureVariosConsoleLog(callback) {
    const originalConsoleLog = console.log;
    const capturedMessages = [];
    
    console.log = (...messages) => {
        capturedMessages.push(messages.join(' '));
    };
    
    callback(); // Llamamos a la función de callback para capturar los mensajes
    
    // Restaurar console.log al valor original después de capturar los mensajes
    console.log = originalConsoleLog;
    
    return capturedMessages;
}

function calcularEdadTest(anioNacimiento) {
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    return anioActual - anioNacimiento;
}


testCalcularEdad = function () {
    let resultadoEdad;
    resultadoEdad = calcularEdad(2002)
    resultadoEdadTest = calcularEdadTest(2002)
    mostrarDatosTest()
    setTextoComponente("Testear Calcular Edad", "nombreTest")

    setTextoComponente(resultadoEdadTest, "respuestaEsperada")
    setTextoComponente(resultadoEdad, "respuestaRecibida")
    if (resultadoEdad == resultadoEdadTest) {
        setImagen(testCorrecto)
        testNumber = 5;
    } else {
        setImagen(testIncorrecto)
    }
}

testCalcularIVA = function() {
    let resultadoCalcularIva;
    resultadoCalcularIva = parseInt(resultadoCalcularIva = calcularIVA(200))
    mostrarDatosTest();
    setTextoComponente("Testear Calcular Iva","nombreTest")

    setTextoComponente(224,"respuestaEsperada")
    setTextoComponente(resultadoCalcularIva,"respuestaRecibida")

    if(resultadoCalcularIva == 224){
        setImagen(testCorrecto)
        testNumber = 6;
    }else{
        setImagen(testIncorrecto)
    }
}

testRepasar = function(){
    const resultadoCapturado = captureConsoleLog(() => {
        repasar();
    });
    mostrarDatosTest()
    setTextoComponente("Testear Repasar","nombreTest")
    setTextoComponente("Esta función fue creada solo para hacer un ejemplo de una función que no recibe nada y no retorna nada","respuestaEsperada")
    setTextoComponente(resultadoCapturado,"respuestaRecibida")
    if(resultadoCapturado == "Esta función fue creada solo para hacer un ejemplo de una función que no recibe nada y no retorna nada"){
        setImagen(testCorrecto);
        testNumber = 7;
    }else{
        setImagen(testIncorrecto)
    }
}

testRepasarMas = function () {
    let resultadoRepasarMas;
    resultadoRepasarMas = repasarMas();
    mostrarDatosTest();
    setTextoComponente("Testear Repasar Más","nombreTest")

    setTextoComponente("En este punto debemos estar super claros en crear funciones","respuestaEsperada")
    setTextoComponente(resultadoRepasarMas,"respuestaRecibida")

    if(resultadoRepasarMas == "En este punto debemos estar super claros en crear funciones"){
        setImagen(testCorrecto)
        testNumber = 8;
    }else{
        setImagen(testIncorrecto)
    }
}

testLlamarAtencion = function () {
    let resultadoLlamarAtencion;
    mostrarDatosTest()
    setTextoComponente("Testear Llamar Atencion","nombreTest")
    resultadoLlamarAtencion = llamarAtencion("Programador KrakeDev","no te olvides de cerrar los tags");

    setTextoComponente("Programador KrakeDev no te olvides de cerrar los tags !!","respuestaEsperada")
    setTextoComponente(resultadoLlamarAtencion,"respuestaRecibida")

    if(resultadoLlamarAtencion == "Programador KrakeDev no te olvides de cerrar los tags !!"){
        setImagen(testCorrecto)
        testNumber = 9;
    }else{
        setImagen(testIncorrecto)
    }
}

siguienteTest = function(){
    setImagen(imagenPordefecto);
    ocultarDatosTest();
    if(testNumber == 1){
        mostrarOcultarBoton(true, "buttonTestSuma")
        mostrarOcultarBoton(false, "buttonTestObtenerInfo")
    }
    if(testNumber == 2){
        mostrarOcultarBoton(true, "buttonTestObtenerInfo")
        mostrarOcultarBoton(false, "buttonTestMostrarResultado")
    }
    if(testNumber == 3){
        mostrarOcultarBoton(true, "buttonTestMostrarResultado")
        mostrarOcultarBoton(false, "buttonTestHackearNasaEnPelicula")
    }
    if(testNumber == 4){
        mostrarOcultarBoton(true, "buttonTestHackearNasaEnPelicula")
        mostrarOcultarBoton(false, "buttonTestCalcularEdad")
    }
    if(testNumber == 5){
        mostrarOcultarBoton(true, "buttonTestCalcularEdad")
        mostrarOcultarBoton(false, "buttonCalcularIVA" )
    }
    if(testNumber == 6){
        mostrarOcultarBoton(true, "buttonCalcularIVA")
        mostrarOcultarBoton(false, "buttonRepasar" )
    }
    if(testNumber == 7){
        mostrarOcultarBoton(true, "buttonRepasar" )
        mostrarOcultarBoton(false, "buttonRepasarMas")
    }
    if(testNumber == 8){
        mostrarOcultarBoton(true, "buttonRepasarMas")
        mostrarOcultarBoton(false, "buttonLlamarAtencion" )
    }if(testNumber == 9){
        cambiarBoton()
        testNumber = 10;
    }else if(testNumber == 10){
        ocultarBotones("botones")
        ocultarBotones("buttonSiguienteTest")
        setImagen(testCompletado)
    }
}


function setImagen(rutaImagen) {
    let cmpImagenResultado;
    cmpImagenResultado = document.getElementById("imgResultado")
    cmpImagenResultado.src = rutaImagen
}

function setTextoComponente(cambioTexto, idComponente){
    let cmpComponenteTexto;
    cmpComponenteTexto = document.getElementById(idComponente)
    cmpComponenteTexto.innerText = cambioTexto
    
}

function mostrarButton(){
    let cmpButtonSiguiente;
    cmpButtonSiguiente = document.getElementById("buttonSiguienteTest")
    cmpButtonSiguiente.hidden = false
}

function mostrarOcultarBoton(ocultar, idButton){
    let cmpButtonSeleccionado;
    cmpButtonSeleccionado = document.getElementById(idButton)
    cmpButtonSeleccionado.disabled=ocultar
}

function ocultarBotones(idButton){
    let cmpButtonSeleccionado;
    cmpButtonSeleccionado = document.getElementById(idButton)
    cmpButtonSeleccionado.style.display = "none"
}

function mostrarDatosTest(){
    let cmpDatosTest;
    cmpDatosTest = document.getElementById("datosTesteo")
    cmpDatosTest.style.display = "flex"
}

function ocultarDatosTest(){
    let cmpDatosTest;
    cmpDatosTest = document.getElementById("datosTesteo")
    cmpDatosTest.style.display = "none"
}

function cambiarBoton(){
    let cmpButton;
    cmpButton = document.getElementById("buttonSiguienteTest")
    cmpButton.value = "FINALIZAR"
}
movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

cargar=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    
}

filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta=[];
    //Se barre el arreglo de movimientos
    //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
    //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
    for (let i = 0; i < movimientos.length; i++) {
        if (movimientos[i].numeroCuenta === numeroCuenta) {
            movimientosCuenta.push(movimientos[i]);
        }
    }
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
    mostrarMovimientos(movimientosCuenta);
}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos=function(misMovimientos){
    let tablaHTML = '<table class="tablaMovimientos">';
    
    // Encabezados de la tabla
    tablaHTML += '<thead><tr><th>CUENTA</th><th>MONTO</th><th>OPERACION</th></tr></thead>';
    
    // Cuerpo de la tabla
    tablaHTML += '<tbody>';
    
    misMovimientos.forEach(movimiento => {
        let montoAMostrar = movimiento.monto;
        let tipoOperacion = '';
        
        // Aplica la lógica de signo al monto
        if (movimiento.tipo === "D") { // DEBITO
            montoAMostrar = montoAMostrar * -1; // Mostrar en negativo
            tipoOperacion = 'DEBITO';
        } else if (movimiento.tipo === "C") { // CREDITO
            // Se muestra en positivo, no necesita multiplicación
            tipoOperacion = 'CREDITO';
        }
        
        // Construye la fila de la tabla
        tablaHTML += `<tr>
            <td>${movimiento.numeroCuenta}</td>
            <td>${montoAMostrar.toFixed(2)}</td>
            <td>${tipoOperacion}</td>
        </tr>`;
    });
    
    tablaHTML += '</tbody></table>';

    // Muestra en pantalla la tabla en el div con id="tablaMovimientos"
    // Usando la función mostrarTexto del archivo utilitarios.js
    mostrarTexto("tablaMovimientos", tablaHTML); 
}

// Nueva función para manejar la búsqueda al presionar el botón
buscarMovimientos=function(){
    // El CAMPO 1 en movimientos.html (donde se ingresa el número de cuenta) necesita un ID.
    // Asumiendo que le asignaremos el ID 'txtNumeroCuenta' en movimientos.html.
    let numeroCuenta = recuperarTexto("txtNumeroCuenta");
    
    if (numeroCuenta) {
        filtrarMovimientos(numeroCuenta);
    } else {
        mostrarTexto("tablaMovimientos", "Por favor, ingrese un número de cuenta.");
    }
}



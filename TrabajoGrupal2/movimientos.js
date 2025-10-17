// Arreglo global 'movimientos': Contiene la lista de todos los movimientos bancarios.
// Cada elemento es un objeto con la cuenta, el monto y el tipo de operación.
movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"}, // Movimiento de la cuenta 02234567, débito (D) de 10.24
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"}, // Movimiento de la cuenta 02345211, débito (D) de 45.90
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"}, // Movimiento de la cuenta 02234567, crédito (C) de 65.23
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"}, // Movimiento de la cuenta 02345211, crédito (C) de 65.23
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},  // Movimiento de la cuenta 02345211, débito (D) de 12.0
]

// Función 'cargar': Se ejecuta típicamente al cargar la página o al navegar a la sección de movimientos.
cargar=function(){
    // Muestra el componente (div) que contiene la interfaz para ver movimientos.
    mostrarComponente("divMovimientos"); 
    // Oculta otros componentes relacionados con cuentas y transacciones para enfocarse en movimientos.
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
}

// Función 'filtrarMovimientos': Recibe un número de cuenta y filtra el arreglo global 'movimientos'.
// Solo mantiene los movimientos que coinciden con el número de cuenta proporcionado.
filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta=[]; // Inicializa un arreglo vacío para guardar los movimientos filtrados.
    
    // Se barre el arreglo de movimientos
    // Itera sobre el arreglo global 'movimientos'.
    for (let i = 0; i < movimientos.length; i++) {
        // En cada iteración, verifica si el numero de cuenta del movimiento actual es igual al que recibe como parametro
        if (movimientos[i].numeroCuenta === numeroCuenta) {
            // En caso de serlo, agrega el movimiento al arreglo movimientosCuenta
            movimientosCuenta.push(movimientos[i]);
        }
    }
    // Invoca a 'mostrarMovimientos', pasándole como parámetro el arreglo con los movimientos filtrados.
    mostrarMovimientos(movimientosCuenta);
}

/*
    Función 'mostrarMovimientos': Recibe un arreglo con los movimientos a mostrar y genera la tabla HTML.
*/
mostrarMovimientos=function(misMovimientos){
    // Inicia la construcción de la cadena HTML para la tabla.
    let tablaHTML = '<table class="tablaMovimientos">';
    
    // Encabezados de la tabla
    tablaHTML += '<thead><tr><th>CUENTA</th><th>MONTO</th><th>OPERACION</th></tr></thead>';
    
    // Cuerpo de la tabla
    tablaHTML += '<tbody>';
    
    // Itera sobre cada movimiento en el arreglo 'misMovimientos' (usando forEach para simplificar la iteración).
    misMovimientos.forEach(movimiento => {
        let montoAMostrar = movimiento.monto; // Variable temporal para el monto.
        let tipoOperacion = ''; // Variable para el texto de la operación.
        
        // Aplica la lógica de signo al monto
        if (movimiento.tipo === "D") { // Si el tipo es "D" (DEBITO)
            montoAMostrar = montoAMostrar * -1; // Mostrar el monto en negativo (resta).
            tipoOperacion = 'DEBITO'; // Asigna el texto "DEBITO".
        } else if (movimiento.tipo === "C") { // Si el tipo es "C" (CREDITO)
            // Se muestra en positivo, no necesita multiplicación
            tipoOperacion = 'CREDITO'; // Asigna el texto "CREDITO".
        }
        
        // Construye la fila de la tabla usando template strings (`) para facilitar la inclusión de variables.
        tablaHTML += `<tr>
            <td>${movimiento.numeroCuenta}</td> 
            <td>${montoAMostrar.toFixed(2)}</td> <td>${tipoOperacion}</td>
        </tr>`;
    });
    
    tablaHTML += '</tbody></table>'; // Cierra las etiquetas del cuerpo y la tabla.

    // Muestra en pantalla la tabla en el div con id="tablaMovimientos"
    // Usando la función 'mostrarTexto' (asumiendo que está definida en utilitarios.js).
    mostrarTexto("tablaMovimientos", tablaHTML); 
}

// Nueva función 'buscarMovimientos': Maneja la acción de búsqueda al presionar un botón.
buscarMovimientos=function(){
    // El CAMPO 1 en movimientos.html (donde se ingresa el número de cuenta) necesita un ID.
    // Asumiendo que le asignaremos el ID 'txtNumeroCuenta' en movimientos.html.
    // Llama a la función 'recuperarTexto' (asumiendo que está definida en utilitarios.js) para obtener el valor del input.
    let numeroCuenta = recuperarTexto("txtNumeroCuenta"); 
    
    // Verifica si se ingresó un número de cuenta.
    if (numeroCuenta) {
        // Si hay un número de cuenta, llama a la función para filtrar y mostrar los movimientos.
        filtrarMovimientos(numeroCuenta);
    } else {
        // Si no se ingresó nada, muestra un mensaje de error en el área de la tabla.
        mostrarTexto("tablaMovimientos", "Por favor, ingrese un número de cuenta.");
    }
}
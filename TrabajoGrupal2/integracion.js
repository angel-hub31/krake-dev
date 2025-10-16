

cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

// Funciones para manejo de vistas
cargarIntegracion=function(){
    mostrarCuentasView(); // Mostrar Cuentas por defecto al cargar
}

mostrarCuentasView=function(){
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    mostrarCuentas(); 
}

mostrarTransaccionesView=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    // Lógica de cargar transacciones (copiada de transacciones.js cargar)
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    mostrarTextoEnCaja("txtNumeroCuenta", "");
    mostrarTextoEnCaja("txtInfoCuenta", "");
    mostrarTextoEnCaja("txtMonto", "");
}

mostrarMovimientosView=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    // Limpiar tabla de movimientos al cambiar de vista
    mostrarTexto("tablaMovimientos", "Ingrese un número de cuenta y presione 'VER MOVIMIENTOS'");
    mostrarTextoEnCaja("txtNumeroCuentaMovimientos", "");
}
// La caja de texto para número de cuenta en movimientos.html no tiene ID. Asumiré `txtNumeroCuentaMovimientos` para evitar conflicto con la de transacciones.html. Voy a revisar movimientos.html, sí tiene ID `txtNumeroCuenta` en movimientos.html. transacciones.html también usa `txtNumeroCuenta`. Mejor uso diferentes IDs en integracion.html para evitar conflictos. Voy a usar `txtNumeroCuentaTransacciones` y `txtNumeroCuentaMovimientos`.

// REVISANDO ID's en HTML para evitar conflictos:
// cuentas.html: txtCedula, txtNombre, txtApellido, txtNumeroCuenta (para crear cuenta)
// transacciones.html: txtNumeroCuenta (para buscar cuenta), txtInfoCuenta, txtMonto
// movimientos.html: txtNumeroCuenta (para buscar movimientos)

// Para `integracion.html`:
// CUENTAS: txtCedula, txtNombre, txtApellido, txtNumeroCuentaCuentas
// TRANSACCIONES: txtNumeroCuentaTransacciones, txtInfoCuenta, txtMonto
// MOVIMIENTOS: txtNumeroCuentaMovimientos

// Voy a renombrar los IDs y las llamadas a `recuperarTexto` y `mostrarTextoEnCaja` en el JS integrado.

// Reimplementando Funciones de Vista
cargarIntegracion=function(){
    mostrarCuentasView(); // Mostrar Cuentas por defecto al cargar
}

mostrarCuentasView=function(){
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    mostrarCuentas(); 
}

mostrarTransaccionesView=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    // Lógica de cargar transacciones (copiada de transacciones.js cargar)
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    mostrarTextoEnCaja("txtNumeroCuentaTransacciones", "");
    mostrarTextoEnCaja("txtInfoCuenta", "");
    mostrarTextoEnCaja("txtMonto", "");
}

mostrarMovimientosView=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    // Limpiar tabla de movimientos al cambiar de vista
    mostrarTexto("tablaMovimientos", " ");
    mostrarTextoEnCaja("txtNumeroCuentaMovimientos", "");
}






// Función para buscar cuenta (presente en cuentas.js y transacciones.js, se mantiene solo una)
buscarCuenta=function(numeroCuenta){
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta == numeroCuenta) {
            return cuentas[i]; // Retorna el objeto cuenta
        }
    }
    return null; // No se encontró la cuenta
}

// Funciones de cuentas.js
mostrarCuentas=function(){
    /* ... (código de mostrarCuentas de cuentas.js) ... */
    let contenidoTabla = `
        <table>
            <thead>
                <tr>
                    <th>CUENTA</th>
                    <th>CEDULA</th>
                    <th>NOMBRE</th>
                    <th>SALDO</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for (let i = 0; i < cuentas.length; i++) {
        let cuenta = cuentas[i];
        let nombreCompleto = cuenta.nombre + " " + cuenta.apellido;
        
        contenidoTabla += `
            <tr>
                <td>${cuenta.numeroCuenta}</td>
                <td>${cuenta.cedula}</td>
                <td>${nombreCompleto}</td>
                <td>$${cuenta.saldo.toFixed(2)}</td>
            </tr>
        `;
    }

    contenidoTabla += `
            </tbody>
        </table>
    `;

    mostrarTexto("divTablaCuentas", contenidoTabla); 
}

agregarCuenta=function(cuenta){
    let cuentaEncontrada = buscarCuenta(cuenta.numeroCuenta);

    if (cuentaEncontrada) {
        alert(" CUENTA EXISTENTE: Ya hay una cuenta con el numero " + cuenta.numeroCuenta);
    } else {
        cuentas.push(cuenta);
        alert(" CUENTA AGREGADA: Cuenta " + cuenta.numeroCuenta + " creada exitosamente.");
    }
}

agregar=function(){
    let cedula = recuperarTexto("txtCedula");
    let nombre = recuperarTexto("txtNombre");
    let apellido = recuperarTexto("txtApellido");
    let numeroCuenta = recuperarTexto("txtNumeroCuentaCuentas"); // <--- ID modificado
    
    let nuevaCuenta = {
        numeroCuenta: numeroCuenta, 
        cedula: cedula, 
        nombre: nombre, 
        apellido: apellido, 
        saldo: 0.0
    };
    
    agregarCuenta(nuevaCuenta);
    mostrarCuentas();

    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");
    mostrarTextoEnCaja("txtNumeroCuentaCuentas", "");
}


// Modificada para usar el nuevo ID
ejecutarBusqueda=function(){
    const numeroCuenta = recuperarTexto("txtNumeroCuentaTransacciones"); // <--- ID modificado
    const cuentaEncontrada = buscarCuenta(numeroCuenta);
    
    if(cuentaEncontrada !== null) {
        const info = ` ${cuentaEncontrada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info);
        habilitarComponente("btnDepositar");
        habilitarComponente("btnRetirar");
        alert("CUENTA ENCONTRADA");
    } else {
        alert("CUENTA INEXISTENTE");
        mostrarTextoEnCaja("txtInfoCuenta", "");
        deshabilitarComponente("btnDepositar");
        deshabilitarComponente("btnRetirar");
    }
}

// Modificada para agregar movimiento
depositar=function(numeroCuenta,monto){
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if (cuentaAfectada) {
        cuentaAfectada.saldo += monto;
        
        // **Crear y agregar movimiento (Tipo: C - CREDITO)**
        movimientos.push({
            numeroCuenta: numeroCuenta,
            monto: monto,
            tipo: "C"
        });
        
    }
    return cuentaAfectada;
}

ejecutarDeposito=function(){
    const numeroCuenta = recuperarTexto("txtNumeroCuentaTransacciones"); // <--- ID modificado
    const monto = recuperarFloat("txtMonto");

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido para depositar.");
        return;
    }
    
    const cuentaActualizada = depositar(numeroCuenta, monto);
    
    if (cuentaActualizada) {
        alert("TRANSACCION EXITOSA");
        const info = `${cuentaActualizada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info);
        mostrarTextoEnCaja("txtMonto", "");
    }
}


// Modificada para agregar movimiento
retirar=function(numeroCuenta,monto){
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if (cuentaAfectada) {
        if (cuentaAfectada.saldo >= monto) {
            cuentaAfectada.saldo -= monto;
            
            // **Crear y agregar movimiento (Tipo: D - DEBITO)**
            movimientos.push({
                numeroCuenta: numeroCuenta,
                monto: monto,
                tipo: "D"
            });
            
            return {cuenta: cuentaAfectada, exito: true};
        } else {
            alert("SALDO INSUFICIENTE");
            return {cuenta: cuentaAfectada, exito: false};
        }
    }
    return null;
}

ejecutarRetiro=function(){
    const numeroCuenta = recuperarTexto("txtNumeroCuentaTransacciones"); // <--- ID modificado
    const monto = recuperarFloat("txtMonto");

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido para retirar.");
        return;
    }

    const resultado = retirar(numeroCuenta, monto);

    if (resultado && resultado.exito) {
        alert("TRANSACCION EXITOSA");
        const cuentaActualizada = resultado.cuenta;
        const info = `${cuentaActualizada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info);
        mostrarTextoEnCaja("txtMonto", "");
    } 
}



// Funciones de movimientos.js
filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta=[];
    for (let i = 0; i < movimientos.length; i++) {
        if (movimientos[i].numeroCuenta === numeroCuenta) {
            movimientosCuenta.push(movimientos[i]);
        }
    }
    mostrarMovimientos(movimientosCuenta);
}

mostrarMovimientos=function(misMovimientos){
    let tablaHTML = '<table class="tablaMovimientos">';
    
    tablaHTML += '<thead><tr><th>CUENTA</th><th>MONTO</th><th>OPERACION</th></tr></thead>';
    
    tablaHTML += '<tbody>';
    
    misMovimientos.forEach(movimiento => {
        let montoAMostrar = movimiento.monto;
        let tipoOperacion = '';
        
        if (movimiento.tipo === "D") { // DEBITO
            montoAMostrar = montoAMostrar * -1; // Mostrar en negativo
            tipoOperacion = 'DEBITO';
        } else if (movimiento.tipo === "C") { // CREDITO
            tipoOperacion = 'CREDITO';
        }
        
        tablaHTML += `<tr>
            <td>${movimiento.numeroCuenta}</td>
            <td>${montoAMostrar.toFixed(2)}</td>
            <td>${tipoOperacion}</td>
        </tr>`;
    });
    
    tablaHTML += '</tbody></table>';

    mostrarTexto("tablaMovimientos", tablaHTML); 
}

// Modificada para usar el nuevo ID
buscarMovimientos=function(){
    let numeroCuenta = recuperarTexto("txtNumeroCuentaMovimientos"); // <--- ID modificado
    
    if (numeroCuenta) {
        filtrarMovimientos(numeroCuenta);
    } else {
        mostrarTexto("tablaMovimientos", "Por favor, ingrese un número de cuenta.");
    }
}
















// ===========================================
// DATOS GLOBALES DEL SISTEMA BANCARIO
// ===========================================

// Arreglo global que almacena todas las cuentas bancarias.
// Inicialmente, tienen saldo 0.0. Los movimientos iniciales se procesan
// a través del arreglo 'movimientos' (aunque en este código, el saldo
// solo se actualiza al llamar a 'depositar' o 'retirar').
cuentas=[
 {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
  {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

// Arreglo global que almacena el historial de transacciones.
// 'D' significa Débito (resta dinero), 'C' significa Crédito (suma dinero).
movimientos=[
 {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
 {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
 {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
 {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
 {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

// ===========================================
// FUNCIONES PARA MANEJO DE VISTAS (SPA)
// (Controlan qué componente de la interfaz de usuario es visible)
// ===========================================

// Función principal que se llama al cargar la página (similar a un 'onload').
cargarIntegracion=function(){
 mostrarCuentasView(); // Por defecto, muestra la vista de Cuentas.
}

// Muestra la vista de gestión y listado de Cuentas.
mostrarCuentasView=function(){
 mostrarComponente("divCuentas"); // Hace visible el DIV de Cuentas.
ocultarComponente("divMovimientos"); // Oculta el DIV de Movimientos.
 ocultarComponente("divTransacciones"); // Oculta el DIV de Transacciones.
 mostrarCuentas(); // Llama a la función para refrescar la tabla de cuentas.
}

// Muestra la vista para realizar Depósitos y Retiros (Transacciones).
mostrarTransaccionesView=function(){
 mostrarComponente("divTransacciones"); // Hace visible el DIV de Transacciones.
ocultarComponente("divCuentas"); // Oculta el DIV de Cuentas.
 ocultarComponente("divMovimientos"); // Oculta el DIV de Movimientos.
 // Limpia y prepara la interfaz para una nueva transacción:
 deshabilitarComponente("btnDepositar"); // Deshabilita el botón de Depósito.
 deshabilitarComponente("btnRetirar"); // Deshabilita el botón de Retiro.
 mostrarTextoEnCaja("txtNumeroCuentaTransacciones", ""); // Limpia el campo de Número de Cuenta.
 mostrarTextoEnCaja("txtInfoCuenta", ""); // Limpia el campo de Saldo.
 mostrarTextoEnCaja("txtMonto", ""); // Limpia el campo de Monto.
}

// Muestra la vista para consultar el historial de Movimientos.
mostrarMovimientosView=function(){
 mostrarComponente("divMovimientos"); // Hace visible el DIV de Movimientos.
 ocultarComponente("divCuentas"); // Oculta el DIV de Cuentas.
 ocultarComponente("divTransacciones"); // Oculta el DIV de Transacciones.
 
 // Limpia la tabla y el campo de búsqueda al cambiar de vista.
mostrarTexto("tablaMovimientos", " "); // Limpia el contenido de la tabla de movimientos.
 mostrarTextoEnCaja("txtNumeroCuentaMovimientos", ""); // Limpia el campo de Número de Cuenta.
}


// ===========================================
// FUNCIONES COMUNES (Búsqueda de Datos)
// ===========================================

// Busca un objeto cuenta dentro del arreglo 'cuentas' por su número.
// @param {string} numeroCuenta - El número de cuenta a buscar.
// @returns {object|null} - El objeto cuenta si se encuentra, o null.
buscarCuenta=function(numeroCuenta){
 for (let i = 0; i < cuentas.length; i++) {
 if (cuentas[i].numeroCuenta == numeroCuenta) {
 return cuentas[i]; // Retorna el objeto cuenta encontrado.
 }
 }
 return null; // No se encontró la cuenta.
}

// ===========================================
// FUNCIONES DE CUENTAS (cuentas.js)
// ===========================================

// Genera el HTML para mostrar todas las cuentas en una tabla.
mostrarCuentas=function(){
 // Inicia la estructura de la tabla HTML.
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
 
 // Itera sobre cada cuenta en el arreglo global 'cuentas'.
 for (let i = 0; i < cuentas.length; i++) {
 let cuenta = cuentas[i];
 let nombreCompleto = cuenta.nombre + " " + cuenta.apellido;
 // Agrega una fila (<tr>) a la tabla por cada cuenta.
 contenidoTabla += `
 <tr>
 <td>${cuenta.numeroCuenta}</td>
 <td>${cuenta.cedula}</td>
 <td>${nombreCompleto}</td>
 <td>$${cuenta.saldo.toFixed(2)}</td> // Muestra el saldo con 2 decimales.
 </tr>
 `;
 }

    // Cierra la estructura de la tabla HTML.
    contenidoTabla += `
            </tbody>
        </table>
    `;

    // Muestra el HTML generado en el componente 'divTablaCuentas'.
    mostrarTexto("divTablaCuentas", contenidoTabla); 
}

// Agrega una nueva cuenta al arreglo 'cuentas', previa verificación.
// @param {object} cuenta - El objeto cuenta a agregar.
agregarCuenta=function(cuenta){
    let cuentaEncontrada = buscarCuenta(cuenta.numeroCuenta);

    if (cuentaEncontrada) {
        // Si la cuenta ya existe, muestra un mensaje de error.
        alert(" CUENTA EXISTENTE: Ya hay una cuenta con el numero " + cuenta.numeroCuenta);
    } else {
        // Si no existe, agrega la nueva cuenta al arreglo.
        cuentas.push(cuenta);
        alert(" CUENTA AGREGADA: Cuenta " + cuenta.numeroCuenta + " creada exitosamente.");
    }
}

// Captura los datos del formulario y llama a 'agregarCuenta'.
agregar=function(){
    // 1. Recupera los valores de las cajas de texto (inputs).
    let cedula = recuperarTexto("txtCedula");
    let nombre = recuperarTexto("txtNombre");
    let apellido = recuperarTexto("txtApellido");
    let numeroCuenta = recuperarTexto("txtNumeroCuentaCuentas"); // <-- Usa el ID modificado
    
    // 2. Crea el nuevo objeto cuenta.
    let nuevaCuenta = {
        numeroCuenta: numeroCuenta, 
        cedula: cedula, 
        nombre: nombre, 
        apellido: apellido, 
        saldo: 0.0 // Se inicializa con saldo cero.
    };
    
    // 3. Intenta agregar la cuenta.
    agregarCuenta(nuevaCuenta);
    // 4. Refresca la tabla de cuentas para mostrar la nueva.
    mostrarCuentas();

    // 5. Limpia los campos del formulario.
    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");
    mostrarTextoEnCaja("txtNumeroCuentaCuentas", "");
}


// ===========================================
// FUNCIONES DE TRANSACCIONES (transacciones.js)
// ===========================================

// Busca una cuenta para mostrar su información y habilitar transacciones.
ejecutarBusqueda=function(){
    // 1. Recupera el número de cuenta ingresado.
    const numeroCuenta = recuperarTexto("txtNumeroCuentaTransacciones"); // <-- Usa el ID modificado
    // 2. Busca la cuenta.
    const cuentaEncontrada = buscarCuenta(numeroCuenta);
    
    if(cuentaEncontrada !== null) {
        // Si la encuentra:
        const info = ` ${cuentaEncontrada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info); // Muestra el saldo actual.
        habilitarComponente("btnDepositar"); // Habilita el botón de Depósito.
        habilitarComponente("btnRetirar"); // Habilita el botón de Retiro.
        alert("CUENTA ENCONTRADA");
    } else {
        // Si no la encuentra:
        alert("CUENTA INEXISTENTE");
        mostrarTextoEnCaja("txtInfoCuenta", ""); // Limpia el saldo.
        deshabilitarComponente("btnDepositar"); // Deshabilita botones.
        deshabilitarComponente("btnRetirar"); // Deshabilita botones.
    }
}

// Realiza la operación de depósito y registra el movimiento.
// @param {string} numeroCuenta - La cuenta a depositar.
// @param {number} monto - La cantidad a depositar.
// @returns {object|null} - La cuenta actualizada o null si no se encuentra.
depositar=function(numeroCuenta,monto){
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if (cuentaAfectada) {
        // 1. Actualiza el saldo: suma el monto.
        cuentaAfectada.saldo += monto;
        
        // 2. Registra el movimiento como Crédito ('C').
        movimientos.push({
            numeroCuenta: numeroCuenta,
            monto: monto,
            tipo: "C" 
        });
        
    }
    return cuentaAfectada;
}

// Ejecuta la lógica completa del depósito (validación, llamada a depositar, y actualización de UI).
ejecutarDeposito=function(){
    const numeroCuenta = recuperarTexto("txtNumeroCuentaTransacciones"); // <-- Usa el ID modificado
    const monto = recuperarFloat("txtMonto"); // Recupera el monto como número flotante.

    // 1. Validación: verifica si el monto es válido.
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido para depositar.");
        return;
    }
    
    // 2. Realiza el depósito.
    const cuentaActualizada = depositar(numeroCuenta, monto);
    
    if (cuentaActualizada) {
        // 3. Si fue exitoso, actualiza la UI.
        alert("TRANSACCION EXITOSA");
        const info = `${cuentaActualizada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info); // Muestra el nuevo saldo.
        mostrarTextoEnCaja("txtMonto", ""); // Limpia el campo de monto.
    }
}


// Realiza la operación de retiro y registra el movimiento.
// @param {string} numeroCuenta - La cuenta a retirar.
// @param {number} monto - La cantidad a retirar.
// @returns {object|null} - Objeto con la cuenta y el resultado (exito) o null.
retirar=function(numeroCuenta,monto){
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if (cuentaAfectada) {
        // 1. Verifica si hay saldo suficiente.
        if (cuentaAfectada.saldo >= monto) {
            // 2. Actualiza el saldo: resta el monto.
            cuentaAfectada.saldo -= monto;
            
            // 3. Registra el movimiento como Débito ('D').
            movimientos.push({
                numeroCuenta: numeroCuenta,
                monto: monto,
                tipo: "D"
            });
            
            return {cuenta: cuentaAfectada, exito: true}; // Retiro exitoso.
        } else {
            // Saldo insuficiente.
            alert("SALDO INSUFICIENTE");
            return {cuenta: cuentaAfectada, exito: false}; // Retiro fallido por saldo.
        }
    }
    return null; // Cuenta no encontrada.
}

// Ejecuta la lógica completa del retiro (validación, llamada a retirar, y actualización de UI).
ejecutarRetiro=function(){
    const numeroCuenta = recuperarTexto("txtNumeroCuentaTransacciones"); // <-- Usa el ID modificado
    const monto = recuperarFloat("txtMonto"); // Recupera el monto como número flotante.

    // 1. Validación: verifica si el monto es válido.
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido para retirar.");
        return;
    }

    // 2. Realiza el retiro.
    const resultado = retirar(numeroCuenta, monto);

    if (resultado && resultado.exito) {
        // 3. Si fue exitoso, actualiza la UI.
        alert("TRANSACCION EXITOSA");
        const cuentaActualizada = resultado.cuenta;
        const info = `${cuentaActualizada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info); // Muestra el nuevo saldo.
        mostrarTextoEnCaja("txtMonto", ""); // Limpia el campo de monto.
    } 
    // Nota: El mensaje de "SALDO INSUFICIENTE" ya se maneja dentro de la función 'retirar'.
}


// ===========================================
// FUNCIONES DE MOVIMIENTOS (movimientos.js)
// ===========================================

// Filtra el arreglo global 'movimientos' para una cuenta específica.
// @param {string} numeroCuenta - La cuenta cuyos movimientos se quieren ver.
filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta=[];
    // Itera sobre todos los movimientos.
    for (let i = 0; i < movimientos.length; i++) {
        // Si el número de cuenta coincide, lo agrega al arreglo temporal.
        if (movimientos[i].numeroCuenta === numeroCuenta) {
            movimientosCuenta.push(movimientos[i]);
        }
    }
    // Llama a la función para mostrar los movimientos filtrados.
    mostrarMovimientos(movimientosCuenta);
}

// Genera el HTML de la tabla para mostrar un arreglo de movimientos.
// @param {array} misMovimientos - El arreglo de movimientos a mostrar.
mostrarMovimientos=function(misMovimientos){
    let tablaHTML = '<table class="tablaMovimientos">';
    
    // Encabezado de la tabla.
    tablaHTML += '<thead><tr><th>CUENTA</th><th>MONTO</th><th>OPERACION</th></tr></thead>';
    
    tablaHTML += '<tbody>';
    
    // Itera sobre cada movimiento.
    misMovimientos.forEach(movimiento => {
        let montoAMostrar = movimiento.monto;
        let tipoOperacion = '';
        
        if (movimiento.tipo === "D") { // Débito ('D')
            // Muestra el monto en negativo para indicar una salida de dinero.
            montoAMostrar = montoAMostrar * -1; 
            tipoOperacion = 'DEBITO';
        } else if (movimiento.tipo === "C") { // Crédito ('C')
            tipoOperacion = 'CREDITO';
        }
        
        // Agrega la fila con la información del movimiento.
        tablaHTML += `<tr>
            <td>${movimiento.numeroCuenta}</td>
            <td>${montoAMostrar.toFixed(2)}</td>
            <td>${tipoOperacion}</td>
        </tr>`;
    });
    
    tablaHTML += '</tbody></table>';

    // Muestra el HTML de la tabla en el componente 'tablaMovimientos'.
    mostrarTexto("tablaMovimientos", tablaHTML); 
}

// Captura el número de cuenta de la UI y llama a 'filtrarMovimientos'.
buscarMovimientos=function(){
    let numeroCuenta = recuperarTexto("txtNumeroCuentaMovimientos"); // <-- Usa el ID modificado
    
    if (numeroCuenta) {
        // Si hay número de cuenta, busca y muestra los movimientos.
        filtrarMovimientos(numeroCuenta);
    } else {
        // Si no hay número, pide al usuario que lo ingrese.
        mostrarTexto("tablaMovimientos", "Por favor, ingrese un número de cuenta.");
    }
}




/*
// ===========================================
// DATOS GLOBALES DEL SISTEMA BANCARIO
// ===========================================

// Arreglo global que almacena todas las cuentas bancarias.
// Inicialmente, tienen saldo 0.0. Los movimientos iniciales se procesan
// a través del arreglo 'movimientos' (aunque en este código, el saldo
// solo se actualiza al llamar a 'depositar' o 'retirar').
cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

// Arreglo global que almacena el historial de transacciones.
// 'D' significa Débito (resta dinero), 'C' significa Crédito (suma dinero).
movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

// ===========================================
// FUNCIONES PARA MANEJO DE VISTAS (SPA)
// (Controlan qué componente de la interfaz de usuario es visible)
// ===========================================

// Función principal que se llama al cargar la página (similar a un 'onload').
cargarIntegracion=function(){
    mostrarCuentasView(); // Por defecto, muestra la vista de Cuentas.
}

// Muestra la vista de gestión y listado de Cuentas.
mostrarCuentasView=function(){
    mostrarComponente("divCuentas"); // Hace visible el DIV de Cuentas.
    ocultarComponente("divMovimientos"); // Oculta el DIV de Movimientos.
    ocultarComponente("divTransacciones"); // Oculta el DIV de Transacciones.
    mostrarCuentas(); // Llama a la función para refrescar la tabla de cuentas.
}

// Muestra la vista para realizar Depósitos y Retiros (Transacciones).
mostrarTransaccionesView=function(){
    mostrarComponente("divTransacciones"); // Hace visible el DIV de Transacciones.
    ocultarComponente("divCuentas"); // Oculta el DIV de Cuentas.
    ocultarComponente("divMovimientos"); // Oculta el DIV de Movimientos.
    
    // Limpia y prepara la interfaz para una nueva transacción:
    deshabilitarComponente("btnDepositar"); // Deshabilita el botón de Depósito.
    deshabilitarComponente("btnRetirar"); // Deshabilita el botón de Retiro.
    mostrarTextoEnCaja("txtNumeroCuentaTransacciones", ""); // Limpia el campo de Número de Cuenta.
    mostrarTextoEnCaja("txtInfoCuenta", ""); // Limpia el campo de Saldo.
    mostrarTextoEnCaja("txtMonto", ""); // Limpia el campo de Monto.
}

// Muestra la vista para consultar el historial de Movimientos.
mostrarMovimientosView=function(){
    mostrarComponente("divMovimientos"); // Hace visible el DIV de Movimientos.
    ocultarComponente("divCuentas"); // Oculta el DIV de Cuentas.
    ocultarComponente("divTransacciones"); // Oculta el DIV de Transacciones.
    
    // Limpia la tabla y el campo de búsqueda al cambiar de vista.
    mostrarTexto("tablaMovimientos", " "); // Limpia el contenido de la tabla de movimientos.
    mostrarTextoEnCaja("txtNumeroCuentaMovimientos", ""); // Limpia el campo de Número de Cuenta.
}


// ===========================================
// FUNCIONES COMUNES (Búsqueda de Datos)
// ===========================================

// Busca un objeto cuenta dentro del arreglo 'cuentas' por su número.
// @param {string} numeroCuenta - El número de cuenta a buscar.
// @returns {object|null} - El objeto cuenta si se encuentra, o null.
buscarCuenta=function(numeroCuenta){
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta == numeroCuenta) {
            return cuentas[i]; // Retorna el objeto cuenta encontrado.
        }
    }
    return null; // No se encontró la cuenta.
}

// ===========================================
// FUNCIONES DE CUENTAS (cuentas.js)
// ===========================================

// Genera el HTML para mostrar todas las cuentas en una tabla.
mostrarCuentas=function(){
    // Inicia la estructura de la tabla HTML.
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
    
    // Itera sobre cada cuenta en el arreglo global 'cuentas'.
    for (let i = 0; i < cuentas.length; i++) {
        let cuenta = cuentas[i];
        let nombreCompleto = cuenta.nombre + " " + cuenta.apellido;
        
        // Agrega una fila (<tr>) a la tabla por cada cuenta.
        contenidoTabla += `
            <tr>
                <td>${cuenta.numeroCuenta}</td>
                <td>${cuenta.cedula}</td>
                <td>${nombreCompleto}</td>
                <td>$${cuenta.saldo.toFixed(2)}</td> // Muestra el saldo con 2 decimales.
            </tr>
        `;
    }

    // Cierra la estructura de la tabla HTML.
    contenidoTabla += `
            </tbody>
        </table>
    `;

    // Muestra el HTML generado en el componente 'divTablaCuentas'.
    mostrarTexto("divTablaCuentas", contenidoTabla); 
}

// Agrega una nueva cuenta al arreglo 'cuentas', previa verificación.
// @param {object} cuenta - El objeto cuenta a agregar.
agregarCuenta=function(cuenta){
    let cuentaEncontrada = buscarCuenta(cuenta.numeroCuenta);

    if (cuentaEncontrada) {
        // Si la cuenta ya existe, muestra un mensaje de error.
        alert(" CUENTA EXISTENTE: Ya hay una cuenta con el numero " + cuenta.numeroCuenta);
    } else {
        // Si no existe, agrega la nueva cuenta al arreglo.
        cuentas.push(cuenta);
        alert(" CUENTA AGREGADA: Cuenta " + cuenta.numeroCuenta + " creada exitosamente.");
    }
}

// Captura los datos del formulario y llama a 'agregarCuenta'.
agregar=function(){
    // 1. Recupera los valores de las cajas de texto (inputs).
    let cedula = recuperarTexto("txtCedula");
    let nombre = recuperarTexto("txtNombre");
    let apellido = recuperarTexto("txtApellido");
    let numeroCuenta = recuperarTexto("txtNumeroCuentaCuentas"); // <-- Usa el ID modificado
    
    // 2. Crea el nuevo objeto cuenta.
    let nuevaCuenta = {
        numeroCuenta: numeroCuenta, 
        cedula: cedula, 
        nombre: nombre, 
        apellido: apellido, 
        saldo: 0.0 // Se inicializa con saldo cero.
    };
    
    // 3. Intenta agregar la cuenta.
    agregarCuenta(nuevaCuenta);
    // 4. Refresca la tabla de cuentas para mostrar la nueva.
    mostrarCuentas();

    // 5. Limpia los campos del formulario.
    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");
    mostrarTextoEnCaja("txtNumeroCuentaCuentas", "");
}


// ===========================================
// FUNCIONES DE TRANSACCIONES (transacciones.js)
// ===========================================

// Busca una cuenta para mostrar su información y habilitar transacciones.
ejecutarBusqueda=function(){
    // 1. Recupera el número de cuenta ingresado.
    const numeroCuenta = recuperarTexto("txtNumeroCuentaTransacciones"); // <-- Usa el ID modificado
    // 2. Busca la cuenta.
    const cuentaEncontrada = buscarCuenta(numeroCuenta);
    
    if(cuentaEncontrada !== null) {
        // Si la encuentra:
        const info = ` ${cuentaEncontrada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info); // Muestra el saldo actual.
        habilitarComponente("btnDepositar"); // Habilita el botón de Depósito.
        habilitarComponente("btnRetirar"); // Habilita el botón de Retiro.
        alert("CUENTA ENCONTRADA");
    } else {
        // Si no la encuentra:
        alert("CUENTA INEXISTENTE");
        mostrarTextoEnCaja("txtInfoCuenta", ""); // Limpia el saldo.
        deshabilitarComponente("btnDepositar"); // Deshabilita botones.
        deshabilitarComponente("btnRetirar"); // Deshabilita botones.
    }
}

// Realiza la operación de depósito y registra el movimiento.
// @param {string} numeroCuenta - La cuenta a depositar.
// @param {number} monto - La cantidad a depositar.
// @returns {object|null} - La cuenta actualizada o null si no se encuentra.
depositar=function(numeroCuenta,monto){
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if (cuentaAfectada) {
        // 1. Actualiza el saldo: suma el monto.
        cuentaAfectada.saldo += monto;
        
        // 2. Registra el movimiento como Crédito ('C').
        movimientos.push({
            numeroCuenta: numeroCuenta,
            monto: monto,
            tipo: "C" 
        });
        
    }
    return cuentaAfectada;
}

// Ejecuta la lógica completa del depósito (validación, llamada a depositar, y actualización de UI).
ejecutarDeposito=function(){
    const numeroCuenta = recuperarTexto("txtNumeroCuentaTransacciones"); // <-- Usa el ID modificado
    const monto = recuperarFloat("txtMonto"); // Recupera el monto como número flotante.

    // 1. Validación: verifica si el monto es válido.
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido para depositar.");
        return;
    }
    
    // 2. Realiza el depósito.
    const cuentaActualizada = depositar(numeroCuenta, monto);
    
    if (cuentaActualizada) {
        // 3. Si fue exitoso, actualiza la UI.
        alert("TRANSACCION EXITOSA");
        const info = `${cuentaActualizada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info); // Muestra el nuevo saldo.
        mostrarTextoEnCaja("txtMonto", ""); // Limpia el campo de monto.
    }
}


// Realiza la operación de retiro y registra el movimiento.
// @param {string} numeroCuenta - La cuenta a retirar.
// @param {number} monto - La cantidad a retirar.
// @returns {object|null} - Objeto con la cuenta y el resultado (exito) o null.
retirar=function(numeroCuenta,monto){
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if (cuentaAfectada) {
        // 1. Verifica si hay saldo suficiente.
        if (cuentaAfectada.saldo >= monto) {
            // 2. Actualiza el saldo: resta el monto.
            cuentaAfectada.saldo -= monto;
            
            // 3. Registra el movimiento como Débito ('D').
            movimientos.push({
                numeroCuenta: numeroCuenta,
                monto: monto,
                tipo: "D"
            });
            
            return {cuenta: cuentaAfectada, exito: true}; // Retiro exitoso.
        } else {
            // Saldo insuficiente.
            alert("SALDO INSUFICIENTE");
            return {cuenta: cuentaAfectada, exito: false}; // Retiro fallido por saldo.
        }
    }
    return null; // Cuenta no encontrada.
}

// Ejecuta la lógica completa del retiro (validación, llamada a retirar, y actualización de UI).
ejecutarRetiro=function(){
    const numeroCuenta = recuperarTexto("txtNumeroCuentaTransacciones"); // <-- Usa el ID modificado
    const monto = recuperarFloat("txtMonto"); // Recupera el monto como número flotante.

    // 1. Validación: verifica si el monto es válido.
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido para retirar.");
        return;
    }

    // 2. Realiza el retiro.
    const resultado = retirar(numeroCuenta, monto);

    if (resultado && resultado.exito) {
        // 3. Si fue exitoso, actualiza la UI.
        alert("TRANSACCION EXITOSA");
        const cuentaActualizada = resultado.cuenta;
        const info = `${cuentaActualizada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info); // Muestra el nuevo saldo.
        mostrarTextoEnCaja("txtMonto", ""); // Limpia el campo de monto.
    } 
    // Nota: El mensaje de "SALDO INSUFICIENTE" ya se maneja dentro de la función 'retirar'.
}


// ===========================================
// FUNCIONES DE MOVIMIENTOS (movimientos.js)
// ===========================================

// Filtra el arreglo global 'movimientos' para una cuenta específica.
// @param {string} numeroCuenta - La cuenta cuyos movimientos se quieren ver.
filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta=[];
    // Itera sobre todos los movimientos.
    for (let i = 0; i < movimientos.length; i++) {
        // Si el número de cuenta coincide, lo agrega al arreglo temporal.
        if (movimientos[i].numeroCuenta === numeroCuenta) {
            movimientosCuenta.push(movimientos[i]);
        }
    }
    // Llama a la función para mostrar los movimientos filtrados.
    mostrarMovimientos(movimientosCuenta);
}

// Genera el HTML de la tabla para mostrar un arreglo de movimientos.
// @param {array} misMovimientos - El arreglo de movimientos a mostrar.
mostrarMovimientos=function(misMovimientos){
    let tablaHTML = '<table class="tablaMovimientos">';
    
    // Encabezado de la tabla.
    tablaHTML += '<thead><tr><th>CUENTA</th><th>MONTO</th><th>OPERACION</th></tr></thead>';
    
    tablaHTML += '<tbody>';
    
    // Itera sobre cada movimiento.
    misMovimientos.forEach(movimiento => {
        let montoAMostrar = movimiento.monto;
        let tipoOperacion = '';
        
        if (movimiento.tipo === "D") { // Débito ('D')
            // Muestra el monto en negativo para indicar una salida de dinero.
            montoAMostrar = montoAMostrar * -1; 
            tipoOperacion = 'DEBITO';
        } else if (movimiento.tipo === "C") { // Crédito ('C')
            tipoOperacion = 'CREDITO';
        }
        
        // Agrega la fila con la información del movimiento.
        tablaHTML += `<tr>
            <td>${movimiento.numeroCuenta}</td>
            <td>${montoAMostrar.toFixed(2)}</td>
            <td>${tipoOperacion}</td>
        </tr>`;
    });
    
    tablaHTML += '</tbody></table>';

    // Muestra el HTML de la tabla en el componente 'tablaMovimientos'.
    mostrarTexto("tablaMovimientos", tablaHTML); 
}

// Captura el número de cuenta de la UI y llama a 'filtrarMovimientos'.
buscarMovimientos=function(){
    let numeroCuenta = recuperarTexto("txtNumeroCuentaMovimientos"); // <-- Usa el ID modificado
    
    if (numeroCuenta) {
        // Si hay número de cuenta, busca y muestra los movimientos.
        filtrarMovimientos(numeroCuenta);
    } else {
        // Si no hay número, pide al usuario que lo ingrese.
        mostrarTexto("tablaMovimientos", "Por favor, ingrese un número de cuenta.");
    }
}

*/


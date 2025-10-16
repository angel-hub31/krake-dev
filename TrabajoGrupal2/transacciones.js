cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    
    // Deshabilitar botones de DEPOSITAR y RETIRAR al inicio
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    // Limpiar campos al cargar
    mostrarTextoEnCaja("txtNumeroCuenta", "");
    mostrarTextoEnCaja("txtInfoCuenta", "");
    mostrarTextoEnCaja("txtMonto", "");
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta=function(numeroCuenta){
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta == numeroCuenta) {
            return cuentas[i];
        }
    }
    return null;
}

ejecutarBusqueda=function(){
    //toma el numero de cuenta de la caja de texto
    const numeroCuenta = recuperarTexto("txtNumeroCuenta");
    
    //invoca a buscarCuenta y guarda el resultado en una variable
    const cuentaEncontrada = buscarCuenta(numeroCuenta);
    
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    if(cuentaEncontrada !== null) {
        // Muestra en pantalla los datos de la cuenta
        const info = ` ${cuentaEncontrada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info);
        
        // Si la cuenta existe se habilitan dos botones: DEPOSITAR y RETIRAR
        habilitarComponente("btnDepositar");
        habilitarComponente("btnRetirar");
        alert("CUENTA ENCONTRADA");
    } else {
        // Si no existe muestra un mensaje CUENTA INEXISTENTE
        alert("CUENTA INEXISTENTE");
        mostrarTextoEnCaja("txtInfoCuenta", "");
        // Deshabilita los botones
        deshabilitarComponente("btnDepositar");
        deshabilitarComponente("btnRetirar");
    }
}

depositar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if (cuentaAfectada) {
        //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
        cuentaAfectada.saldo += monto;
    }
    return cuentaAfectada;
}

ejecutarDeposito=function(){
    //Toma el numero de cuenta ingresado en la caja de texto
    const numeroCuenta = recuperarTexto("txtNumeroCuenta");
    //Toma el monto ingresado en la caja de texto
    const monto = recuperarFloat("txtMonto");

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido para depositar.");
        return;
    }
    
    //invoca a depositar
    const cuentaActualizada = depositar(numeroCuenta, monto);
    
    if (cuentaActualizada) {
        //Muestra un mensaje TRANSACCION EXITOSA
        alert("TRANSACCION EXITOSA");
        
        //Muestra en pantalla el nuevo saldo de la cuenta
        const info = `${cuentaActualizada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info);
        // Limpiar el campo de monto
        mostrarTextoEnCaja("txtMonto", "");
    }
}


retirar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if (cuentaAfectada) {
        //Valida si la cuenta tiene el saldo suficiente para retirar el monto
        if (cuentaAfectada.saldo >= monto) {
            //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
            cuentaAfectada.saldo -= monto;
            return {cuenta: cuentaAfectada, exito: true}; // Retorna cuenta y éxito
        } else {
            //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
            alert("SALDO INSUFICIENTE");
            return {cuenta: cuentaAfectada, exito: false}; // Retorna cuenta y fracaso
        }
    }
    return null; // Cuenta no encontrada
}

ejecutarRetiro=function(){
    //Toma el numero de cuenta ingresado en la caja de texto
    const numeroCuenta = recuperarTexto("txtNumeroCuenta");
    //Toma el monto ingresado en la caja de texto
    const monto = recuperarFloat("txtMonto");

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido para retirar.");
        return;
    }

    // Invoca a retirar
    const resultado = retirar(numeroCuenta, monto);

    if (resultado && resultado.exito) {
        //Si logra retirar muestra un mensaje TRANSACCION EXITOSA
        alert("TRANSACCION EXITOSA");
        
        // Muestra en pantalla el nuevo saldo de la cuenta
        const cuentaActualizada = resultado.cuenta;
        const info = `${cuentaActualizada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info);
        // Limpiar el campo de monto
        mostrarTextoEnCaja("txtMonto", "");
    } 
    // Si el retiro falla por saldo insuficiente, el alert ya se muestra dentro de la función 'retirar'
}
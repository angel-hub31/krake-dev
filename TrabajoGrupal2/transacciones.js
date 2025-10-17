// Arreglo global 'cuentas': Contiene la lista de todas las cuentas bancarias.
// Cada elemento es un objeto con datos del titular y el saldo actual (inicialmente 0.0).
cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

// Función 'cargar': Se ejecuta típicamente al cargar la página o al navegar a la sección de transacciones.
cargar=function(){
    // Muestra el componente (div) que contiene la interfaz para realizar transacciones.
    mostrarComponente("divTransacciones"); 
    // Oculta otros componentes para enfocarse en transacciones.
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    
    // Deshabilitar botones de DEPOSITAR y RETIRAR al inicio
    // Estos botones se habilitarán solo después de buscar y encontrar una cuenta.
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    // Limpiar campos al cargar
    mostrarTextoEnCaja("txtNumeroCuenta", ""); // Limpia el campo de número de cuenta.
    mostrarTextoEnCaja("txtInfoCuenta", ""); // Limpia el campo donde se muestra la información/saldo.
    mostrarTextoEnCaja("txtMonto", ""); // Limpia el campo de monto de la transacción.
}

/*
    Función 'buscarCuenta': Itera sobre el arreglo 'cuentas' buscando una coincidencia por número de cuenta.
    Si existe, retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta=function(numeroCuenta){
    // Barre el arreglo de cuentas
    for (let i = 0; i < cuentas.length; i++) {
        // Compara el número de cuenta actual con el número recibido como parámetro.
        if (cuentas[i].numeroCuenta == numeroCuenta) {
            return cuentas[i]; // Retorna el objeto cuenta si lo encuentra.
        }
    }
    return null; // Retorna null si no se encuentra la cuenta después de barrer todo el arreglo.
}

// Función 'ejecutarBusqueda': Maneja la acción de buscar una cuenta al presionar el botón de búsqueda.
ejecutarBusqueda=function(){
    //toma el numero de cuenta de la caja de texto con ID "txtNumeroCuenta"
    const numeroCuenta = recuperarTexto("txtNumeroCuenta");
    
    //invoca a buscarCuenta y guarda el resultado en una variable
    const cuentaEncontrada = buscarCuenta(numeroCuenta);
    
    //Si el resultado es diferente de null (cuenta existe)...
    if(cuentaEncontrada !== null) {
        // Muestra en pantalla el SALDO de la cuenta (formateado a 2 decimales).
        const info = ` ${cuentaEncontrada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info);
        
        // Si la cuenta existe se habilitan dos botones: DEPOSITAR y RETIRAR
        habilitarComponente("btnDepositar");
        habilitarComponente("btnRetirar");
        alert("CUENTA ENCONTRADA");
    } else {
        // Si no existe, muestra un mensaje CUENTA INEXISTENTE
        alert("CUENTA INEXISTENTE");
        mostrarTextoEnCaja("txtInfoCuenta", ""); // Limpia el campo de información.
        // Deshabilita los botones de transacción por seguridad.
        deshabilitarComponente("btnDepositar");
        deshabilitarComponente("btnRetirar");
    }
}

// Función 'depositar': Modifica el saldo de una cuenta sumándole un monto.
depositar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if (cuentaAfectada) {
        //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
        cuentaAfectada.saldo += monto;
    }
    return cuentaAfectada; // Retorna el objeto cuenta actualizado o null si no se encontró.
}

// Función 'ejecutarDeposito': Controla la acción de realizar un depósito a través de la interfaz.
ejecutarDeposito=function(){
    //Toma el numero de cuenta ingresado
    const numeroCuenta = recuperarTexto("txtNumeroCuenta");
    //Toma el monto ingresado y lo convierte a número flotante
    const monto = recuperarFloat("txtMonto");

    // Valida que el monto sea un número válido y positivo.
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido para depositar.");
        return; // Detiene la ejecución si el monto no es válido.
    }
    
    //invoca a depositar
    const cuentaActualizada = depositar(numeroCuenta, monto);
    
    if (cuentaActualizada) {
        //Muestra un mensaje TRANSACCION EXITOSA
        alert("TRANSACCION EXITOSA");
        
        //Muestra en pantalla el nuevo saldo de la cuenta
        const info = `${cuentaActualizada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info);
        // Limpiar el campo de monto para una nueva transacción.
        mostrarTextoEnCaja("txtMonto", "");
    }
    // Nota: Si la cuenta no se encuentra, 'depositar' retorna null y no sucede nada. 
    // Se asume que 'ejecutarBusqueda' garantiza que la cuenta esté cargada antes de un depósito.
}


// Función 'retirar': Modifica el saldo de una cuenta restándole un monto, previa validación.
retirar=function(numeroCuenta,monto){
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    
    if (cuentaAfectada) {
        //Valida si la cuenta tiene el saldo suficiente para retirar el monto
        if (cuentaAfectada.saldo >= monto) {
            //Si el saldo es suficiente, al saldo actual de la cuenta afectada, le resta el monto
            cuentaAfectada.saldo -= monto;
            return {cuenta: cuentaAfectada, exito: true}; // Retorna objeto con cuenta y estado de éxito.
        } else {
            //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
            alert("SALDO INSUFICIENTE");
            return {cuenta: cuentaAfectada, exito: false}; // Retorna objeto con cuenta y estado de fracaso.
        }
    }
    return null; // Cuenta no encontrada
}

// Función 'ejecutarRetiro': Controla la acción de realizar un retiro a través de la interfaz.
ejecutarRetiro=function(){
    //Toma el numero de cuenta ingresado
    const numeroCuenta = recuperarTexto("txtNumeroCuenta");
    //Toma el monto ingresado y lo convierte a número flotante
    const monto = recuperarFloat("txtMonto");

    // Valida que el monto sea un número válido y positivo.
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor, ingrese un monto válido para retirar.");
        return; // Detiene la ejecución si el monto no es válido.
    }

    // Invoca a retirar
    const resultado = retirar(numeroCuenta, monto);

    // Verifica si el retiro fue exitoso (si encontró la cuenta Y el saldo fue suficiente)
    if (resultado && resultado.exito) {
        //Si logra retirar muestra un mensaje TRANSACCION EXITOSA
        alert("TRANSACCION EXITOSA");
        
        // Muestra en pantalla el nuevo saldo de la cuenta
        const cuentaActualizada = resultado.cuenta;
        const info = `${cuentaActualizada.saldo.toFixed(2)}`;
        mostrarTextoEnCaja("txtInfoCuenta", info);
        // Limpiar el campo de monto para una nueva transacción.
        mostrarTextoEnCaja("txtMonto", "");
    } 
    // Si el retiro falla por saldo insuficiente, el mensaje "SALDO INSUFICIENTE" se maneja directamente
    // dentro de la función 'retirar'.
}
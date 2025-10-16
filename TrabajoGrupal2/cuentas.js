cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    // Al cargar la página, también mostramos las cuentas existentes.
    mostrarCuentas(); 
}

mostrarCuentas=function(){
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
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
    
    // Iteramos sobre el arreglo de cuentas para construir las filas de la tabla
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

    // Usamos la función de utilitarios para mostrar la tabla en el div correspondiente
    mostrarTexto("divTablaCuentas", contenidoTabla); 
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta=function(numeroCuenta){
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta == numeroCuenta) {
            return cuentas[i]; // Retorna el objeto cuenta
        }
    }
    return null; // No se encontró la cuenta
}

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta=function(cuenta){
    // Busca si la cuenta ya existe
    let cuentaEncontrada = buscarCuenta(cuenta.numeroCuenta);

    if (cuentaEncontrada) {
        // Si ya existe mostrar un alert CUENTA EXISTENTE
        alert(" CUENTA EXISTENTE: Ya hay una cuenta con el numero " + cuenta.numeroCuenta);
    } else {
        // Agrega la cuenta al arreglo
        cuentas.push(cuenta);
        // Si se agrega, mostrar un alert CUENTA AGREGADA
        alert(" CUENTA AGREGADA: Cuenta " + cuenta.numeroCuenta + " creada exitosamente.");
    }
}

agregar=function(){
    //Toma los valores de las cajas de texto, sin validaciones
    let cedula = recuperarTexto("txtCedula");
    let nombre = recuperarTexto("txtNombre");
    let apellido = recuperarTexto("txtApellido");
    let numeroCuenta = recuperarTexto("txtNumeroCuenta");
    
    // Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    // Con saldo 0.
    let nuevaCuenta = {
        numeroCuenta: numeroCuenta, 
        cedula: cedula, 
        nombre: nombre, 
        apellido: apellido, 
        saldo: 0.0
    };
    
    // Invoca a agregarCuenta
    agregarCuenta(nuevaCuenta);
    
    // Invoca a mostrarCuentas (se refresca la tabla)
    mostrarCuentas();

    // Opcional: Limpiar las cajas de texto después de guardar
    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");
    mostrarTextoEnCaja("txtNumeroCuenta", "");
}
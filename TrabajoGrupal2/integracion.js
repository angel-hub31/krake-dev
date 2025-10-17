// ====================================================================
// ESTRUCTURAS DE DATOS INICIALES
// ====================================================================

// Array que almacena la información de las cuentas de los clientes.
// 'saldo' se inicializa en 0.0, pero será actualizado por las transacciones.
let cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
];

// Array que registra todas las transacciones realizadas.
// 'tipo': "D" para Débito (retiro), "C" para Crédito (depósito).
let movimientos = [
    { numeroCuenta: "02234567", monto: 10.24, tipo: "D" }, // Juan Perez: Retiro
    { numeroCuenta: "02345211", monto: 45.90, tipo: "D" }, // Felipe Caicedo: Retiro
    { numeroCuenta: "02234567", monto: 65.23, tipo: "C" }, // Juan Perez: Depósito
    { numeroCuenta: "02345211", monto: 65.23, tipo: "C" }, // Felipe Caicedo: Depósito
    { numeroCuenta: "02345211", monto: 12.0, tipo: "D" }, // Felipe Caicedo: Retiro
];


// ====================================================================
// GESTIÓN DE LA INTERFAZ DE USUARIO (UI)
// ====================================================================

// Función principal que se ejecuta al cargar la aplicación (por ejemplo, en body.onload).
cargar = function () {
    // 1. Muestra la sección de Cuentas (la vista principal).
    mostrarComponente("divCuentas");
    // 2. Oculta las otras secciones para asegurar que solo una esté visible.
    ocultarComponente("divTransacciones");
    ocultarComponente("divMovimientos");
    // 3. Renderiza la tabla con los datos de todas las cuentas.
    mostrarCuentas(); 
}

// Función que maneja el cambio entre las diferentes secciones de la UI.
mostrarSeccion = function (idSeccion) {
    // 1. Oculta todas las secciones principales.
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    ocultarComponente("divMovimientos");
    // 2. Muestra solo la sección solicitada por el ID.
    mostrarComponente(idSeccion);
    
    // 3. Lógica específica para cada sección al ser mostrada.
    if (idSeccion === "divCuentas") {
        // Si se muestra la sección de cuentas, actualiza la tabla.
        mostrarCuentas();
    } else if (idSeccion === "divTransacciones") {
        // Si se muestra la sección de transacciones, oculta el contenedor de resultados
        // hasta que se realice una búsqueda de cuenta.
        ocultarComponente("contenedorTransacciones");
    }
}


// ====================================================================
// FUNCIONES DE BÚSQUEDA Y LECTURA
// ====================================================================

// Función que busca una cuenta por su número en el array 'cuentas'.
buscarCuenta = function (numeroCuenta) {
    let clienteEncontrado = null;
    // 1. Itera sobre el array de cuentas.
    for (let i = 0; i < cuentas.length; i++) {
        let elementoCliente = cuentas[i];
        // 2. Compara el número de cuenta buscado con el de cada elemento.
        if (elementoCliente.numeroCuenta == numeroCuenta) {
            clienteEncontrado = elementoCliente;
            // 3. Una vez encontrado, termina la búsqueda (optimización).
            break;
        }
    }
    // 4. Retorna el objeto de la cuenta o null si no se encontró.
    return clienteEncontrado;
}

// Función para generar y mostrar la tabla HTML de todas las cuentas.
mostrarCuentas = function () {
    let objetoPersona = {};
    // 1. Inicia la tabla con sus encabezados.
    let tabla = "<table><tr><th> NUMERO CUENTA </th><th> CEDULA </th><th> NOMBRE </th><th> APELLIDO </th><th> SALDO </th></tr>";
    // 2. Itera sobre todas las cuentas.
    for (let i = 0; i < cuentas.length; i++) {
        objetoPersona = cuentas[i];
        // 3. Construye una fila (<tr>) para cada cuenta con sus datos.
        tabla += "<tr>" + "<td>" + objetoPersona.numeroCuenta + "</td>" +
            "<td>" + objetoPersona.cedula + "</td>" +
            "<td>" + objetoPersona.nombre + "</td>" +
            "<td>" + objetoPersona.apellido + "</td>" +
            // Nota: El saldo que se muestra es el saldo actual en el array, que cambia con depósitos/retiros.
            "<td>" + objetoPersona.saldo + "</td>" + "</tr>";
    }

    // 4. Cierra la etiqueta de la tabla.
    tabla += "</table>";
    // 5. Inserta el HTML generado en el elemento con ID "tablaCuentas".
    mostrarTextoHTML("tablaCuentas", tabla);
}


// ====================================================================
// FUNCIONES DE CREACIÓN DE CUENTAS
// ====================================================================

// Función de lógica de negocio para añadir una nueva cuenta al sistema.
agregarCuenta = function (cuenta) {
    // 1. Verifica si la cuenta ya existe antes de agregarla.
    let cliente = buscarCuenta(cuenta.numeroCuenta);
    if (cliente == null) {
        alert(" CUENTA AGREGADA ");
        // 2. Agrega el nuevo objeto de cuenta al array 'cuentas'.
        cuentas.push(cuenta);
    } else {
        alert(" CUENTA EXISTENTE ");
    }
}

// Función de UI para recoger datos y ejecutar la adición de la cuenta.
agregar = function () {
    let objetoCuenta = {};
    // 1. Recupera los valores de los campos de texto (se asume que 'recuperarTexto' existe).
    let cedula = recuperarTexto("txtCedula");
    let cuenta = recuperarTexto("txtCuenta");
    let nombre = recuperarTexto("txtNombre");
    let apellido = recuperarTexto("txtApellido");

    // 2. Validación de campos obligatorios.
    if (!cedula || !cuenta || !nombre || !apellido) {
        alert("Por favor, complete todos los campos.");
        return; // Detiene la función si faltan datos.
    }

    // 3. Construye el objeto de la nueva cuenta.
    objetoCuenta.numeroCuenta = cuenta;
    objetoCuenta.cedula = cedula;
    objetoCuenta.nombre = nombre;
    objetoCuenta.apellido = apellido;
    objetoCuenta.saldo = 0.0; // Inicializa el saldo a cero.

    // 4. Llama a la función de lógica para agregar la cuenta.
    agregarCuenta(objetoCuenta);
    // 5. Actualiza la visualización de la tabla de cuentas.
    mostrarCuentas();
}


// ====================================================================
// FUNCIONES DE TRANSACCIONES (DEPÓSITO/RETIRO)
// ====================================================================

// Función de UI para iniciar la búsqueda de una cuenta para transaccionar.
ejecutarBusqueda = function () {
    // 1. Obtiene el número de cuenta del campo de búsqueda.
    let valorCuenta = recuperarTexto("txtCajaCuentas");
    let cuenta = buscarCuenta(valorCuenta);
    // 2. Verifica si la cuenta fue encontrada.
    if (cuenta == null) {
        alert("CLIENTE NO ENCONTRADO")
        // Oculta el formulario de transacciones si no se encuentra la cuenta.
        ocultarComponente("contenedorTransacciones");
    } else {
        // Muestra el formulario si la cuenta es válida.
        mostrarComponente("contenedorTransacciones");
        // Muestra la tabla con los datos actuales de la cuenta.
        mostrarTablaTransacciones();
    }
}

// Función que muestra la información de la cuenta encontrada en una tabla.
mostrarTablaTransacciones = function () {
    let numCuenta = recuperarTexto("txtCajaCuentas"); // Recupera la cuenta buscada.
    let cuenta = buscarCuenta(numCuenta);
    
    if (cuenta) {
        let cmpTabla = document.getElementById("divTabla"); // Asume que existe un div con ID 'divTabla'
        // 1. Construcción del HTML de la tabla de información de la cuenta.
        let contenidoTabla = "<table><tr>" +
            "<th>NUMERO DE CUENTA</th>" +
            "<th>CEDULA</th>" +
            "<th>NOMBRE</th>" +
            "<th>APELLIDO</th>" +
            "<th>SALDO</th>" +
            "</tr>";

        // 2. Agrega la fila con los datos de la cuenta.
        contenidoTabla +=
            "<tr><td>" + cuenta.numeroCuenta + "</td>"
            + "<td>" + cuenta.cedula + "</td>"
            + "<td>" + cuenta.nombre + "</td>"
            + "<td>" + cuenta.apellido + "</td>"
            // Muestra el saldo con 2 decimales.
            + "<td>" + cuenta.saldo.toFixed(2) + "</td>" 
            + "</tr>"
        
        contenidoTabla += "</table>"
        // 3. Actualiza el contenido del DIV con la tabla.
        cmpTabla.innerHTML = contenidoTabla;
    }
}


// --- DEPOSITAR ---
// Función de lógica de negocio para procesar un depósito.
depositar = function (numeroCuenta, monto) {
    // 1. Encuentra el objeto de cuenta a modificar.
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    // 2. Incrementa el saldo.
    cuentaAfectada.saldo += monto;
    
    // 3. Crea el objeto del nuevo movimiento.
    let nuevoMovimiento = {
        numeroCuenta: numeroCuenta,
        monto: monto,
        tipo: "C" // 'C' de Crédito (Depósito).
    };
    // 4. Registra el movimiento en el array global.
    movimientos.push(nuevoMovimiento);
}

// Función de UI para ejecutar la acción de depósito.
ejecutarDeposito = function () {
    // 1. Recupera el número de cuenta (de la caja de búsqueda) y el monto.
    let numCuenta = recuperarTexto("txtCajaCuentas");
    let monto = recuperarFloat("txtMonto"); // Asume que 'recuperarFloat' convierte a número.

    // 2. Validación: campos y monto.
    if (!numCuenta || !monto || monto <= 0) {
        alert("Ingrese un número de cuenta y un monto válido.");
        return;
    }

    // 3. Validación: existencia de la cuenta.
    if (buscarCuenta(numCuenta) == null) {
        alert("Cuenta no encontrada.");
        return;
    }

    // 4. Llama a la lógica de negocio.
    depositar(numCuenta, monto);
    alert("TRANSACCION EXITOSA");
    // 5. Actualiza la tabla para mostrar el nuevo saldo.
    mostrarTablaTransacciones(); 
}

// --- RETIRAR ---
// Función de lógica de negocio para procesar un retiro.
retirar = function (numeroCuenta, monto) {
    // 1. Encuentra el objeto de cuenta a modificar.
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    // 2. Disminuye el saldo.
    cuentaAfectada.saldo -= monto;
    
    // 3. Crea el objeto del nuevo movimiento.
    let nuevoMovimiento = {
        numeroCuenta: numeroCuenta,
        monto: monto,
        tipo: "D" // 'D' de Débito (Retiro).
    };
    // 4. Registra el movimiento.
    movimientos.push(nuevoMovimiento);
}

// Función de UI para ejecutar la acción de retiro.
ejecutarRetiro = function () {
    // 1. Recupera el número de cuenta y el monto.
    let numCuenta = recuperarTexto("txtCajaCuentas");
    let monto = recuperarFloat("txtMonto");
    
    // 2. Validación: campos y monto.
    if (!numCuenta || !monto || monto <= 0) {
        alert("Ingrese un número de cuenta y un monto válido.");
        return;
    }

    let cuentaAfectada = buscarCuenta(numCuenta);
    
    // 3. Validación: existencia de la cuenta.
    if (cuentaAfectada == null) {
        alert("Cuenta no encontrada.");
        return;
    }

    // 4. Validación: saldo suficiente.
    if (cuentaAfectada.saldo < monto) {
        alert("SALDO INSUFICIENTE")
    } else {
        // 5. Llama a la lógica de negocio solo si hay saldo.
        retirar(numCuenta, monto)
        alert("TRANSACCION EXITOSA")
        // 6. Actualiza la tabla para mostrar el nuevo saldo.
        mostrarTablaTransacciones(); 
    }
}


// ====================================================================
// GESTIÓN DE MOVIMIENTOS HISTÓRICOS
// ====================================================================

// Función para filtrar los movimientos de una cuenta específica.
filtrarMovimientos = function (numeroCuenta) {
    let movimientosCuenta = [];

    // 1. Itera sobre el array global 'movimientos'.
    for (let i = 0; i < movimientos.length; i++) {
        // 2. Si el número de cuenta coincide, agrega el movimiento al nuevo array.
        if (movimientos[i].numeroCuenta === numeroCuenta) {
            movimientosCuenta.push(movimientos[i]);
        }
    }
    // 3. Llama a la función que se encarga de mostrar la tabla.
    mostrarMovimientos(movimientosCuenta);
}

// Función para generar y mostrar la tabla HTML con el historial de movimientos.
mostrarMovimientos = function (misMovimientos) {
    let tablaHTML = '<table class="tablaMovimientos">';

    // 1. Encabezados de la tabla.
    tablaHTML += '<thead><tr><th>CUENTA</th><th>MONTO</th><th>OPERACION</th></tr></thead>';

    tablaHTML += '<tbody>';

    // 2. Itera sobre el array de movimientos filtrados.
    misMovimientos.forEach(movimiento => {
        let montoAMostrar = movimiento.monto;
        let tipoOperacion = '';

        // 3. Determina el tipo de operación y formatea el monto.
        if (movimiento.tipo === "D") {
            // Para Débito (D), se muestra el monto como negativo.
            montoAMostrar = montoAMostrar * -1; 
            tipoOperacion = 'DEBITO';
        } else if (movimiento.tipo === "C") {
            tipoOperacion = 'CREDITO';
        }

        // 4. Construye la fila de la tabla (usando template literals).
        tablaHTML += `<tr>
            <td>${movimiento.numeroCuenta}</td>
            <td>${montoAMostrar.toFixed(2)}</td>
            <td>${tipoOperacion}</td>
        </tr>`;
    });

    tablaHTML += '</tbody></table>';

    // 5. Inserta el HTML generado en el elemento con ID "tablaMovimientos".
    mostrarTextoHTML("tablaMovimientos", tablaHTML); 
}

// Función de UI para solicitar el número de cuenta y buscar sus movimientos.
buscarMovimientos = function () {
    // 1. Recupera el número de cuenta para la consulta de movimientos.
    let numeroCuenta = recuperarTexto("txtNumeroCuentaMov"); 

    // 2. Validación de existencia.
    if (numeroCuenta) {
        // 3. Llama a la función de filtrado si el campo no está vacío.
        filtrarMovimientos(numeroCuenta);
    } else {
        alert("Por favor, ingrese un numero de cuenta.");
    }
}




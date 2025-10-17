// ====================================================================
// GESTIÓN DE CLIENTES (CRUD BÁSICO)
// ====================================================================

// Declaración del array global que almacena todos los objetos cliente.
let clientes = [
    { cedula: "1515151", nombre: "Juan", edad: 20 },
    { cedula: "655151", nombre: "Pedro", edad: 30 },
    { cedula: "8815151", nombre: "Luis", edad: 50 },
];

// --------------------------------------------------------------------
// FUNCIÓN 1: guardarCambios
// Controla la recolección de datos y la modificación de un cliente existente.
// --------------------------------------------------------------------
guardarCambios = function () {
    // 1. Recupera la cédula (clave de búsqueda) desde el campo de texto.
    let valorCedula = recuperarTexto("txtCedula");
    // 2. Recupera el nuevo nombre desde el campo de texto.
    let valorNombre = recuperarTexto("txtNombre");
    // 3. Recupera la nueva edad desde el campo de texto, convirtiéndola a número flotante.
    let valorEdad = recuperarFloat("txtEdad");

    // 4. Inicializa un objeto temporal para agrupar los datos a modificar.
    let datosCliente = {};
    // 5. Asigna la cédula al objeto.
    datosCliente.cedula = valorCedula;
    // 6. Asigna el nuevo nombre al objeto.
    datosCliente.nombre = valorNombre;
    // 7. Asigna la nueva edad al objeto.
    datosCliente.edad = valorEdad;

    // 8. Llama a la función de lógica para aplicar los cambios en el array 'clientes'.
    modificarCliente(datosCliente);

    // 9. Llama a la función para actualizar y mostrar la tabla de clientes en la interfaz.
    mostraClientes();
}

// --------------------------------------------------------------------
// FUNCIÓN 2: modificarCliente (Lógica)
// Busca el cliente por cédula y actualiza sus campos si lo encuentra.
// --------------------------------------------------------------------
modificarCliente = function (cliente) {
    // 1. Busca el cliente en el array usando su cédula. Retorna el objeto (referencia) o null/undefined.
    let clienteEncontrado = buscarCliente(cliente.cedula);
    
    // 2. Verifica si la búsqueda fue exitosa (el cliente existe).
    if (clienteEncontrado != null) {
        // 3. Modifica la propiedad 'nombre' del objeto encontrado (en el array 'clientes').
        clienteEncontrado.nombre = cliente.nombre;
        // 4. Modifica la propiedad 'edad' del objeto encontrado (en el array 'clientes').
        clienteEncontrado.edad = cliente.edad;
    }
}

// --------------------------------------------------------------------
// FUNCIÓN 3: ejecutarBusqueda
// Recoge la cédula de búsqueda y muestra los datos del cliente encontrado en los campos de edición.
// --------------------------------------------------------------------
ejecutarBusqueda = function () {
    // 1. Recupera el texto de la cédula del campo de búsqueda dedicado.
    let valorCedula = recuperarTexto("txtCedulaBusqueda");
    
    // 2. Llama a 'buscarCliente' con la cédula obtenida.
    let cliente = buscarCliente(valorCedula);
    
    // 3. Verifica si el cliente NO fue encontrado.
    if (cliente == null) {
        alert("cliente no encontrado");
    } else {
        // 4. Si el cliente fue encontrado: Muestra la cédula en el campo 'txtCedula'.
        mostrarTextoEnCaja("txtCedula", cliente.cedula);
        // 5. Muestra el nombre en el campo 'txtNombre'.
        mostrarTextoEnCaja("txtNombre", cliente.nombre);
        // 6. Muestra la edad en el campo 'txtEdad'.
        mostrarTextoEnCaja("txtEdad", cliente.edad);
    }
}

// --------------------------------------------------------------------
// FUNCIÓN 4: crearCliente
// Controla la recolección de datos y la creación de un nuevo cliente.
// --------------------------------------------------------------------
crearCliente = function () {
    // 1. Recupera la cédula desde el campo de texto.
    let valorCedula = recuperarTexto("txtCedula");
    // 2. Recupera el nombre desde el campo de texto.
    let valorNombre = recuperarTexto("txtNombre");
    // 3. Recupera la edad como número flotante.
    let valorEdad = recuperarFloat("txtEdad");
    
    // 4. Inicializa un nuevo objeto cliente.
    let nuevoCliente = {}
    // 5. Asigna los valores recuperados al nuevo objeto.
    nuevoCliente.cedula = valorCedula;
    nuevoCliente.nombre = valorNombre;
    nuevoCliente.edad = valorEdad;
    
    // 6. Llama a la función de lógica para intentar agregar el cliente al array.
    agregarCliente(nuevoCliente);
}

// --------------------------------------------------------------------
// FUNCIÓN 5: agregarCliente (Lógica)
// Intenta añadir un cliente al array; si la cédula ya existe, alerta.
// --------------------------------------------------------------------
agregarCliente = function (cliente) {
    let resultado;
    // 1. Busca si ya existe un cliente con la cédula proporcionada.
    resultado = buscarCliente(cliente.cedula);
    
    // 2. Si el resultado es null (cliente no existe):
    if (resultado == null) {
        clientes.push(cliente) // 3. Añade el nuevo objeto al array 'clientes'.
        alert("cliente agregado");
        mostraClientes(); // 4. Actualiza la tabla de clientes.
    } else {
        // 5. Si el cliente existe: Muestra un error.
        alert("ya existe el cliente conla cedula: " + cliente.cedula);
    }
}

// --------------------------------------------------------------------
// FUNCIÓN 6: buscarCliente (Lógica - Detallada)
// Itera el array para encontrar un cliente por cédula.
// --------------------------------------------------------------------
buscarCliente = function (cedula) {
    let elementoCliente;      // Variable temporal para el cliente actual en el bucle.
    let clienteEncontrado;    // Variable para almacenar el cliente encontrado.

    // 1. Itera sobre el array 'clientes'.
    for (let i = 0; i < clientes.length; i++) {
        elementoCliente = clientes[i]; // 2. Obtiene el cliente actual.
        // 3. Compara la cédula del cliente actual con la cédula de búsqueda.
        if (elementoCliente.cedula == cedula) {
            clienteEncontrado = elementoCliente; // 4. Almacena el objeto cliente.
            break; // 5. Detiene la iteración (cliente encontrado).
        }
    }
    // 6. Retorna el objeto cliente (o undefined/null si no se encontró).
    return clienteEncontrado;
}

// --------------------------------------------------------------------
// FUNCIÓN 7: mostraClientes
// Genera y muestra la tabla HTML de clientes en la interfaz.
// --------------------------------------------------------------------
mostraClientes = function () {
    // 1. Obtiene la referencia al elemento HTML (contenedor) donde se mostrará la tabla.
    let cmpTabla = document.getElementById("tablaClientes");
    
    // 2. Inicializa la cadena HTML con la apertura de la tabla y los encabezados.
    let contenidoTabla = "<table><tr>" +
        "<th>CEDULA</th>" +
        "<th>NOMBRE</th>" +
        "<th>EDAD</th>" +
        "</tr>";
        
    let elementoCliente;
    
    // 3. Itera sobre el array de clientes para generar las filas de datos.
    for (let i = 0; i < clientes.length; i++) {
        elementoCliente = clientes[i];
        
        // 4. Concatena una nueva fila <tr> con <td> para cada propiedad del cliente.
        contenidoTabla +=
            "<tr><td>" + elementoCliente.cedula + "</td>"
            + "<td>" + elementoCliente.nombre + "</td>"
            + "<td>" + elementoCliente.edad + "</td>"
            + "</tr>"
    }
    
    // 5. Cierra la etiqueta de la tabla.
    contenidoTabla += "</table>"
    
    // 6. Inserta el HTML generado dentro del elemento contenedor ('tablaClientes'), actualizando la interfaz.
    cmpTabla.innerHTML = contenidoTabla;
}







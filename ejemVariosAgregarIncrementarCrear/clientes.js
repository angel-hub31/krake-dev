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
    let valorCedula = recuperarTexto("txtCedula");    // 1. Recupera la cédula (clave de búsqueda) desde el campo de texto.
    let valorNombre = recuperarTexto("txtNombre");    // 2. Recupera el nuevo nombre desde el campo de texto.
    let valorEdad = recuperarFloat("txtEdad");    // 3. Recupera la nueva edad desde el campo de texto, convirtiéndola a número flotante.
    let datosCliente = {};    // 4. Inicializa un objeto temporal para agrupar los datos a modificar.
    datosCliente.cedula = valorCedula;    // 5. Asigna la cédula al objeto.
    datosCliente.nombre = valorNombre;    // 6. Asigna el nuevo nombre al objeto.
    datosCliente.edad = valorEdad;    // 7. Asigna la nueva edad al objeto.
    modificarCliente(datosCliente);    // 8. Llama a la función de lógica para aplicar los cambios en el array 'clientes'.
    mostraClientes();    // 9. Llama a la función para actualizar y mostrar la tabla de clientes en la interfaz.
}
// --------------------------------------------------------------------
// FUNCIÓN 2: modificarCliente (Lógica)
// Busca el cliente por cédula y actualiza sus campos si lo encuentra.
// --------------------------------------------------------------------
modificarCliente = function (cliente) {
    let clienteEncontrado = buscarCliente(cliente.cedula);    // 1. Busca el cliente en el array usando su cédula. Retorna el objeto (referencia) o null/undefined.
    if (clienteEncontrado != null) {    // 2. Verifica si la búsqueda fue exitosa (el cliente existe).
        clienteEncontrado.nombre = cliente.nombre;        // 3. Modifica la propiedad 'nombre' del objeto encontrado (en el array 'clientes').
        clienteEncontrado.edad = cliente.edad;        // 4. Modifica la propiedad 'edad' del objeto encontrado (en el array 'clientes').
    }
}
// --------------------------------------------------------------------
// FUNCIÓN 3: ejecutarBusqueda
// Recoge la cédula de búsqueda y muestra los datos del cliente encontrado en los campos de edición.
// --------------------------------------------------------------------
ejecutarBusqueda = function () {
    let valorCedula = recuperarTexto("txtCedulaBusqueda");    // 1. Recupera el texto de la cédula del campo de búsqueda dedicado.
    let cliente = buscarCliente(valorCedula);    // 2. Llama a 'buscarCliente' con la cédula obtenida.
    if (cliente == null) {    // 3. Verifica si el cliente NO fue encontrado.
        alert("cliente no encontrado");
    } else {
        mostrarTextoEnCaja("txtCedula", cliente.cedula);        // 4. Si el cliente fue encontrado: Muestra la cédula en el campo 'txtCedula'.
        mostrarTextoEnCaja("txtNombre", cliente.nombre);        // 5. Muestra el nombre en el campo 'txtNombre'.
        mostrarTextoEnCaja("txtEdad", cliente.edad);        // 6. Muestra la edad en el campo 'txtEdad'.
    }
}

// --------------------------------------------------------------------
// FUNCIÓN 4: crearCliente
// Controla la recolección de datos y la creación de un nuevo cliente.
// --------------------------------------------------------------------
crearCliente = function () {
    let valorCedula = recuperarTexto("txtCedula");    // 1. Recupera la cédula desde el campo de texto.
    let valorNombre = recuperarTexto("txtNombre");    // 2. Recupera el nombre desde el campo de texto.
    let valorEdad = recuperarFloat("txtEdad");    // 3. Recupera la edad como número flotante.
    let nuevoCliente = {}    // 4. Inicializa un nuevo objeto cliente.
    nuevoCliente.cedula = valorCedula;    // 5. Asigna los valores recuperados al nuevo objeto.
    nuevoCliente.nombre = valorNombre;
    nuevoCliente.edad = valorEdad;
    agregarCliente(nuevoCliente);    // 6. Llama a la función de lógica para intentar agregar el cliente al array.

}

// --------------------------------------------------------------------
// FUNCIÓN 5: agregarCliente (Lógica)
// Intenta añadir un cliente al array; si la cédula ya existe, alerta.
// --------------------------------------------------------------------
agregarCliente = function (cliente) {
    let resultado;
    resultado = buscarCliente(cliente.cedula);    // 1. Busca si ya existe un cliente con la cédula proporcionada.
    if (resultado == null) {    // 2. Si el resultado es null (cliente no existe):
        clientes.push(cliente) // 3. Añade el nuevo objeto al array 'clientes'.
        alert("cliente agregado");
        mostraClientes(); // 4. Actualiza la tabla de clientes.
    } else {
        alert("ya existe el cliente conla cedula: " + cliente.cedula);        // 5. Si el cliente existe: Muestra un error.
    }
}

// --------------------------------------------------------------------
// FUNCIÓN 6: buscarCliente (Lógica - Detallada)
// Itera el array para encontrar un cliente por cédula.
// --------------------------------------------------------------------
buscarCliente = function (cedula) {
    let elementoCliente;      // Variable temporal para el cliente actual en el bucle.
    let clienteEncontrado;    // Variable para almacenar el cliente encontrado.

    for (let i = 0; i < clientes.length; i++) {
        elementoCliente = clientes[i]; // 2. Obtiene el cliente actual.
        if (elementoCliente.cedula == cedula) {        // 3. Compara la cédula del cliente actual con la cédula de búsqueda.
            clienteEncontrado = elementoCliente; // 4. Almacena el objeto cliente.
            break; // 5. Detiene la iteración (cliente encontrado).
        }
    }
    return clienteEncontrado;    // 6. Retorna el objeto cliente (o undefined/null si no se encontró).
}

// --------------------------------------------------------------------
// FUNCIÓN 7: mostraClientes
// Genera y muestra la tabla HTML de clientes en la interfaz.
// --------------------------------------------------------------------
mostraClientes = function () {
    let cmpTabla = document.getElementById("tablaClientes");    // 1. Obtiene la referencia al elemento HTML (contenedor) donde se mostrará la tabla.
    let contenidoTabla = "<table><tr>" +    // 2. Inicializa la cadena HTML con la apertura de la tabla y los encabezados.
        "<th>CEDULA</th>" +
        "<th>NOMBRE</th>" +
        "<th>EDAD</th>" +
        "</tr>";
        
    let elementoCliente;
    for (let i = 0; i < clientes.length; i++) {    // 3. Itera sobre el array de clientes para generar las filas de datos.
        elementoCliente = clientes[i];
        
        // 4. Concatena una nueva fila <tr> con <td> para cada propiedad del cliente.
        contenidoTabla +=
            "<tr><td>" + elementoCliente.cedula + "</td>"
            + "<td>" + elementoCliente.nombre + "</td>"
            + "<td>" + elementoCliente.edad + "</td>"
            + "</tr>"
    }
    contenidoTabla += "</table>"    // 5. Cierra la etiqueta de la tabla.
    cmpTabla.innerHTML = contenidoTabla;    // 6. Inserta el HTML generado dentro del elemento contenedor ('tablaClientes'), actualizando la interfaz.

}







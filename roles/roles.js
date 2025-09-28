let empleados = [
    { cedula: "1714616123", nombre: "John", apellido: "Cena", sueldo: 500.0 },
    { cedula: "0914632123", nombre: "Luisa", apellido: "Gonzalez", sueldo: 900.0 }
];

// --- FUNCIONES DE VALIDACIÓN ---

// Muestra el mensaje de error junto al campo
mostrarError = function (idError, mensaje) {
    mostrarTexto(idError, mensaje);
}

// Oculta el mensaje de error
ocultarError = function (idError) {
    mostrarTexto(idError, "");
}

// Valida que los campos de empleado tengan datos correctos
validarCamposEmpleado = function () {
    let esValido = true;

    // Validar Cédula
    const cedula = recuperarTexto('txtCedula');
    if (cedula.length !== 10) {
        mostrarError('lblErrorCedula', 'La cédula debe tener 10 dígitos');
        esValido = false;
    } else {
        ocultarError('lblErrorCedula');
    }

    // Validar Nombre y Apellido (solo presencia)
    if (recuperarTexto('txtNombre').trim() === "") {
        mostrarError('lblErrorNombre', 'Campo obligatorio');
        esValido = false;
    } else {
        ocultarError('lblErrorNombre');
    }

    if (recuperarTexto('txtApellido').trim() === "") {
        mostrarError('lblErrorApellido', 'Campo obligatorio');
        esValido = false;
    } else {
        ocultarError('lblErrorApellido');
    }

    // Validar Sueldo
    const sueldo = recuperarTexto('txtSueldo');
    if (!esNumero(sueldo) || parseFloat(sueldo) <= 0) {
        mostrarError('lblErrorSueldo', 'Debe ser un número positivo');
        esValido = false;
    } else {
        ocultarError('lblErrorSueldo');
    }

    return esValido;
}

// --- FUNCIONES DE EMPLEADO ---

// 1. Función para generar y mostrar la tabla (CORREGIDA)
mostrarTablaEmpleados = function () {
    let contenidoTabla = "<table><thead><tr><th>CEDULA</th><th>NOMBRE</th><th>APELLIDO</th><th>SUELDO</th></tr></thead><tbody>";

    // Iterar sobre el array de empleados y construir las filas de la tabla
    empleados.forEach(empleado => {
        // *** CORRECCIÓN CRÍTICA: Se usa ${} para interpolación, no {} ***
        contenidoTabla += `<tr>
            <td>${empleado.cedula}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.apellido}</td>
            <td>${empleado.sueldo.toFixed(2)}</td>
        </tr>`;
    });

    contenidoTabla += "</tbody></table>";

    // Usar la función utilitaria para inyectar el HTML de la tabla
    mostrarTexto('tablaEmpleados', contenidoTabla);
}

// 2. Función para guardar un nuevo empleado
guardarEmpleado = function () {
    if (validarCamposEmpleado()) {
        const nuevaCedula = recuperarTexto('txtCedula');

        // Verificar si el empleado ya existe (lo buscamos por cédula)
        const existe = empleados.some(e => e.cedula === nuevaCedula);

        if (existe) {
            alert('Error: Ya existe un empleado con esa cédula. Usa el botón "BUSCAR" para modificarlo.');
            return;
        }

        const nuevoEmpleado = {
            cedula: nuevaCedula,
            nombre: recuperarTexto('txtNombre'),
            apellido: recuperarTexto('txtApellido'),
            sueldo: recuperarFloat('txtSueldo')
        };

        empleados.push(nuevoEmpleado);
        mostrarTablaEmpleados();
        limpiarCajasEmpleado();
        alert('Empleado guardado con éxito!');
        habilitarComponente('txtCedula'); // Habilitar la cédula después de guardar el nuevo
    }
}

// 3. Función para limpiar todas las cajas de ingreso de datos
limpiarCajasEmpleado = function () {
    limpiarTexto('txtCedula');
    limpiarTexto('txtNombre');
    limpiarTexto('txtApellido');
    limpiarTexto('txtSueldo');
    limpiarTexto('txtBusquedaCedula');

    // Ocultar todos los errores
    ocultarError('lblErrorCedula');
    ocultarError('lblErrorNombre');
    ocultarError('lblErrorApellido');
    ocultarError('lblErrorSueldo');
    ocultarError('lblErrorBusqueda');

    habilitarComponente('txtCedula'); // Asegurar que la cédula sea editable para un nuevo ingreso
}

// 4. Función para preparar la interfaz para un nuevo empleado
nuevoEmpleado = function () {
    limpiarCajasEmpleado();
    habilitarComponente('txtCedula');
}

// 5. Función para buscar un empleado
buscarEmpleado = function () {
    const cedulaBusqueda = recuperarTexto('txtBusquedaCedula');
    const empleadoEncontrado = empleados.find(e => e.cedula === cedulaBusqueda);

    if (empleadoEncontrado) {
        mostrarTextoEnCaja('txtCedula', empleadoEncontrado.cedula);
        mostrarTextoEnCaja('txtNombre', empleadoEncontrado.nombre);
        mostrarTextoEnCaja('txtApellido', empleadoEncontrado.apellido);
        mostrarTextoEnCaja('txtSueldo', empleadoEncontrado.sueldo.toFixed(2));

        // Deshabilitar la cédula para evitar que se cambie accidentalmente al editar
        deshabilitarComponente('txtCedula');
        ocultarError('lblErrorBusqueda');
    } else {
        limpiarCajasEmpleado();
        mostrarError('lblErrorBusqueda', 'Empleado no encontrado');
    }
}


// --- FUNCIONES DE NAVEGACIÓN (Corregidas para usar las nuevas funciones) ---

mostrarOpcionEmpleado = function () {
    mostrarComponente('divEmpleado');
    ocultarComponente('divRol');
    ocultarComponente('divResumen');
    limpiarCajasEmpleado(); // Limpia la interfaz al cambiar de sección
    mostrarTablaEmpleados();
}

mostrarOpcionRol = function () {
    mostrarComponente('divRol');
    ocultarComponente('divEmpleado');
    ocultarComponente('divResumen');
}
mostrarOpcionResumen = function () {
    mostrarComponente('divResumen');
    ocultarComponente('divEmpleado');
    ocultarComponente('divRol');
}

document.addEventListener('DOMContentLoaded', () => {
    // 4. Invocación a las funciones desde los botones respectivos
    const botonesMenu = document.querySelectorAll('.menu .estiloBoton');

    botonesMenu.forEach(button => {
        switch (button.value) {
            case "EMPLEADO":
                button.addEventListener('click', mostrarOpcionEmpleado);
                break;
            case "ROL":
                button.addEventListener('click', mostrarOpcionRol);
                break;
            case "RESUMEN":
                button.addEventListener('click', mostrarOpcionResumen);
                break;
        }
    });

    // Conectar botones del área EMPLEADO
    document.querySelector('#divEmpleado .area:nth-child(1) .contenedorBoton input').addEventListener('click', buscarEmpleado); // Primer BUSCAR
    document.querySelector('input[value="NUEVO"]').addEventListener('click', nuevoEmpleado);
    document.querySelector('#btnGuardar').addEventListener('click', guardarEmpleado);
    document.querySelector('input[value="LIMPIAR"]').addEventListener('click', limpiarCajasEmpleado);


    // Inicialización
    mostrarOpcionEmpleado();
});
let empleados = [
    { cedula: "1714616123", nombre: "John", apellido: "Cena", sueldo: 500.0 },
    { cedula: "0914632123", nombre: "Luisa", apellido: "Gonzalez", sueldo: 900.0 }
];



mostrarError = function (idError, mensaje) {
    mostrarTexto(idError, mensaje);
}


ocultarError = function (idError) {
    mostrarTexto(idError, "");
}


validarCamposEmpleado = function () {
    let esValido = true;

    
    const cedula = recuperarTexto('txtCedula');
    if (cedula.length !== 10) {
        mostrarError('lblErrorCedula', 'La cédula debe tener 10 dígitos');
        esValido = false;
    } else {
        ocultarError('lblErrorCedula');
    }

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



mostrarTablaEmpleados = function () {
    let contenidoTabla = "<table><thead><tr><th>CEDULA</th><th>NOMBRE</th><th>APELLIDO</th><th>SUELDO</th></tr></thead><tbody>";

  
    empleados.forEach(empleado => {
    
        contenidoTabla += `<tr>
            <td>${empleado.cedula}</td>
            <td>${empleado.nombre}</td>
            <td>${empleado.apellido}</td>
            <td>${empleado.sueldo.toFixed(2)}</td>
        </tr>`;
    });

    contenidoTabla += "</tbody></table>";

    mostrarTexto('tablaEmpleados', contenidoTabla);
}


guardarEmpleado = function () {
    if (validarCamposEmpleado()) {
        const nuevaCedula = recuperarTexto('txtCedula');

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
        habilitarComponente('txtCedula'); 
    }
}


limpiarCajasEmpleado = function () {
    limpiarTexto('txtCedula');
    limpiarTexto('txtNombre');
    limpiarTexto('txtApellido');
    limpiarTexto('txtSueldo');
    limpiarTexto('txtBusquedaCedula');

 
    ocultarError('lblErrorCedula');
    ocultarError('lblErrorNombre');
    ocultarError('lblErrorApellido');
    ocultarError('lblErrorSueldo');
    ocultarError('lblErrorBusqueda');

    habilitarComponente('txtCedula'); 
}

nuevoEmpleado = function () {
    limpiarCajasEmpleado();
    habilitarComponente('txtCedula');
}

buscarEmpleado = function () {
    const cedulaBusqueda = recuperarTexto('txtBusquedaCedula');
    const empleadoEncontrado = empleados.find(e => e.cedula === cedulaBusqueda);

    if (empleadoEncontrado) {
        mostrarTextoEnCaja('txtCedula', empleadoEncontrado.cedula);
        mostrarTextoEnCaja('txtNombre', empleadoEncontrado.nombre);
        mostrarTextoEnCaja('txtApellido', empleadoEncontrado.apellido);
        mostrarTextoEnCaja('txtSueldo', empleadoEncontrado.sueldo.toFixed(2));


        deshabilitarComponente('txtCedula');
        ocultarError('lblErrorBusqueda');
    } else {
        limpiarCajasEmpleado();
        mostrarError('lblErrorBusqueda', 'Empleado no encontrado');
    }
}




mostrarOpcionEmpleado = function () {
    mostrarComponente('divEmpleado');
    ocultarComponente('divRol');
    ocultarComponente('divResumen');
    limpiarCajasEmpleado();
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
    document.querySelector('#divEmpleado .area:nth-child(1) .contenedorBoton input').addEventListener('click', buscarEmpleado);
    document.querySelector('input[value="NUEVO"]').addEventListener('click', nuevoEmpleado);
    document.querySelector('#btnGuardar').addEventListener('click', guardarEmpleado);
    document.querySelector('input[value="LIMPIAR"]').addEventListener('click', limpiarCajasEmpleado);
    mostrarOpcionEmpleado();
});
let empleados = [
    { cedula: "1714616123", nombre: "John", apellido: "Cena", sueldo: 500.0 },
    { cedula: "0914632123", nombre: "Luisa", apellido: "Gonzalez", sueldo: 900.0 },
    { cedula: "0823456789", nombre: "Maria", apellido: "Perez", sueldo: 750.0 },
     { cedula: "1054321098", nombre: "Pedro", apellido: "Pascal", sueldo: 1200.0 } 
];
let roles = []; 
const PORCENTAJE_IESS_EMPLEADO = 0.0945; // 9.45%
const PORCENTAJE_IESS_EMPRESA = 0.1115;  // 11.15% (Aporte Patronal)


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
        const cedulaAActualizar = recuperarTexto('txtCedula');

        // Busca el índice del empleado si ya existe
        const indiceExistente = empleados.findIndex(e => e.cedula === cedulaAActualizar);

        const empleadoAGuardar = {
            cedula: cedulaAActualizar,
            nombre: recuperarTexto('txtNombre'),
            apellido: recuperarTexto('txtApellido'),
            sueldo: recuperarFloat('txtSueldo')
        };
        
        if (indiceExistente !== -1) {
            // Si el índice existe, MODIFICA el empleado
            empleados[indiceExistente] = empleadoAGuardar;
            alert('Empleado modificado con éxito!');
        } else {
            // Si el índice NO existe, AGREGA el nuevo empleado
            empleados.push(empleadoAGuardar);
            alert('Empleado guardado con éxito!');
        }

        mostrarTablaEmpleados();
        limpiarCajasEmpleado();
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
/*----------------------------------------*/
let empleadoEnRol = null; 

limpiarInfoRol = function () {
    mostrarTexto('infoCedula', '');
    mostrarTexto('infoNombre', '');
    mostrarTexto('infoSueldo', '');
    limpiarTexto('txtBusquedaCedulaRol');
    limpiarTexto('txtDescuentos');
    mostrarTexto('infoIESS', '0.0');
    mostrarTexto('infoPago', '0.0');
    ocultarError('lblErrorBusquedaRol');
    ocultarError('lblErrorDescuentos');
    empleadoEnRol = null;
}

buscarEmpleadoRol = function () {
    const cedulaBusqueda = recuperarTexto('txtBusquedaCedulaRol');
    const empleado = empleados.find(e => e.cedula === cedulaBusqueda);

    limpiarInfoRol();

    if (empleado) {
        empleadoEnRol = empleado;
        mostrarTexto('infoCedula', empleado.cedula);
        mostrarTexto('infoNombre', `${empleado.nombre} ${empleado.apellido}`);
        mostrarTexto('infoSueldo', empleado.sueldo.toFixed(2));
        ocultarError('lblErrorBusquedaRol');
    } else {
        mostrarError('lblErrorBusquedaRol', 'Empleado no encontrado');
        empleadoEnRol = null;
    }
}

validarCamposRol = function () {
    let esValido = true;
    
    if (empleadoEnRol === null) {
        mostrarError('lblErrorBusquedaRol', 'Debe buscar y seleccionar un empleado');
        esValido = false;
    } else {
        ocultarError('lblErrorBusquedaRol');
    }

    // Validar Descuentos
    const descuentos = recuperarTexto('txtDescuentos');
    if (!esNumero(descuentos) || parseFloat(descuentos) < 0) {
        mostrarError('lblErrorDescuentos', 'Debe ser un valor numérico positivo o cero');
        esValido = false;
    } else {
        ocultarError('lblErrorDescuentos');
    }

    return esValido;
}

calcularRol = function () {
    if (!validarCamposRol()) {
        return;
    }

    const sueldo = empleadoEnRol.sueldo;
    const descuentos = recuperarFloat('txtDescuentos');

    // Cálculo del aporte IESS del empleado
    const aporteIESS = sueldo * PORCENTAJE_IESS_EMPLEADO;

    // Cálculo del total a pagar (sueldo - IESS - otros descuentos)
    const totalPagar = sueldo - aporteIESS - descuentos;

    mostrarTexto('infoIESS', aporteIESS.toFixed(2));
    mostrarTexto('infoPago', totalPagar.toFixed(2));
    
    return {
        aporteIESS: aporteIESS,
        descuentos: descuentos,
        totalPagar: totalPagar
    };
}

guardarRol = function () {
    const calculos = calcularRol();

    if (!calculos) {
        return;
    }

    const aporteEmpresa = empleadoEnRol.sueldo * PORCENTAJE_IESS_EMPRESA;

    const nuevoRol = {
        cedula: empleadoEnRol.cedula,
        nombre: empleadoEnRol.nombre,
        apellido: empleadoEnRol.apellido,
        sueldo: empleadoEnRol.sueldo,
        descuentos: calculos.descuentos,
        aporteEmpleado: calculos.aporteIESS,
        aporteEmpresa: aporteEmpresa,
        totalPagar: calculos.totalPagar
    };

    const indiceExistente = roles.findIndex(r => r.cedula === empleadoEnRol.cedula);

    if (indiceExistente !== -1) {
        roles[indiceExistente] = nuevoRol; 
        alert(`Rol de pago actualizado para el empleado ${empleadoEnRol.cedula}`);
    } else {
        roles.push(nuevoRol); 
        alert(`Rol de pago guardado para el empleado ${empleadoEnRol.cedula}`);
    }
    
    limpiarInfoRol();
}

mostrarOpcionRol = function () {
    mostrarComponente('divRol');
    ocultarComponente('divEmpleado');
    ocultarComponente('divResumen');
    limpiarInfoRol();
}
/*---------------------------------------------------*/ 

mostrarTablaResumen = function () {
    let contenidoTabla = "<table><thead><tr><th>CEDULA</th><th>NOMBRE</th><th>SUELDO</th><th>DESC.</th><th>APORTE EMPL.</th><th>TOTAL PAGO</th></tr></thead><tbody>";
    let totalPagoGlobal = 0.0;
    let totalAporteEmpresa = 0.0;
    let totalAporteEmpleado = 0.0;

    roles.forEach(rol => {
        contenidoTabla += `<tr>
            <td>${rol.cedula}</td>
            <td>${rol.nombre} ${rol.apellido.substring(0, 1)}.</td>
            <td>${rol.sueldo.toFixed(2)}</td>
            <td>${rol.descuentos.toFixed(2)}</td>
            <td>${rol.aporteEmpleado.toFixed(2)}</td>
            <td>${rol.totalPagar.toFixed(2)}</td>
        </tr>`;

        totalPagoGlobal += rol.totalPagar;
        totalAporteEmpresa += rol.aporteEmpresa;
        totalAporteEmpleado += rol.aporteEmpleado;
    });

    contenidoTabla += "</tbody></table>";

    mostrarTexto('tablaResumen', contenidoTabla);
    mostrarTexto('infoTotalPago', totalPagoGlobal.toFixed(2));
    mostrarTexto('infoAporteEmpresa', totalAporteEmpresa.toFixed(2));
    mostrarTexto('infoAporteEmpleado', totalAporteEmpleado.toFixed(2));
}

mostrarOpcionResumen = function () {
    mostrarComponente('divResumen');
    ocultarComponente('divEmpleado');
    ocultarComponente('divRol');
     mostrarTablaResumen();
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
    
    document.querySelector('#divRol .area:nth-child(1) .contenedorBoton input').addEventListener('click', buscarEmpleadoRol);
    document.querySelector('#divRol .botones input[value="CALCULAR"]').addEventListener('click', calcularRol);
    document.querySelector('#divRol .botones input[value="GUARDAR"]').addEventListener('click', guardarRol);
    
});


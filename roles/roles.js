(function () {
    let empleados = [
        { cedula: "1714616123", nombre: "JOHN", apellido: "CENA", sueldo: 500.0 },
        { cedula: "0914632123", nombre: "LUISA", apellido: "GONZALEZ", sueldo: 900.0 },
        { cedula: "0823456789", nombre: "MARIA", apellido: "PEREZ", sueldo: 750.0 },
        { cedula: "1054321098", nombre: "PEDRO", apellido: "PASCAL", sueldo: 1200.0 }
    ];
    let roles = [];
    let empleadoEnRol = null;
    let esNuevo = false;
    const PORCENTAJE_IESS_EMPLEADO = 0.0945;
    const PORCENTAJE_IESS_EMPRESA = 0.1115;


    actualizarEstadoEmpleado = function (habilitar) {
        const campos = ["txtCedula", "txtNombre", "txtApellido", "txtSueldo"];

        campos.forEach(id => {
            limpiarTexto(id);
            ocultarError(`lblError${id.substring(3)}`);
        });
        ocultarError("lblErrorBusqueda");
        limpiarTexto("txtBusquedaCedula");

        campos.forEach(id => {
            if (habilitar) {
                habilitarComponente(id);
            } else {
                deshabilitarComponente(id);
            }
        });

        if (habilitar) {
            habilitarComponente("btnGuardar");
        } else {
            deshabilitarComponente("btnGuardar");
        }

        if (!habilitar) {
            habilitarComponente("txtBusquedaCedula");
            habilitarComponente("btnNuevo");
        }
    }

    esSoloMayusculas = function (texto) {
        return texto.trim().length >= 3 && /^[A-Z\s]+$/.test(texto.trim());
    }

    validarCamposEmpleado = function () {
        let esValido = true;

        const cedula = recuperarTexto("txtCedula");
        if (cedula.length !== 10) {
            mostrarError("lblErrorCedula", "La cédula debe tener exactamente 10 dígitos");
            esValido = false;
        } else {
            ocultarError("lblErrorCedula");
        }

        const nombre = recuperarTexto("txtNombre");
        if (!esSoloMayusculas(nombre)) {
            mostrarError("lblErrorNombre", "Mínimo 3 caracteres, solo letras mayúsculas");
            esValido = false;
        } else {
            ocultarError("lblErrorNombre");
        }

        const apellido = recuperarTexto("txtApellido");
        if (!esSoloMayusculas(apellido)) {
            mostrarError("lblErrorApellido", "Mínimo 3 caracteres, solo letras mayúsculas");
            esValido = false;
        } else {
            ocultarError("lblErrorApellido");
        }

        const sueldoStr = recuperarTexto("txtSueldo");
        const sueldo = recuperarFloat("txtSueldo");

        if (!esNumero(sueldoStr) || sueldo < 400 || sueldo > 5000) {
            mostrarError("lblErrorSueldo", "Debe ser un número flotante entre 400.00 y 5000.00");
            esValido = false;
        } else {
            ocultarError("lblErrorSueldo");
        }

        return esValido;
    }


    buscarEmpleado = function (cedula) {
        return empleados.find(e => e.cedula === cedula);
    }


    ejecutarBusqueda = function () {
        const cedulaBusqueda = recuperarTexto("txtBusquedaCedula");
        const empleadoEncontrado = buscarEmpleado(cedulaBusqueda);

        ocultarError("lblErrorBusqueda");

        limpiarCajasEmpleado();

        if (!empleadoEncontrado) {
            alert("EMPLEADO NO EXISTE");

        } else {

            mostrarTextoEnCaja("txtCedula", empleadoEncontrado.cedula);
            mostrarTextoEnCaja("txtNombre", empleadoEncontrado.nombre);
            mostrarTextoEnCaja("txtApellido", empleadoEncontrado.apellido);
            mostrarTextoEnCaja("txtSueldo", empleadoEncontrado.sueldo.toFixed(2));


            habilitarComponente("txtNombre");
            habilitarComponente("txtApellido");
            habilitarComponente("txtSueldo");
            habilitarComponente("btnGuardar");


            deshabilitarComponente("txtCedula");
            deshabilitarComponente("btnNuevo");
            deshabilitarComponente("txtBusquedaCedula");

            esNuevo = false;
        }
    }

    agregarEmpleado = function (empleado) {
        const cedula = empleado.cedula;
        const existe = empleados.some(e => e.cedula === cedula);

        if (existe) {
            return false;
        } else {
            empleados.push(empleado);
            return true;
        }
    }

    guardar = function () {
        if (!validarCamposEmpleado()) {
            return;
        }

        const cedulaRecuperada = recuperarTexto("txtCedula");
        const empleadoAGuardar = {
            cedula: cedulaRecuperada,
            nombre: recuperarTexto("txtNombre"),
            apellido: recuperarTexto("txtApellido"),
            sueldo: recuperarFloat("txtSueldo")
        };

        if (esNuevo) {
            const agregadoCorrectamente = agregarEmpleado(empleadoAGuardar);

            if (agregadoCorrectamente) {
                alert("EMPLEADO GUARDADO CORRECTAMENTE");
                esNuevo = false;

            } else {
                alert(`YA EXISTE UN EMPLEADO CON LA CÉDULA ${cedulaRecuperada}`);
                return;
            }

        } else {
            const empleadoExistente = buscarEmpleado(cedulaRecuperada);

            if (!empleadoExistente) {
                alert("Error de integridad: El empleado a modificar no se encuentra.");
                return;
            }

            const indiceExistente = empleados.findIndex(e => e.cedula === cedulaRecuperada);

            if (indiceExistente !== -1) {
                empleados[indiceExistente].nombre = empleadoAGuardar.nombre;
                empleados[indiceExistente].apellido = empleadoAGuardar.apellido;
                empleados[indiceExistente].sueldo = empleadoAGuardar.sueldo;

                alert("EMPLEADO MODIFICADO EXITOSAMENTE");
            } else {
                alert("Error: No se pudo encontrar el empleado para modificar.");
                return;
            }
        }

        mostrarTablaEmpleados();
        limpiarCajasEmpleado();
    }


    ejecutarNuevo = function () {

        limpiarCajasEmpleado();

        const campos = ["txtCedula", "txtNombre", "txtApellido", "txtSueldo"];
        campos.forEach(limpiarTexto);
        campos.forEach(ocultarError);


        campos.forEach(habilitarComponente);
        habilitarComponente("btnGuardar");

        esNuevo = true;

        deshabilitarComponente("txtBusquedaCedula");
        deshabilitarComponente("btnNuevo");
    }


    nuevoEmpleado = function () {
        ejecutarNuevo();
    }


    limpiarCajasEmpleado = function () {

        const campos = ["txtCedula", "txtNombre", "txtApellido", "txtSueldo"];

        campos.forEach(limpiarTexto);
        ocultarError("lblErrorBusqueda");
        limpiarTexto("txtBusquedaCedula");
        campos.forEach(id => ocultarError(`lblError${id.substring(3)}`));


        esNuevo = false;


        campos.forEach(deshabilitarComponente);
        deshabilitarComponente("btnGuardar");


        habilitarComponente("txtBusquedaCedula");
        habilitarComponente("btnNuevo");
    }



    
    buscarEmpleado = function () {
        const cedulaBusqueda = recuperarTexto("txtBusquedaCedula");
        const empleadoEncontrado = empleados.find(e => e.cedula === cedulaBusqueda);

        limpiarCajasEmpleado(); 
        deshabilitarComponente("txtBusquedaCedula");
        habilitarComponente("btnNuevo");
        
        if (empleadoEncontrado) {
            habilitarComponente("txtNombre");
            habilitarComponente("txtApellido");
            habilitarComponente("txtSueldo");
            habilitarComponente("btnGuardar");
            
            mostrarTextoEnCaja("txtCedula", empleadoEncontrado.cedula);
            mostrarTextoEnCaja("txtNombre", empleadoEncontrado.nombre);
            mostrarTextoEnCaja("txtApellido", empleadoEncontrado.apellido);
            mostrarTextoEnCaja("txtSueldo", empleadoEncontrado.sueldo.toFixed(2));

            deshabilitarComponente("txtCedula"); 
            ocultarError("lblErrorBusqueda");
            
            deshabilitarComponente("btnNuevo");

            esNuevo = false; 

        } else {
            mostrarError("lblErrorBusqueda", "Empleado no encontrado");
            esNuevo = false; 
            habilitarComponente("txtBusquedaCedula"); 
        }
    }
    
    agregarEmpleado = function (empleado) {
        const cedula = empleado.cedula;
        const existe = empleados.some(e => e.cedula === cedula);

        if (existe) {
            return false; 
        } else {
            empleados.push(empleado);
            return true;
        }
    }
    
    guardarEmpleado = function () {
        if (!validarCamposEmpleado()) {
            return;
        }

        const cedulaRecuperada = recuperarTexto("txtCedula");
        const empleadoAGuardar = {
            cedula: cedulaRecuperada,
            nombre: recuperarTexto("txtNombre"),
            apellido: recuperarTexto("txtApellido"),
            sueldo: recuperarFloat("txtSueldo")
        };

        if (esNuevo) {
            const agregadoCorrectamente = agregarEmpleado(empleadoAGuardar);

            if (agregadoCorrectamente) {
                alert("EMPLEADO GUARDADO CORRECTAMENTE");
            } else {
                alert(`YA EXISTE UN EMPLEADO CON LA CÉDULA ${cedulaRecuperada}`);
                limpiarCajasEmpleado(); 
                return;
            }

        } else {
            const indiceExistente = empleados.findIndex(e => e.cedula === cedulaRecuperada);

            if (indiceExistente !== -1) {
                empleados[indiceExistente] = empleadoAGuardar;
                alert("Empleado modificado con éxito!");
            } else {
                alert("Error al modificar: Empleado no encontrado. Reintente la búsqueda."); 
            }
        }
        
        mostrarTablaEmpleados();
        limpiarCajasEmpleado(); 
    }


    ejecutarNuevo = function () {
        
        limpiarCajasEmpleado(); 
        
        actualizarEstadoEmpleado(true); 
        
        esNuevo = true;
        
        deshabilitarComponente("txtBusquedaCedula"); 
        deshabilitarComponente("btnNuevo"); 

        habilitarComponente("txtCedula");
    }


    nuevoEmpleado = function () {
        ejecutarNuevo();
    }

    limpiarCajasEmpleado = function () {
        
        actualizarEstadoEmpleado(false); 
        esNuevo = false; 
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

        mostrarTexto("tablaEmpleados", contenidoTabla);
    }

    limpiarInfoRol = function () {
        mostrarTexto("infoCedula", " ");
        mostrarTexto("infoNombre", " ");
        mostrarTexto("infoSueldo", " ");
        limpiarTexto("txtBusquedaCedulaRol");
        limpiarTexto("txtDescuentos");
        mostrarTexto("infoIESS", "0.0");
        mostrarTexto("infoPago", "0.0");
        ocultarError("lblErrorBusquedaRol");
        ocultarError("lblErrorDescuentos");
        empleadoEnRol = null;
        deshabilitarComponente("btnGuardarRol"); 
    }
    /*

    buscarEmpleadoRol = function () {
        const cedulaBusqueda = recuperarTexto("txtBusquedaCedulaRol");
        const empleado = empleados.find(e => e.cedula == cedulaBusqueda);

        limpiarInfoRol();

        if (empleado) {
            empleadoEnRol = empleado;
            mostrarTexto("infoCedula", empleado.cedula);
            mostrarTexto("infoNombre", `${empleado.nombre} ${empleado.apellido}`);
            mostrarTexto("infoSueldo", empleado.sueldo.toFixed(2));
            ocultarError("lblErrorBusquedaRol");
        } else {
            mostrarError("lblErrorBusquedaRol", "Empleado no encontrado");
            empleadoEnRol = null;
        }
    }
*/


   
    buscarPorRol = function () {
        const cedulaBusqueda = recuperarTexto("txtBusquedaCedulaRol");
        const empleado = empleados.find(e => e.cedula == cedulaBusqueda);

        limpiarInfoRol();

        if (empleado) {
            empleadoEnRol = empleado;
            mostrarTexto("infoCedula", empleado.cedula);
            mostrarTexto("infoNombre", `${empleado.nombre} ${empleado.apellido}`);
            mostrarTexto("infoSueldo", empleado.sueldo.toFixed(2));
            ocultarError("lblErrorBusquedaRol");
        } else {
            mostrarError("lblErrorBusquedaRol", "Empleado no encontrado");
            alert("EMPLEADO NO EXISTE");
            empleadoEnRol = null;
        }
    }
    buscarRol = function (cedula) {
        return roles.find(r => r.cedula === cedula);
    }

    buscarPorRol = function () {
        const cedulaBusqueda = recuperarTexto("txtBusquedaCedulaRol");
        const empleado = empleados.find(e => e.cedula == cedulaBusqueda);

        limpiarInfoRol();

        if (empleado) {
            empleadoEnRol = empleado;
            mostrarTexto("infoCedula", empleado.cedula);
            mostrarTexto("infoNombre", `${empleado.nombre} ${empleado.apellido}`);
            mostrarTexto("infoSueldo", empleado.sueldo.toFixed(2));
            ocultarError("lblErrorBusquedaRol");
        } else {
            mostrarError("lblErrorBusquedaRol", "Empleado no encontrado");
            alert("EMPLEADO NO EXISTE");
            empleadoEnRol = null;
        }
    }

    calcularAporteEmpleado = function (sueldo) {
        const aporte = sueldo * PORCENTAJE_IESS_EMPLEADO;
        return aporte;
    }


    calcularValorAPagar = function (sueldo, aporteIess, descuento) {
        const valorAPagar = sueldo - aporteIess - descuento;
        return valorAPagar;
    }
    calcularAporteEmpleador = function (sueldo) {
     
        return sueldo * PORCENTAJE_IESS_EMPRESA;
    }

    validarCamposRol = function () {
        let esValido = true;
        const sueldo = empleadoEnRol ? empleadoEnRol.sueldo : 0;

        if (empleadoEnRol === null) {
            mostrarError("lblErrorBusquedaRol", "Debe buscar y seleccionar un empleado");
            esValido = false;
        } else {
            ocultarError("lblErrorBusquedaRol");
        }

        const descuentosStr = recuperarTexto("txtDescuentos");
        const descuentos = recuperarFloat("txtDescuentos");

        if (!esNumero(descuentosStr) || descuentos < 0) {
            mostrarError("lblErrorDescuentos", "Debe ser un valor numérico positivo o cero");
            esValido = false;
        } else if (empleadoEnRol !== null && descuentos > sueldo) {
            mostrarError("lblErrorDescuentos", `Los descuentos no pueden superar el sueldo (${sueldo.toFixed(2)})`);
            esValido = false;
        } else {
            ocultarError("lblErrorDescuentos");
        }

        return esValido;
    }

    calcularRol = function () {
        if (!validarCamposRol()) {
            mostrarTexto("infoIESS", "0.0");
            mostrarTexto("infoPago", "0.0");
            deshabilitarComponente("btnGuardarRol"); 
            return;
        }

        const sueldo = empleadoEnRol.sueldo;
        const descuentos = recuperarFloat("txtDescuentos");

        const aporteIESS = calcularAporteEmpleado(sueldo);

        const totalPagar = calcularValorAPagar(sueldo, aporteIESS, descuentos);

        mostrarTexto("infoIESS", aporteIESS.toFixed(2));
        mostrarTexto("infoPago", totalPagar.toFixed(2));

        habilitarComponente("btnGuardarRol"); 
    }
    agregarRol = function (rol) {
        const cedula = rol.cedula;
        const existe = roles.some(r => r.cedula === cedula);

        if (existe) {
            alert(`YA EXISTE UN ROL REGISTRADO PARA LA CÉDULA ${cedula}. Se actualizará.`);
            const indiceExistente = roles.findIndex(r => r.cedula === cedula);
            roles[indiceExistente] = rol;
            return true;
        } else {
            roles.push(rol);
            return true;
        }
    }

    guardarRol = function () {

        const totalPagar = recuperarFloat("infoPago");
        const aporteIESS = recuperarFloat("infoIESS");

        if (totalPagar === 0.0 && aporteIESS === 0.0) {
            alert("Debe calcular el rol antes de guardar.");
            return;
        }

        const cedulaRecuperada = recuperarTexto("infoCedula");
        const nombreRecuperado = empleadoEnRol ? empleadoEnRol.nombre : ''; // Se usa empleadoEnRol para nombre/sueldo/apellido
        const apellidoRecuperado = empleadoEnRol ? empleadoEnRol.apellido : '';
        const sueldo = empleadoEnRol ? empleadoEnRol.sueldo : 0.0;
        const descuentos = recuperarFloat("txtDescuentos");

        const aporteEmpresa = calcularAporteEmpleador(sueldo);

        const nuevoRol = {};
        nuevoRol.cedula = cedulaRecuperada;
        nuevoRol.nombre = nombreRecuperado;
        nuevoRol.apellido = apellidoRecuperado;
        nuevoRol.sueldo = sueldo;
        nuevoRol.valorAPagar = totalPagar; 
        nuevoRol.descuentos = descuentos;
        nuevoRol.aporteEmpleado = aporteIESS;
        nuevoRol.aporteEmpleador = aporteEmpresa; 

        agregarRol(nuevoRol); 

        alert(`Rol de pago guardado/actualizado exitosamente para el empleado ${cedulaRecuperada}`);
        deshabilitarComponente("btnGuardarRol");
        limpiarInfoRol(); 
    }




    mostrarOpcionEmpleado = function () {
        mostrarComponente("divEmpleado");
        ocultarComponente("divRol");
        ocultarComponente("divResumen");

        limpiarCajasEmpleado();

        mostrarTablaEmpleados();
    }

    mostrarRoles = function () {
        let contenidoTabla = "<table><thead><tr><th>CEDULA</th><th>NOMBRE</th><th>VALOR A PAGAR</th><th>APORTE EMPLEADO</th><th>APORTE EMPLEADOR</th></tr></thead><tbody>";

        roles.forEach(rol => {
            contenidoTabla += `<tr>
                <td>${rol.cedula}</td>
                <td>${rol.nombre} ${rol.apellido}</td>
                <td>${rol.valorAPagar.toFixed(2)}</td>
                <td>${rol.aporteEmpleado.toFixed(2)}</td>
                <td>${rol.aporteEmpleador.toFixed(2)}</td>
            </tr>`;
        });

        contenidoTabla += "</tbody></table>";

        mostrarTexto("tablaResumen", contenidoTabla);
    }

    mostrarTotales = function () {
        let totalEmpleado = 0.0;
        let totalEmpleador = 0.0;
        let totalAPagar = 0.0;

        roles.forEach(rol => {
            totalEmpleado += rol.aporteEmpleado;
            totalEmpleador += rol.aporteEmpleador;
            totalAPagar += rol.valorAPagar;
        });

        const totalNomina = totalEmpleado + totalEmpleador + totalAPagar; 

        mostrarTexto("infoTotalPago", totalAPagar.toFixed(2)); 
        mostrarTexto("infoAporteEmpresa", totalEmpleador.toFixed(2)); 
        mostrarTexto("infoAporteEmpleado", totalEmpleado.toFixed(2)); 

    }

    mostrarTablaResumen = function () {
       
        mostrarRoles();
        mostrarTotales();
    }

    mostrarOpcionRol = function () {
        mostrarComponente("divRol");
        ocultarComponente("divEmpleado");
        ocultarComponente("divResumen");
        limpiarInfoRol();
    }

    mostrarOpcionResumen = function () {
        mostrarComponente("divResumen");
        ocultarComponente("divEmpleado");
        ocultarComponente("divRol");
        mostrarTablaResumen();
    }

    document.addEventListener("DOMContentLoaded", () => {

        const botonesMenu = document.querySelectorAll(".menu .estiloBoton");

        botonesMenu.forEach(button => {
            const buttonValue = button.value.toUpperCase();
            switch (buttonValue) {
                case "EMPLEADO":
                    button.addEventListener("click", mostrarOpcionEmpleado);
                    break;
                case "ROL":
                    button.addEventListener("click", mostrarOpcionRol);
                    break;
                case "RESUMEN":
                    button.addEventListener("click", mostrarOpcionResumen);
                    break;
            }
        });

        const nuevoButton = document.querySelector('#divEmpleado .botones input[value="NUEVO"]');
        if (nuevoButton) nuevoButton.id = 'btnNuevo';


        const buscarEmpleadoButton = document.querySelector('#divEmpleado .area:nth-child(1) .contenedorBoton input[value="BUSCAR"]');
        const guardarButton = document.getElementById('btnGuardar');
        const limpiarButton = document.querySelector('#divEmpleado .botones input[value="LIMPIAR"]');

        if (buscarEmpleadoButton) buscarEmpleadoButton.addEventListener('click', ejecutarBusqueda);
        if (nuevoButton) nuevoButton.addEventListener('click', ejecutarNuevo);
        if (guardarButton) guardarButton.addEventListener('click', guardar);
        if (limpiarButton) limpiarButton.addEventListener('click', limpiarCajasEmpleado);

        const buscarRolButton = document.querySelector('#divRol .area:nth-child(1) .contenedorBoton input[value="BUSCAR"]');
        const calcularRolButton = document.querySelector('#divRol .botones input[value="CALCULAR"]');

        const guardarRolButton = document.querySelector('#divRol .botones input[value="GUARDAR"]');
        if (guardarRolButton) guardarRolButton.id = 'btnGuardarRol'; 

        if (buscarRolButton) buscarRolButton.addEventListener('click', buscarPorRol);
        if (calcularRolButton) calcularRolButton.addEventListener('click', calcularRol);
        if (guardarRolButton) guardarRolButton.addEventListener('click', guardarRol);

        mostrarOpcionRol();
    });

})();




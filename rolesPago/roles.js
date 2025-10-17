(function () {
    // === Variables Globales y Constantes ===

    // Array principal que almacena los objetos de los empleados.
    let empleados = [
        { cedula: "1714616123", nombre: "JOHN", apellido: "CENA", sueldo: 500.0 },
        { cedula: "0914632123", nombre: "LUISA", apellido: "GONZALEZ", sueldo: 900.0 },
        { cedula: "0823456789", nombre: "MARIA", apellido: "PEREZ", sueldo: 750.0 },
        { cedula: "1054321098", nombre: "PEDRO", apellido: "PASCAL", sueldo: 1200.0 }
    ];

    // Array para almacenar los roles de pago calculados (incluye detalles de aportes y pago).
    let roles = [];

    // Variable para almacenar el empleado que se está procesando actualmente en la sección de Rol de Pago.
    let empleadoEnRol = null;

    // Bandera booleana para indicar si se está creando un nuevo empleado (true) o modificando uno existente (false).
    let esNuevo = false;

    // Constante para el porcentaje de aporte al IESS (Instituto Ecuatoriano de Seguridad Social) del empleado (9.45%).
    const PORCENTAJE_IESS_EMPLEADO = 0.0945;

    // Constante para el porcentaje de aporte al IESS que cubre la empresa (11.15%).
    const PORCENTAJE_IESS_EMPRESA = 0.1115;

    // === Funciones de Utilidad y Estado de UI (Se asume la existencia de las funciones: recuperarTexto, recuperarFloat,
    // limpiarTexto, mostrarTextoEnCaja, habilitarComponente, deshabilitarComponente, mostrarError, ocultarError,
    // esNumero, mostrarTexto, mostrarComponente, ocultarComponente)

    /**
     * Habilita o deshabilita los campos de entrada de datos del empleado y el botón de Guardar.
     * También limpia los campos y errores asociados.
     * @param {boolean} habilitar - Si es true, habilita; si es false, deshabilita.
     */
    actualizarEstadoEmpleado = function (habilitar) {
        const campos = ["txtCedula", "txtNombre", "txtApellido", "txtSueldo"];

        // 1. Limpia los campos de texto del empleado y oculta sus errores.
        campos.forEach(id => {
            limpiarTexto(id);
            // El id del label de error se construye a partir del id del campo (ej: txtCedula -> lblErrorCedula)
            ocultarError(`lblError${id.substring(3)}`);
        });

        // 2. Limpia y oculta errores del campo de búsqueda de cédula.
        ocultarError("lblErrorBusqueda");
        limpiarTexto("txtBusquedaCedula");

        // 3. Habilita o deshabilita los campos de entrada de datos del empleado.
        campos.forEach(id => {
            if (habilitar) {
                habilitarComponente(id);
            } else {
                deshabilitarComponente(id);
            }
        });

        // 4. Habilita o deshabilita el botón de Guardar.
        if (habilitar) {
            habilitarComponente("btnGuardar");
        } else {
            deshabilitarComponente("btnGuardar");
        }

        // 5. Configuración específica para el estado deshabilitado (listo para nueva búsqueda o nuevo registro).
        if (!habilitar) {
            habilitarComponente("txtBusquedaCedula"); // Permite buscar
            habilitarComponente("btnNuevo"); // Permite iniciar un nuevo registro
        }
    }

    /**
     * Valida que un texto tenga al menos 3 caracteres y contenga solo letras mayúsculas y espacios.
     * @param {string} texto - El texto a validar.
     * @returns {boolean} - true si es válido, false en caso contrario.
     */
    esSoloMayusculas = function (texto) {
        // Expresión regular: ^[A-Z\s]+$ -> solo mayúsculas (A-Z) y espacios (\s).
        return texto.trim().length >= 3 && /^[A-Z\s]+$/.test(texto.trim());
    }

    // === Lógica de Validación de Empleado ===

    /**
     * Valida todos los campos del formulario de Empleado y muestra mensajes de error si es necesario.
     * @returns {boolean} - true si todos los campos son válidos, false en caso contrario.
     */
    validarCamposEmpleado = function () {
        let esValido = true;

        // --- Validación de Cédula (10 dígitos exactos) ---
        const cedula = recuperarTexto("txtCedula");
        if (cedula.length !== 10) {
            mostrarError("lblErrorCedula", "La cédula debe tener exactamente 10 dígitos");
            esValido = false;
        } else {
            ocultarError("lblErrorCedula");
        }

        // --- Validación de Nombre (Mínimo 3 caracteres, solo mayúsculas/espacios) ---
        const nombre = recuperarTexto("txtNombre");
        if (!esSoloMayusculas(nombre)) {
            mostrarError("lblErrorNombre", "Mínimo 3 caracteres, solo letras mayúsculas");
            esValido = false;
        } else {
            ocultarError("lblErrorNombre");
        }

        // --- Validación de Apellido ---
        const apellido = recuperarTexto("txtApellido");
        if (!esSoloMayusculas(apellido)) {
            mostrarError("lblErrorApellido", "Mínimo 3 caracteres, solo letras mayúsculas");
            esValido = false;
        } else {
            ocultarError("lblErrorApellido");
        }

        // --- Validación de Sueldo (Flotante entre 400.00 y 5000.00) ---
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

    // === Lógica de Empleado (CRUD) ===

    /**
     * Busca un empleado en el array 'empleados' por su cédula.
     * @param {string} cedula - La cédula a buscar.
     * @returns {Object|undefined} - El objeto empleado o undefined si no se encuentra.
     */
    buscarEmpleado = function (cedula) {
        return empleados.find(e => e.cedula === cedula);
    }

    /**
     * Función que ejecuta la búsqueda de un empleado por la cédula ingresada en la caja de búsqueda.
     * Si lo encuentra, carga los datos en el formulario y habilita la modificación.
     * (Esta función está duplicada/redefinida más abajo, se mantiene la última versión activa).
     */
    // ejecutarBusqueda = function () { ... } // Comentada, se usa la versión posterior 'buscarEmpleado'

    /**
     * Agrega un nuevo empleado al array si la cédula no existe.
     * @param {Object} empleado - El objeto empleado a agregar.
     * @returns {boolean} - true si se agregó, false si ya existía.
     */
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

    /**
     * Gestiona el guardado o modificación de un empleado.
     * 1. Valida los campos.
     * 2. Si 'esNuevo' es true, intenta agregar el empleado.
     * 3. Si 'esNuevo' es false, busca y modifica el empleado existente.
     * (Esta función está duplicada/redefinida más abajo, se mantiene la última versión activa).
     */
    // guardar = function () { ... } // Comentada, se usa la versión posterior 'guardarEmpleado'

    /**
     * Prepara el formulario para el ingreso de un nuevo empleado.
     * Limpia, habilita campos y establece 'esNuevo' a true.
     * (Esta función está duplicada/redefinida más abajo, se mantiene la última versión activa).
     */
    // ejecutarNuevo = function () { ... } // Comentada, se usa la versión posterior 'ejecutarNuevo'

    /**
     * Llama a 'ejecutarNuevo' (Manejador de evento para el botón 'Nuevo').
     * (Esta función está duplicada/redefinida más abajo, se mantiene la última versión activa).
     */
    // nuevoEmpleado = function () { ... } // Comentada, se usa la versión posterior 'nuevoEmpleado'

    /**
     * Limpia todos los campos del formulario de Empleado y lo devuelve al estado inicial
     * (campos deshabilitados, botones de búsqueda y nuevo habilitados).
     * (Esta función está duplicada/redefinida más abajo, se mantiene la última versión activa).
     */
    // limpiarCajasEmpleado = function () { ... } // Comentada, se usa la versión posterior 'limpiarCajasEmpleado'

    // === Redefiniciones (Versiones Finales de las funciones de Empleado) ===

    /**
     * Versión final de la función para buscar un empleado por cédula de búsqueda.
     * Carga los datos para edición si lo encuentra o muestra un error.
     */
    buscarEmpleado = function () {
        const cedulaBusqueda = recuperarTexto("txtBusquedaCedula");
        const empleadoEncontrado = empleados.find(e => e.cedula === cedulaBusqueda);

        // Limpia el estado y prepara la UI
        limpiarCajasEmpleado();
        deshabilitarComponente("txtBusquedaCedula"); // Temporalmente se deshabilita para el caso de éxito
        habilitarComponente("btnNuevo"); // Siempre se habilita el botón de Nuevo

        if (empleadoEncontrado) {
            // Caso: Empleado encontrado (Modificación)
            habilitarComponente("txtNombre");
            habilitarComponente("txtApellido");
            habilitarComponente("txtSueldo");
            habilitarComponente("btnGuardar");

            // Muestra los datos del empleado
            mostrarTextoEnCaja("txtCedula", empleadoEncontrado.cedula);
            mostrarTextoEnCaja("txtNombre", empleadoEncontrado.nombre);
            mostrarTextoEnCaja("txtApellido", empleadoEncontrado.apellido);
            mostrarTextoEnCaja("txtSueldo", empleadoEncontrado.sueldo.toFixed(2));

            deshabilitarComponente("txtCedula"); // La cédula no se puede modificar
            ocultarError("lblErrorBusqueda");

            deshabilitarComponente("btnNuevo"); // Se deshabilita para forzar a guardar o limpiar

            esNuevo = false; // Estado de modificación
            habilitarComponente("txtBusquedaCedula"); // Se habilita la caja de búsqueda nuevamente (mejor UX)

        } else {
            // Caso: Empleado no encontrado
            mostrarError("lblErrorBusqueda", "Empleado no encontrado");
            esNuevo = false;
            habilitarComponente("txtBusquedaCedula"); // Habilita la caja de búsqueda para reintentar
        }
    }

    /**
     * Versión final para guardar o modificar un empleado.
     */
    guardarEmpleado = function () {
        if (!validarCamposEmpleado()) {
            return; // Detiene si la validación falla
        }

        const cedulaRecuperada = recuperarTexto("txtCedula");
        const empleadoAGuardar = {
            cedula: cedulaRecuperada,
            nombre: recuperarTexto("txtNombre"),
            apellido: recuperarTexto("txtApellido"),
            sueldo: recuperarFloat("txtSueldo")
        };

        if (esNuevo) {
            // --- Caso: Nuevo Empleado ---
            const agregadoCorrectamente = agregarEmpleado(empleadoAGuardar);

            if (agregadoCorrectamente) {
                alert("EMPLEADO GUARDADO CORRECTAMENTE");
            } else {
                alert(`YA EXISTE UN EMPLEADO CON LA CÉDULA ${cedulaRecuperada}`);
                limpiarCajasEmpleado(); // Limpia y regresa al estado inicial
                return;
            }

        } else {
            // --- Caso: Modificación de Empleado ---
            const indiceExistente = empleados.findIndex(e => e.cedula === cedulaRecuperada);

            if (indiceExistente !== -1) {
                // Modifica el empleado en el array
                empleados[indiceExistente] = empleadoAGuardar;
                alert("Empleado modificado con éxito!");
            } else {
                alert("Error al modificar: Empleado no encontrado. Reintente la búsqueda.");
                return;
            }
        }

        mostrarTablaEmpleados(); // Actualiza la tabla después del guardado/modificación
        limpiarCajasEmpleado(); // Regresa al estado inicial
    }

    /**
     * Versión final de la función para iniciar un nuevo registro.
     */
    ejecutarNuevo = function () {
        limpiarCajasEmpleado(); // Limpia y establece estado deshabilitado
        actualizarEstadoEmpleado(true); // Habilita todos los campos para nuevo registro

        esNuevo = true;

        deshabilitarComponente("txtBusquedaCedula"); // Deshabilita la búsqueda mientras se ingresa el nuevo
        deshabilitarComponente("btnNuevo"); // Deshabilita el botón 'Nuevo'

        habilitarComponente("txtCedula"); // Asegura que la cédula esté habilitada para el ingreso inicial
    }

    /**
     * Versión final del manejador de evento para el botón 'Nuevo'.
     */
    nuevoEmpleado = function () {
        ejecutarNuevo();
    }

    /**
     * Versión final de la función para limpiar y volver al estado inicial del formulario de Empleado.
     */
    limpiarCajasEmpleado = function () {
        actualizarEstadoEmpleado(false); // Limpia campos y deshabilita todo (excepto búsqueda/nuevo)
        esNuevo = false;
    }

    // === Lógica de Rol de Pago ===

    /**
     * Limpia los campos de información y cálculo del Rol de Pago.
     */
    limpiarInfoRol = function () {
        mostrarTexto("infoCedula", " ");
        mostrarTexto("infoNombre", " ");
        mostrarTexto("infoSueldo", " ");
        limpiarTexto("txtBusquedaCedulaRol");
        limpiarTexto("txtDescuentos");
        mostrarTexto("infoIESS", "0.0"); // Aporte empleado
        mostrarTexto("infoPago", "0.0"); // Total a pagar
        ocultarError("lblErrorBusquedaRol");
        ocultarError("lblErrorDescuentos");
        empleadoEnRol = null; // Reinicia el empleado seleccionado
        deshabilitarComponente("btnGuardarRol"); // Deshabilita el botón de Guardar hasta que se calcule
    }

    /**
     * Busca un empleado para el cálculo de su Rol de Pago por la cédula de búsqueda.
     */
    buscarPorRol = function () {
        const cedulaBusqueda = recuperarTexto("txtBusquedaCedulaRol");
        const empleado = empleados.find(e => e.cedula == cedulaBusqueda);

        limpiarInfoRol(); // Limpia la información previa

        if (empleado) {
            empleadoEnRol = empleado;
            // Muestra la información del empleado
            mostrarTexto("infoCedula", empleado.cedula);
            mostrarTexto("infoNombre", `${empleado.nombre} ${empleado.apellido}`);
            mostrarTexto("infoSueldo", empleado.sueldo.toFixed(2));
            ocultarError("lblErrorBusquedaRol");
            // Nota: No habilita automáticamente el botón de Guardar, se debe CALCULAR primero.
        } else {
            mostrarError("lblErrorBusquedaRol", "Empleado no encontrado");
            alert("EMPLEADO NO EXISTE");
            empleadoEnRol = null;
        }
    }

    /**
     * Busca un Rol de Pago existente por cédula.
     * @param {string} cedula - La cédula a buscar.
     * @returns {Object|undefined} - El objeto rol o undefined.
     */
    buscarRol = function (cedula) {
        return roles.find(r => r.cedula === cedula);
    }

    /**
     * Calcula el aporte al IESS (Instituto Ecuatoriano de Seguridad Social) que corresponde al empleado.
     * @param {number} sueldo - El sueldo del empleado.
     * @returns {number} - El valor del aporte.
     */
    calcularAporteEmpleado = function (sueldo) {
        const aporte = sueldo * PORCENTAJE_IESS_EMPLEADO;
        return aporte;
    }

    /**
     * Calcula el valor neto a pagar al empleado.
     * Sueldo - Aporte IESS (Empleado) - Otros Descuentos.
     * @param {number} sueldo - El sueldo base.
     * @param {number} aporteIess - El aporte IESS del empleado.
     * @param {number} descuento - Otros descuentos.
     * @returns {number} - El valor neto a pagar.
     */
    calcularValorAPagar = function (sueldo, aporteIess, descuento) {
        const valorAPagar = sueldo - aporteIess - descuento;
        return valorAPagar;
    }

    /**
     * Calcula el aporte al IESS que corresponde al empleador (empresa).
     * @param {number} sueldo - El sueldo del empleado.
     * @returns {number} - El valor del aporte del empleador.
     */
    calcularAporteEmpleador = function (sueldo) {
        return sueldo * PORCENTAJE_IESS_EMPRESA;
    }

    /**
     * Valida los campos necesarios para el cálculo del Rol de Pago.
     * 1. Que exista un empleado seleccionado.
     * 2. Que los descuentos sean numéricos, positivos/cero y no superen el sueldo.
     * @returns {boolean} - true si es válido, false en caso contrario.
     */
    validarCamposRol = function () {
        let esValido = true;
        const sueldo = empleadoEnRol ? empleadoEnRol.sueldo : 0;

        // 1. Validar que se haya buscado un empleado
        if (empleadoEnRol === null) {
            mostrarError("lblErrorBusquedaRol", "Debe buscar y seleccionar un empleado");
            esValido = false;
        } else {
            ocultarError("lblErrorBusquedaRol");
        }

        // 2. Validar Descuentos
        const descuentosStr = recuperarTexto("txtDescuentos");
        const descuentos = recuperarFloat("txtDescuentos");

        if (!esNumero(descuentosStr) || descuentos < 0) {
            mostrarError("lblErrorDescuentos", "Debe ser un valor numérico positivo o cero");
            esValido = false;
        } else if (empleadoEnRol !== null && descuentos > sueldo) {
            // El descuento no puede ser mayor que el sueldo (si hay empleado)
            mostrarError("lblErrorDescuentos", `Los descuentos no pueden superar el sueldo (${sueldo.toFixed(2)})`);
            esValido = false;
        } else {
            ocultarError("lblErrorDescuentos");
        }

        return esValido;
    }

    /**
     * Ejecuta los cálculos del Rol de Pago y muestra los resultados.
     */
    calcularRol = function () {
        if (!validarCamposRol()) {
            // Si la validación falla, resetea los campos de cálculo y el botón de Guardar
            mostrarTexto("infoIESS", "0.0");
            mostrarTexto("infoPago", "0.0");
            deshabilitarComponente("btnGuardarRol");
            return;
        }

        const sueldo = empleadoEnRol.sueldo;
        const descuentos = recuperarFloat("txtDescuentos");

        // Cálculo del aporte y valor a pagar
        const aporteIESS = calcularAporteEmpleado(sueldo);
        const totalPagar = calcularValorAPagar(sueldo, aporteIESS, descuentos);

        // Muestra los resultados
        mostrarTexto("infoIESS", aporteIESS.toFixed(2));
        mostrarTexto("infoPago", totalPagar.toFixed(2));

        habilitarComponente("btnGuardarRol"); // Habilita la opción para guardar el rol calculado
    }

    /**
     * Agrega un nuevo rol de pago o actualiza uno existente (basado en la cédula).
     * @param {Object} rol - El objeto rol a guardar/actualizar.
     * @returns {boolean} - true siempre (indica que la operación de agregar/actualizar fue manejada).
     */
    agregarRol = function (rol) {
        const cedula = rol.cedula;
        const indiceExistente = roles.findIndex(r => r.cedula === cedula);

        if (indiceExistente !== -1) {
            // Caso: El rol existe (actualizar)
            alert(`YA EXISTE UN ROL REGISTRADO PARA LA CÉDULA ${cedula}. Se actualizará.`);
            roles[indiceExistente] = rol;
            return true;
        } else {
            // Caso: Es un rol nuevo (agregar)
            roles.push(rol);
            return true;
        }
    }

    /**
     * Guarda el Rol de Pago calculado en el array 'roles'.
     * Incluye datos del empleado, los cálculos de aportes (empleado y empleador) y el valor a pagar.
     */
    guardarRol = function () {

        // 1. Verifica si se han realizado los cálculos
        const totalPagar = recuperarFloat("infoPago");
        const aporteIESS = recuperarFloat("infoIESS");

        if (totalPagar === 0.0 && aporteIESS === 0.0) {
            alert("Debe calcular el rol antes de guardar.");
            return;
        }

        // 2. Recupera los datos para el objeto Rol
        const cedulaRecuperada = recuperarTexto("infoCedula");
        const nombreRecuperado = empleadoEnRol ? empleadoEnRol.nombre : '';
        const apellidoRecuperado = empleadoEnRol ? empleadoEnRol.apellido : '';
        const sueldo = empleadoEnRol ? empleadoEnRol.sueldo : 0.0;
        const descuentos = recuperarFloat("txtDescuentos");

        // 3. Calcula el aporte del empleador
        const aporteEmpresa = calcularAporteEmpleador(sueldo);

        // 4. Crea el objeto Rol
        const nuevoRol = {};
        nuevoRol.cedula = cedulaRecuperada;
        nuevoRol.nombre = nombreRecuperado;
        nuevoRol.apellido = apellidoRecuperado;
        nuevoRol.sueldo = sueldo;
        nuevoRol.valorAPagar = totalPagar;
        nuevoRol.descuentos = descuentos;
        nuevoRol.aporteEmpleado = aporteIESS;
        nuevoRol.aporteEmpleador = aporteEmpresa;

        // 5. Agrega/Actualiza el Rol en el array
        agregarRol(nuevoRol);

        alert(`Rol de pago guardado/actualizado exitosamente para el empleado ${cedulaRecuperada}`);
        deshabilitarComponente("btnGuardarRol");
        limpiarInfoRol(); // Limpia la interfaz después de guardar
    }

    // === Lógica de Vistas (Navegación y Tablas) ===

    /**
     * Muestra la sección de Empleado y oculta las demás.
     */
    mostrarOpcionEmpleado = function () {
        mostrarComponente("divEmpleado");
        ocultarComponente("divRol");
        ocultarComponente("divResumen");

        limpiarCajasEmpleado(); // Regresa al estado inicial
        mostrarTablaEmpleados(); // Muestra la tabla de empleados
    }

    /**
     * Genera el HTML de la tabla de empleados y la muestra en el componente 'tablaEmpleados'.
     */
    mostrarTablaEmpleados = function () {
        let contenidoTabla = "<table><thead><tr><th>CEDULA</th><th>NOMBRE</th><th>APELLIDO</th><th>SUELDO</th></tr></thead><tbody>";

        // Itera sobre el array de empleados para construir las filas
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

    /**
     * Genera el HTML de la tabla de Roles de Pago y la muestra en el componente 'tablaResumen'.
     */
    mostrarRoles = function () {
        let contenidoTabla = "<table><thead><tr><th>CEDULA</th><th>NOMBRE</th><th>VALOR A PAGAR</th><th>APORTE EMPLEADO</th><th>APORTE EMPLEADOR</th></tr></thead><tbody>";

        // Itera sobre el array de roles para construir las filas
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

        mostrarTexto("tablaResumen", contenidoTabla); // Muestra la tabla de roles
    }

    /**
     * Calcula y muestra los totales acumulados de los roles de pago.
     */
    mostrarTotales = function () {
        let totalEmpleado = 0.0;
        let totalEmpleador = 0.0;
        let totalAPagar = 0.0;

        // Suma los valores de todos los roles
        roles.forEach(rol => {
            totalEmpleado += rol.aporteEmpleado;
            totalEmpleador += rol.aporteEmpleador;
            totalAPagar += rol.valorAPagar;
        });

        // La variable totalNomina se calcula pero no se usa para mostrar, solo los subtotales.
        // const totalNomina = totalEmpleado + totalEmpleador + totalAPagar; 

        // Muestra los totales en los componentes de información
        mostrarTexto("infoTotalPago", totalAPagar.toFixed(2));
        mostrarTexto("infoAporteEmpresa", totalEmpleador.toFixed(2));
        mostrarTexto("infoAporteEmpleado", totalEmpleado.toFixed(2));
    }

    /**
     * Prepara y muestra la tabla de resumen de roles y los totales.
     */
    mostrarTablaResumen = function () {
        mostrarRoles();
        mostrarTotales();
    }

    /**
     * Muestra la sección de Rol de Pago y oculta las demás.
     */
    mostrarOpcionRol = function () {
        mostrarComponente("divRol");
        ocultarComponente("divEmpleado");
        ocultarComponente("divResumen");
        limpiarInfoRol(); // Limpia la interfaz de Rol al entrar
    }

    /**
     * Muestra la sección de Resumen y oculta las demás.
     */
    mostrarOpcionResumen = function () {
        mostrarComponente("divResumen");
        ocultarComponente("divEmpleado");
        ocultarComponente("divRol");
        mostrarTablaResumen(); // Calcula y muestra la tabla y totales de resumen
    }

    // === Inicialización de Event Listeners (al cargar el DOM) ===

    document.addEventListener("DOMContentLoaded", () => {

        // 1. Asignación de event listeners para el menú de navegación (Empleado, Rol, Resumen)
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

        // 2. Asignación de event listeners para la sección de Empleado
        // Se añade un ID 'btnNuevo' al botón NUEVO si no lo tiene (para compatibilidad)
        const nuevoButton = document.querySelector('#divEmpleado .botones input[value="NUEVO"]');
        if (nuevoButton) nuevoButton.id = 'btnNuevo';

        const buscarEmpleadoButton = document.querySelector('#divEmpleado .area:nth-child(1) .contenedorBoton input[value="BUSCAR"]');
        const guardarButton = document.getElementById('btnGuardar');
        const limpiarButton = document.querySelector('#divEmpleado .botones input[value="LIMPIAR"]');

        if (buscarEmpleadoButton) buscarEmpleadoButton.addEventListener('click', buscarEmpleado); // Usa la versión final
        if (nuevoButton) nuevoButton.addEventListener('click', ejecutarNuevo);
        if (guardarButton) guardarButton.addEventListener('click', guardarEmpleado); // Usa la versión final
        if (limpiarButton) limpiarButton.addEventListener('click', limpiarCajasEmpleado);

        // 3. Asignación de event listeners para la sección de Rol de Pago
        const buscarRolButton = document.querySelector('#divRol .area:nth-child(1) .contenedorBoton input[value="BUSCAR"]');
        const calcularRolButton = document.querySelector('#divRol .botones input[value="CALCULAR"]');

        // Se añade un ID 'btnGuardarRol' al botón GUARDAR de Rol si no lo tiene
        const guardarRolButton = document.querySelector('#divRol .botones input[value="GUARDAR"]');
        if (guardarRolButton) guardarRolButton.id = 'btnGuardarRol';

        if (buscarRolButton) buscarRolButton.addEventListener('click', buscarPorRol);
        if (calcularRolButton) calcularRolButton.addEventListener('click', calcularRol);
        if (guardarRolButton) guardarRolButton.addEventListener('click', guardarRol);

        // 4. Establece la vista inicial al cargar la página (Rol de Pago)
        mostrarOpcionRol();
    });

})(); // Fin de la función autoejecutable (IIFE)
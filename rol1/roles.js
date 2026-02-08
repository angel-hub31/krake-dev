// roles.js - Lógica de Negocio
let empleados = [
    { cedula: "1714616123", nombre: "JOHN", apellido: "CENA", sueldo: 500.0 },
    { cedula: "0914632123", nombre: "LUISA", apellido: "GONZALEZ", sueldo: 900.0 },
    { cedula: "0823456789", nombre: "MARIA", apellido: "PEREZ", sueldo: 750.0 },
    { cedula: "1054321098", nombre: "PEDRO", apellido: "PASCAL", sueldo: 1200.0 },
    { cedula: "1722334455", nombre: "ANA", apellido: "MARTINEZ", sueldo: 850.0 }
];

let esNuevo = false;
let roles = [];

// --- PARTE 3 Y 4: EMPLEADOS ---
gestionarComponentesEmpleado = function(estado) {
    let fun = estado ? habilitarComponente : deshabilitarComponente;
    fun("txtCedula"); fun("txtNombre"); fun("txtApellido"); fun("txtSueldo"); fun("btnGuardar");
}

ejecutarNuevo = function() {
    limpiar();
    gestionarComponentesEmpleado(true);
    esNuevo = true;
}

buscarEmpleado = function(cedula) {
    for (let emp of empleados) {
        if (emp.cedula === cedula) return emp;
    }
    return null;
}

guardar = function() {
    let ced = recuperarTexto("txtCedula");
    let nom = recuperarTexto("txtNombre");
    let ape = recuperarTexto("txtApellido");
    let sue = recuperarFloat("txtSueldo");

    // Validaciones (Parte 3)
    if (ced.length !== 10) { alert("Cédula incorrecta"); return; }
    if (nom.length < 3 || nom !== nom.toUpperCase()) { alert("Nombre inválido"); return; }
    if (isNaN(sue) || sue < 400 || sue > 5000) { alert("Sueldo fuera de rango"); return; }

    if (esNuevo) {
        if (buscarEmpleado(ced) == null) {
            empleados.push({cedula: ced, nombre: nom, apellido: ape, sueldo: sue});
            alert("EMPLEADO GUARDADO CORRECTAMENTE");
        } else {
            alert("YA EXISTE UN EMPLEADO CON LA CEDULA " + ced);
        }
    } else {
        let emp = buscarEmpleado(ced);
        emp.nombre = nom; emp.apellido = ape; emp.sueldo = sue;
        alert("EMPLEADO MODIFICADO EXITOSAMENTE");
    }
    mostrarEmpleados();
    esNuevo = false;
    gestionarComponentesEmpleado(false);
}

ejecutarBusqueda = function() {
    let ced = recuperarTexto("txtBusquedaCedula");
    let emp = buscarEmpleado(ced);
    if (emp) {
        mostrarTextoEnCaja("txtCedula", emp.cedula);
        mostrarTextoEnCaja("txtNombre", emp.nombre);
        mostrarTextoEnCaja("txtApellido", emp.apellido);
        mostrarTextoEnCaja("txtSueldo", emp.sueldo);
        gestionarComponentesEmpleado(true);
        deshabilitarComponente("txtCedula");
        esNuevo = false;
    } else { alert("EMPLEADO NO EXISTE"); }
}

limpiar = function() {
    mostrarTextoEnCaja("txtCedula", "");
    mostrarTextoEnCaja("txtNombre", "");
    mostrarTextoEnCaja("txtApellido", "");
    mostrarTextoEnCaja("txtSueldo", "");
    esNuevo = false;
    gestionarComponentesEmpleado(false);
}

// --- PARTE 5 Y 6: ROL DE PAGOS ---
buscarPorRol = function() {
    let ced = recuperarTexto("txtCedulaRol");
    let emp = buscarEmpleado(ced);
    if (emp) {
        mostrarTextoEnDiv("infoCedula", emp.cedula);
        mostrarTextoEnDiv("infoNombre", emp.nombre + " " + emp.apellido);
        mostrarTextoEnDiv("infoSueldo", emp.sueldo);
        deshabilitarComponente("btnGuardarRol");
    } else { alert("Empleado no existe"); }
}

calcularRol = function() {
    let sue = recuperarFloatDiv("infoSueldo");
    let desc = recuperarFloat("txtDescuento");
    if (isNaN(desc) || desc < 0 || desc > sue) { alert("Descuento inválido"); return; }

    let aporte = sue * 0.1115; // 11.15% según Parte 6
    let total = sue - (sue * 0.0945) - desc; // 9.45% para el neto

    mostrarTextoEnDiv("infoAporte", aporte.toFixed(2));
    mostrarTextoEnDiv("infoTotal", total.toFixed(2));
    habilitarComponente("btnGuardarRol");
}

guardarRol = function() {
    let rol = {
        cedula: recuperarTextoDiv("infoCedula"),
        nombre: recuperarTextoDiv("infoNombre"),
        sueldo: recuperarFloatDiv("infoSueldo"),
        valorAPagar: recuperarFloatDiv("infoTotal"),
        aporteEmpleado: recuperarFloatDiv("infoAporte")
    };
    roles.push(rol);
    alert("ROL GUARDADO");
    deshabilitarComponente("btnGuardarRol");
}

mostrarOpcionRol = function() {
    ocultarComponente("divEmpleado");
    mostrarComponente("divRol");
    ocultarComponente("divResumen");
}

mostrarOpcionResumen = function() {
    ocultarComponente("divEmpleado");
    ocultarComponente("divRol");
    mostrarComponente("divResumen");
    mostrarRoles();
}

mostrarRoles = function() {
    let tabla = "<table><tr><th>CEDULA</th><th>NOMBRE</th><th>VALOR A PAGAR</th><th>APORTE</th></tr>";
    for (let r of roles) {
        tabla += `<tr><td>${r.cedula}</td><td>${r.nombre}</td><td>${r.valorAPagar}</td><td>${r.aporteEmpleado}</td></tr>`;
    }
    document.getElementById("tablaResumen").innerHTML = tabla + "</table>";
    mostrarTotales();
}

mostrarTotales = function() {
    let tEmp = 0, tAporte = 0, tPag = 0;
    for (let r of roles) {
        tAporte += r.aporteEmpleado; tPag += r.valorAPagar;
    }
    mostrarTextoEnDiv("totalAportes", tAporte.toFixed(2));
    mostrarTextoEnDiv("totalNomina", (tAporte + tPag).toFixed(2));
}

mostrarEmpleados = function() {
    let tabla = "<table><tr><th>CEDULA</th><th>NOMBRE</th><th>APELLIDO</th><th>SUELDO</th></tr>";
    for (let e of empleados) {
        tabla += `<tr><td>${e.cedula}</td><td>${e.nombre}</td><td>${e.apellido}</td><td>${e.sueldo}</td></tr>`;
    }
    document.getElementById("tablaEmpleados").innerHTML = tabla + "</table>";
}



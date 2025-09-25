validarPlaca = function () {
    let placa = document.getElementById("idPlaca").value.trim();
    let erroresEstructura = validarEstructura(placa);

    let cmpValidacion = document.getElementById("lblValida");
    let cmpError = document.getElementById("lblErrores");
    let cmpProvincia = document.getElementById("lblProvincia");
    let cmpVehiculo = document.getElementById("lblVehiculo");
    let cmpPicoPlaca = document.getElementById("lblPicoPlaca");

    if (erroresEstructura == null) {
        cmpValidacion.innerText = "ESTRUCTURA VALIDA";
        cmpError.innerText = "";

        let provincia = obtenerProvincia(placa);
        cmpProvincia.innerText = provincia ?? "PROVINCIA INCORRECTA";

        let vehiculo = obtenerTipoVehiculo(placa);
        cmpVehiculo.innerText = vehiculo ?? "TIPO INCORRECTO";

        let picoPlaca = obtenerDiaPicoYPlaca(placa);
        cmpPicoPlaca.innerText = picoPlaca ?? "";
    } else {
        cmpValidacion.innerText = "ESTRUCTURA INVALIDA";
        cmpError.innerText = erroresEstructura;
        cmpProvincia.innerText = "";
        cmpVehiculo.innerText = "";
        cmpPicoPlaca.innerText = "";
    }
}

limpiarDatos = function () {
    document.getElementById("idPlaca").value = "";
    document.getElementById("lblValida").innerText = "";
    document.getElementById("lblErrores").innerText = "";
    document.getElementById("lblProvincia").innerText = "";
    document.getElementById("lblVehiculo").innerText = "";
    document.getElementById("lblPicoPlaca").innerText = "";

    document.getElementById("idPlaca").focus();
}

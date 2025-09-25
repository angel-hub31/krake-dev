validarEstructura = function (placa) {
    let errores = [];

    if (placa.length == 7 || placa.length == 8) {
        if (!esMayuscula(placa.charAt(0))) errores.push("El primer caracter debe ser mayuscula");
        if (!esMayuscula(placa.charAt(1))) errores.push("El segundo caracter debe ser mayuscula");
        if (!esMayuscula(placa.charAt(2))) errores.push("El tercer caracter debe ser mayscula");
        if (!esGuion(placa.charAt(3))) errores.push("El cuarto caracter debe ser un guion");
        if (!esDigito(placa.charAt(4))) errores.push("El quinto caracter debe ser un digito");
        if (!esDigito(placa.charAt(5))) errores.push("El sexto caracter debe ser un digito");
        if (!esDigito(placa.charAt(6))) errores.push("El septimo caracter debe ser un digito");

        if (placa.length == 8 && !esDigito(placa.charAt(7))) {
            errores.push("El octavo caracter debe ser un digito");
        }
    } else {
        errores.push("La placa debe tener 7 u 8 caracteres");
    }

    return errores.length > 0 ? errores.join(", ") : null;
}

obtenerProvincia = function (placa) {
    let charProvincia = placa.charAt(0);
    switch (charProvincia) {
        case 'A': return 'Azuay';
        case 'B': return 'Bolivar';
        case 'U': return 'Cañar';
        case 'C': return 'Carchi';
        case 'X': return 'Cotopaxi';
        case 'H': return 'Chimborazo';
        case 'O': return 'El Oro';
        case 'E': return 'Esmeraldas';
        case 'W': return 'Galapagos';
        case 'G': return 'Guayas';
        case 'I': return 'Imbabura';
        case 'L': return 'Loja';
        case 'R': return 'Los Rios';
        case 'M': return 'Manabi';
        case 'V': return 'Morona Santiago';
        case 'N': return 'Napo';
        case 'S': return 'Pastaza';
        case 'P': return 'Pichincha';
        case 'K': return 'Sucumbios';
        case 'T': return 'Tungurahua';
        case 'Z': return 'Zamora Chinchipe';
        case 'Y': return 'Santa Elena';
        default: return null;
    }
}

obtenerTipoVehiculo = function (placa) {
    let charVehiculo = placa.charAt(1);
    if (!esMayuscula(charVehiculo)) return null;

    switch (charVehiculo) {
        case 'A': case 'Z': return 'Vehiculo comercial';
        case 'E': return 'Vehiculo gubernamental';
        case 'X': return 'Vehiculo de uso oficial';
        case 'S': return 'Vehiculo del gobierno provincial';
        case 'M': return 'Vehiculo municipal';
        default: return 'Vehiculo particular';
    }
}

obtenerDiaPicoYPlaca = function (placa) {
    let ultimo = placa.charAt(placa.length - 1);
    switch (ultimo) {
        case '1': case '2': return 'Lunes';
        case '3': case '4': return 'Martes';
        case '5': case '6': return 'Miercoles';
        case '7': case '8': return 'Jueves';
        case '9': case '0': return 'Viernes';
        default: return null;
    }
}

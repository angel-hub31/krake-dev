calcularTasaInteres = function(ingresoAnual){
    let cmpValorTasa;
    let valorTasa = 0;

    if (ingresoAnual < 300000) {
        console.log("La tasa es del 16%");
        valorTasa = 16;
    } else if (ingresoAnual >= 300000 && ingresoAnual < 500000) {
        console.log("La tasa es del 15%");
        valorTasa = 15;
    } else if (ingresoAnual >= 500000 && ingresoAnual < 1000000) {
        console.log("La tasa es del 14%");
        valorTasa = 14;
    } else if (ingresoAnual >= 1000000 && ingresoAnual < 2000000) {
        console.log("La tasa es del 13%");
        valorTasa = 13;
    } else if (ingresoAnual >= 2000000) {
        console.log("La tasa es del 12%");
        valorTasa = 12;
    }

    cmpValorTasa = document.getElementById("txtTasa");
    if (cmpValorTasa) cmpValorTasa.value = valorTasa + "%";

    return valorTasa;
}


calcularCapacidadDePago = function(edad, ingresos, egresos){
    let disponible = ingresos - egresos;
    let cuota = 0;

    if (disponible <= 0) {
        console.log("No hay saldo disponible");
        cuota = 0;
    } else if (edad > 50) {
        cuota = disponible * 0.30;
        console.log("Su capacidad es del 30%");
    } else {
        cuota = disponible * 0.40;
        console.log("Su capacidad es del 40%");
    }

    return cuota;
}


calcularDescuento = function(precio, cantidad) {
    let total = precio * cantidad;
    let descuento = 0;
    let totalConDescuento;

    if (cantidad < 3) {
        console.log("No recibe descuento");
    } else if (cantidad >= 3 && cantidad <= 5) {
        descuento = 0.02;
        console.log("Recibe 2% de descuento");
    } else if (cantidad >= 6 && cantidad <= 11) {
        descuento = 0.03;
        console.log("Recibe 3% de descuento");
    } else if (cantidad >= 12) {
        descuento = 0.04;
        console.log("Recibe 4% de descuento");
    }

    totalConDescuento = total - (total * descuento);
    return totalConDescuento;
}



determinarColesterolLDL = function(nivelColesterol){
    let categoria = "";

    if (nivelColesterol < 100) {
        categoria = "Óptimo";
    } else if (nivelColesterol >= 100 && nivelColesterol <= 129) {
        categoria = "Casi óptimo";
    } else if (nivelColesterol >= 130 && nivelColesterol <= 159) {
        categoria = "Límite alto";
    } else if (nivelColesterol >= 160 && nivelColesterol <= 189) {
        categoria = "Alto";
    } else { 
        categoria = "Muy alto";
    }

    console.log(categoria);
    return categoria;
}


validarClave = function(clave){
   
    if (typeof clave === "string" && clave.length >= 8 && clave.length <= 16) {
        console.log("La clave es válida");
        return true;
    } else {
        console.log("Clave inválida");
        return false;
    }
}

esMayuscula = function(caracter){
    if (!caracter || caracter.length === 0) return false;
    let codigo = caracter.charCodeAt(0);
    if (codigo >= 65 && codigo <= 90) {
        console.log("La letra es mayúscula");
        return true;
    } else {
        console.log("La letra no es mayúscula");
        return false;
    }
}

esMinuscula = function(caracter){
    if (!caracter || caracter.length == 0) return false;
    let codigo = caracter.charCodeAt(0);
    if (codigo >= 97 && codigo <= 122) {
        console.log("La letra es minúscula");
        return true;
    }
    let minusculasEspeciales = "áéíóúñü";
    if (minusculasEspeciales.includes(caracter)) {
        console.log("La letra es minúscula (carácter especial)");
        return true;
    }
    console.log("La letra no es minúscula");
    return false;
}

esDigito = function(caracter){
    if (!caracter || caracter.length == 0) return false;
    let codigo = caracter.charCodeAt(0);
    if (codigo >= 48 && codigo <= 57) {
        console.log("El carácter es un dígito");
        return true;
    } else {
        console.log("El carácter no es un dígito");
        return false;
    }
}


darPermiso = function(notaMatematica, notaFisica, notaGeometria){
    if ((notaMatematica > 90 || notaFisica > 90 || notaGeometria > 90) && notaFisica > notaMatematica) {
        console.log("Tiene permiso");
        return true;
    } else {
        console.log("No tiene permiso");
        return false;
    }
}

otorgarPermiso = function(notaMatematica, notaFisica, notaGeometria){
    if ((notaMatematica > 90 || notaFisica > 90) && notaGeometria > 80) {
        console.log("Tiene permiso");
        return true;
    } else {
        console.log("No tiene permiso");
        return false;
    }
}

dejarSalir = function(notaMatematica, notaFisica, notaGeometria){
    if ((notaMatematica > 90 || notaFisica > 90 || notaGeometria > 90) && notaFisica > notaMatematica) {
        console.log("Tiene permiso");
        return true;
    } else {
        console.log("No tiene permiso");
        return false;
    }
}

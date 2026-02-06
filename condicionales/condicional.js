// ===============================================
// FUNCIÓN: CALCULAR TASA DE INTERÉS BASADA EN INGRESO ANUAL
// ===============================================
calcularTasaInteres = function(ingresoAnual){
    let cmpValorTasa;
    let valorTasa = 0; // 1. Inicializa la tasa de interés en 0.
    if (ingresoAnual < 300000) {        // 2a. Rango 1: Menos de 300,000.
        console.log("La tasa es del 16%");
        valorTasa = 16;
    } else if (ingresoAnual >= 300000 && ingresoAnual < 500000) {        // 2b. Rango 2: Entre 300,000 y 499,999.
        console.log("La tasa es del 15%");
        valorTasa = 15;
    } else if (ingresoAnual >= 500000 && ingresoAnual < 1000000) {        // 2c. Rango 3: Entre 500,000 y 999,999.
        console.log("La tasa es del 14%");
        valorTasa = 14;
    } else if (ingresoAnual >= 1000000 && ingresoAnual < 2000000) {        // 2d. Rango 4: Entre 1,000,000 y 1,999,999.
        console.log("La tasa es del 13%");
        valorTasa = 13;
    } else if (ingresoAnual >= 2000000) {        // 2e. Rango 5: 2,000,000 o más.
        console.log("La tasa es del 12%");
        valorTasa = 12;
    }
    cmpValorTasa = document.getElementById("txtTasa");    // 3. Intenta actualizar un campo de texto en la interfaz de usuario.
    if (cmpValorTasa) cmpValorTasa.value = valorTasa + "%";    // 4. Si el componente existe, establece su valor con el porcentaje de la tasa.
    return valorTasa;    // 5. Retorna el valor numérico de la tasa.
}
// ===============================================
// FUNCIÓN: CALCULAR CAPACIDAD DE PAGO PARA UN PRÉSTAMO
// ===============================================
calcularCapacidadDePago = function(edad, ingresos, egresos){
    let disponible = ingresos - egresos;    // 1. Calcula el saldo disponible (Ingresos - Egresos).
    let cuota = 0;  
    if (disponible <= 0) {
        console.log("No hay saldo disponible");        // 2a. Si no hay saldo disponible o es negativo.
        cuota = 0;
    } else if (edad > 50) {
        cuota = disponible * 0.30;        // 2b. Si la persona es mayor de 50 años, la cuota máxima es el 30% del disponible.
        console.log("Su capacidad es del 30%");
    } else {
        cuota = disponible * 0.40;         // 2c. En cualquier otro caso (disponible > 0 y edad <= 50), la cuota máxima es el 40% del disponible.
        console.log("Su capacidad es del 40%");
    }
    return cuota;    // 3. Retorna la cuota máxima calculada.
}
// ===============================================
// FUNCIÓN: CALCULAR DESCUENTO POR VOLUMEN DE COMPRA
// ===============================================
calcularDescuento = function(precio, cantidad) {    // 1. Calcula el total base sin descuento.
    let total = precio * cantidad;
    let descuento = 0;
    let totalConDescuento;    
    if (cantidad < 3) {        // 2a. Menos de 3 unidades: No hay descuento.
        console.log("No recibe descuento");        // descuento se mantiene en 0.
    } else if (cantidad >= 3 && cantidad <= 5) {        // 2b. 3 a 5 unidades: 2% de descuento.
        descuento = 0.02;
        console.log("Recibe 2% de descuento");
    } else if (cantidad >= 6 && cantidad <= 11) {        // 2c. 6 a 11 unidades: 3% de descuento.
        descuento = 0.03;
        console.log("Recibe 3% de descuento");
    } else if (cantidad >= 12) {        // 2d. 12 o más unidades: 4% de descuento.
        descuento = 0.04;
        console.log("Recibe 4% de descuento");
    }
    totalConDescuento = total - (total * descuento);    // 3. Calcula el total final con el descuento aplicado.
    return totalConDescuento;    // 4. Retorna el total final a pagar.
}
// ===============================================
// FUNCIÓN: DETERMINAR CATEGORÍA DE COLESTEROL LDL
// ===============================================
determinarColesterolLDL = function(nivelColesterol){
    let categoria = "";    
    if (nivelColesterol < 100) {        // 1a. Menos de 100.
        categoria = "Óptimo";
    } else if (nivelColesterol >= 100 && nivelColesterol <= 129) {        // 1b. Entre 100 y 129.
        categoria = "Casi óptimo";
    } else if (nivelColesterol >= 130 && nivelColesterol <= 159) {        // 1c. Entre 130 y 159.
        categoria = "Límite alto";
    } else if (nivelColesterol >= 160 && nivelColesterol <= 189) {        // 1d. Entre 160 y 189.
        categoria = "Alto";
    } else {         // 1e. 190 o más.
        categoria = "Muy alto";
    }
    console.log(categoria);    // 2. Muestra la categoría en la consola.
    return categoria;    // 3. Retorna la categoría.
}
// ===============================================
// FUNCIÓN: VALIDAR CLAVE (LONGITUD)
// ===============================================
validarClave = function(clave){
    // 1. Comprueba dos condiciones:
    //    1a. Que el argumento 'clave' sea de tipo cadena de texto ('string').
    //    1b. Que la longitud de la clave esté entre 8 (mínimo) y 16 (máximo), ambos inclusive.
    if (typeof clave === "string" && clave.length >= 8 && clave.length <= 16) {
        console.log("La clave es válida");
        return true;
    } else {
        console.log("Clave inválida");
        return false;
    }
}
// ===============================================
// FUNCIÓN: VERIFICAR SI UN CARÁCTER ES MAYÚSCULA
// ===============================================
esMayuscula = function(caracter){
    if (!caracter || caracter.length === 0) return false;    // 1. Validación inicial: Si el carácter es nulo o vacío, retorna falso inmediatamente.
    let codigo = caracter.charCodeAt(0);    // 2. Obtiene el código ASCII/Unicode del primer carácter de la cadena.
    if (codigo >= 65 && codigo <= 90) {    // 3. Compara el código con el rango ASCII de letras mayúsculas (A-Z).
        console.log("La letra es mayúscula");
        return true;
    } else {
        console.log("La letra no es mayúscula");
        return false;
    }
}
// FUNCIÓN: VERIFICAR SI UN CARÁCTER ES MINÚSCULA
// ===============================================
esMinuscula = function(caracter){
    if (!caracter || caracter.length == 0) return false;    // 1. Validación inicial: Si el carácter es nulo o vacío, retorna falso.
    let codigo = caracter.charCodeAt(0);    // 2. Obtiene el código ASCII/Unicode del primer carácter.
    if (codigo >= 97 && codigo <= 122) {    // 3. Compara el código con el rango ASCII de letras minúsculas (a-z).
        console.log("La letra es minúscula");
        return true;
    }
    let minusculasEspeciales = "áéíóúñü";    // 4. Manejo de caracteres especiales minúsculos (acentos, ñ, ü).
    if (minusculasEspeciales.includes(caracter)) {
        console.log("La letra es minúscula (carácter especial)");
        return true;
    }
    console.log("La letra no es minúscula");    // 5. Si no cumple ninguna condición anterior, no es una letra minúscula.
    return false;
}
// ===============================================
// FUNCIÓN: VERIFICAR SI UN CARÁCTER ES UN DÍGITO
// ===============================================
esDigito = function(caracter){
    if (!caracter || caracter.length == 0) return false;    // 1. Validación inicial: Si el carácter es nulo o vacío, retorna falso.
    let codigo = caracter.charCodeAt(0);    // 2. Obtiene el código ASCII/Unicode del primer carácter.
    if (codigo >= 48 && codigo <= 57) {    // 3. Compara el código con el rango ASCII de dígitos (0-9).
        console.log("El carácter es un dígito");
        return true;
    } else {
        console.log("El carácter no es un dígito");
        return false;
    }
}
// ===============================================
// FUNCIÓN: DAR PERMISO (Basada en calificaciones 1)
// ===============================================
darPermiso = function(notaMatematica, notaFisica, notaGeometria){
    // 1. La condición para dar permiso requiere que SE CUMPLAN AMBAS partes:
    //    Parte A (OR): Al menos una nota (Matemáticas O Física O Geometría) debe ser mayor a 90.
    //    Parte B (AND): La nota de Física debe ser estrictamente mayor que la nota de Matemáticas.
    if ((notaMatematica > 90 || notaFisica > 90 || notaGeometria > 90) && notaFisica > notaMatematica) {
        console.log("Tiene permiso");
        return true;
    } else {
        console.log("No tiene permiso");
        return false;
    }
}
// ===============================================
// FUNCIÓN: OTORGAR PERMISO (Basada en calificaciones 2)
// ===============================================
otorgarPermiso = function(notaMatematica, notaFisica, notaGeometria){
    // 1. La condición para otorgar permiso requiere que SE CUMPLAN AMBAS partes:
    //    Parte A (OR): La nota de Matemáticas O la de Física debe ser mayor a 90.
    //    Parte B (AND): La nota de Geometría debe ser mayor a 80.
    if ((notaMatematica > 90 || notaFisica > 90) && notaGeometria > 80) {
        console.log("Tiene permiso");
        return true;
    } else {
        console.log("No tiene permiso");
        return false;
    }
}
// ===============================================
// FUNCIÓN: DEJAR SALIR (idéntica a 'darPermiso')
// ===============================================
dejarSalir = function(notaMatematica, notaFisica, notaGeometria){
    if ((notaMatematica > 90 || notaFisica > 90 || notaGeometria > 90) && notaFisica > notaMatematica) {    // 1. La condición es: (al menos una nota > 90) Y (Física > Matemáticas).
        console.log("Tiene permiso");
        return true;
    } else {
        console.log("No tiene permiso");
        return false;
    }
}
// ====================================================================
// FUNCIONES AUXILIARES NECESARIAS PARA LA VALIDACIÓN
// NOTA: Estas funciones no estaban en el código original, pero son esenciales.
// ====================================================================

// Función auxiliar: Verifica si un caracter es una letra mayúscula (A-Z).
esMayuscula = function (caracter) {
    // Los códigos ASCII de A-Z van de 65 a 90.
    let ascii = caracter.charCodeAt(0);
    return ascii >= 65 && ascii <= 90;
}

// Función auxiliar: Verifica si un caracter es un dígito (0-9).
esDigito = function (caracter) {
    // Los códigos ASCII de 0-9 van de 48 a 57.
    let ascii = caracter.charCodeAt(0);
    return ascii >= 48 && ascii <= 57;
}

// Función auxiliar: Verifica si un caracter es uno de los especiales permitidos (*, -, _).
esCaracter = function (caracter) {
    return caracter === '*' || caracter === '-' || caracter === '_';
}

// ====================================================================
// FUNCIÓN PRINCIPAL: validarPassword
// Verifica si una contraseña cumple con todos los requisitos.
// ====================================================================
validarPassword = function (password) {
    // Array para almacenar todos los mensajes de error encontrados.
    let errores = [];
    
    // Contadores de los tipos de caracteres requeridos, inicializados a 0.
    let digitos = 0;
    let mayusculas = 0;
    let caracteres = 0;
    
    // --- Validación de Longitud Mínima ---
    if (password.length < 8) {
        errores.push("La contraseña debe tener mínimo 8 caracteres");
    }
    
    // --- Validación de Longitud Máxima ---
    if (password.length > 16) {
        errores.push("La contraseña debe tener máximo 16 caracteres");
    }
    
    // --- Bucle para contar tipos de caracteres ---
    for (let i = 0; i < password.length; i++) {
        let caracter = password.charAt(i); // Obtiene el caracter actual.

        if (esMayuscula(caracter)) {
            mayusculas++; // Incrementa el contador de mayúsculas.
        }
        if (esDigito(caracter)) {
            digitos++;    // Incrementa el contador de dígitos.
        }
        if (esCaracter(caracter)) {
            caracteres++; // Incrementa el contador de caracteres especiales.
        }
    }
    
    // --- Verificación de Requisitos Mínimos (contadores) ---
    if (mayusculas == 0) {
        errores.push("Debe tener al menos una letra mayúscula");
    }
    if (digitos == 0) {
        errores.push("Debe tener al menos un dígito");
    }
    if (caracteres == 0) {
        errores.push("Debe tener al menos un caracter especial (*, -, _)");
    }
    
    // Retorna todos los errores encontrados, unidos por coma y espacio.
    // Si 'errores' está vacío, retorna una cadena vacía ("").
    return errores.join(", ");
}

// ====================================================================
// FUNCIÓN DE CONTROL: ejecutarValidacion
// Recoge la contraseña de la interfaz y muestra el resultado de la validación.
// ====================================================================
ejecutarValidacion = function () {
    // 1. Obtiene el valor del campo de contraseña (se asume un ID "idPassword").
    let password = document.getElementById("idPassword").value; 
    
    // 2. Llama a la función de validación. El resultado es una cadena de errores o "".
    let errores = validarPassword(password); 
    
    // 3. Verifica si la cadena de errores está vacía (contraseña correcta).
    if (errores == "") {
        // Se asume que 'mostrarTexto' muestra el mensaje de éxito en un elemento de la interfaz.
        mostrarTexto("idError", "Password Correcto "); 
        // Se corrige el alert: la bienvenida no debe incluir la variable 'errores' aquí.
        alert("BIEVENIDO"); 
    } else {
        // Si hay errores:
        // El alert mostrará la cadena de errores (ej: "Mínimo 8, Sin mayúsculas, ...").
        alert(errores);
        // Opcional: Podrías usar 'mostrarTexto("idError", errores);' para mostrar en la interfaz.
    }
}
// ====================================================================
// FUNCIÓN 1: validarEstructura
// Verifica que la placa cumpla con el formato LLL-NNN(N) y los tipos de caracteres.
// ====================================================================
validarEstructura = function (placa) {
    let errores = []; // Array para almacenar los mensajes de error de estructura.

    // 1. Validación de longitud: Comprueba si la placa tiene 7 u 8 caracteres.
    if (placa.length == 7 || placa.length == 8) {
        
        // --- Validación del patrón de caracteres (se asume LLL-NNN o LLL-NNNN) ---
        
        // 2. Verifica si el primer caracter es una letra mayúscula (se asume L).
        if (!esMayuscula(placa.charAt(0))) errores.push("El primer caracter debe ser mayuscula");
        
        // 3. Verifica si el segundo caracter es una letra mayúscula (se asume L).
        if (!esMayuscula(placa.charAt(1))) errores.push("El segundo caracter debe ser mayuscula");
        
        // 4. Verifica si el tercer caracter es una letra mayúscula (se asume L).
        if (!esMayuscula(placa.charAt(2))) errores.push("El tercer caracter debe ser mayscula");
        
        // 5. Verifica si el cuarto caracter es un guion (se asume -).
        if (!esGuion(placa.charAt(3))) errores.push("El cuarto caracter debe ser un guion");
        
        // 6. Verifica si el quinto caracter es un dígito (se asume N).
        if (!esDigito(placa.charAt(4))) errores.push("El quinto caracter debe ser un digito");
        
        // 7. Verifica si el sexto caracter es un dígito (se asume N).
        if (!esDigito(placa.charAt(5))) errores.push("El sexto caracter debe ser un digito");
        
        // 8. Verifica si el séptimo caracter es un dígito (se asume N).
        if (!esDigito(placa.charAt(6))) errores.push("El septimo caracter debe ser un digito");

        // 9. Validación del octavo caracter (solo si la longitud es 8).
        if (placa.length == 8 && !esDigito(placa.charAt(7))) {
            errores.push("El octavo caracter debe ser un digito");
        }
    } else {
        // 10. Si la longitud no es ni 7 ni 8, añade el error de longitud.
        errores.push("La placa debe tener 7 u 8 caracteres");
    }

    // 11. Retorna los errores: si hay errores (length > 0), une el array con ", " y lo retorna.
    // Si no hay errores (length == 0), retorna null (indicando que la estructura es válida).
    return errores.length > 0 ? errores.join(", ") : null;
}

// ====================================================================
// FUNCIÓN 2: obtenerProvincia
// Obtiene el nombre de la provincia según la primera letra de la placa.
// ====================================================================
obtenerProvincia = function (placa) {
    // 1. Obtiene el primer caracter de la placa, que representa la provincia.
    let charProvincia = placa.charAt(0); 
    
    // 2. Inicia una estructura switch para mapear el caracter a un nombre de provincia.
    switch (charProvincia) {
        // 3. Casos de mapeo: Si la letra es 'A', retorna 'Azuay', y así sucesivamente.
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
        
        // 4. Caso por defecto: Si el caracter no coincide con ninguna provincia conocida, retorna null.
        default: return null;
    }
}

// ====================================================================
// FUNCIÓN 3: obtenerTipoVehiculo
// Obtiene el tipo de vehículo según el segundo caracter de la placa.
// ====================================================================
obtenerTipoVehiculo = function (placa) {
    // 1. Obtiene el segundo caracter de la placa, que indica el tipo de vehículo.
    let charVehiculo = placa.charAt(1); 
    
    // 2. Validación: Si el segundo caracter no es mayúscula (aunque la estructura ya lo verificó), retorna null.
    if (!esMayuscula(charVehiculo)) return null;

    // 3. Inicia una estructura switch para mapear el caracter a un tipo de vehículo.
    switch (charVehiculo) {
        // 4. Si es 'A' o 'Z', es vehículo comercial (transporte, carga, etc.).
        case 'A': case 'Z': return 'Vehiculo comercial';
        
        // 5. Si es 'E', es vehículo gubernamental (Ejército, Policía, etc.).
        case 'E': return 'Vehiculo gubernamental';
        
        // 6. Si es 'X', es vehículo de uso oficial (Gobierno Central).
        case 'X': return 'Vehiculo de uso oficial';
        
        // 7. Si es 'S', es vehículo del gobierno provincial.
        case 'S': return 'Vehiculo del gobierno provincial';
        
        // 8. Si es 'M', es vehículo municipal.
        case 'M': return 'Vehiculo municipal';
        
        // 9. Caso por defecto: Si no coincide con ningún tipo especial, se asume vehículo particular.
        default: return 'Vehiculo particular';
    }
}

// ====================================================================
// FUNCIÓN 4: obtenerDiaPicoYPlaca
// Obtiene el día de restricción según el último dígito de la placa.
// ====================================================================
obtenerDiaPicoYPlaca = function (placa) {
    // 1. Obtiene el último caracter de la placa (el último dígito).
    let ultimo = placa.charAt(placa.length - 1); 
    
    // 2. Inicia una estructura switch para mapear el último dígito al día de restricción.
    switch (ultimo) {
        // 3. Si termina en 1 o 2, la restricción es el Lunes.
        case '1': case '2': return 'Lunes';
        
        // 4. Si termina en 3 o 4, la restricción es el Martes.
        case '3': case '4': return 'Martes';
        
        // 5. Si termina en 5 o 6, la restricción es el Miércoles.
        case '5': case '6': return 'Miercoles';
        
        // 6. Si termina en 7 o 8, la restricción es el Jueves.
        case '7': case '8': return 'Jueves';
        
        // 7. Si termina en 9 o 0, la restricción es el Viernes.
        case '9': case '0': return 'Viernes';
        
        // 8. Caso por defecto: Si el último caracter no es un dígito (de 0 a 9), retorna null.
        default: return null;
    }
}





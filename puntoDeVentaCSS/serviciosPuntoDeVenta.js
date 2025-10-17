// ====================================================================
// FUNCIÓN 1: calcularDescuentoPorVolumen
// Aplica un descuento porcentual basado en la cantidad comprada.
// ====================================================================
calcularDescuentoPorVolumen = function (subtotal, cantidad) {
    let descuento = 0; // Inicializa la variable de descuento en cero.

    // 1. Primer rango de descuento: Cantidad entre 3 y 5 (ambos incluidos).
    if (cantidad >= 3 && cantidad <= 5) {
        // Aplica un 3% de descuento sobre el subtotal.
        descuento = subtotal * 0.03; 
    } 
    // 2. Segundo rango de descuento: Cantidad entre 6 y 11 (ambos incluidos).
    else if (cantidad >= 6 && cantidad <= 11) {
        // Aplica un 4% de descuento sobre el subtotal.
        descuento = subtotal * 0.04; 
    } 
    // 3. Tercer rango de descuento: Cantidad igual o mayor a 12.
    else if (cantidad >= 12) {
        // Aplica un 5% de descuento sobre el subtotal.
        descuento = subtotal * 0.05; 
    }
    
    // 4. Devuelve el valor numérico del descuento calculado (será 0 si no cumple ninguna condición).
    return descuento;
}

// ====================================================================
// FUNCIÓN 2: calcularIva
// Calcula el Impuesto al Valor Agregado (IVA) con una tasa fija del 12%.
// El 'monto' recibido debe ser el subtotal ya descontado.
// ====================================================================
calcularIva = function (monto) {
    // 1. Calcula el 12% del monto proporcionado.
    return monto * 0.12; 
}

// ====================================================================
// FUNCIÓN 3: calcularSubtotal
// Calcula el costo base multiplicando el precio unitario por la cantidad.
// ====================================================================
calcularSubtotal = function (precio, cantidad) {
    // 1. Devuelve el resultado de multiplicar precio por cantidad.
    return precio * cantidad;
}

// ====================================================================
// FUNCIÓN 4: calcularTotal
// Calcula el valor final a pagar.
// ====================================================================
calcularTotal = function (subtotal, descuento, iva) {
    // 1. Calcula el total: (Subtotal - Descuento) + IVA.
    return subtotal - descuento + iva;
}
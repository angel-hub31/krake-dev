// ====================================================================
// FUNCIÓN 1: CalcularValorDescuento
// Calcula el monto monetario del descuento aplicado a un monto base.
// ====================================================================
CalcularValorDescuento = function (monto, porcentajeDescuento) {
    // 1. Declara la variable local para almacenar el valor del descuento.
    let valorDescuento; 
    
    // 2. Realiza el cálculo: (monto * porcentajeDescuento) / 100.
    // Ejemplo: (100 * 15) / 100 = 15.
    valorDescuento = (monto * porcentajeDescuento) / 100; 
    
    // 3. Devuelve el valor numérico del descuento.
    return valorDescuento; 
}

// ====================================================================
// FUNCIÓN 2: calcularIva
// Calcula el Impuesto al Valor Agregado (IVA) después de aplicar el descuento.
// Se asume una tasa de IVA del 12% (0.12).
// ====================================================================
calcularIva = function (monto, descuento) {
    // 1. Declara la variable (implícitamente global si no se usa 'let' o 'const') para el valor del IVA.
    // Cálculo: (Monto base - Descuento) * 0.12 (tasa de IVA).
    valorIva = (monto - descuento) * 0.12; 
    
    // 2. Devuelve el valor numérico del IVA.
    return valorIva
}

// ====================================================================
// FUNCIÓN 3: calcularSubtotal
// Calcula el costo base de un producto (precio unitario por cantidad).
// ====================================================================
calcularSubtotal = function (precio, cantidad) {
    // 1. Declara la variable local para almacenar el subtotal.
    let totaAPagar; 
    
    // 2. Realiza el cálculo del subtotal: precio unitario * cantidad.
    totaAPagar = precio * cantidad; 
    
    // 3. Devuelve el subtotal.
    return totaAPagar; 
}

// ====================================================================
// FUNCIÓN 4: calcularTotal
// Calcula el valor final a pagar después de aplicar descuento e IVA.
// ====================================================================
calcularTotal = function (subtotal, descuento, iva) {
    // 1. Declara la variable (implícitamente global) para el valor total.
    // Cálculo: (Subtotal - Descuento) + IVA.
    valorTotal = (subtotal - descuento) + iva; 
    
    // 2. Devuelve el valor numérico del total a pagar.
    return valorTotal; 
}
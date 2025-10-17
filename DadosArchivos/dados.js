// ===============================================
// FUNCIÓN PRINCIPAL: JUGAR AL DADO Y DETERMINAR GANADOR
// ===============================================
jugar = function () {
    let aleatorio;
    
    // 1. Llama a la función 'lanzarDado' para obtener un número aleatorio entre 1 y 6.
    aleatorio = lanzarDado();
    
    // 2. Muestra el número del dado que salió en el componente con id "lblNumero".
    //    (Este texto será sobrescrito en el paso 5 o 8, ya que la función se llama dos veces).
    cambiarTexto("lblNumero", aleatorio);

    // 3. Comienza la lógica condicional para determinar si se gana o pierde.
    if (aleatorio > 3) {
        // 4. BLOQUE GANADOR (el dado salió 4, 5 o 6).
        console.log("ES MAYOR A 3");
        console.log("GANASTE");

        // 5. Muestra en pantalla: Sobrescribe el valor anterior con un mensaje de condición.
        //    (Este texto será sobrescrito inmediatamente por el siguiente paso).
        cambiarTexto("lblNumero", "ES MAYOR A 3"); 
        
        // 6. Muestra en pantalla: Sobrescribe el valor anterior con el mensaje final de GANADOR.
        cambiarTexto("lblNumero", "ES MAYOR A 3 GANASTE"); 
    } else {
        // 7. BLOQUE PERDEDOR (el dado salió 1, 2 o 3).
        console.log("ES MENOR A 3");
        console.log("PERDISTE");

        // 8. Muestra en pantalla: Sobrescribe el valor anterior con un mensaje de condición.
        //    (Este texto será sobrescrito inmediatamente por el siguiente paso).
        cambiarTexto("lblNumero", "ES MENOR A 3");
        
        // 9. Muestra en pantalla: Sobrescribe el valor anterior con el mensaje final de PERDEDOR.
        cambiarTexto("lblNumero", "ES MENOR A 3 PERDISTE");
    }
}

// ===============================================
// FUNCIÓN AUXILIAR: SIMULAR LANZAMIENTO DE DADO
// ===============================================
// crear una funcion llamada lanzaDado
// no recibe parametros
// retorna un numero aleatorio entre 1 y 6
lanzarDado = function () {
    let aleatorio;
    let numeroMultiplicado;
    let numeroEntero;
    let valorDado;
    
    // 1. Genera un número decimal pseudo-aleatorio entre 0 (inclusive) y 1 (exclusive).
    aleatorio = Math.random(); 
    
    // 2. Multiplica por 6. El rango resultante es de 0.000... a 5.999...
    numeroMultiplicado = aleatorio * 6; 

    // 3. Convierte el número multiplicado a entero usando parseInt.
    //    Al truncar los decimales (redondear hacia abajo), el rango resultante es de 0 a 5.
    numeroEntero = parseInt(numeroMultiplicado); 

    // 4. Suma 1 al entero. Esto desplaza el rango de [0, 5] a [1, 6].
    valorDado = numeroEntero + 1; 

    // 5. Retorna el número final, simulando el lanzamiento de un dado de seis caras.
    return valorDado;
}
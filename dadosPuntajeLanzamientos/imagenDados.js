// ====================================================================
// VARIABLES GLOBALES (ESTADO DEL JUEGO)
// ====================================================================

let puntos = 0;        // Almacena el puntaje acumulado por el jugador.
let lanzamientos = 5;  // Almacena el número de turnos restantes.


// ====================================================================
// FUNCIÓN PRINCIPAL DE JUEGO
// ====================================================================

// Inicia un turno de lanzamiento del dado.
jugar = function () {
    // 1. **Control de Fin de Juego:** Verifica si quedan lanzamientos.
    if (lanzamientos <= 0) {
        // Si no quedan, la función termina y no se hace nada más.
        return; 
    }

    // 2. **Lanzar el Dado:** Llama a la función para obtener un valor aleatorio (1-6).
    let resultado = lanzarDado();
    // 3. Muestra el resultado en la consola (para depuración).
    console.log(resultado);

    // 4. **Actualizar UI:** Muestra la imagen del dado correspondiente al resultado.
    mostrarCara(resultado);
    // 5. **Actualizar Puntos:** Suma el resultado al puntaje total y verifica la condición de victoria.
    modificarPuntos(resultado);
    // 6. **Actualizar Turnos:** Decrementa el contador de lanzamientos y verifica la condición de derrota.
    modificarLanzamientos();
}


// ====================================================================
// FUNCIÓN DE LÓGICA DE PUNTOS
// ====================================================================

// Recibe el número obtenido en el dado y actualiza el puntaje.
modificarPuntos = function (numero) {
    // 1. Acumular Puntos: Suma el valor del dado a los puntos totales.
    puntos = puntos + numero;
    // 2. Actualizar UI: Muestra el nuevo total de puntos en la etiqueta "lblPuntos".
    cambiarTexto("lblPuntos", puntos);

    // 3. **Verificar Victoria:** Si los puntos son 20 o más.
    if (puntos >= 20) {
        // Muestra el mensaje de victoria.
        cambiarTexto("lblGanar", " GANASTE!!");
        // Limpia el mensaje de derrota (si estaba visible).
        cambiarTexto("lblPerder", " ");
        // **Detener el Juego:** Establece los lanzamientos a 0 para finalizar el juego de inmediato.
        lanzamientos = 0; 
    } else {
        // Si no gana, asegura que no haya un mensaje de victoria visible.
        cambiarTexto("lblGanar", " ");
    }
}


// ====================================================================
// FUNCIÓN DE LÓGICA DE LANZAMIENTOS
// ====================================================================

// Gestiona el contador de turnos restantes y verifica la derrota.
modificarLanzamientos = function () {
    // 1. Decrementar: Resta 1 al contador de lanzamientos.
    lanzamientos = lanzamientos - 1;
    // 2. Actualizar UI: Muestra la cantidad de lanzamientos restantes.
    cambiarTexto("lblLanzamientos", lanzamientos);

    // 3. **Verificar Derrota:** Si los lanzamientos llegan a 0 y no se alcanzó la victoria (puntos < 20).
    if (lanzamientos === 0 && puntos < 20) {
        // Muestra el mensaje de derrota (Game Over).
        cambiarTexto("lblPerder", " Game Over");
        // Limpia el mensaje de victoria.
        cambiarTexto("lblGanar", " ");
    } else {
        // Si aún quedan turnos o ya ganó, asegura que no haya un mensaje de derrota visible.
        cambiarTexto("lblPerder", " ");
    }
}


// ====================================================================
// FUNCIÓN DE REINICIO
// ====================================================================

// Restablece el juego a su estado inicial.
limpiar = function () {
    // 1. Resetear Variables: Restablece las variables globales a su valor inicial.
    puntos = 0;
    lanzamientos = 5;

    // 2. Resetear UI: Actualiza todos los elementos de la pantalla.
    cambiarTexto("lblPuntos", puntos);
    cambiarTexto("lblLanzamientos", lanzamientos);
    // Oculta o establece una imagen de dado por defecto.
    cambiarImagen("imgDado", ""); 
    // Limpia los mensajes de victoria/derrota.
    cambiarTexto("lblGanar", " ");
    cambiarTexto("lblPerder", " ");
}


// ====================================================================
// FUNCIÓN DE UI (Visualización del Dado)
// ====================================================================

// Recibe un número (1-6) y muestra la imagen del dado correspondiente.
mostrarCara = function (numero) {
    // Construye la ruta de la imagen: e.g., "dados3.png" para el resultado 3.
    // Se asume que existe una función 'cambiarImagen' que actualiza el src de un elemento.
    cambiarImagen("imgDado", "dados" + numero + ".png");
}


// ====================================================================
// FUNCIÓN DE LÓGICA DE DADO (Generación de Número Aleatorio)
// ====================================================================

// Genera un número entero aleatorio entre 1 y 6 (simulando un dado).
lanzarDado = function () {
    // 1. Generar Aleatorio: Número decimal entre [0, 1) (e.g., 0.45).
    let aleatorio = Math.random();
    // 2. Escalar: Número decimal entre [0, 6) (e.g., 0.45 * 6 = 2.7).
    let aleatorioMultiplicado = aleatorio * 6;
    // 3. Convertir a Entero: Parte entera, entre [0, 5] (e.g., parseInt(2.7) = 2).
    let aleatorioEntero = parseInt(aleatorioMultiplicado);
    // 4. Mapear a Dado: Sumar 1 para obtener un valor entre [1, 6].
    let valorDado = aleatorioEntero + 1;
    // 5. Retornar el resultado.
    return valorDado;
}
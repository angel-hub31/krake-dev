
let puntos = 0;        // Almacena el puntaje acumulado por el jugador.
let lanzamientos = 5;  // Almacena el número de turnos restantes.
jugar = function () {// Inicia un turno de lanzamiento del dado.
    // 1. **Control de Fin de Juego:** Verifica si quedan lanzamientos.
    if (lanzamientos <= 0) {
        return;  // Si no quedan, la función termina y no se hace nada más.
    }
    let resultado = lanzarDado();// 2. **Lanzar el Dado:** Llama a la función para obtener un valor aleatorio (1-6).
    console.log(resultado); // 3. Muestra el resultado en la consola (para depuración).
    mostrarCara(resultado);    // 4. **Actualizar UI:** Muestra la imagen del dado correspondiente al resultado.
    modificarPuntos(resultado);    // 5. **Actualizar Puntos:** Suma el resultado al puntaje total y verifica la condición de victoria.
    modificarLanzamientos();    // 6. **Actualizar Turnos:** Decrementa el contador de lanzamientos y verifica la condición de derrota.
}
modificarPuntos = function (numero) {// Recibe el número obtenido en el dado y actualiza el puntaje.
    puntos = puntos + numero;    // 1. Acumular Puntos: Suma el valor del dado a los puntos totales.
    cambiarTexto("lblPuntos", puntos);    // 2. Actualizar UI: Muestra el nuevo total de puntos en la etiqueta "lblPuntos".
    if (puntos >= 20) {    // 3. **Verificar Victoria:** Si los puntos son 20 o más.
        cambiarTexto("lblGanar", " GANASTE!!");        // Muestra el mensaje de victoria.
        cambiarTexto("lblPerder", " ");        // Limpia el mensaje de derrota (si estaba visible).
        lanzamientos = 0;         // **Detener el Juego:** Establece los lanzamientos a 0 para finalizar el juego de inmediato.
    } else {
        cambiarTexto("lblGanar", " ");        // Si no gana, asegura que no haya un mensaje de victoria visible.

    }
}
modificarLanzamientos = function () {// Gestiona el contador de turnos restantes y verifica la derrota.
    lanzamientos = lanzamientos - 1;    // 1. Decrementar: Resta 1 al contador de lanzamientos.
    cambiarTexto("lblLanzamientos", lanzamientos);    // 2. Actualizar UI: Muestra la cantidad de lanzamientos restantes.
    if (lanzamientos === 0 && puntos < 20) {    // 3. **Verificar Derrota:** Si los lanzamientos llegan a 0 y no se alcanzó la victoria (puntos < 20).
        cambiarTexto("lblPerder", " Game Over");        // Muestra el mensaje de derrota (Game Over).
        cambiarTexto("lblGanar", " ");        // Limpia el mensaje de victoria.

    } else {
        cambiarTexto("lblPerder", " ");        // Si aún quedan turnos o ya ganó, asegura que no haya un mensaje de derrota visible.
    }
}
limpiar = function () {// Restablece el juego a su estado inicial.
    puntos = 0;    // 1. Resetear Variables: Restablece las variables globales a su valor inicial.
    lanzamientos = 5;
    cambiarTexto("lblPuntos", puntos);    // 2. Resetear UI: Actualiza todos los elementos de la pantalla.
    cambiarTexto("lblLanzamientos", lanzamientos);
    cambiarImagen("imgDado", "");    // Oculta o establece una imagen de dado por defecto.
    cambiarTexto("lblGanar", " ");    // Limpia los mensajes de victoria/derrota.
    cambiarTexto("lblPerder", " ");
}
mostrarCara = function (numero) {// Recibe un número (1-6) y muestra la imagen del dado correspondiente.
    // Construye la ruta de la imagen: e.g., "dados3.png" para el resultado 3.
    // Se asume que existe una función 'cambiarImagen' que actualiza el src de un elemento.
    cambiarImagen("imgDado", "dados" + numero + ".png");
}
lanzarDado = function () {// Genera un número entero aleatorio entre 1 y 6 (simulando un dado).
    let aleatorio = Math.random();    // 1. Generar Aleatorio: Número decimal entre [0, 1) (e.g., 0.45).
    let aleatorioMultiplicado = aleatorio * 6;    // 2. Escalar: Número decimal entre [0, 6) (e.g., 0.45 * 6 = 2.7).
    let aleatorioEntero = parseInt(aleatorioMultiplicado);    // 3. Convertir a Entero: Parte entera, entre [0, 5] (e.g., parseInt(2.7) = 2).
    let valorDado = aleatorioEntero + 1;    // 4. Mapear a Dado: Sumar 1 para obtener un valor entre [1, 6].
    return valorDado;    // 5. Retornar el resultado.

}
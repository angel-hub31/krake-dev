

// Parte 1 - Punto 2: Arreglo inicial de personas
let personas = [
    { nombre: "Marcos", edad: 18 },
    { nombre: "Roberto", edad: 15 },
    { nombre: "Kate", edad: 25 },
    { nombre: "Diana", edad: 12 },
    { nombre: "Benja", edad: 5 }
];

/**
 * Función que permite mostrar un texto en un elemento (como un input)
 * NOTA: Esta función DEBE agregarse a utilitarios.js o implementarse aquí.
 * La he implementado aquí para corregir inmediatamente el error.
 */
mostrarTextoEnCaja = function (idComponente, mensaje) {
    document.getElementById(idComponente).value = mensaje;
}

/**
 * Función que permite mostrar texto como HTML (para la tabla)
 * NOTA: Esta función DEBE agregarse a utilitarios.js o implementarse aquí.
 */
mostrarTextoHTML = function (idComponente, html) {
    document.getElementById(idComponente).innerHTML = html;
}

/**
 * Función para agregar una persona con validaciones. (Parte 1 - Punto 6)
 */
agregarPersona = function () {
    // Limpiar errores previos
    mostrarTexto("errorNombre", ""); // USAR mostrarTexto
    mostrarTexto("errorEdad", ""); // USAR mostrarTexto

    // a. Tomar nombre y validar
    let nombre = recuperarTexto("txtNombre");
    let isValid = true;

    if (nombre.length < 3) {
        mostrarTexto("errorNombre", "El nombre debe tener al menos 3 caracteres."); // USAR mostrarTexto
        isValid = false;
    }

    // b. Tomar edad y validar
    let edad = recuperarEntero("txtEdad"); // USAR recuperarEntero

    // Verificación de entero (el input type="number" ayuda, pero la validación estricta es necesaria)
    if (isNaN(edad) || !Number.isInteger(edad) || edad < 0 || edad > 100) {
        mostrarTexto("errorEdad", "La edad debe ser un entero entre 0 y 100."); // USAR mostrarTexto
        isValid = false;
    }

    // c. Solamente si pasa todas las validaciones
    if (isValid) {
        // i. y ii. Crear y asignar atributos
        const nuevaPersona = { nombre: nombre, edad: edad };

        // iii. Agregar al arreglo personas
        personas.push(nuevaPersona);

        // iv. Mostrar alert (Parte 2)
        alert('PERSONA AGREGADA CORRECTAMENTE');

        // Refrescar tabla (Parte 2) y limpiar inputs
        mostrarPersonas();
        mostrarTextoEnCaja("txtNombre", "");
        mostrarTextoEnCaja("txtEdad", "");
    }
}

/**
 * Función para mostrar el arreglo en una tabla HTML. (Parte 2)
 */
mostrarPersonas = function () {
    let html = '<table>';
    html += '<thead><tr><th>EDAD</th><th>NOMBRE</th></tr></thead>';
    html += '<tbody>';

    //Interpolación de Cadenas: El símbolo $ se usa dentro de comillas invertidas o backticks ( \`\) 
    // para insertar variables o expresiones directamente dentro de una cadena de texto.
    personas.forEach(persona => { html += `<tr><td>${persona.edad}</td><td>${persona.nombre}</td></tr>`; });

    html += '</tbody></table>';

    // USAR mostrarTextoHTML (definida arriba)
    mostrarTextoHTML("tablaPersonas", html);

    // Limpiar resultados de búsqueda al refrescar la tabla
    mostrarTexto("resultadoMayor", ""); // USAR mostrarTexto
    mostrarTexto("resultadoMenor", ""); // USAR mostrarTexto
}

// ----------------------------------------------------
// PARTE 3 - BUSCAR MAYOR
// El resto de funciones no necesitan cambios ya que usan mostrarTexto (la función corregida)
encontrarMayor = function () {
    if (personas.length === 0) return null;

    let personaMayor = personas[0];
    let elementoPersona;

    for (let i = 1; i < personas.length; i++) {
        elementoPersona = personas[i];

        console.log(`Buscando Mayor: Comparando ${elementoPersona.nombre} (${elementoPersona.edad}) con ${personaMayor.nombre} (${personaMayor.edad})`);

        if (elementoPersona.edad > personaMayor.edad) {
            personaMayor = elementoPersona;
        }
    }

    return personaMayor;
}

determinarMayor = function () {
    console.log("Arreglo de Personas:", personas);
    const mayor = encontrarMayor();

    if (mayor) {
        //Interpolación de Cadenas: El símbolo $ se usa dentro de comillas invertidas o backticks ( \`\) 
        // para insertar variables o expresiones directamente dentro de una cadena de texto.
        mostrarTexto("resultadoMayor", `${mayor.nombre} (Edad: ${mayor.edad})`); // USAR mostrarTexto
    } else {
        mostrarTexto("resultadoMayor", "No hay personas para buscar."); // USAR mostrarTexto
    }
}

// ----------------------------------------------------
// PARTE 3 - BUSCAR MENOR

encontrarMenor = function () {
    if (personas.length === 0) return null;

    let personaMenor = personas[0];
    let elementoPersona;

    for (let i = 1; i < personas.length; i++) {
        elementoPersona = personas[i];

        if (elementoPersona.edad < personaMenor.edad) {
            personaMenor = elementoPersona;
        }
    }

    return personaMenor;
}

determinarMenor = function () {
    const menor = encontrarMenor();

    if (menor) {
        mostrarTexto("resultadoMenor", `${menor.nombre} (Edad: ${menor.edad})`); // USAR mostrarTexto
    } else {
        mostrarTexto("resultadoMenor", "No hay personas para buscar."); // USAR mostrarTexto
    }
}
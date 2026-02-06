// Arreglo inicial de personas
let personas = [
    { nombre: "LUIS", nota: 8, genero: "MASCULINO" },
    { nombre: "MARIA", nota: 7, genero: "FEMENINO" },
    { nombre: "FERNANDA", nota: 10, genero: "FEMENINO" },
    { nombre: "PEDRO", nota: 9, genero: "HOMBRE" },
];

const agregarPersona = function () {
    // Referencias a los elementos del DOM
    const nombreInput = document.getElementById("txtNombre");
    const notaInput = document.getElementById("txtNota");
    const generoInput = document.getElementById("txtGenero");

    const errorNombre = document.getElementById("errorNombre");
    const errorNota = document.getElementById("errorNota");
    const errorGenero = document.getElementById("errorGenero");

    const nombre = nombreInput.value.trim();
    const notaString = notaInput.value.trim();
    const genero = generoInput.value.trim();

    // Expresión regular: Solo letras (incluye tildes, ñ y espacios)
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // Resetear visualización de errores
    errorNombre.style.display = "none";
    errorNota.style.display = "none";
    errorGenero.style.display = "none";

    let esValido = true;

    // --- VALIDACIÓN NOMBRE ---
    if (nombre === "") {
        errorNombre.textContent = "no debe estar vacio";
        errorNombre.style.display = "block";
        esValido = false;
    } else if (!soloLetras.test(nombre)) {
        errorNombre.textContent = "solo se permiten letras";
        errorNombre.style.display = "block";
        esValido = false;
    } else if (nombre[0] !== nombre[0].toUpperCase()) {
        errorNombre.textContent = "La primera debe comenzar en mayuscula";
        errorNombre.style.display = "block";
        esValido = false;
    } else if (nombre.length < 3) {
        errorNombre.textContent = "la palabra debe tener mas de 3 letras";
        errorNombre.style.display = "block";
        esValido = false;
    }

    // --- VALIDACIÓN GÉNERO ---
    if (genero === "") {
        errorGenero.textContent = "no debe estar vacio";
        errorGenero.style.display = "block";
        esValido = false;
    } else if (!soloLetras.test(genero)) {
        errorGenero.textContent = "solo se permiten letras";
        errorGenero.style.display = "block";
        esValido = false;
    } else if (genero[0] !== genero[0].toUpperCase()) {
        errorGenero.textContent = "La primera debe comenzar en mayuscula";
        errorGenero.style.display = "block";
        esValido = false;
    } else if (genero.length < 3) {
        errorGenero.textContent = "la palabra debe tener mas de 3 letras";
        errorGenero.style.display = "block";
        esValido = false;
    }

    // --- VALIDACIÓN NOTA ---
    if (notaString === "") {
        errorNota.textContent = "no debe estar vacio";
        errorNota.style.display = "block";
        esValido = false;
    } else if (isNaN(notaString) || notaString.includes(" ")) {
        errorNota.textContent = "solo se permite numeros";
        errorNota.style.display = "block";
        esValido = false;
    } else {
        const nota = parseFloat(notaString);
        if (nota < 1 || nota > 10) {
            errorNota.textContent = "la nota debe estar entre 1 y 10";
            errorNota.style.display = "block";
            esValido = false;
        }
    }

    // Guardar si todo es correcto
    if (esValido) {
        let nuevaPersona = {
            nombre: nombre.toUpperCase(),
            nota: parseFloat(notaString),
            genero: genero.toUpperCase()
        };

        personas.push(nuevaPersona);
        alert("Persona agregada correctamente");

        // Limpiar campos
        nombreInput.value = '';
        notaInput.value = '';
        generoInput.value = '';
        
        mostrarPersonas();
    }
}

const mostrarPersonas = function () {
    const tablaContainer = document.getElementById('tablaPersonas');
    if (!tablaContainer) return;

    let html = '<table border="1" style="width:100%; text-align:left; border-collapse: collapse;">';
    html += '<thead style="background-color: #f2f2f2;"><tr><th>NOMBRE</th><th>NOTA</th><th>GENERO</th></tr></thead>';
    html += '<tbody>';
    personas.forEach(p => {
        html += `<tr><td>${p.nombre}</td><td>${p.nota}</td><td>${p.genero}</td></tr>`;
    });
    html += '</tbody></table>';
    tablaContainer.innerHTML = html;
}

const encontrarMayor = function () {
    if (personas.length === 0) return null;
    return personas.reduce((max, p) => (p.nota > max.nota ? p : max), personas[0]);
}

const encontrarMenor = function () {
    if (personas.length === 0) return null;
    return personas.reduce((min, p) => (p.nota < min.nota ? p : min), personas[0]);
}

const determinarMayor = function () {
    const contenedorMenor = document.getElementById("resultadoMenor");
    if(contenedorMenor) contenedorMenor.style.display = "none";
    
    const mayor = encontrarMayor();
    if (mayor) {
        document.getElementById("nombreMayor").textContent = mayor.nombre;
        document.getElementById("notaMayor").textContent = mayor.nota;
        document.getElementById("generoMayor").textContent = mayor.genero;
        document.getElementById("resultadoMayor").style.display = "block";
    }
}

const determinarMenor = function () {
    const contenedorMayor = document.getElementById("resultadoMayor");
    if(contenedorMayor) contenedorMayor.style.display = "none";

    const menor = encontrarMenor();
    if (menor) {
        document.getElementById("nombreMenor").textContent = menor.nombre;
        document.getElementById("notaMenor").textContent = menor.nota;
        document.getElementById("generoMenor").textContent = menor.genero;
        document.getElementById("resultadoMenor").style.display = "block";
    }
}

// Cargar la tabla inicialmente al abrir la página
window.onload = mostrarPersonas;
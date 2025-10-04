let personas = [
    { nombre: "Marcos", edad: 18 },
    { nombre: "Roberto", edad: 15 },
    { nombre: "Kate", edad: 25 },
    { nombre: "Diana", edad: 12 },
    { nombre: "Benja", edad: 5 }
];


function agregarPersona() {
    const nombreInput = document.getElementById("txtNombre");
    const edadInput = document.getElementById("txtEdad");
    const errorNombre = document.getElementById("errorNombre");
    const errorEdad = document.getElementById("errorEdad");
    
    errorNombre.style.display = "none";
    errorEdad.style.display = "none";
    
    let esValido = true;
    const nombre = nombreInput.value.trim();
    const edad = parseInt(edadInput.value);

    if (nombre.length < 3) {
        errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
        errorNombre.style.display = "block";
        esValido = false;
    }

    if (isNaN(edad) || edad < 0 || edad > 100 || !Number.isInteger(edad)) {
        errorEdad.textContent = "La edad debe ser un entero entre 0 y 100.";
        errorEdad.style.display = 'block';
        esValido = false;
    }

    if (esValido) {
        let nuevaPersona = {};
        
        nuevaPersona.nombre = nombre;
        nuevaPersona.edad = edad;
        
        personas.push(nuevaPersona);
        
        alert("PERSONA AGREGADA CORRECTAMENTE");
        nombreInput.value = '';
        edadInput.value = '';
        
        mostrarPersonas();
    }
}


function mostrarPersonas() {
    const tablaContainer = document.getElementById('tablaPersonas');
    let html = '<table>';
    
    html += '<thead><tr><th>EDAD</th><th>NOMBRE</th></tr></thead>';
    
    // Cuerpo de la tabla
    html += '<tbody>';
    personas.forEach(p => {
        html += `<tr><td>${p.edad}</td><td>${p.nombre}</td></tr>`;
    });
    html += '</tbody></table>';

    tablaContainer.innerHTML = html;
}



function encontrarMayor() {
    if (personas.length === 0) return null;

    let personaMayor = personas[0]; 

    for (let i = 1; i < personas.length; i++) {
        let elementoPersona = personas[i];
        
        console.log(`Posición ${i}: ${elementoPersona.nombre}, Edad: ${elementoPersona.edad}`);

        if (elementoPersona.edad > personaMayor.edad) {
            personaMayor = elementoPersona; 
        }
    }

    return personaMayor;
}


function determinarMayor() {
    document.getElementById("resultadoMenor").style.display ="none";

    const mayor = encontrarMayor();
    
    if (mayor) {
        document.getElementById("nombreMayor").textContent = mayor.nombre;
        document.getElementById("edadMayor").textContent = mayor.edad;
        document.getElementById("resultadoMayor").style.display = "block";
    } else {
        document.getElementById("resultadoMayor").style.display = "none";
        alert("No hay personas en el arreglo.");
    }

    console.log("Elementos del arreglo (invocando desde determinarMayor):", personas);
}



function encontrarMenor() {
    if (personas.length === 0) return null;

    let personaMenor = personas[0]; 

    for (let i = 1; i < personas.length; i++) {
        let elementoPersona = personas[i];

        if (elementoPersona.edad < personaMenor.edad) {
            personaMenor = elementoPersona; 
        }
    }

    return personaMenor;
}


function determinarMenor() {
    document.getElementById("resultadoMayor").style.display = "none";
    
    const menor = encontrarMenor();
    
    if (menor) {
        document.getElementById("nombreMenor").textContent = menor.nombre;
        document.getElementById("edadMenor").textContent = menor.edad;
        document.getElementById("resultadoMenor").style.display ="block";
    } else {
        document.getElementById("resultadoMenor").style.display = "none";
        alert("No hay personas en el arreglo.");
    }
}
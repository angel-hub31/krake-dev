// Arreglo global que almacena objetos de personas.
let personas = [
    { nombre: "Marcos", edad: 18 },
    { nombre: "Roberto", edad: 15 },
    { nombre: "Kate", edad: 25 },
    { nombre: "Diana", edad: 12 },
    { nombre: "Benja", edad: 5 }
];

// ----------------------------------------------------------------------
// Función para añadir una nueva persona al arreglo 'personas'
// ----------------------------------------------------------------------
function agregarPersona() {
    // 1. Obtener referencias a los elementos del DOM (campos de entrada y errores)
    const nombreInput = document.getElementById("txtNombre");
    const edadInput = document.getElementById("txtEdad");
    const errorNombre = document.getElementById("errorNombre");
    const errorEdad = document.getElementById("errorEdad");

    
    
    // 2. Ocultar mensajes de error anteriores antes de la validación
    errorNombre.style.display = "none";
    errorEdad.style.display = "none";
    
    let esValido = true; // Flag para rastrear la validez del formulario
    
    // 3. Obtener y preparar los valores de entrada
    const nombre = nombreInput.value.trim(); // Obtener nombre y eliminar espacios en blanco
    const edad = parseInt(edadInput.value); // Convertir la edad a un número entero
    
    // 4. Validación del nombre
    if (nombre.length < 3) {
        // Mostrar error si el nombre tiene menos de 3 caracteres
        errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
        errorNombre.style.display = "block";
        esValido = false;
    }

    // 5. Validación de la edad
    // Se verifica: si NO es un número (isNaN), si es negativo, si es mayor a 100, o si NO es un entero
    if (isNaN(edad) || edad < 0 || edad > 100 || !Number.isInteger(edad)) {
        // Mostrar error si la edad no cumple con las restricciones
        errorEdad.textContent = "La edad debe ser un entero entre 0 y 100.";
        errorEdad.style.display = 'block';
        esValido = false;
    }

    // 6. Si todos los datos son válidos (esValido es true)
    if (esValido) {
        // Crear un nuevo objeto de persona
        let nuevaPersona = {};
        
        // Asignar los valores validados al nuevo objeto
        nuevaPersona.nombre = nombre;
        nuevaPersona.edad = edad;
        
        // Agregar el nuevo objeto al arreglo global 'personas'
        personas.push(nuevaPersona);
        
        // Notificar al usuario y limpiar los campos de entrada
        alert("PERSONA AGREGADA CORRECTAMENTE");
        nombreInput.value = '';
        edadInput.value = '';
        
        // Actualizar la tabla de personas mostrada en la interfaz
        mostrarPersonas();
    }
}

// ----------------------------------------------------------------------
// Función para generar y mostrar la tabla de personas en la interfaz
// ----------------------------------------------------------------------
function mostrarPersonas() {
    const tablaContainer = document.getElementById('tablaPersonas'); // Contenedor donde se insertará la tabla
    let html = '<table>'; // Iniciar la cadena HTML para la tabla
    
    // Encabezado (thead) de la tabla
    html += '<thead><tr><th>EDAD</th><th>NOMBRE</th></tr></thead>';
    
    // Cuerpo (tbody) de la tabla
    html += '<tbody>';
    // Iterar sobre cada objeto en el arreglo 'personas'
    personas.forEach(p => {
        // Añadir una fila (<tr>) con las celdas (<td>) para edad y nombre
        html += `<tr><td>${p.edad}</td><td>${p.nombre}</td></tr>`;
    });
    html += '</tbody></table>'; // Cerrar el cuerpo y la tabla

    // Insertar el HTML de la tabla dentro del contenedor 'tablaPersonas'
    tablaContainer.innerHTML = html;
}

// ----------------------------------------------------------------------
// Función de lógica pura: encuentra y retorna el objeto de la persona con MAYOR edad
// ----------------------------------------------------------------------
function encontrarMayor() {
    // 1. Caso base: si el arreglo está vacío, retornar null
    if (personas.length === 0) return null;

    // 2. Inicializar: asumir que la primera persona es la mayor inicialmente
    let personaMayor = personas[0]; 

    // 3. Iterar a partir del segundo elemento (índice 1)
    for (let i = 1; i < personas.length; i++) {
        let elementoPersona = personas[i]; // Persona actual en la iteración
        
        // Registro en consola (para depuración)
        console.log(`Posición ${i}: ${elementoPersona.nombre}, Edad: ${elementoPersona.edad}`);

        // 4. Comparación: si la edad actual es MAYOR que la edad de 'personaMayor'
        if (elementoPersona.edad > personaMayor.edad) {
            // Actualizar 'personaMayor' con el objeto de la persona más vieja encontrada
            personaMayor = elementoPersona; 
        }
    }

    // 5. Retornar el objeto de la persona más vieja
    return personaMayor;
}

// ----------------------------------------------------------------------
// Función de presentación: utiliza 'encontrarMayor' y muestra el resultado en la interfaz
// ----------------------------------------------------------------------
function determinarMayor() {
    // 1. Ocultar el resultado del menor (si estaba visible)
    document.getElementById("resultadoMenor").style.display ="none";

    // 2. Llamar a la función lógica para obtener la persona mayor
    const mayor = encontrarMayor();
    
    // 3. Mostrar el resultado
    if (mayor) {
        // Actualizar los elementos de texto con el nombre y la edad
        document.getElementById("nombreMayor").textContent = mayor.nombre;
        document.getElementById("edadMayor").textContent = mayor.edad;
        // Hacer visible el contenedor de resultados
        document.getElementById("resultadoMayor").style.display = "block";
    } else {
        // Ocultar el contenedor y alertar si no hay personas
        document.getElementById("resultadoMayor").style.display = "none";
        alert("No hay personas en el arreglo.");
    }

    // Registro en consola (para depuración)
    console.log("Elementos del arreglo (invocando desde determinarMayor):", personas);
}

// ----------------------------------------------------------------------
// Función de lógica pura: encuentra y retorna el objeto de la persona con MENOR edad
// ----------------------------------------------------------------------
function encontrarMenor() {
    // 1. Caso base: si el arreglo está vacío, retornar null
    if (personas.length === 0) return null;

    // 2. Inicializar: asumir que la primera persona es la menor inicialmente
    let personaMenor = personas[0]; 

    // 3. Iterar a partir del segundo elemento (índice 1)
    for (let i = 1; i < personas.length; i++) {
        let elementoPersona = personas[i]; // Persona actual en la iteración

        // 4. Comparación: si la edad actual es MENOR que la edad de 'personaMenor'
        if (elementoPersona.edad < personaMenor.edad) {
            // Actualizar 'personaMenor' con el objeto de la persona más joven encontrada
            personaMenor = elementoPersona; 
        }
    }

    // 5. Retornar el objeto de la persona más joven
    return personaMenor;
}

// ----------------------------------------------------------------------
// Función de presentación: utiliza 'encontrarMenor' y muestra el resultado en la interfaz
// ----------------------------------------------------------------------
function determinarMenor() {
    // 1. Ocultar el resultado del mayor (si estaba visible)
    document.getElementById("resultadoMayor").style.display = "none";
    
    // 2. Llamar a la función lógica para obtener la persona menor
    const menor = encontrarMenor();
    
    // 3. Mostrar el resultado
    if (menor) {
        // Actualizar los elementos de texto con el nombre y la edad
        document.getElementById("nombreMenor").textContent = menor.nombre;
        document.getElementById("edadMenor").textContent = menor.edad;
        // Hacer visible el contenedor de resultados
        document.getElementById("resultadoMenor").style.display ="block";
    } else {
        // Ocultar el contenedor y alertar si no hay personas
        document.getElementById("resultadoMenor").style.display = "none";
        alert("No hay personas en el arreglo.");
    }
}
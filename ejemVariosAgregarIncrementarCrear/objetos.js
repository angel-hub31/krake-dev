


// ====================================================================
// FUNCIÓN 1: Probar acceso y lógica condicional con atributos de un objeto
// ====================================================================
probarAtributo = function () {
    // 1. Declaración e inicialización de un objeto 'persona' con varios atributos (propiedades).
    let persona = {
        nombre: "Pedro",    // Propiedad 'nombre' con valor String.
        apellido: "Morales", // Propiedad 'apellido' con valor String.
        edad: 24,           // Propiedad 'edad' con valor Number.
        estaVivo: true      // Propiedad 'estaVivo' con valor Boolean.
    }

    // 2. Acceder y mostrar el valor del atributo 'nombre' usando la notación de punto.
    console.log(persona.nombre); // Salida: "Pedro"

    // 3. Acceder y mostrar el valor del atributo 'edad'.
    console.log(persona.edad);   // Salida: 24

    // 4. Iniciar una comprobación condicional (if-else) para el atributo booleano 'estaVivo'.
    //    NOTA: Se compara si es estrictamente igual a 'false'.
    if (persona.estaVivo == false) {
        // Se ejecuta si 'estaVivo' es false.
        console.log("no esta vivo"); // Salida: "no esta vivo" (si el valor fuera false)
    } else {
        // Se ejecuta si 'estaVivo' es cualquier otro valor, en este caso 'true'.
        console.log("si esta vivo"); // Salida: "si esta vivo" (dado que el valor inicial es true)
    }
}

// --------------------------------------------------------------------

// ====================================================================
// FUNCIÓN 2: Probar la modificación de atributos de un objeto
// ====================================================================
modificarAtributos = function () {
    // 1. Declaración e inicialización de un objeto 'cuenta'.
    let cuenta = {
        numero: "40532255", // Atributo 'numero' (String).
        saldo: 0.0          // Atributo 'saldo' (Number).
    }

    // 2. Modificación directa del atributo 'saldo' con un nuevo valor (Asignación).
    cuenta.saldo = 100;

    // 3. Modificación del atributo 'saldo' incrementando su valor actual en 10 (Operación compuesta).
    //    Equivalente a: cuenta.saldo = cuenta.saldo + 10;
    cuenta.saldo += 10; // Ahora el saldo es 100 + 10 = 110.

    // 4. Mostrar el valor final del saldo.
    console.log(cuenta.saldo); // Salida: 110
}

// --------------------------------------------------------------------

// ====================================================================
// FUNCIÓN 3: Demostrar diferentes formas de crear objetos y añadir atributos
// ====================================================================
// ====================================================================
// FUNCIÓN: Demostrar diferentes formas de crear objetos y añadir atributos
// ====================================================================
crearCliente = function () {
    // 1. Creación de un objeto 'cliente' con atributos definidos en la declaración (literal de objeto).
    let cliente = {
        cedula: "1004034391", // Atributo 'cedula' con valor String.
        nombre: "Pedro"       // Atributo 'nombre' con valor String.
    }
    // NOTA: El objeto 'cliente' ya está completo aquí.

    // 2. Creación de un objeto vacío 'cliente1'.
    let cliente1 = {};

    // 3. Adición de atributos al objeto 'cliente1' uno por uno usando la notación de punto.
    cliente1.nombre = "Romeo";    // Añade el atributo 'nombre'.
    cliente1.apellido = "Salcedo"; // Añade el atributo 'apellido'.
    cliente1.cedula = "120255";   // Añade el atributo 'cedula'.
    // NOTA: El objeto 'cliente1' ahora contiene { nombre: "Romeo", apellido: "Salcedo", cedula: "120255" }

    // 4. Mostrar el contenido completo del objeto 'cliente' en la consola.
    console.log("Cliente inicial:", cliente); 

    // 5. Añadido: Mostrar el contenido completo del objeto 'cliente1' en la consola para ver el resultado de la adición de atributos.
    console.log("Cliente creado por partes:", cliente1); 
}

// --------------------------------------------------------------------

// ====================================================================
// FUNCIÓN 4: Probar la función de modificación de saldo que recibe un objeto como argumento
// ====================================================================
probarIncrementoSaldo = function () {
    // 1. Creación de un objeto 'cta' (cuenta) con un saldo inicial de 34.0.
    let cta = { numero: "22526", saldo: 34.0 }

    // 2. Llamada a la función 'incrementarSaldo', pasando el objeto 'cta' por referencia
    //    y el monto a incrementar (100).
    //    La función modificará el objeto 'cta' directamente.
    incrementarSaldo(cta, 100); // cta.saldo ahora es 34.0 + 100 = 134.0

    // 3. Mostrar el saldo final del objeto 'cta' después de la modificación.
    console.log(cta.saldo); // Salida: 134.0
}

// --------------------------------------------------------------------

// ====================================================================
// FUNCIÓN 5: Probar la función que determina la persona con mayor edad
// ====================================================================
probarDeterminarMayor = function () {
    // 1. Creación de dos objetos 'per1' y 'per2'.
    //    CORRECCIÓN: Se aseguran que 'edad' sean de tipo Number (45 y 35) para una comparación numérica correcta.
    let per1 = { nombre: "Daniel", edad: 45 }; 
    let per2 = { nombre: "Luisa", edad: 35 };  
    let mayor;

    // 2. Llamada a la función 'determinarMayor' para comparar las dos personas.
    //    El resultado (la persona con mayor edad o null) se almacena en 'mayor'.
    mayor = determinarMayor(per1, per2);

    // 3. Comprobar si 'determinarMayor' devolvió un objeto (es decir, no fue null).
    if (mayor != null) {
        // 4. Mostrar el nombre de la persona que resultó ser la mayor.
        console.log("El mayor es: " + mayor.nombre); // Salida: "El mayor es: Daniel"
    }

}

// --------------------------------------------------------------------

// ====================================================================
// FUNCIÓN AUXILIAR 1: Incrementa el saldo de un objeto cuenta
// ====================================================================
// Recibe un objeto 'cuenta' y un 'monto' numérico.
incrementarSaldo = function (cuenta, monto) {
    // Opera directamente sobre el atributo 'saldo' del objeto recibido por parámetro.
    cuenta.saldo += monto;
    // La modificación persiste fuera de la función porque los objetos se pasan por referencia.
}

// --------------------------------------------------------------------

// ====================================================================
// FUNCIÓN AUXILIAR 2: Determina y devuelve la persona con la mayor edad
// ====================================================================
// Recibe dos objetos 'persona1' y 'persona2' con atributo 'edad'.
determinarMayor = function (persona1, persona2) {
    // Compara las edades (ya convertidas a Number en la llamada).
    if (persona1.edad > persona2.edad) {
        // Si persona1 es mayor, devuelve el objeto persona1.
        return persona1;

    } else if (persona2.edad > persona1.edad) {
        // Si persona2 es mayor, devuelve el objeto persona2.
        return persona2;
    } else {
        // Si las edades son iguales, devuelve null.
        return null;
    }
}


// ====================================================================
// FUNCIÓN: Demostrar la creación de objetos, acceso a atributos y lógica de comparación
// ====================================================================
crearProducto = function() {
    // 1. paso 1: Creación del objeto 'producto1' (Pantalón).
    let producto1 = {
        nombre: "pantalon", // Atributo nombre (String).
        precio: 50.30,      // Atributo precio (Number).
        stock: 10           // Atributo stock (Number).
    };

    // 2. paso 2: Creación del objeto 'producto2' (Cocina).
    let producto2 = {
        nombre: "cocina",   // Atributo nombre (String).
        precio: 550.75,     // Atributo precio (Number).
        stock: 15           // Atributo stock (Number).
    };

    // 3. paso 3: Acceder y mostrar el valor del atributo 'nombre' de producto1 en la consola.
    console.log("Nombre producto 1:", producto1.nombre); // Salida: "Nombre producto 1: pantalon"

    // 4. paso 4: Acceder y mostrar el valor del atributo 'precio' de producto2 en la consola.
    console.log("Precio producto 2:", producto2.precio); // Salida: "Precio producto 2: 550.75"

    // 5. paso 5: Iniciar una comprobación condicional (if-else if-else) para comparar el stock.
    if (producto1.stock > producto2.stock) {
        // Se ejecuta si el stock de producto1 (10) es mayor que el de producto2 (15). (Falso)
        console.log("Producto 1 tiene mayor stock");
    } else if (producto2.stock > producto1.stock) {
        // Se ejecuta si el stock de producto2 (15) es mayor que el de producto1 (10). (Verdadero)
        console.log("Producto 2 tiene mayor stock"); // Salida: "Producto 2 tiene mayor stock"
    } else {
        // Se ejecuta si ambos stocks son iguales.
        console.log("Ambos productos tienen el mismo stock");
    }

    // Termina la ejecución de la función. El 'return' no devuelve ningún valor explícito.
    return
}





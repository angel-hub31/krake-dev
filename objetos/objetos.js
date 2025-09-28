/*
crearProducto = function() {
    // 1. paso 1
    let producto1 = {
        nombre: "pantalon",
        precio: 50.30,
        stock: 10
    };
    // 2. paso 2
    let producto2 = {
        nombre: "cocina",
        precio: 550.75,
        stock: 15
    };
    // 3. paso 3
    console.log("Nombre producto 1:", producto1.nombre);
    // 4. paso 4
    console.log("Precio producto 2:", producto2.precio);
    // 5. paso 5
    if (producto1.stock > producto2.stock) {
        console.log("Producto 1 tiene mayor stock");
    } else if (producto2.stock > producto1.stock) {
        console.log("Producto 2 tiene mayor stock");
    } else {
        console.log("Ambos productos tienen el mismo stock");
    }
    return
}
*/


probarAtributo = function () {
    let persona = {
        nombre: "Pedro",
        apellido: "Morales",
        edad: 24,
        estaVivo: true
    }
    console.log(persona.nombre);
    console.log(persona.edad);
    if (persona.estaVivo == false) {
        console.log("no esta vivo");

    } else {
        console.log("si esta vivo");
    }
}



modificarAtributos = function () {
    let cuenta = {
        numero: "40532255",
        saldo: 0.0
    }
    cuenta.saldo = 100;
    cuenta.saldo += 10;
    console.log(cuenta.saldo);

}
crearCliente = function () {
    let cliente = {
        cedula: "1004034391",
        nombre: "Pedro"
    }
    let cliente1 = {};
    cliente1.nombre = "Romeo";
    cliente1.apellido = "Salcedo";
    cliente1.cedula = "120255";
}
probarIncrementoSaldo = function () {
    let cta = { numero: "22526", saldo: 34.0 }
    incrementarSaldo(cta, 100);
    console.log(cta.saldo);
}
probarDeterminarMayor = function () {
    let per1 = { nombre: "Daniel", edad: "45" };
    let per2 = { nombre: "Luisa", edad: "35" };
    let mayor;
    mayor=determinarMayor(per1,per2);
    if(mayor!=null){
        console.log("El mayor es: "+mayor.nombre);
    }
    
}
incrementarSaldo = function (cuenta, monto) {
    cuenta.saldo += monto;

}
determinarMayor = function (persona1, persona2) {
    if (persona1.edad > persona2.edad) {
        return persona1;

    } else if (persona2.edad > persona1.edad) {
        return persona2;
    } else {
        return null;
    }

}

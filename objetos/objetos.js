probarAtributo = function () {
    let persona = {
        nombre: "Pedro",
        apellido: "Morales",
        edad: 24,
        estaVivo : true
    }
    console.log(persona.nombre);
     console.log(persona.edad);
     if(persona.estaVivo==false){
        console.log("no esta vivo");

     }else{
        console.log("si esta vivo");
     }
}


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

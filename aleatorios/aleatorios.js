
numeroAleatorio = function () {
    return Math.floor(Math.random() * 100) + 1;
}
generarAleatorios = function () {
    let aleatorios = [];
    let cantidad = parseInt(recuperarTexto("txtCantidad"));
    if (isNaN(cantidad) || cantidad < 5 || cantidad > 20) {
        alert("Ingrese un numero valido entre 5 y 20");
        return;
    }
    for (let i = 0; i < cantidad; i++) {
        console.log("Indice:", i);
        let num = numeroAleatorio();
        aleatorios.push(num);
    }
    mostrarResultados(aleatorios);
}


mostrarResultados = function (arregloNumeros) {
    let cmpTabla = document.getElementById("lblResultado");
    let tabla = "<table><tr><th>Indice</th><th>Numero</th></tr>";
    for (let i = 0; i < arregloNumeros.length; i++) {
        tabla += "<tr><td>" + i + "</td><td>" + arregloNumeros[i] + "</td></tr>";
    }
    tabla += "</table>";
    cmpTabla.innerHTML = tabla;
}

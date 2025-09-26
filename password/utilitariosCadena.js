esMayuscula = function(caracter) {
    let ascii = caracter.charCodeAt(0);
    return ascii >= 65 && ascii <= 90; 
}

esDigito = function(caracter) {
    let ascii = caracter.charCodeAt(0);
    return ascii >= 48 && ascii <= 57; 
}

esGuion = function(caracter) {
    let ascii = caracter.charCodeAt(0);
    return ascii == 45; 
}

esCaracter = function(caracter) {
    let ascii = caracter.charCodeAt(0);
    return ascii == 42 || ascii == 45 || ascii == 95; 
}
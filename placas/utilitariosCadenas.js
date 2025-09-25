esMayuscula = function (caracter) {
    if (!caracter || caracter.length == 0) {
        return false;
    }
    let ascii = caracter.charCodeAt(0);
    return ascii >= 65 && ascii <= 90;  
}

esDigito = function (caracter) {
    if (!caracter || caracter.length == 0) {
        return false;
    }
    let ascii = caracter.charCodeAt(0);
    return ascii >= 48 && ascii <= 57; 
}

esGuion = function (caracter) {
    if (!caracter || caracter.length == 0) {
        return false;
    }
    return caracter.charCodeAt(0) == 45; 
}

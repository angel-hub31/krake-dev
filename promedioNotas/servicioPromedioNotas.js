calcularPromedio = function (n1, n2, n3) {
    // 1. Define la función 'calcularPromedio' que acepta tres argumentos (notas): n1, n2, y n3.
    
    let promedio; // 2. Declara una variable local llamada 'promedio' para almacenar el resultado del cálculo.
    
    // 3. Realiza el cálculo: suma las tres notas (n1 + n2 + n3) y divide el resultado entre 3.
    // 4. Asigna el resultado de la división a la variable 'promedio'.
    promedio = (n1 + n2 + n3) / 3; 
    
    // 5. Devuelve el valor calculado de 'promedio' al lugar donde se llamó a la función.
    return promedio;
}
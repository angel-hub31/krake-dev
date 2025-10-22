//que persona tiene la nota mas alta, si es hombre o mujer
//Hacemos el arreglo que almacena objetos de personas
//que persona tiene la nota mas alta, si es hombre o mujer
//Hacemos el arreglo que almacena objetos de personas
let personas = [
    { nombre: "LUIS", nota: 8, genero: "MASCULINO" },
    { nombre: "MARIA", nota: 7, genero: "FEMENINO" },
    { nombre: "FERNANDA", nota: 10, genero: "FEMENINO" },
    { nombre: "PEDRO", nota: 9, genero: "HOMBRE" },
];
//creamos la funcion agregar persona

agregarPersona = function () {
    //obtenemos referenciaas a los elementos del DOM(campos de entrada y errores)
    const nombreInput = document.getElementById("txtNombre");
    const notaInput = document.getElementById("txtNota");
    const generoInput = document.getElementById("txtGenero");

    const errorNombre = document.getElementById("errorNombre");
    const errorNota = document.getElementById("errorNota");
    const errorGenero = document.getElementById("errorGenero");


    const nombre = nombreInput.value.trim(); // Usamos .trim() para quitar espacios
    const notaString = notaInput.value.trim();
    const nota = parseInt(notaString); // Convertimos la nota a número entero
    const genero = generoInput.value.trim().toUpperCase(); // Normalizamos el género


    //ocultamos mensaje de error anterior antes d la validacion
    errorNombre.style.display = "none";
    errorNota.style.display = "none";
    errorGenero.style.display = "none";



    let esValido=true;// esto es un flag para rastrear la validez del formulario

    //hacemos la validacion del nombre con un condicional
    if(nombre.length<3){
        //mostramos el error si el nombre tiene menos de 3 caracteres
        errorNombre.textContent="el nombre debe tener almenos 3 caracteres";
        errorNombre.style.display="block";
        esValido=false;

    }
    //validacion de la nota
    if(isNaN(nota) || nota<0 ||nota>10 ||!Number.isInteger(nota)){
        //mostramos el error si la nota no cumple con las restricciones
        errorNota.textContent="La nota debe ser entre 0 y 10";
        errorNota.style.display="block";
        esValido=false;
    }
    //validacion de sexo
    if(genero.length<3){
        //mostramos el error si el sexo es menor a 3 caracteres
        errorGenero.textContent="la palabra genero debe ser mayor a 3 caracteres"
        errorGenero.style.display="block";
        esValido=false;

    }
    // si los datos son validos (esValido es true)
    if(esValido){
        let nuevaPersona={};

        //asignamos los valores validos al nuevo objeto
        nuevaPersona.nombre=nombre;
        nuevaPersona.nota=nota;
        nuevaPersona.genero=genero;

        //agregamos el nuevo objeto al arreglo global personas
        personas.push(nuevaPersona);
        //notificamos al usuario y limpiamos el campo de entrada
        alert("Persona agregada correctamente");

        nombreInput.value='';
        notaInput.value='';
        generoInput.value='';
        //actualizamos la tabla de personas mostradas en el interfaz

        mostrarPersonas();

    }

}
mostrarPersonas=function(){
   const tablaContainer=document.getElementById('tablaPersonas');//contenedor donde se insertara la tabla
   let html= '<table>';//iniciamos la cadena de HTML para la tabla
   //encabezado (thead) de la tabla
   html+= '<thead><tr><th>NOMBRE</th><th>NOTA</th><th>GENERO</th></tr></thead>';
   //cuerpo (tbody)
html+='<tbody>';
//iteramos sobre cada objeto en el arreglo personas
personas.forEach(p=>{
    //añadimos una fila (<tr>)con las celdad (<td>)para nombre nota y genero
    html+=`<tr><td>${p.nombre}</td><td>${p.nota}</td><td>${p.genero}</td></tr>`;
});
html+='</tbody></table>';// cerramos el cuerpo de la tabla
//insertamos en el HTML la tabla dentro del contenedor 'tablaPersonas'
tablaContainer.innerHTML=html;


}
encontrarMayor = function(){
    // CORRECCIÓN APLICADA: Se usa 'personas.length' en lugar de 'nota.length'
    if(personas.length == 0) return null; 
    
    // asumimos que la primera persona es la mayor inicialmente
    let personaMayor = personas[0];
    
    // iteramos a partir del segundo elemento 
    for(let i = 1; i < personas.length; i++){
        let elementoPersona = personas[i];
        
        // registro consola para depuracion
        console.log(`Posicion${i}: ${elementoPersona.nombre}, Nota:${elementoPersona.nota}, Genero ${elementoPersona.genero}`);
        
        // si la nota actual es mayor que la nota de personaMayor
        if (elementoPersona.nota > personaMayor.nota){
            // actualizamos personaMayor con el objeto de la persona con la nota mas alta
            personaMayor = elementoPersona;
        }
    }
    return personaMayor;
}
determinarMayor=function(){
    // ocultamos el resultado del menor
    document.getElementById("resultadoMenor").style.display="none";
    //llamamos a la funcion logica para obtener la persona mayor
    const mayor=encontrarMayor();
    //mostramos el resultado
    if(mayor){
        //actualizamos los elementos de texto con el nombre y la nota
        document.getElementById("nombreMayor").textContent=mayor.nombre;
        document.getElementById("notaMayor").textContent=mayor.nota;
        // CORRECCIÓN APLICADA: Se actualiza el genero
        document.getElementById("generoMayor").textContent=mayor.genero; 
        
        //hacer visible el contenedor de resultados
        document.getElementById("resultadoMayor").style.display="block";
    }else{
        //ocultamos el contenedor y alertar si no hay personas
        document.getElementById("resultadoMayor").style.display="none";
        alert("No hay personas en el arreglo");

    }
    console.log("elementos del arreglo(invocados desde determinarMayor):",personas);

    
}
encontrarMenor=function(){
    //si el arreglo esta vacio, retornar null
    if(personas.length==0) return null;
    //asumimos que la aprimera persona es la menor inicialmente
    let personaMenor=personas[0];
    //iteramos a partir del segundo elemento
    for(let i=1;i<personas.length;i++){
        let elementoPersona=personas[i];

        if(elementoPersona.nota<personaMenor.nota){
            personaMenor=elementoPersona;

        }

    }
return personaMenor;

}






determinarMenor=function(){

    document.getElementById("resultadoMayor").style.display="none";
    const menor=encontrarMenor();

    if(menor){
    document.getElementById("nombreMenor").textContent=menor.nombre;
    document.getElementById("notaMenor").textContent=menor.nota;
    // CORRECCIÓN APLICADA: Se actualiza el genero
    document.getElementById("generoMenor").textContent=menor.genero;
    
    document.getElementById("resultadoMenor").style.display="block";

}else{
    document.getElementById("resultadoMenor").style.display="none";
    alert("no hay personas en el arreglo")
}
}
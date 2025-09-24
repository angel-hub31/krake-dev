calcularTasaInteres=function(ingresoAnual){
    let cmpValorTasa;
    let valor;
    let valorTasa;

    if(ingresoAnual < 300000){
        console.log("La tasa es del 16%");
        valorTasa = 16;
    }else if(ingresoAnual >= 300000 && ingresoAnual < 500000){
        console.log("La tasa es del 15%");
        valorTasa = 15;
    }else if(ingresoAnual >= 500000 && ingresoAnual < 1000000){
        console.log("La tasa es del 14%");
        valorTasa = 14;
    }else if(ingresoAnual >= 1000000 && ingresoAnual < 2000000){
        console.log("La tasa es del 13%");
        valorTasa = 13;
    }else if(ingresoAnual >= 2000000){
        console.log("La tasa es del 12%");
        valorTasa = 12;
    }

    cmpValorTasa = document.getElementById("txtTasa"); // debes poner un id real en tu HTML
    valor = cmpValorTasa.value;
    return valorTasa;
}

calcularCapacidadDePago=function(edad,ingresos,egresos){
    let cmpValor;
    let valor;
    let valor2;
    let anio;
    let cmpAnio;
    let cuota;
    cmpAnio=document.getElementById("txtEdad");
    anio=cmpAnio.value;
    edad=parseInt(anio);
    cmpValor=document.getElementById("txtIngresos");
    valor=cmpValor.value;
    ingresos=parseFloat(valor);
    cmpValor=document.getElementById("txtEgresos");
    valor=cmpValor.value;
    egresos=parseFloat(valor2);
    if(edad>50){
        cuota=(ingresos-egresos)*0.30;
        console.log("su capacidad es del 30%  ");
        return cuota;

    }else if(edad==50){
        cuota=(ingresos-egresos)*0.40;
        console.log("su capacidad es del 40%  ");
        return cuota;
    }else{
        cuota=(ingresos-egresos)*0.50;
        console.log("su capacidad es del 50%  ");
        return cuota;
    }
}
calcularDescueno=function(cantidad,precio){
    let valor;
    let cmpValor;
    let cantidades;
    let cmpCantidades;
    cmpValor=document.getElementById("txtPrtecio");
    valor=cmpValor.value;
    precio=parseFloat(valor);

    cmpCantidades=document.getElementById("txtCantidad");
    cantidades=cmpCantidades.value;
    cantidades=parseFloat(cantidad);
    if(cantidad<3){
        console.log("no recibe descuento");
    }
    else if(cantidad<=3 && cantidad<5){
        console.log("recibe el 2% de descuento");
    }
    else if(cantidad>=6 && cantidad<=11){
        console.log("recibe el 3% de descuento");
    }
    else if(cantidad>12){
        console.log("recibe el 4% de descuento");
    }
}
determinarColesterolLDL=function(nivelColesterol){
    let nivel;
    let cmpNivel;

    cmpNivel=document.getElementById("txtColesterol");
    nivel=cmpNivel.value;
    nivelColesterol=parseFloat(nivel);

    if(nivelColesterol<100){
        console.log("Optimo");

    }else if(nivelColesterol>=100 && nivelColesterol<=129){
        console.log("casi optimo");

    }else if(nivelColesterol>=130 && nivelColesterol<=159){
        console.log("limite superior del rango normal");

    }else if(nivelColesterol>=160 && nivelColesterol<=189){
        console.log("alto");

    }else if(nivelColesterol>=190){
        console.log("muy alto");
    }
}
validarClave=function(clave){
    if(clave.length>=8 && clave.length<=16){
        console.log("la clave es valida");
        return true;
    }else {
        console.log("clave invalida");
        return false;
    }
}
esMayuscula=function(caracter){
    let codigoCaracter=caracter.charCodeAt(0);

    if(codigoCaracter>=65 && codigoCaracter<=90){
        console.log("la letra es mayuscula");
        return true;

    }else{
        console.log("la letra es minuscula");
        return false;
    }
}
esMinuscula=function(caracter){
    let codigoCaracter = caracter.charCodeAt(0);

    if(codigoCaracter>=97 && codigoCaracter<=122){
        console.log("la letra es minuscula");
        return true;

    }else{
        console.log("la letra no es minuscula");
        return false;
    }
}
esDigito=function(caracter){
    let codigoCaracter = caracter.charCodeAt(0);

    if(codigoCaracter>=48 && codigoCaracter<=57){
        console.log("el caracter es un digito");
        return true;

    }else{
        console.log("el caracter no es un digito");
        return false;
    }
}
darPermiso=function(notaMatematica,notaFisica,notaGeometria){

    if(notaMatematica>90 || notaFisica>90 || notaGeometria>90){
        console.log("Tiene permiso");

    }else{
        console.log("No tiene permiso");
    }

}
otorgarPermiso=function(notaMatematica,notaFisica,notaGeometria){
    if(notaMatematica>90 || notaFisica>90 || notaGeometria>90){
        console.log("Tiene permiso");
    }else if(notaFisica>notaMatematica){
        console.log("Tiene permiso");
    }else{
        console.log("No tiene permiso");
    }
}
dejarSalir=function(notaMatematica,notaFisica,notaGeometria){
    if(notaMatematica>90 || notaFisica>90 || notaGeometria>90){
        console.log("Tiene permiso");
    }else if(notaFisica>notaMatematica){
        console.log("Tiene permiso");
    }else{
        console.log("No tiene permiso");
    }
}




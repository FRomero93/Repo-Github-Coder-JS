let nombre = prompt("Ingrese su Nombre");
let apellido = prompt("Ingrese su Apellido");
let edad = Number(prompt("Ingrese su Edad"));

if(!isNaN(edad)){
    console.log("generando id usuario...");
    const idSucursal =  12;
    console.log("sucursal asignada : " + idSucursal);
    var usuario = nombre[0].toUpperCase() + apellido[0].toUpperCase() + edad + idSucursal;
    console.log("id usuario generado...");
    console.log("id usuario: " + usuario);

    alert("Le damos la bienvenida ¡" + nombre + " " + apellido + "!");
    alert("Su usuario es:" + usuario);

    let vivienda = prompt("Ingrese en que tipo de vivienda vive (Ejem: Casa, Departamento, etc...)").toLowerCase();
    console.log("Vivienda: " + vivienda);
    if(vivienda == "casa"){
        alert("Usted vive en una casa 🏠");
    }else if(vivienda == "departamento"){
        alert("Usted vive en una departamento 🏢");
    }else if(vivienda == "castillo"){
        alert("Usted vive en un castillo 🏰");
    }else{
        alert("Usted no tiene vivienda 🏕");
    }
}else{
    alert("Debe ingresar una edad válida...");
}
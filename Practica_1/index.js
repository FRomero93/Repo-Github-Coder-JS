let usuario = "";
let carrito = "";
let total = 0;
let opcion = 0;
const precioCombo1 = 250;
const precioCombo2 = 350;
const precioCombo3 = 150;

alert("Te damos la Bienvenida al sistema de compra");
do{
    console.log("Elija una opcion:");
    console.log("1)Registrarse");
    console.log("2)Comprar combo 1");
    console.log("3)Comprar combo 2");
    console.log("4)Comprar combo 3");
    console.log("5)Ver Precios");
    console.log("6)Ver Carrito");
    console.log("0)Salir");
    opcion = Number(prompt("Ingrese una opcion:"));
    
    switch (opcion) {
        case 1:
            let edad;
            do {
                edad = Number(prompt("Ingrese su EDAD o coloque 0 para salir del registro"));
                if(isNaN(edad)){
                    alert("Ingrese una edad valida!");     
                }else if(edad == 0){
                    console.log("salio del registro");
                }else if(edad < 18){
                    alert("Usted es menor no se puede registrar"); 
                    edad = 0;
                }else{
                    let nombre = prompt("Ingrese su nombre");
                    let apellido = prompt("Ingrese su apellido");
                    for(let i = 0; i < 3; i++){
                        let intentos = 2 - i;
                        if(intentos >= 0){
                            if(!isNaN(nombre) && !isNaN(apellido)){
                                alert("Ingrese datos validos!");
                                alert("Le quedan " + intentos + " intentos mas..." );
                                nombre = prompt("Ingrese su nombre");
                                apellido = prompt("Ingrese su apellido");
                            }else if(!isNaN(nombre)){
                                alert("Ingrese un nombre valido");
                                alert("Le quedan " + intentos + " intentos mas..." );
                                nombre = prompt("Ingrese su nombre");
                            }else if(!isNaN(apellido)){
                                alert("Ingrese un apellido valido");
                                alert("Le quedan " + intentos + " intentos mas..." );
                                apellido = prompt("Ingrese su apellido");
                            }else{
                                usuario = nombre[0] + apellido[0] + edad;
                                alert("Su usuario es: " + usuario);
                                edad = 0;
                                break;
                            }
                        }else{    
                            opcion = 0;
                            alert("Ha sido bloqueado...");
                        }
                    }
                }
            } while (edad != 0);
            break;
        case 2:
            if(usuario != ""){
                alert("Compro combo 1 💲");
                total += precioCombo1;
                carrito += "Combo 1 $" + precioCombo1 + "; \n"; 
                
                console.log("Su carrito: \n" +  carrito);
                console.log("Su total: $" + total);
            }else{
                console.log("No se ecuentra en el registro...");
                alert("Debe REGISTRARSE primero");
            }
            break;
        case 3:
            if(usuario != ""){
                alert("Compro Combo 2 💲");
                total += precioCombo2;
                carrito += "Combo 2 $" + precioCombo2 + "; \n"; 
                
                console.log("Su carrito: \n" +  carrito);
                console.log("Su total: $" + total);
            }else{
                console.log("No se ecuentra en el registro...");
                alert("Debe REGISTRARSE primero");
            }
            break;
        case 4:
            if(usuario != ""){
                alert("Compro combo 3 💲");
                total += precioCombo3;
                carrito += "Combo 3 $" + precioCombo3 + "; \n"; 
                
                console.log("Su carrito: \n" +  carrito);
                console.log("Su total: $" + total);
            }else{
                console.log("No se ecuentra en el registro...");
                alert("Debe REGISTRARSE primero");
            }
            break;
        case 5:
            alert("Combo 1 $ " + precioCombo1 + "\n" + "Combo 2 $ " + precioCombo2 + "\n" + "Combo 3 $ " + precioCombo3 + "\n");
            break;
        case 6:
            if(usuario != ""){
                if(total != 0){                
                    alert("Su carrito contiene: \n" +  carrito +  "--------------------" + "\n Total: $" + total);
                }else{
                    alert("Debe comprar algo primero");
                }   
            }else{
                console.log("No se ecuentra en el registro...");
                alert("Debe REGISTRARSE primero");
            }
            break;
        default:
                break;
    }
} while (opcion != 0);

if(total != 0){
    alert("Contenido carrito de " + usuario + ": \n" +  carrito +  "--------------------" + "\n Total a pagar: $" + total);
}
alert("Adios y Gracias... 🙂");
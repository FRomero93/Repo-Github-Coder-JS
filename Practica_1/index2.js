    let usuario = "";
    let carrito = "";
    let total = 0;
    let opcion = 0;
    const precioRemera = 5750;
    const precioPantalon = 8975;
    const precioZapatillas = 10025;

    alert("Te damos la Bienvenida al sistema de compra");
    do{
        console.log("Elija una opcion:");
        console.log("1)Registrarse");
        console.log("2)Comprar Remera 👕");
        console.log("3)Comprar Pantalon 👖");
        console.log("4)Comprar Zapatillas 👟");
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
                    alert("Compro Remera 💲");
                    total += precioRemera;
                    carrito += "Remera $" + precioRemera + "; \n"; 
                    
                    console.log("Su carrito: \n" +  carrito);
                    console.log("Su total: $" + total);
                }else{
                    console.log("No se ecuentra en el registro...");
                    alert("Debe REGISTRARSE primero");
                }
                break;
            case 3:
                if(usuario != ""){
                    alert("Compro Pantalon 💲");
                    total += precioPantalon;
                    carrito += "Pantalon $" + precioPantalon + "; \n"; 
                    
                    console.log("Su carrito: \n" +  carrito);
                    console.log("Su total: $" + total);
                }else{
                    console.log("No se ecuentra en el registro...");
                    alert("Debe REGISTRARSE primero");
                }
                break;
            case 4:
                if(usuario != ""){
                    alert("Compro Zapatillas 💲");
                    total += precioZapatillas;
                    carrito += "Zapatillas $" + precioZapatillas + "; \n"; 
                    
                    console.log("Su carrito: \n" +  carrito);
                    console.log("Su total: $" + total);
                }else{
                    console.log("No se ecuentra en el registro...");
                    alert("Debe REGISTRARSE primero");
                }
                break;
            case 5:
                alert("Remera $ " + precioRemera + "\n" + "Pantalon $ " + precioPantalon + "\n" + "Zapatillas $ " + precioZapatillas + "\n");
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
        alert("Ticket de " + usuario + ": \n" +  carrito +  "--------------------" + "\n Total a pagar: $" + total);
    }
    alert("Adios y Gracias... 🙂");


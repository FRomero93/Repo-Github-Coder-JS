console.log("Inicia sistema de compras online...\n");

let usuario = "";
let carrito = "";
let total = 0;
let opcion = 0;
const precioRemera = 5750;
const precioPantalon = 8975;
const precioZapatillas = 10025;


function registro(){
    let age;
    let user = "";
    do {
        age = Number(prompt("Ingrese su EDAD"));
        if(isNaN(age)){
            alert("Ingrese una edad valida!");     
        }else if(age == 0){
            console.log("salio del registro");
        }else if(age < 18){
            alert("Usted es menor no se puede registrar"); 
            age = 0;
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
                        user = nombre[0] + apellido[0] + age;
                        alert("Su usuario es: " + user);
                        age = 0;
                        break;
                    }
                }else{    
                    opcion = 0;
                    alert("Supero los intentos y ha sido bloqueado...");
                }
            }
        }
    } while (age != 0);
    
    return user;
}

function agregarAlCarrito(carrito, objeto, precio){
    carrito += objeto + " $" + precio + "; \n"; 
    console.log("Carrito: \n" +  carrito);
    return carrito;
}

function sumarAlTotal(total, precio){
    total += precio; 
    console.log("Total: $" + total);
    return total;
}

alert("Te damos la Bienvenida al sistema de compra");
do{
    console.log("Elija una opcion:");
    console.log("1)Ver Precios 💲");
    console.log("2)Registrarse 📝");
    console.log("3)Comprar Remera 👕");
    console.log("4)Comprar Pantalon 👖");
    console.log("5)Comprar Zapatillas 👟");
    console.log("6)Ver Carrito 🛒");
    console.log("0)Salir");
    opcion = Number(prompt("Ingrese una opcion:"));
    
    switch (opcion) {
        case 1:
            alert("Remera $ " + precioRemera + "\n" + "Pantalon $ " + precioPantalon + "\n" + "Zapatillas $ " + precioZapatillas + "\n");
            break;
        case 2:
            usuario = registro();
            break;
        case 3:
            if(usuario != ""){
                carrito = agregarAlCarrito(carrito, "Remera", precioRemera); 
                total = sumarAlTotal(total,precioRemera);
                alert("Compro Remera 💲");
            }else{
                console.log("No se ecuentra en el registro...");
                alert("Debe REGISTRARSE primero");
            }
            break;
        case 4:
            if(usuario != ""){
                carrito = agregarAlCarrito(carrito, "Pantalon", precioPantalon); 
                total = sumarAlTotal(total,precioPantalon);
                alert("Compro Pantalon 💲");
            }else{
                console.log("No se ecuentra en el registro...");
                alert("Debe REGISTRARSE primero");
            }
            break;
        case 5:
            if(usuario != ""){
                carrito = agregarAlCarrito(carrito, "Zapatillas", precioZapatillas); 
                total = sumarAlTotal(total,precioZapatillas);
                alert("Compro Zapatillas 💲");
            }else{
                console.log("No se ecuentra en el registro...");
                alert("Debe REGISTRARSE primero");
            }
            break;
        case 6:
            if(usuario != ""){
                if(total != 0){                
                    alert("Su carrito contiene: \n" +  carrito);
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
                
                
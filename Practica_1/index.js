console.log("Inicia sistema de compras online...\n");

let usuario = "";
let opcion = 0;

/*
*** Clases ***
*/
class Articulo {
    constructor(id, description, price) {
        this.id = id;
        this.description = description;
        this.price = price;
    }
}

class Cliente {
    constructor(id,name,lastname,age){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.age = age;
        this.carritoCliente = [];
        this.totalCompra = 0;
        
    }    
    sumarAlTotal(precio){
        this.totalCompra += precio; 
        console.log("Total: $" + this.totalCompra);
    }
    agregarAlCarrito(articulo){
        this.carritoCliente.push(articulo); 
        this.carritoCliente.forEach(articulo => console.log("agrego " + articulo.description + " al carrito...")); 
        this.sumarAlTotal(articulo.price);
    }
    verCarrito(data){
        if(this.totalCompra > 0){
            let carritoContenido ="";
            if(data != 0){
                carritoContenido = "Su carrito contiene: ";
            }else{
                carritoContenido = "Ticket de Compra de " + this.id + ":";
            }
            this.carritoCliente.forEach(articulo => carritoContenido += "\n" + articulo.description + " $" + articulo.price);
            carritoContenido += "\n -------------------------- \nTotal a pagar: $" + this.totalCompra;
            alert(carritoContenido);
        }else{
            alert("Debe agregar algo al carrito primero!")
        }
    }
    vaciarCarrito(){
        this.carritoCliente = [];
        this.totalCompra = 0;
        alert("Su carrito fue vaciado");
    }
}

/*
*** Funciones ***
*/
function registro(){
    let age;
    let cliente;
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
                        let user = nombre[0] + apellido[0] + age;
                        cliente = new Cliente(user,nombre,apellido,age);
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
    return cliente;
}


/*
*** Main ***
*/
alert("Te damos la Bienvenida al sistema de compra");

const remera = new Articulo(11,"Remera",3350);
const pantalon = new Articulo(21,"Pantalon",5500);
const zapatillas = new Articulo(31,"Zapatillas",10250);

do{
    console.log("Elija una opcion:");
    console.log("1)Ver Precios 💲");
    console.log("2)Registrarse 📝");
    console.log("3)Comprar Remera 👕");
    console.log("4)Comprar Pantalon 👖");
    console.log("5)Comprar Zapatillas 👟");
    console.log("6)Ver Carrito 🛒");
    console.log("7)Vaciar Carrito 🗑");
    console.log("0)Salir 🚪");
    opcion = Number(prompt("Ingrese una opcion:"));
    
    switch (opcion) {
        case 1:
            alert("Remera $ " + remera.price + "\n" + "Pantalon $ " + pantalon.price + "\n" + "Zapatillas $ " + zapatillas.price + "\n");
            break;
        case 2:
            usuario = registro();
            break;
        case 3:
            if(usuario.id != ""){
                usuario.agregarAlCarrito(remera);
                alert("Compro Remera 💲");
            }else{
                console.log("No se encuentra en el registro...");
                alert("Debe REGISTRARSE primero");
            }
            break;
        case 4:
            if(usuario.id != ""){
                usuario.agregarAlCarrito(pantalon);
                alert("Compro Pantalon 💲");
            }else{
                console.log("No se encuentra en el registro...");
                alert("Debe REGISTRARSE primero");
            }
            break;
        case 5:
            if(usuario.id != ""){
                usuario.agregarAlCarrito(zapatillas);
                alert("Compro Zapatillas 💲");
            }else{
                console.log("No se encuentra en el registro...");
                alert("Debe REGISTRARSE primero");
            }
            break;
        case 6:
            if(usuario.id != ""){
                if(usuario.total != 0){                
                   usuario.verCarrito(opcion);
                }else{
                    alert("Debe comprar algo primero");
                }   
            }else{
                console.log("No se encuentra en el registro...");
                alert("Debe REGISTRARSE primero");
            }
            break;
        case 7:
            if(usuario.id != ""){
                usuario.vaciarCarrito();
            }else{
                console.log("No se encuentra en el registro...");
                alert("Debe REGISTRARSE primero");
            }
            break;
        default:
                break;
    }
} while (opcion != 0);

if(usuario != null && usuario.totalCompra > 0){
    usuario.verCarrito(opcion);
}
alert("Adios y Gracias... 🙂");
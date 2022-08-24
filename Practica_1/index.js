let carrito = "";
let total = 0;
let opcion = 0;
const precioRemera = 5750;
const precioPantalon = 8975;
const precioZapatillas = 10025;

alert("Le damos la Bienvenida al sistema de compra");
do{
    console.log("Elija una opcion:");
    console.log("1)Ver Precios 💲");
    console.log("2)Comprar Remera 👕");
    console.log("3)Comprar Pantalon 👖");
    console.log("4)Comprar Zapatillas 👟");
    console.log("5)Ver Carrito 🛒");
    console.log("0)Salir ");
    opcion = Number(prompt("Ingrese una opcion:"));
    
    switch (opcion) {
        case 1:
            alert("Remera $ " + precioRemera + "\n" + "Pantalon $ " + precioPantalon + "\n" + "Zapatillas $ " + precioZapatillas + "\n");
            break;
        case 2:
            let cantRemeras = Number(prompt("Ingrese la cantidad de remeras que desea comprar"));
            total += cantRemeras*precioRemera;
            for(let i=0; i < cantRemeras; i++){
                carrito += "Remera $" + precioRemera + "; \n"; 
            }
            alert("Cantidad de remeras compradas: " + cantRemeras);
            console.log("Su carrito: \n" +  carrito);
            console.log("Su total: $" + total);
            break;
        case 3:
            let cantPantalones = Number(prompt("Ingrese la cantidad de Pantalones que desea comprar"));
            total += cantPantalones*precioPantalon;
            for(let i=0; i < cantPantalones; i++){
                carrito += "Pantalon $" + precioPantalon + "; \n"; 
            }
            alert("Cantidad de pantalones comprados: " + cantPantalones);
            console.log("Su carrito: \n" +  carrito);
            console.log("Su total: $" + total);
            break;
        case 4:
            let cantZapatillas = Number(prompt("Ingrese la cantidad de Zapatillas que desea Comprar"));
            total += cantZapatillas*precioZapatillas;
            for(let i=0; i < cantZapatillas; i++){
                carrito += "Zapatillas $" + precioZapatillas + "; \n"; 
            }
            alert("Cantidad de zapatillas compradas: " + cantZapatillas);
            console.log("Su carrito: \n" +  carrito);
            console.log("Su total: $" + total);
            break;
        case 5:
            if(total != 0){                
                alert("Su carrito contiene: \n" +  carrito +  "--------------------" + "\n Total: $" + total);
            }else{
                alert("Debe comprar algo primero");
            }   
            break;
        default:
            break;
    }
} while (opcion != 0);

if(total != 0){
    alert("Ticket: \n" +  carrito +  "--------------------" + "\n Total a pagar: $" + total);
}
alert("Adios y Gracias... 🙂");


console.log("Inicia sistema de compras online...\n");
let usuario;
let id = 1000;
let texto;
let user1;

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
        console.log("agrego " + articulo.description + " al carrito...");
        this.sumarAlTotal(articulo.price);
    }
    verCarrito(data){
        console.log("TOTAL: " + this.totalCompra);
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
            return carritoContenido;
        }else{
            alert("Debe agregar algo al carrito primero!")
        }
    }
    contarArticulos(){
        const totalArticulos = this.carritoCliente.length
        return totalArticulos;
    }
    vaciarCarrito(){
        this.carritoCliente = [];
        this.totalCompra = 0;
        alert("Su carrito fue vaciado");
    }
    eliminarArticulo(){
        let eleccion;
        do {
            if(this.carritoCliente.length <= 0){
                alert("Su carrito esta vacio");
                eleccion = 0;
            }else{  
                let i = 0
                let articulos = "Elija el articulo que desea quitar";
                let idArticulo = 0;
                
                for(let i = 0; i < this.carritoCliente.length; i++){
                    let posicion = i + 1; 
                    articulos += "\n" + posicion + ") " + this.carritoCliente[i].description;
                }
                articulos += "\n\n0) Volver al menu"
                eleccion = prompt(articulos);
                
                if(eleccion != 0){
                    for(let j = 0; j < this.carritoCliente.length; j++){
                        if(j+1 == eleccion){
                            idArticulo = this.carritoCliente[j].id;
                            console.log("articulo " + idArticulo);
                        }
                    }
                    this.carritoCliente = this.carritoCliente.filter(articulo => articulo.id  != idArticulo);
                    this.totalCompra = 0;
                    this.carritoCliente.forEach(articulo =>  this.totalCompra += articulo.price);
                    alert("El articulo fue retirado del carrito!");
                    if (this.carritoCliente.length > 0){
                        this.verCarrito(0);
                    } 
                }
            }
        } while (eleccion != 0);
    }
}

/*
*** Funciones ***
*/
function registro(){
    let age = document.getElementById("age").value;
    let name = document.getElementById("fname").value;
    let lastname = document.getElementById("lname").value;
    let cliente;
    let valido = false;

    if(age == "" || isNaN(age)){
        alert("Debe ingresar una Edad valida");
        valido = false;
    } 
    else if (name == "" || !isNaN(name)) {
        alert("Debe ingresar un Nombre valido");
        valido = false;
    }
    else if (lastname == "" || !isNaN(lastname)) {
        alert("Debe ingresar un Apellido valido");
        valido = false;
    }else{
        if(age < 18){
            alert("Debe ser Mayor de 18 para registrarse");
            valido = false;
        }else{
            let user = name[0] + lastname[0] + age;
            cliente = new Cliente(user,name,lastname,age);
            setUserStorage(cliente);
            valido = true;
        }
    }
   return valido; 
}
function comprar(user,itemDesc,idItem){
    if(user != null){
        let ArticuloComprado;
        switch (itemDesc) {
            case "remera":
                ArticuloComprado = new Articulo(idItem,"Remera",3350);
                break;
            case "pantalon":
                ArticuloComprado = new Articulo(idItem,"Pantalon",5500);
                break;
            case "zapatillas":
                ArticuloComprado = new Articulo(idItem,"Zapatillas",10250);
                break;
        } 
        idItem++;
        setIdItemStorage(idItem);

        user.agregarAlCarrito(ArticuloComprado);
        totalItemsCarrito(user);

        setCartStorage(user.id, user.carritoCliente);

        alert("Usted agrego al carrito " + ArticuloComprado.description + " 💲");    
    }else{
        console.log("No se encuentra en el registro...");
        alert("Debe REGISTRARSE primero");
    }
    return idItem;
}
function mostrarCarritoUsuario(user){
    if(user != null){
        user.total != 0 ? user.verCarrito(opcion) : alert("Debe comprar algo primero");
    }else{
        console.log("No se encuentra en el registro...");
        alert("Debe REGISTRARSE primero");
    }
}   
function totalItemsCarrito(user){;
    let cantidadCarrito = document.getElementById("cantArt");
    cantidadCarrito != null ? cantidadCarrito.innerText = user.contarArticulos() : null;
}
function getCartStorage(user){
    let carritoAux = [];
    const userCart = JSON.parse(localStorage.getItem("carrito" + user.id));
    if(userCart != null){
        for(const art of userCart){
            carritoAux.push(new Articulo(art.id,art.description,art.price));
        }
    }
    return carritoAux;
}
function setCartStorage(idUser,cart){
    const compra = JSON.stringify(cart);
    localStorage.setItem("carrito" + idUser, compra);
}
function getUserStorage(){
    const userReg = JSON.parse(localStorage.getItem("idCliente"));
    let auxUser;
    if(userReg != null){
        auxUser = new Cliente(userReg.id,userReg.name,userReg.lastname,userReg.age);
        auxUser.carritoCliente = getCartStorage(auxUser);
        for(item of auxUser.carritoCliente){
            auxUser.totalCompra += item.price;
        }
        texto = document.getElementById("userHeader");
        texto != null ? texto.innerHTML = `¡Te damos la bienvenida ${auxUser.name}!`: null;
    }
    return auxUser;
}
function setUserStorage(user){
    const enJSON = JSON.stringify(user);
    localStorage.setItem("idCliente", enJSON);
}
function getIdItemStorage(id){
    const idStorage = JSON.parse(localStorage.getItem("id"));
    if (idStorage != null) {
        id = idStorage;
    }
    return id;
}
function setIdItemStorage(id){
    idJSON = JSON.stringify(id);
    localStorage.setItem("id", idJSON);
}
function deleteCartItem(row,idButtom){
    const userStorage = getUserStorage();
    userStorage.carritoCliente = userStorage.carritoCliente.filter(item => item.id  != idButtom);
    userStorage.carritoCliente.forEach(item => console.log("item " + item.id +" "+ item.description ));
    userStorage.totalCompra = 0;
    userStorage.carritoCliente.forEach(item =>  userStorage.totalCompra += item.price);

    console.log(idButtom);

    setCartStorage(userStorage.id, userStorage.carritoCliente);
    
    deleteRow(row);
}
function deleteRow(row){
    let index = row.parentNode.parentNode.rowIndex;
    let tabla = document.getElementById("tablaCarrito");
    tabla.deleteRow(index);
}
function verCarritoUsuario(){
    const userStorage = getUserStorage();
    let tablaCarrito = document.getElementById("tablaCarrito");
    
    if(tablaCarrito != null){
        var tbdy = document.createElement('tbody');
        var trH = document.createElement('tr');
        var tdH1 = document.createElement('td');
        var tdH2 = document.createElement('td');
        var tdH3 = document.createElement('td');
        
        tbdy.classList.add("mi-table-body");
        trH.classList.add("mi-table-header");
        tdH1.classList.add("header__item");
        tdH1.innerText += "ID";
        tdH2.classList.add("header__item");
        tdH2.innerText += "ARTICULO";
        tdH3.classList.add("header__item");
        tdH3.innerText += "";
        trH.appendChild(tdH1);
        trH.appendChild(tdH2);
        trH.appendChild(tdH3);
        tbdy.appendChild(trH);

        for(const item of userStorage.carritoCliente){
            var tr = document.createElement('tr');
            var td1= document.createElement('td');
            var td2= document.createElement('td');
            var td3= document.createElement('td');
  
            tr.classList.add("mi-table-row");
            td1.classList.add("mi-table-data");
            td1.innerText = `${item.id}`;
            td2.classList.add("mi-table-data");
            td2.innerText = `${item.description}`;
            td2.classList.add("mi-table-data");
            td3.innerHTML = `<button class="boton-articulo" onclick= 'deleteCartItem(this,${item.id})' id=${item.id}>Quitar</button>`;
            
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbdy.appendChild(tr);
        }
        tablaCarrito.appendChild(tbdy);
        console.dir(tablaCarrito);
    }     
}
function irACarrito(user){
    if(user != null){
        if(user.totalCompra != 0){              
            window.location.href="./carrito.html";
            verCarritoUsuario();
        }else{
            alert("Debe comprar algo primero");
        }   
    }else{
        console.log("No se encuentra en el registro...");
        alert("Debe REGISTRARSE primero");
    }
}
function salir(user){
    if(user != null && user.totalCompra > 0){
        user.verCarrito(0);
        /*
        let ticket
        let division = document.createElement("div");
        let modal2 = document.getElementById('modalBody');
        division.innerHTML = `<p>${ticket}</p>`;
        console.dir(modal2);
        modal2.appendChild(division);
        */
        console.log("Finalizo sistema de compras online...");      
    }else{
        console.log("Finalizo sistema de compras online...");
        alert("Adios y Gracias 🙂");
    }
    localStorage.clear();
    window.location.reload();
}

/*
*** Main ***
*/
const btnRegistro = document.getElementById("btnRegistro");
const btnAceptar = document.getElementById("btnAceptar");
const btnCancelar = document.getElementById("btnCancelar");
const btnCarrito = document.getElementById("btnCarrito");
const btnMenu = document.getElementById("btnMenu");
const btnRemera = document.getElementById("btnRemera");
const btnPantalon = document.getElementById("btnPantalon");
const btnZapatillas = document.getElementById("btnZapatillas");
const btnSalir = document.getElementById("btnSalir");

id = getIdItemStorage(id);
user1 = getUserStorage();

if (user1 != null){
    verCarritoUsuario(user1);
    totalItemsCarrito(user1);
} 

/*
*** BOTONES *** 
 */
if(btnRegistro != null){
    btnRegistro.onclick = () => window.location.href="./registro.html";
}
if(btnAceptar != null){
    btnAceptar.onclick = () => registro();
}
if(btnCancelar != null){
    btnCancelar.onclick = () => window.location.href = "../Pages/index.html";;
}
if(btnCarrito != null){
    btnCarrito.onclick = () => irACarrito(user1);
}
if(btnMenu != null){
    btnMenu.onclick = () => window.location.href="./index.html";
}
if(btnRemera != null){
    btnRemera.onclick = () => id = comprar(user1,"remera",id);
}
if(btnPantalon != null){
    btnPantalon.onclick = () => id = comprar(user1,"pantalon",id);
}
if(btnZapatillas != null){
    btnZapatillas.onclick = () => id = comprar(user1,"zapatillas",id);
}
if(btnSalir != null){
    btnSalir.onclick = () => salir(user1);
}

// /////////////////////***  MODAL ***//////////////////////////////
// // Get the modal
// var modal = document.getElementById("myModal");
// // Get the button that opens the modal
// const boton = document.getElementById("boton");
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
// // When the user clicks the button, open the modal 

// if(boton !=null){
//     boton.onclick = function() {
//         modal.style.display = "block";
//     }
// }
// // When the user clicks on <span> (x), close the modal
// if(span != null){
//     span.onclick = function() {
//       modal.style.display = "none";
//     }
// }
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";   
//   }
// }
// ///////////////////////////////////////////////////////////////

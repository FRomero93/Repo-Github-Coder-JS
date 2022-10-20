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
    }
    agregarAlCarrito(articulo){
        this.carritoCliente.push(articulo); 
        this.sumarAlTotal(articulo.price);
    }
    contarArticulos(){
        const totalArticulos = this.carritoCliente.length
        return totalArticulos;
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

//Realiza valida los datos ingresados en el formulario del registro. Al finalizar lo sube al LocalStorage
function registro(){
    let form = document.querySelector("#formulario");
    let age = document.getElementById("age").value;
    let name = document.getElementById("fname").value;
    let lastname = document.getElementById("lname").value;
    let cliente;

    if(age == "" || isNaN(age)){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Debes ingresar una Edad valida',
            showConfirmButton: true,
          });
    } 
    else if (name == "" || !isNaN(name)) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Debes ingresar un Nombre valido',
            showConfirmButton: true,
          });
    }
    else if (lastname == "" || !isNaN(lastname)) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Debes ingresar un Apellido valido',
            showConfirmButton: true,
          });
    }else{
        if(age < 18){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Debes ser mayor de 18 para registrarte',
                showConfirmButton: true,
              });
        }else{
            let user = name[0] + lastname[0] + age;
            
            cliente = new Cliente(user,name,lastname,age);
            setUserStorage(cliente);
            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Se ha registrado!',
                text: 'Su usuario es ' + user,
                showConfirmButton: true,
            }).then((result) =>{
                if(result.isConfirmed){ 
                    form.submit();
                }
            });
        }     
    }
   return false;
}
//Obtiene los datos del archivo JSON
function getJSON(){
    return fetch('../JS/Articulos.json')
        .then(resp => {return resp.json()})
            .then(data => {
                return data;
            });
}
//Busca un item con el nombre del parametro dentro del listado JSON y lo retorna en caso de encontrarlo
function getItemJSON(itemDescription){
    let itemsJson
     getJSON().then((data) => {
        itemsJson = JSON.stringify(data)
        itemsJson = JSON.parse(itemsJson);
        
        let item = itemsJson.find(item => item.description.toUpperCase() == itemDescription.toUpperCase());
        
        return item;     
    });
        
}
//Obtiene los datos hay en el archivo JSON 
async function getJSONAsync(){
    const resp = await fetch('../JS/Articulos.json');
    const data = await resp.json();

    return data;
    /*
    const datalocal = JSON.stringify(data);
    localStorage.setItem("items", datalocal);
    */
}
//Busca dentro de un JSON lo datos del articulo solicitado, filtrando por la descripcion del articulo, la cual es pasada como parametro
async function getItemJSONAsync(itemDescription){
    let itemsJson = JSON.stringify(await getJSONAsync());
    itemsJson = JSON.parse(itemsJson);
    let itemReturn = itemsJson.find(item => item.description.toUpperCase() == itemDescription.toUpperCase());
    return itemReturn;    
    
    //const items = JSON.parse(itemsJson); 
    //const items2 = JSON.parse(localStorage.getItem("items"));   
}
async function setItem(idItem,itemDesc)
{
    let articuloJSON = await getItemJSONAsync(itemDesc);
    let articuloComprado = new Articulo(idItem, articuloJSON.description, articuloJSON.price);

    return articuloComprado;
}
//Agrega al carrito el articulo con el nombre pasado como parametro
async function comprar(user,itemDesc){
    if(user != null){
        //let userTest = getUserStorage();
        let idItem
        idItem = getIdItemStorage(idItem);
        let articuloComprado = await setItem(idItem,itemDesc);
        idItem++;
        setIdItemStorage(idItem);
        user.agregarAlCarrito(articuloComprado);
        totalItemsCarrito(user);
        setCartStorage(user.id, user.carritoCliente);
        
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Has agregado ' + articuloComprado.description + ' al carrito!',
            showConfirmButton: true,
        });

    }else{
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: '¡Debes registrarte primero!',
            showConfirmButton: true,
        });

    }
}
//Disara un pop up con el ticket del usuario
function contenidoCarritoUsuario(user){
    let carritoContenido ="";
    if(user.totalCompra > 0){
            carritoContenido = "Ticket de Compra de " + user.id + ":";
            user.carritoCliente.forEach(articulo => carritoContenido += "\n" + articulo.description + " $" + articulo.price);
            carritoContenido += "\n -------------------------- \nTotal a pagar: $" + user.totalCompra;
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: carritoContenido,
                showConfirmButton: true,
            }).then((isOK) => {
                if(isOK.isConfirmed){
                    localStorage.clear();
                    window.location.reload();
                }
            });
        }
        return carritoContenido;
}
//Calcula la cantidad de articulos en el carrito y lo muestra en el boton del mismo 
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
        auxUser.totalCompra = auxUser.carritoCliente.reduce((total, item) => {return total + item.price;}, auxUser.totalCompra);
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
//Setea una mensaje de bienvenida si el usuario se registro
function setBienvenida(user){
    pBienvenida = document.getElementById('pBievenida');
    if(pBienvenida == null){
        header = document.getElementById("idHeader");
        texto = document.createElement("p");
        texto.setAttribute('id','pBienvenida');
        texto.innerText = `¡Te damos la bienvenida ${user.name}!`;
        texto.classList.add("display-6");
        texto.classList.add("fw-bolder");
        header != null ? header.appendChild(texto) : null;
    }
}
//Quita los items seleccionados del carrito del usuario. Se le pasan como parametros la fila y el id del boton que se pulso
function borrarItemCarrito(row,idButtom){
    const userStorage = getUserStorage();
    let tabla = document.getElementById("tablaCarrito");
    let index = row.parentNode.parentNode.rowIndex;
    
    tabla.deleteRow(index);
    
    userStorage.carritoCliente = userStorage.carritoCliente.filter(item => item.id  != idButtom);
    setCartStorage(userStorage.id, userStorage.carritoCliente);
}
//Genera una tabla con los items en la lista del usuario guardados en el local Storage
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
            td3.innerHTML = `<button class="boton-articulo" onclick= 'borrarItemCarrito(this,${item.id})' id=${item.id}>Quitar</button>`;
            
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbdy.appendChild(tr);
        }
        tablaCarrito.appendChild(tbdy);
    }     
}
//Redirige a la pagina "carrito" si el usuario agrego articulos al carrito
function irACarrito(user){
    if(user != null){
        if(user.totalCompra != 0){              
            window.location.href="./carrito.html";
            verCarritoUsuario();
        }else{
            Swal.fire({position: 'center',icon: 'info',title: '¡Debes comprar algo primero!',showConfirmButton: true,});
        }   
    }else{
        Swal.fire({position: 'center',icon: 'info',title: '¡Debes registrarte primero!',showConfirmButton: true,});
    }
}
//Finaliza la sesion eleminando los datos guardados en el Local Storage y recargando la pagina
function salir(user){
    Swal.fire({
        position: 'center',
        icon: 'question',
        title: '¿Desea salir a pagar?',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'Si',
        CancelButtonText: 'No',
    }).then((result) => {
        if(result.isConfirmed === true){
            if(user != null && user.totalCompra > 0){
                contenidoCarritoUsuario(user);   
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Adios y Gracias 🙂',
                    showConfirmButton: true,
                }).then((isOk) =>{
                    if(isOk.isConfirmed){
                        localStorage.clear();
                        window.location.reload();
                    }
                });
            }
        }  
    });              
}
//Genera una carta articulo y la agrega al index. Para esto recibe como parametros su id, el precio, el nombre del articulo y na imagen del mismo. Tambien recibe el usurio para utilizar la funcion de agregar
function setCardItem(user,idItem,precioItem,itemDescripcion,imagen){
    let cardRow = document.querySelector('#cardRow'); 
    let idBoton = "btn"+ itemDescripcion;

    if (!!cardRow){
        let carta = document.createElement('div');
        carta.innerHTML = `
        <div class="col mb-5">
            <div class="card h-100">
                <img class="mi-img img .card-img-top" src="${imagen}" alt="..." />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${itemDescripcion}</h5>
                        $${precioItem}
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    </div>
                    <div class="text-center">
                        <button id='${idBoton}' class="boton-articulo" >Agregar</button>
                    </div>
                </div>
            </div>
        </div>`
        carta.onclick = function(){comprar(user,itemDescripcion,idItem)}
        cardRow.appendChild(carta);
        //onclick= 'comprar(${JSON.stringify(user)},this.id,${idItem})'
        // const boton = document.getElementById(idBoton);
        // return boton;
    }

}
//Obtiene todos los Item dentro del archivo JSON y les genera su carta de item
async function getItemsJSONAsyncCards(user,idItem){
    let itemsJson = JSON.stringify(await getJSONAsync());
    itemsJson = JSON.parse(itemsJson);
    itemsJson.forEach(item => setCardItem(user,idItem,item.price,item.description,item.pic));

}
/*
*** Main ***
*/
const btnRegistro = document.getElementById("btnRegistro");
const btnAceptar = document.getElementById("btnAceptar");
const btnCancelar = document.getElementById("btnCancelar");
const btnCarrito = document.getElementById("btnCarrito");
const btnMenu = document.getElementById("btnMenu");
const btnSalir = document.getElementById("btnSalir");
// const btnRemera = document.getElementById("btnRemera");
// const btnPantalon = document.getElementById("btnPantalon");
// const btnZapatillas = document.getElementById("btnZapatillas");

setIdItemStorage(id)
//id = getIdItemStorage(id);
user1 = getUserStorage();

if (user1 != null){
    getItemsJSONAsyncCards(user1,id); 
    verCarritoUsuario(user1);
    totalItemsCarrito(user1);
    setBienvenida(user1);
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
if(btnSalir != null){
    btnSalir.onclick = () => salir(user1);
}
// if(btnRemera != null){
//     btnRemera.onclick = () => comprar(user1,"Remera",id);
// }
// if(btnPantalon != null){
//     btnPantalon.onclick = () => comprar(user1,"pantalon",id);
// }
// if(btnZapatillas != null){
//     btnZapatillas.onclick =  () => comprar(user1,"zapatillas",id);
// }

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

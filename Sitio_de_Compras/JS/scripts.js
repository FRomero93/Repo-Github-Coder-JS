let usuario;
let texto;
let user1;

/*
*** Clases ***
*/
class Articulo {
    constructor(id,description,price,amount,priceBase) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.amount = amount;
        this.priceBase = priceBase;
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
    agregarAlCarrito(articulo,itemsTotal){
        if(!!this.carritoCliente.find(item => item.id == articulo.id)){
            this.carritoCliente.forEach(item => {
                if(item.id == articulo.id){
                    item.price += articulo.priceBase * articulo.amount;
                    item.amount = Number(item.amount) + Number(articulo.amount);
                } 
            }); 
        }else{
            this.carritoCliente.push(articulo); 
            this.sumarAlTotal(articulo.priceBase * itemsTotal);
        }
    }
    contarArticulos(){
        let cantidadesArticulos = this.carritoCliente.map(item => Number(item.amount));
        let totalArticulos = cantidadesArticulos.reduce((a,b) => a + b, 0);
        
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
async function setArticulo(itemDesc,itemsTotal)
{
    let articuloJSON = await getItemJSONAsync(itemDesc);
    let articuloComprado = new Articulo(articuloJSON.id,articuloJSON.description, articuloJSON.price * itemsTotal, itemsTotal, articuloJSON.price);

    return articuloComprado;
}
//Agrega al carrito el articulo con el nombre pasado como parametro
async function comprar(user,itemDesc,itemsTotal){
    if(user != null){
        let articuloComprado = await setArticulo(itemDesc,itemsTotal.innerHTML);
        user.agregarAlCarrito(articuloComprado,itemsTotal.innerHTML);
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
    cantidadCarrito != null ? cantidadCarrito.innerText = Number(user.contarArticulos()) : null;
}
//Devuelve el carrito del usuario solicitado
function getCartStorage(user){
    let carritoAux = [];
    const userCart = JSON.parse(localStorage.getItem("carrito" + user.id));
    if(userCart != null){
        for(const art of userCart){
            carritoAux.push(new Articulo(art.id,art.description,art.price,art.amount,art.priceBase));
        }
    }
    return carritoAux;
}
//Guarda en el local Storage el carrito del usuario colocado
function setCartStorage(idUser,cart){
    const compra = JSON.stringify(cart);
    localStorage.setItem("carrito" + idUser, compra);
}
//Obtiene el usuario guardado en el local Storage
function getUserStorage(userKey){
    const userReg = JSON.parse(localStorage.getItem(userKey));
    let auxUser;
    if(userReg != null){
        auxUser = new Cliente(userReg.id,userReg.name,userReg.lastname,userReg.age);
        auxUser.carritoCliente = getCartStorage(auxUser);
        auxUser.totalCompra = auxUser.carritoCliente.reduce((total, item) => {return total + item.price}, auxUser.totalCompra);
    }
    return auxUser;
}
//Guarda en el local Storage el usuario
function setUserStorage(user){
    const enJSON = JSON.stringify(user);
    localStorage.setItem("idCliente", enJSON);
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
function quitarItemCarrito(row,idButtom){
    const userStorage = getUserStorage("idCliente");
    let tabla = document.getElementById("tablaCarrito");
    let totalTabla = document.getElementById('totalTabla');
    let index = row.parentNode.parentNode.rowIndex;
    
    userStorage.carritoCliente = userStorage.carritoCliente.filter(item => item.id  != idButtom.id);
    setCartStorage(userStorage.id, userStorage.carritoCliente);
    totalTabla.textContent ='TOTAL: $' + precioTotalArticulos();
    tabla.deleteRow(index);
}
//Genera una tabla con los items en la lista del usuario guardados en el local Storage
function verCarritoUsuario(){
    const userStorage = getUserStorage("idCliente");
    let tablaCarrito = document.getElementById("tablaCarrito");
    let totalCarrito = 0;
    
    if(tablaCarrito != null){
        var tbdy = document.createElement('tbody');
        var trH = document.createElement('tr');
        var tdH1 = document.createElement('td');
        var tdH2 = document.createElement('td');
        var tdH3 = document.createElement('td');
        var tdH4 = document.createElement('td');
        var tF = document.createElement('tfoot');
        var trF = document.createElement('tr');
        var thF = document.createElement('th');
        
        tbdy.classList.add("mi-table-body");
        trH.classList.add("mi-table-header");
        tdH1.classList.add("header__item");
        tdH1.innerText += "Cantidad";
        tdH2.classList.add("header__item");
        tdH2.innerText += "Articulo";
        tdH3.classList.add("header__item");
        tdH3.innerText += "Precio";
        tdH4.classList.add("header__item");
        tdH4.innerText += "";
        thF.setAttribute('id','totalTabla');
                
        trH.appendChild(tdH1);
        trH.appendChild(tdH2);
        trH.appendChild(tdH3);
        trH.appendChild(tdH4);
        tbdy.appendChild(trH);
        
        for(const item of userStorage.carritoCliente){
            var tr = document.createElement('tr');
            var td1= document.createElement('td');
            var td2= document.createElement('td');
            var td3= document.createElement('td');
            var td4= document.createElement('td');
            
            tr.classList.add("mi-table-row");
            td1.classList.add("mi-table-data");
            contadorTabla(td1,td3,thF,item.amount,item.priceBase,item.id);
            td2.classList.add("mi-table-data");
            td2.innerText = `${item.description}`;
            td2.classList.add("mi-table-data");
            td3.innerText = `$${item.price}`;
            td3.classList.add("mi-table-data");
            td4.innerHTML = `<button class="boton-articulo" onclick= 'quitarItemCarrito(this, ${item.id})' id=${item.id}>Quitar <i class="bi bi-trash"></i></button>`;
            totalCarrito +=  item.price;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbdy.appendChild(tr);
        }
        thF.innerHTML = `<div>TOTAL: $${totalCarrito}</div>`;
        tF.classList.add("mi-table-footer");
        thF.classList.add("mi-table-footer-row");
        trF.appendChild(thF);
        tF.appendChild(trF);
        tablaCarrito.appendChild(tF);
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
function setCardItem(user,precioItem,itemDescripcion,imagen){
    let cardRow = document.querySelector('#cardRow'); 
    let idBoton = "btn"+ itemDescripcion;
    let idPrice = "price" + itemDescripcion;

    if (!!cardRow){
        let carta = document.createElement('div');
        carta.innerHTML = `
        <div class="col mb-5">
            <div class="card h-100">
                <img class="mi-img img .card-img-top" src="${imagen}" alt="..." />
                <div class="card-body p-4">
                    <div id=${idPrice} class="text-center">
                        <h5 class="fw-bolder">${itemDescripcion}</h5>
                        <h5>$${precioItem}</h5>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    </div>
                    <div class="text-center">
                        <button id='${idBoton}' class="boton-articulo" >Agregar</button>
                    </div>
                </div>
            </div>
        </div>
        `
        cardRow.appendChild(carta);
        let add = document.getElementById(idBoton);
        let priceSection = document.getElementById(idPrice);
        let cantidad = contadorCartas(priceSection,1);
        add.onclick = function(){comprar(user,itemDescripcion,cantidad)};
    }

}
//Obtiene todos los Item dentro del archivo JSON y les genera su carta de item
async function getItemsJSONAsyncCards(user){
    let itemsJson = JSON.stringify(await getJSONAsync());
    itemsJson = JSON.parse(itemsJson);
    itemsJson.forEach(item => setCardItem(user,item.price,item.description,item.pic));
}
//Setea el contador de articulos de la tabla con el contenido del carrito ademas de modificar los totales de la misma de acuerdo a las cantidades de articulos en el carrito
function contadorTabla(elemento,elemento2,elemento3,numeroInicial,precioBase,idItem){
    let idContador = "cont" + elemento.id;
    let idRestador = "rest" + elemento.id;
    let idSumador = "sum" + elemento.id;
    let div = document.createElement('div');
    let divCont = document.createElement('div');
    let btnResta = document.createElement('button');
    let btnSuma = document.createElement('button');
    let contador = document.createElement('h4');
    let numero = numeroInicial;
    
    btnResta.setAttribute('id',idRestador);
    btnSuma.setAttribute('id',idSumador);
    contador.setAttribute('id',idContador);

    btnSuma.onclick = () => {
        numero < 99 ? numero++ : null;
        contador.innerHTML = numero;
        let ope = numero * precioBase;
        elemento2.textContent = '$' + ope;
        const userStorage = getUserStorage("idCliente");
        userStorage.carritoCliente.forEach(item => {item.id == idItem ? item.price = ope : null});
        userStorage.carritoCliente.forEach(item => {item.id == idItem ? item.amount = numero : null});
        setCartStorage(userStorage.id, userStorage.carritoCliente);
        elemento3.innerHTML =`<div>TOTAL: $${precioTotalArticulos()}</div>`;
    };
    btnResta.onclick = () => {
        numero > 1 ? numero-- : null;
        contador.textContent = numero;
        let ope = numero * precioBase;
        elemento2.textContent = '$' + ope;
        const userStorage = getUserStorage("idCliente");
        userStorage.carritoCliente.forEach(item => {item.id == idItem ? item.price = ope : null});
        userStorage.carritoCliente.forEach(item => {item.id == idItem ? item.amount = numero : null});
        setCartStorage(userStorage.id, userStorage.carritoCliente);
        elemento3.innerHTML =`<div>TOTAL: $${precioTotalArticulos()}</div>`;
    };  
    contador.innerText = numero;
    btnResta.innerText = '-';
    btnSuma.innerText = '+';
    div.classList.add('mi-div-card-cant');
    divCont.classList.add('mi-div-cont');
    div.appendChild(btnResta);
    divCont.appendChild(contador);
    div.appendChild(divCont);
    div.appendChild(btnSuma);
    elemento.appendChild(div);

    return contador;
}
//Setea la cantidad de items a agregar. Se utiliza en las cartas con los articulos.
function contadorCartas(elemento,numeroInicial){
    let idContador = "cont" + elemento.id;
    let idRestador = "rest" + elemento.id;
    let idSumador = "sum" + elemento.id;
    let div = document.createElement('div');
    let divCont = document.createElement('div');
    let btnResta = document.createElement('button');
    let btnSuma = document.createElement('button');
    let contador = document.createElement('h4');
    let numero = numeroInicial;
    
    btnResta.setAttribute('id',idRestador);
    btnSuma.setAttribute('id',idSumador);
    contador.setAttribute('id',idContador);

    btnSuma.onclick = () => {
        numero < 99 ? numero++ : null;
        contador.textContent = numero;
    };
    btnResta.onclick = () => {
        numero > 1 ? numero-- : null;
        contador.textContent = numero;
    };  

    contador.innerText = numero;
    btnResta.innerText = '-';
    btnSuma.innerText = '+';
    div.classList.add('mi-div-card-cant');
    divCont.classList.add('mi-div-cont');
    div.appendChild(btnResta);
    divCont.appendChild(contador);
    div.appendChild(divCont);
    div.appendChild(btnSuma);
    elemento.appendChild(div);

    return contador;
}
//Calucula el costo total de los articulos en el carrito del cliente
function precioTotalArticulos(){
    let user = getUserStorage("idCliente");
    return user.totalCompra;
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

user1 = getUserStorage("idCliente");
getItemsJSONAsyncCards(user1); 

if (user1 != null){
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


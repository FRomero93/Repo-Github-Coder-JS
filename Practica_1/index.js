let nombre = prompt("Ingrese su Nombre");
let apellido = prompt("Ingrese su Apellido");
let edad = parseInt(prompt("Ingrese su Edad"));

console.log("generando id usuario...");
const idSucursal =  12;
console.log("sucursal asignada : " + idSucursal);
var usuario = nombre[0] + apellido[0] + edad + idSucursal;
console.log("id usuario generado...");
console.log("id usuario: " + usuario);

alert("Le damos la bienvenida ¡" + nombre + " " + apellido + "!");
alert("Su usuario es: " + usuario);

let direccion = prompt("Ingrese su direccion...");
console.log("direccion guardada");


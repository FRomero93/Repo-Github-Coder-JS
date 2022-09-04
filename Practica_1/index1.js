
const percJubilacion = 0.11;
const percObraSocial = 0.03;
const percINSSJP = 0.03; 
let sueldoBasico = 0;
let retencionGanancia = 0;
let sueldoNeto = 0;
let nameEmployee = "";

function loginName(){
    let nombre = prompt("Ingrese Nombre del empleado/a:");
    return nombre;
}

function calcularGanancias(sueldoIngresado){
    let retencion;

    if(sueldoIngresado > 1500000 ){
        retencion = sueldoIngresado * 0.35;
    }else if(sueldoIngresado > 500000){
        retencion = sueldoIngresado * 0.20;
    }else if(sueldoIngresado > 350000){
        retencion = sueldoIngresado * 0.15;
    }else if(sueldoIngresado > 280000){        
        retencion = sueldoIngresado * 0.09;
    }else{
        retencion = 0;
    }
    return retencion;
}
function calcularSueldo(){
    let retencionG;
    let retencionTotal;
    let sueldoIngresado = prompt("ingrese Sueldo Basico:");
    
    retencionG = calcularGanancias(sueldoIngresado);
    
    retencionTotal = (sueldoBasico * percJubilacion) + (sueldoBasico * percObraSocial) + (sueldoBasico * percINSSJP) + retencionGanancia;
    console.log("Retencion Total: " + retencionTotal);
    sueldoNeto = sueldoBasico - retencionTotal;
    console.log("Sueldo Neto: " + sueldoNeto);

    alert("Sueldo a cobrar: " + sueldoNeto);

    return sueldoNeto;
}

function imprimirRecibo(nombreEmpleado,sueldoBasico,retencionGanancia){

    console.log("\nRecibo de Sueldo de "+ nameEmployee + " " + lastNameEmployee);
    console.log("Sueldo Basico: $" + sueldoBasico);
    console.log("Jubilacion: 11.00% | Retencion: -$" + percJubilacion * sueldoBasico); 
    console.log("Obra Social: 3.00% | Retencion: -$" + percObraSocial * sueldoBasico);
    console.log("INSSJP: 3.00% | Retencion: -$" + percINSSJP * sueldoBasico);
    console.log("INSSJP: " + retencionGanancia +"% | Retencion: -$" + retencionGanancia);
    console.log("-------------------------------------------");
    console.log("Total a Cobrar: $" + sueldoNeto);
}

do {
    console.log("1)Ingresar datos del Empleado/a");
    console.log("2)Generar Recibo de Sueldo");

    console.log("4)imprimir Recibo de Sueldo");
    console.log("0)Salir"); 
    
    switch (opcion) {
        case 1:
            console.log("Inicia Registro Empleados");
            nameEmployee = loginName();
            break;
        case 2:
            if(nameEmployee == ""){
                alert("debe ingresar los datos del empleado primero")
            } else{           
                console.log("Inicia calculadora de sueldos");
                sueldoNeto = calcularSueldo();
            }
                break;  
        case 3: 
                break;
        case 4: 
                break;
        default:
            break;
    }
} while (opcion != 0);

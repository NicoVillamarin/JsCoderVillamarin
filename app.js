/* Ciclo for para poder hacer una cuenta regresiva sobre el ingreso a la pagina */
for (let i = 5; i >= 1; i--) {
    alert(`Ingresando a la pagina en ${i}`);
}

/* Variables globales */ 
//CARRITO VACIO

const carrito = [];
let nombre = prompt("Ingrese su nombre");
let apellido = prompt("Ingrese su apellido");

/* Esta funcion tiene la utilidad de saludar al cliente*/

function app (nombre, apellido){
            if(nombre == "" && apellido == ""){
                alert("Por favor ingrese su nombre y apellido")
            } else{
                alert(`Buenas ${nombre} ${apellido}. Espero que estes bien y te damos la bienvendia`);
                let dineroCliente = parseInt(prompt("Ingrese su monto para ver el vehic zulo que se puede comprar: $3000, $6000, $9000"));

                //Las funciones estan declaradas abajo

                ValorOmayorValor(dineroCliente);
                cuotasVehiculo(dineroCliente);
                Vehiculos(dineroCliente);
            }
}
app(nombre, apellido);


/* Esta funcion ayuda a si el cliente pone mayor o menor valor de 3000 o 9000 */
function ValorOmayorValor(dineroCliente) {
    if(dineroCliente < 3000){
        alert("Como el dinero es menor a $3000 no puede comprar ningun auto");
    } else if (dineroCliente > 9000){
        alert("Proximaente tendremos autos de alto valor, pero mientras por favor elije uno de los 3 montos anteriores");
    } 
}

/* Esta funcion sirve para poder calcular las cuotas que te pida el cliente */
function cuotasVehiculo (dineroCliente){
    if(dineroCliente == 3000 || dineroCliente == 6000 || dineroCliente == 9000){
        let cuotas = parseInt(prompt("Ingrese las cuotas que quieras sacar: 3 cuotas, 6 cuotas o 12 cuotas?"));
        
        switch (cuotas) {
            case 3:  
                alert("El valor de la cuota es : " + "$" + (dineroCliente / 3));
                break;
            case 6:
                alert("El valor de la cuota es : " + "$" + (dineroCliente / 6));
                break;
            case 12:
                alert("El valor de la cuota es : " + "$" + (dineroCliente / 12));
                break;
            default:
                break;
        }
    }
}


/*Esta funcion muestra las variedad de vehiculos que hay segun el precio que ponga el cliente */

function Vehiculos(dineroCliente) {
    switch (dineroCliente) {
        case 3000:
            alert(nombre + " " + "podes comprar un fiat 600 porque tu dinero es menor de $3000");
            break;
        case 6000:
            alert(nombre + " " + "Te podes comprar un fiat Uno porque tenes $6000");
            break;
        case 9000:
            alert(nombre + " " + "Te podes comprar um fiat Palio porque tenes $9000");
            break;
        default:
            alert(nombre + " " + "Por favor ingrese el dinero que tenga de las 3 opciones...");
            break;
    }
}

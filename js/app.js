/* Ciclo for para poder hacer una cuenta regresiva sobre el ingreso a la pagina */
/*for (let i = 5; i >= 1; i--) {
    alert(`Ingresando a la pagina en ${i}`);
}*/

/* Variables globales */ 

//CARRITO 
class Producto {
    constructor(id, marca, precio, descripcion, cantidad){
        this.id = id;
        this.marca = marca;
        this.precio = precio;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
    }
}
const producto1 = new Producto(1, "Tero Rengo", 6500, "Tero Rengo Malbec es la línea joven de la bodega donde se resaltan los aromas frutados y florales del varietal.", 5);
const producto2 = new Producto(2, "Fernet Branca", 3500, "Fernet Branca es un licor de origen italiano específicamente en la ciudad de Milán (1845), inventado por Bernardino Branca, elaborado en función de la fórmula secreta de las distintas generaciones de la familia Branca, donde combina 27 hierbas provenientes de los cinco continentes.", 5);
const producto3 = new Producto(3, "Santa Julia", 4500, "Es un vino suave y delicado, de color amarillo verdoso y aromas que recuerdan a durazno blanco, damasco, hierbas frescas y algunas notas cítricas como limón y pomelo.", 5);
const producto4 = new Producto(4, "Don juan", 10500, "Color rojo profundo, con trazos violetas. Intensos aromas de frutas rojas, con matices de pimienta, especias, violeta y ciruela seca, conjugados con notas de tabaco, chocolate y vainilla.",5);

const mercaderia = [producto1, producto2, producto3, producto4];

// LocalStorage 


const objJson = JSON.stringify(mercaderia);
console.log(objJson);

localStorage.setItem("Mercaderias", objJson);


// recuperacion LocalStorage

const RecMercaderia = JSON.parse(localStorage.getItem("Mercaderias"))


// Esta variable va a imprimir los nombres que estan dentro del objeto

/*let bebidasTotales = mercaderia.map(
    function(bebidas){
        return `${bebidas.marca} $${bebidas.precio}||`;
    }
    );
    alert(`Nuestros productos son: ${bebidasTotales}`);
*/

// esta variable demuestra la cantidad de autos disponible dentro de mi objetos

/*
let disponibilidadBebidas = mercaderia.filter(bebidas => bebidas.disponibilidad === true);
console.log(disponibilidadBebidas);

let nombre = prompt("Ingrese su nombre");
let apellido = prompt("Ingrese su apellido");
*/

/* Esta funcion tiene la utilidad de saludar al cliente*/
/*
function app (nombre, apellido){
            if(nombre == "" && apellido == ""){
                alert("Por favor ingrese su nombre y apellido")
            } else{
                alert(`Buenas ${nombre} ${apellido}. Espero que estes bien y te damos la bienvendia`);
                let dineroCliente = parseInt(prompt("Ingrese su monto para ver la bebida que le podemos ofrecer: $3000, $6000, $9000"));

                //Las funciones estan declaradas abajo

                ValorOmayorValor(dineroCliente);
                cuotasBebidas(dineroCliente);
                BebidasOpciones(dineroCliente);
            }
}
app(nombre, apellido);
*/

/* Esta funcion ayuda a si el cliente pone mayor o menor valor de 3000 o 9000 */
/*
function ValorOmayorValor(dineroCliente) {
    if(dineroCliente < 3000){
        alert("Como el dinero es menor a $3000 puede comprar un vino Estancia mendoza");
    } else if (dineroCliente > 9000){
        alert("Proximaente tendremos bebidas de alto valor, pero mientras por favor elije uno de los 3 montos anteriores");
    } 
}
*/

/* Esta funcion sirve para poder calcular las cuotas que te pida el cliente */
/*
function cuotasBebidas (dineroCliente){
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
*/

/*Esta funcion muestra las variedad de vehiculos que hay segun el precio que ponga el cliente */
/*
function BebidasOpciones(dineroCliente) {
    switch (dineroCliente) {
        case 3000:
            alert(nombre + " " + "podes comprar Vino Estancia Mendoza porque tu dinero es menor de $3000");
            break;
        case 6000:
            alert(nombre + " " + "Te podes comprar Fernet Branca y muchos mas porque tenes $6000");
            break;
        case 9000:
            alert(nombre + " " + "Te podes comprar el vino mas rico!, Tero rengo, y podes comprarte mas porque tenes $9000");
            break;
        default:
            alert(nombre + " " + "Por favor ingrese el dinero que tenga de las 3 opciones...");
            break;
    }
}
*/
//                            EVENTOS                   // 
const bloqueProductos = document.querySelector(".bloqueProductos");

mercaderia.forEach((producto)=>{
    const divproducto = document.createElement("div");
    divproducto.classList.add('card');
    divproducto.innerHTML = `
    <div class="cardBloque">
        <div class="card-body">
            <h3 class="card-title"> ${producto.marca} </h3>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text"> $${producto.precio} </p>
            <button id="boton${producto.id}" class="btn btn-warning"> Agregar al Carrito </button>
        </div>
    </div>
    `;
    bloqueProductos.appendChild(divproducto);

    const agregar =  document.getElementById(`boton${producto.id}`);
    agregar.addEventListener("click", ()=>{
        agregarAlCarrito(producto.id);
    });
});

const carrito = [];

const agregarAlCarrito = (id) => {
    const producto = mercaderia.find((producto) => producto.id === id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    } else{
        carrito.push(producto);
    }
    actualizarCarrito();
};

const contenedorCarrito = document.querySelector("#carrito");

function actualizarCarrito() {
    let aux = '';
    carrito.forEach((producto) => {
        aux += `
                <div class="cardList">
                    <div>
                        <h3 class="card-title"> ${producto.marca} </h3>
                        <p class="card-text"> $${producto.precio} </p>
                        <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-danger"> ✖</button>
                    </div>
                </div>
                `;
    });
    contenedorCarrito.innerHTML = aux;
    calcularTotalCompra();
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    carrito.splice(carrito.indexOf(producto), 1);
    actualizarCarrito();
};

const totalCompra = document.querySelector("#totalCompra");

const calcularTotalCompra = () => {
    let total = 0;
    carrito.forEach((producto) => {
        total ++;
    });
    totalCompra.innerHTML = total;
};

// evento tipo imput

const FormCorreo = document.querySelector("#correo");
const FormNombre = document.querySelector("#nombre");

FormNombre.addEventListener("input", function(){
    if(FormNombre.value === ""){
        
    }
})

FormCorreo.addEventListener("input", function(){
    if(FormCorreo.value === ""){

    }
})

let formulario = document.querySelector("#formulario");
let alerta = document.querySelector(".alerta");

const MostrarData = formulario.addEventListener("submit", function(e){
    e.preventDefault();
    alerta.innerHTML = `
    <div class="alert alert-warning" role="alert">
        ¡¡Muchas gracias ${FormNombre.value}!! Enseguida respoderemos a tus dudas a traves de tu mail en la cual es ${FormCorreo.value}
    </div>
    `
    ;
})
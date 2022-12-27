/* Ciclo for para poder hacer una cuenta regresiva sobre el ingreso a la pagina */
/*for (let i = 5; i >= 1; i--) {
    alert(`Ingresando a la pagina en ${i}`);
}*/

/* Variables globales */ 

//CARRITO 

const mercaderia = [
    {
        id: 1,
        marca: "Fernet Branca",
        precio: 2500,
        disponibilidad: true
    },
    {
        id: 2,
        marca: "Vino La trinidad",
        precio: 3500,
        disponibilidad: true
    },
    {
        id: 3,
        marca: "Vino Tero rengo",
        precio: 6000,
        disponibilidad: true
    },
    {
        id: 4,
        marca: "Vino Estancia mendoza",
        precio: 1500,
        disponibilidad: true
    }
];

// LocalStorage 

/*
const objJson = JSON.stringify(mercaderia);
console.log(objJson);

localStorage.setItem("Mercaderias", objJson);
*/

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

const cards = document.querySelectorAll(".card");
cards.forEach((card)=> {
    card.addEventListener("click", (e)=>{
        alert("Producto agregado")
        leerDatosProducto(e.target.parentElement);
        e.preventDefault();
    })
});

let articulosCarritos = [];

function leerDatosProducto(producto){
    const infoProducto = {
        id: producto.querySelector(".idCard").textContent,
        titulo: producto.querySelector(".card-title").textContent,
        texto: producto.querySelector(".card-text").textContent
    };

    articulosCarritos =[...articulosCarritos, infoProducto];
    carrotoHTML();
}

const carritoAgregar = document.querySelector("#carrito");

function carrotoHTML(){
    limpiarHTML();
    articulosCarritos.forEach((producto)=>{
        const row = document.createElement("p");
        row.innerHTML = `
        <span>${producto.id}</span>
        <h5>${producto.titulo}</h5>
        <p>${producto.texto}</p>
        <button class="btn btn-danger borrar" id=${producto.id}>Eliminar</button>
        `;
        carritoAgregar.appendChild(row);
        Eliminar(producto);
    })
};

function limpiarHTML(){
    carritoAgregar.innerHTML = "";
};

// boton eliminar
function Eliminar(producto) {
    const eliminarCarrito = document.querySelector(".btn-danger");

    if(eliminarCarrito){
        eliminarCarrito.addEventListener("click", (e)=>{
            console.log(e.target.id)
            producto.splice(1, 0);
        });
    };
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
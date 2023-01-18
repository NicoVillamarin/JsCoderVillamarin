/* Ciclo for para poder hacer una cuenta regresiva sobre el ingreso a la pagina */
/*for (let i = 5; i >= 1; i--) {
    alert(`Ingresando a la pagina en ${i}`);
}*/

/* Variables globales */ 

//Mercaderia 
/* 

                ¡Dejo el constructor, porque me parecio muy interesante para seguir practicando!

class Producto {
    constructor(img, id, marca, precio, descripcion, cantidad){
        this.img = img;
        this.id = id;
        this.marca = marca;
        this.precio = precio;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
    }
}
const producto1 = new Producto(1 ,1, "Tero Rengo", 6500, "Tero Rengo Malbec es la línea joven de la bodega donde se resaltan los aromas frutados y florales del varietal.", 50);
const producto2 = new Producto(2, 2, "Fernet Branca", 3500, "Fernet Branca es un licor de origen italiano específicamente en la ciudad de Milán (1845)", 12);
const producto3 = new Producto(3, 3, "Santa Julia", 4500, "Es un vino suave y delicado, de color amarillo verdoso y aromas que recuerdan a durazno blanco.", 4);
const producto4 = new Producto(4, 4, "Don juan", 10500, "Color rojo profundo, con trazos violetas. Intensos aromas de frutas rojas.",5);
const producto5 = new Producto(5, 5, "Amalaya", 1050, "Las uvas provienen de los Valles Calchaquíes de viñedos plantados a 1800 metros de altura del mar.", 3);
const producto6 = new Producto(6, 6, "Otro loco mas", 1259, "Otro Loco Más es un malbec frutado, de cuerpo agradable, con una interesante presencia de madera.", 20);
const producto7 = new Producto(7, 7, "Cordero con piel de lobo", 999, "Es un Malbec joven muy bien elaborado, diferente por su aroma y sabor a frutos maduros. ", 49);
const producto8 = new Producto(8, 8, "Sinister hand", 10500, "La Sinister Hand 2019 muestra características especiadas, oscuras y sabrosas.", 2)
*/

fetch("./data.json")
.then(resp => resp.json())
.then(DataMercaderia =>{
    const mercaderia = DataMercaderia;

        // LocalStorage 
    
    
    const objJson = JSON.stringify(mercaderia);
    
    localStorage.setItem("Mercaderias", objJson);
    
    
    // recuperacion LocalStorage
    
    const RecMercaderia = JSON.parse(localStorage.getItem("Mercaderias"))
    
    //                            EVENTOS                   // 
    
    // evento input //

    let divBusqueda = document.querySelector('.bloqueProductos');
    
    const buscador = () => {
        let inputTexto = document.getElementById('inputSearch');
        inputTexto.addEventListener('change', () => {
            
            let buscador = inputTexto.value;
            let mercaderiaFiltrada = mercaderia.filter((merc) => 
                merc.marca.includes(buscador.toUpperCase())
            );
            divBusqueda.innerHTML = '';
            mercaderiaFiltrada.forEach((merc) => {
                const divBuscCard = document.createElement('div');
                divBuscCard.classList.add('card');
                

                let {img, id, marca, precio, descripcion} = merc;
                
                const contenidoBusq = `
                <div class="cardBloque">
                    <div class="card-body">
                        <img src="img/productos/${id}.jpg" class="card-img-top img-fluid py-3">
                        <h3 class="card-title"> ${marca} </h3>
                        <p class="card-text">${descripcion}</p>
                        <p class="card-text"> $${precio} </p>
                        <button id="boton${id}" class="btn btn-warning"> Agregar al Carrito </button>
                    </div>
                </div>
                `;
                divBuscCard.innerHTML = contenidoBusq;
                divBusqueda.append(divBuscCard);
                const agregar =  document.getElementById(`boton${id}`);
                agregar.addEventListener("click", ()=>{
                    agregarAlCarrito(id);
                    Toastify({
                        text: "Fue agregado al carrito",
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "center", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            fontWeight:"bolder",
                            background: "#00FF2A",
                            color: "black",
                            borderRadius: "10px",
                        },
                        onClick: function(){} // Callback after click
                    }).showToast();
                });
            });
        });
    };     
    buscador();
    // evento cards y carrito //
    const bloqueProductos = document.querySelector(".bloqueProductos");

    
    mercaderia.forEach((producto)=>{      
        const divproducto =  document.createElement("div");
        divproducto.classList.add('card');
        divproducto.innerHTML = `
        <div class="cardBloque">
            <div class="card-body">
                <img src="img/productos/${producto.id}.jpg" class="card-img-top img-fluid py-3">
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
            Toastify({
                text: "Fue agregado al carrito",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    fontWeight:"bolder",
                    background: "#00FF2A",
                    color: "black",
                    borderRadius: "10px",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        });
    });
    
    const carrito = [];
    
    const agregarAlCarrito = (id) => {
        const producto = mercaderia.find((producto) => producto.id === id);
        const productoEnCarrito = carrito.find((producto) => producto.id === id);
        if(productoEnCarrito){
            productoEnCarrito.cantidad ++;
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
                            <p class="card-text">Precio: <strong>$${producto.precio}</strong> </p>
                            <p class="card-text">Cantidad seleccionada: <strong>${producto.cantidad}</strong></p>
                            <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-danger"> ✖</button>
                        </div>
                    </div>
                    `;
        });
        contenedorCarrito.innerHTML = aux;
        calcularTotalCompra();
        sumarCompra();
        
    };
    
    eliminarDelCarrito = (id) => {
        const producto = carrito.find((producto) => producto.id === id);
        carrito.splice(carrito.indexOf(producto), 1);
        Toastify({
            text: "Item eliminado",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                fontWeight:"bolder",
                background: "#C41919",
                color: "black",
                borderRadius: "10px",
            },
            onClick: function(){} // Callback after click
        }).showToast();
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
    
    const SelecComprar = document.querySelector("#comprar");
    const comprarBoton = document.createElement("div");
        comprarBoton.innerHTML = `
        <button class="btn btn-warning">Comprar YA</button>
        `;
        SelecComprar.appendChild(comprarBoton);
    comprarBoton.addEventListener("click", ()=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Quiere realizar la compra?',
            text: "Es una pregunta para su tranquilidad!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Quiero comprar!',
            cancelButtonText: 'No, no quiero comprar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'Gracias por su compra',
                '¡Su compra fue confirmada!',
                'success'
            )
            } else if (
              /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Su compra fue cancelada. Espero que nos vuelva a elegir 🎉',
                'error'
            )
            }
        });
        carrito.splice(0, carrito.length);
        actualizarCarrito();
    });
    
    const ValorTotalCompra = document.querySelector("#ValorTotal");
    
    const sumarCompra = () => {
        let ValorTotal = 0;
        carrito.forEach((producto) =>{
            ValorTotal += producto.precio * producto.cantidad;
        });
        ValorTotalCompra.innerHTML = ValorTotal;
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
});


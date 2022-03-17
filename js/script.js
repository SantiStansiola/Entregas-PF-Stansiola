document.addEventListener('DOMContentLoaded', () => {

    // Variables
    let baseDeDatos = [];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.getElementById('items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    const listaDeProductos = [
        {
            id:1,
            imagen:"../imagenes/rolls.jgp.jpg",
            nombre: "Philadelphia",
            precio: 140,
            categorias: "Rolls",
            stock: 42
        },
        {
            id:2,
            imagen:"../imagenes/rolls.jgp.jpg",
            nombre: "New York",
            precio: 140,
            categorias: "Rolls",
            stock: 42
        },
        {
            id:3,
            imagen:"../imagenes/rolls.jgp.jpg",
            nombre: "Sashimi de Salmon",
            precio: 120,
            categorias: "Piezas",
            stock: 25
        },
        {
            id:4,
            imagen:"../imagenes/rolls.jgp.jpg",
            nombre: "Sashimi de Atun",
            precio: 150,
            categorias: "Piezas",
            stock: 25
        },
        {
            id:5,
            imagen:"../imagenes/rolls.jgp.jpg",
            nombre: "Niguiri de Salmon",
            precio: 100,
            categorias: "Piezas",
            stock: 30
        },
        {
            id:6,
            imagen:"../imagenes/rolls.jgp.jpg",
            nombre: "Niguiri de Atun",
            precio: 100,
            categorias: "Piezas",
            stock: 30
        },
        {
            id:7,
            nombre: "Wok de Camarones",
            precio: 750,
            categorias: "Platos",
            stock: 5
        },
        {
            id:8,
            nombre: "Wok Vegetariano",
            precio: 750,
            categorias: "Platos",
            stock: 3
        },
        {
            id:9,
            nombre: "Ceviche",
            precio: 600,
            categorias: "Entradas",
            stock: 5
        },
        {
            id:10,
            nombre: "Ceviche Especial",
            precio: 700,
            categorias: "Entradas",
            stock: 5
        },
        {
            id:11,
            nombre: "Salmon Teriyaki",
            precio: 900,
            categorias: "Platos",
            stock: 3
        },
    ]

    function Producto (nombreValor, stockValor, precioValor, categoriaValor, imagenValor){
        this.nombre = nombreValor;
        this.stock = stockValor;
        this.precio = precioValor;
        this.categoria = categoriaValor;
        this.img = imagenValor
        this.venta = function(cantidadComprada){
            this.stock -= cantidadComprada
            console.log("El stock remanente es de :" + this.stock + " " + this.nombre);
        }
    }

    const ProductoA = new Producto("Philadelphia", 42, 140, "Rolls", "../imagenes/rolls.jgp.jpg")
    const ProductoB = new Producto("New York", 42, 140, "Rolls", "../imagenes/rolls.jgp.jpg")
    const ProductoC = new Producto("Sashimi de Salmon", 25, 120, "Piezas", "../imagenes/sashimis.jpg") 
    const ProductoD = new Producto("Sashimi de Atun", 25, 150, "Piezas", "../imagenes/sashimis.jpg")
    const ProductoE = new Producto("Niguiri de Salmon", 30, 100, "Piezas", "../imagenes/niguiris.jpg")
    const ProductoF = new Producto("Niguiri de Atun", 30, 100, "Piezas", "../imagenes/niguiris.jpg")
    const ProductoG = new Producto("Wok de Camarones", 5, 750, "Platos", "../imagenes/woks.jpg")
    const ProductoH = new Producto("Wok de Camarones", 3, 700, "Platos", "../imagenes/woks.jpg")
    const ProductoI = new Producto("Ceviche", 5, 600, "Entradas", "../imagenes/ceviche.jpg")
    const ProductoJ = new Producto("Ceviche Especial", 5, 700, "Entradas", "../imagenes/ceviche.jpg")
    const ProductoK = new Producto("Salmon Teriyaki", 3, 900,"Platos", "../imagenes/platos.jpg")


    function renderizarProductos() {
        listaDeProductos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title', 'text-center');
            miNodoTitle.textContent = info.nombre;
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}$`;
            //Stock
            const miNodoStock = document.createElement('p');
            miNodoStock.classList.add('card-text',);
            miNodoStock.textContent = `${info.stock} unidades`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary','bg-dark');
            miNodoBoton.textContent = 'Añadir al carrito';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoStock);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(e) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(e.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        console.log(carrito)
        const carritoSinDuplicados = [...new Set(carrito)];
        //console.log(carritoSinDuplicados)
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = listaDeProductos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(e) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = e.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        [1,1,1,3,4]
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = listaDeProductos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});

/*


const listaProductos = [ProductoA, ProductoB, ProductoC, ProductoD, ProductoE, ProductoF]

let piezas = document.querySelector('.categoria1')
let platos = document.querySelector('.categoria2')

piezas.addEventListener('click', function(){venderProductos("Piezas")})
platos.addEventListener('click', function(){venderProductos("Plastico")})

function venderProductos (categoria){
}

const listaSegunCategoria = listaProductos.filter(x => x.categoria == categoria)

    let catalogo = document.querySelector('.catalogo')

    catalogo.innerHTML = ''

    

/*

for(const producto of listaProductos){
    contador ++
    listadoProductosMenu += "\n" + contador + "- " + producto.nombre + ": $" + producto.precio + " " + "u"
}


function listarProductos(){
    alert(listadoProductosMenu)
}

function saludar(saludo){
    alert(saludo + "nuestra pagina!")
    }

alert("¡Bienvenidos a nuestra página!")

function menu(){
    let opcion = prompt("Menu: \n1 - Ver productos : \nESC- Salir")
    switch(opcion){
    case "1":
            listarProductos();
            let categorias = prompt("\n1 - Productos a partir de $499:  \n2 - Productos a partir de $99: ")
            if(categorias ==1){
                const filtroMasBaratos = listaProductos.filter((el) => el.precio.includes)
                for(productos of listaProductos){
                    alert(productos.nombre + productos.precio)
                }
                comprarProductos();
            }
            else if(categorias ==2){
                const filtroMasCaros = listaProductos.filter((el) => el.precio.includes)
                for(productos of listaProductos){
                    alert(productos.nombre + productos.precio)
                }
                comprarProductos();
            }
            else{
                alert("No encontramos el producto que queria.")
            }
            break;
    case "ESC":
            saludar("Gracias por visitar" + " ")
            break;
        
    default:
            alert("Opcion Incorrecta")
            menu()
            break;
    }
}

    let cantidadComprada;
    let precioTotalVenta = 0;
    
    function stockInsuficiente(stock) {
    alert("No tenemos stock suficiente de ese producto, puede comprar hasta " + stock + " unidades")
    }
    
    function stockSuficiente(stock, nombre) {
    stock -= cantidadComprada;
    console.log("El stock remanente es de: "+ stock + nombre);
    } 
    
    function calcularPrecio(precio){
        precioTotalVenta += cantidadComprada * precio;
        }
        
    function compra(stock, precio, producto) {
        
        cantidadComprada = parseInt(prompt("Ingrese la cantidad que quiere comprar:"));
        if(cantidadComprada <= stock) {
        //stockSuficiente(stock, nombre);
        //console.log(producto)
        producto.venta(cantidadComprada)
            if(cantidadComprada > 1){
            calcularPrecio(precio)
            }
            else{
                (cantidadComprada === 0)
                alert("Por favor ingrese la cantidad del producto que quiere comprar")
            }
        }
            else {
                stockInsuficiente(stock)
                }   
        }
        
    function comprarProductos(){
        let cantidadProductosComprados = parseInt(prompt("Ingrese la cantidad de productos distintos que quiere comprar"))
        
        for (let i = 0; i < cantidadProductosComprados; i++) {
        let nombreCompra = prompt("Ingrese el nombre del producto que quiere comprar:")
        
        if (nombreCompra == rolls.nombre) {
            compra(rolls.stock, rolls.precio, rolls)
            alert("Usted compro " + cantidadComprada + " unidades del siguiente producto: "+ rolls.nombre)
        }
        else if (nombreCompra == niguiris.nombre) {
            compra(niguiris.stock, niguiris.precio, niguiris)
            alert("Usted compro" + " " + cantidadComprada + " unidades del siguiente producto: "+ niguiris.nombre)
        }
        else if (nombreCompra == woks.nombre) {
            compra(woks.stock, woks.precio, woks)
            alert("Usted compro" + " " + cantidadComprada + " unidades del siguiente producto: "+ woks.nombre)
        }
        else if (nombreCompra == sashimis.nombre) {
            compra(sashimis.stock, sashimis.precio, sashimis)
            alert("Usted compro " + " " + cantidadComprada + " unidades del siguiente producto: "+ sashimis.nombre)
        }
        else if (nombreCompra == ceviches.nombre) {
            compra(ceviches.stock, ceviches.precio, ceviches)
            alert("Usted compro " + " " + cantidadComprada + " unidades del siguiente producto: "+ ceviches.nombre)
        }
        else if (nombreCompra == platos.nombre) {
            compra(platos.stock, platos.precio, platos)
            alert("Usted compro " + " " + cantidadComprada + " unidades del siguiente producto: "+ platos.nombre)
        }
        else {
        alert('No tenemos ese producto')
        }
        
        }
        alert("El precio de su compra es de: $" + precioTotalVenta);
    }
    menu()
*/
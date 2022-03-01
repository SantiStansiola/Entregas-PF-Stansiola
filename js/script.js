function Producto (nombreValor, stockValor, precioValor){
    this.nombre = nombreValor;
    this.stock = stockValor;
    this.precio = precioValor;
    this.venta = function(cantidadComprada){
        this.stock -= cantidadComprada
        console.log("El stock remanente es de :" + this.stock + " " + this.nombre);
    }
}


const rolls = new Producto("Rolls", 42, 150)
const niguiris = new Producto("Niguiris", 36, 100)
const woks = new Producto("Woks", 4, 600) 
const sashimis = new Producto("Sashimis", 32, 100)
const ceviches = new Producto("Ceviches", 6, 500)
const platos = new Producto("Platos", 4, 800)

const listaProductos = [rolls, niguiris, woks, sashimis, ceviches, platos]

let contador = 0
let listadoProductosMenu = "Estos son nuestros productos: "

for(const producto of listaProductos){
    contador ++
    listadoProductosMenu += "\n" + contador + "- " + producto.nombre + ": $" + producto.precio + " " + "u"
}

const filtroMasCaros = listaProductos.filter((el) => el.precio > 499)
const filtroMasBaratos = listaProductos.filter ((el) => el.precio < 151)


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
import "../styles/Carrito.css"

function CarritoCard({producto, funcionDisparadora}){
    
    function borrarDelCarrito() {
        console.log("Paso 1")
        funcionDisparadora(producto.id)
    }

    return(
        <div className="carrito-card" >
            <img className="carrito-image" src={producto.imagen} alt={producto.name} />
            <div className="carrito-producto">{producto.name}</div>
            <div className="descripcion-carrito">{producto.description}</div>
            <div>{producto.cantidad}</div>
            <div>{producto.price} $</div>
            <div>{(producto.price * producto.cantidad).toFixed(2)} $</div>
            <button
                className="boton-carrito"
                onClick={() => funcionDisparadora(producto.id)}
                title="Eliminar del carrito"
            >
                🗑️
            </button>
        </div>
    )
}

export default CarritoCard
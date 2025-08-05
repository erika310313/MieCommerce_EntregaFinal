import "../styles/Productos.css"
import { Link, useNavigate } from "react-router-dom";

function Card({producto, functionCarrito, usuarioLogeado, adminLogeado}) {
    const navigate = useNavigate();

    const handleAgregar = () => {
        if (usuarioLogeado || adminLogeado) {
            functionCarrito({ ...producto, cantidad: 1 });
        } else {
            navigate("/login");
        }
    };

    return(
        <div className="card" >
            <h3 className="card-title">{producto.name}</h3>
            <Link to={`/comidas/${producto.id}`}>
                <img className="card-imagen" 
                src={producto.imagen} 
                alt={producto.name}
                />
            </Link>
            <p className="card-price">{producto.price} $</p>
            <div style={{display: "flex", gap: "8px", justifyContent: "center"}}>
                <Link to={`/comidas/${producto.id}`}>
                    <button className="card-btn" type="button">
                        ver detalles
                    </button>
                </Link>
                <button
                    className="card-btn"
                    type="button"
                    onClick={handleAgregar}
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    )
}

export default Card;
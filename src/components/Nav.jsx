import { Link } from "react-router-dom";

function Nav({ productosCarrito, usuarioLogeado, adminLogeado, cerrarSesion }) {
    console.log("Nav.jsx productosCarrito:", productosCarrito);
    console.log("Nav.jsx adminLogeado:", adminLogeado);

    const sesionIniciada = usuarioLogeado || adminLogeado;

    return (
        <nav>
            <ul className="nav-main-ul">
                <li>
                    <Link to="/" className="logo-container">
                        <img
                            src="/img/Logo Sabores Venearg (1).png"
                            alt="Logo de Sabores Venearg sobre fondo claro, transmite sensación acogedora"
                            className="nav-logo"
                        />
                    </Link>
                    {adminLogeado && (
                        <span className="nav-admin-title">
                            ADMIN
                        </span>
                    )}
                </li>
                <li>
                    <ul className="nav-links">
                        <li><Link to="/" className="nav-link">Inicio</Link></li>
                        <li><Link to="/comidas" className="nav-link">Comidas</Link></li>
                        <li><Link to="/postres" className="nav-link">Postres</Link></li>
                        <li><a href="/nosotros" className="nav-link">Nosotros</a></li>
                        <li><Link to="/contacto" className="nav-link">Contáctanos</Link></li>
                        {!sesionIniciada && (
                            <>
                                <li><Link to="/login" className="nav-link">Iniciar Sesión</Link></li>
                                <li><Link to="/registro" className="nav-link">Registrarse</Link></li>
                            </>
                        )}
                        {sesionIniciada && (
                            <li>
                                <button className="nav-link btn-cerrar-sesion" onClick={cerrarSesion}>
                                    Cerrar sesión
                                </button>
                            </li>
                        )}
                    </ul>
                    <ul className="nav-carrito">
                        <li>
                            <Link to="/carrito" className="nav-link">
                                🛒
                                <span className="color-cantidad"> 
                                    {productosCarrito.length > 0 ? productosCarrito.length : 0}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}


export default Nav; 
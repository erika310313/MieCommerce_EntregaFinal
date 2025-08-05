import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { useCarrito } from '../contexts/CarritoContext';
import { useAuth } from '../contexts/AuthContext'


function Header() { // Las props de autenticación ya no se reciben aquí
  const { productosCarrito } = useCarrito();
  const { usuarioLogeado, adminLogeado, cerrarSesion } = useAuth(); // <-- Consumir del contexto
  const totalItems = productosCarrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img 
            src="../../public\img\Logo Sabores Venearg (1).png" 
            alt="SaboresVenearg Logo" 
            className="logo-header" 
          />
        </Link>
        <ul className="nav-links">
          <li><Link to="/comidas">Comidas</Link></li>
          <li><Link to="/postres">Postres</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          {(usuarioLogeado || adminLogeado) && (
            <li>
              <Link to="/carrito" className="cart-icon-link">
                <i className="fa-solid fa-cart-shopping"></i>
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </Link>
            </li>
          )}
          {usuarioLogeado || adminLogeado ? (
            <li><button onClick={cerrarSesion} className="btn-header">Cerrar Sesión</button></li>
          ) : (
            <li><Link to="/login" className="btn-header">Iniciar Sesión</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Footer.css';

function Footer() {  
    return (  
        <footer className="footer">
            <div className="footerContainer">
                {/* INFORMACIÓN PRINCIPAL */}
                <div className="footerSection">
                    <h4><strong>Sabores Venearg</strong></h4>
                    <div className="social">
                        <ul className="socialIcons" style={{ display: "flex", gap: "10px", justifyContent: "center", padding: 0, listStyle: "none" }}>
                            <li>
                                <a href="https://www.facebook.com/Sabores.venearg" target="_blank" rel="noopener noreferrer">
                                    <img src="\img\facebook-removebg-preview.png" alt="facebook" width="50" height="50" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/sabores.venearg" target="_blank" rel="noopener noreferrer">
                                    <img src="\img\instagram-removebg-preview.png" alt="instagram" width="50" height="50" />
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/message/YZ36JFB4G6PKJ1" target="_blank" rel="noopener noreferrer">
                                    <img src="\img\Whatsapp-removebg-preview.png" alt="whatsapp" width="50" height="50" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <p>&copy; 2025 Erika Oropeza</p>
                </div>

                {/* UBICACIÓN */}
                <div className="footerSection">
                    <h4><strong>Estamos en:</strong></h4>
                    <p><strong>Don Bosco 3700, Almagro<br />Ciudad Autónoma de Bs.As. - Argentina</strong></p>
                </div>

                {/* ENLACES */}
                <div className="footerSection">
                    <h4><strong>Nosotros</strong></h4>
                    <ul className="footerLinks" style={{ padding: 0, listStyle: "none" }}>
                        <li><Link to="/comidas"><strong>Comidas</strong></Link></li>
                        <li><Link to="/postres"><strong>Postres</strong></Link></li>
                        <li><Link to="/carrito"><strong>Pedidos</strong></Link></li>
                        <li><Link to="/contacto"><strong>Contáctanos</strong></Link></li>
                        <li><Link to="/nosotros"><strong>Nosotros</strong></Link></li>
                    </ul>
                </div>
            </div>
        </footer>  
    );  
}  

export default Footer;
import React from 'react';
import '../styles/Contactanos.css';

function Contactanos() {
  return (
    <>
    <h2 className="login-title">Contáctanos</h2>
    <section id="contacto" className="contacto">
      <div>
        <div className="consulta">
          <h3>Solicita un presupuesto / Consulta por disponibilidad o stock.</h3>
        </div>
      </div>
      <div className="grid">
        <div className="contacto-grid">
          <form id="contact-form" className="contact-form" role="form" action="#" method="post">
            <div>
              <input type="text" className="form-control" placeholder="Tu Nombre" id="cf-name" name="tunombre" required />
            </div>
            <div>
              <input type="text" className="form-control" placeholder="Tu Apellido" id="cf-apellido" name="tuapellido" required />
            </div>
            <div>
              <input type="email" className="form-control" placeholder="Tu Email" id="cf-email" name="tuemail" required />
            </div>
            <div>
              <input type="number" className="form-control" placeholder="Tu Número" id="cf-movil" name="tumovil" required />
            </div>
            <div>
              <textarea className="form-control" rows="6" placeholder="Consulta:" id="cf-mensaje" name="mensaje" cols="30" required></textarea>
            </div>
            <button type="submit" className="contact-btn">Enviar</button>
          </form>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7809.545157189711!2d-58.420825093237994!3d-34.61656874283827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca5f3689e6ff%3A0x9d1129657ccda48e!2sDon%20Bosco%203792%2C%20C1206ABH%20CABA!5e0!3m2!1ses-419!2sar!4v1628209167614!5m2!1ses-419!2sar"
              width="100%" height="100%" frameBorder="0" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Contactanos;
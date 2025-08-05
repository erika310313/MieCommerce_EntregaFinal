import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { useAuth } from '../contexts/AuthContext'

function Login() { // Las props se eliminan
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { manejarUser, manejarAdmin } = useAuth(); // <-- Consumir del contexto

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.username === 'admin' && formData.password === 'admin') {
      manejarAdmin();
    } else {
      manejarUser();
    }
  };

  return (
    <section className="login-section">
      <div className="titulos">
        <img src="../../public\img\Logo Sabores Venearg (1).png" alt="Logo" />
        <h2>Inicia Sesión</h2>
      </div>
      <div className="formulario-login">
        <form onSubmit={handleLogin} id="form-login">
          <div className="campo">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="botones-login">
            <button type="submit" className="btn">Entrar</button>
            <button type="button" className="btn">Entrar con Google</button>
          </div>
        </form>
        <div className="registro-link">
          <p>¿Aún no tienes cuenta?</p>
          <Link to="/registro">Registrarme</Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
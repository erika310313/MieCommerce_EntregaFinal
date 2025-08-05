import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Registro.css';

function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    usuario: '',
    email: '',
    password: '',
    confirmarPassword: ''
  });
  const [avisoPassword, setAvisoPassword] = useState('------------------');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (
      (e.target.name === 'password' || e.target.name === 'confirmarPassword')
    ) {
      if (
        e.target.value.length > 0 &&
        form.password !== '' &&
        (e.target.name === 'confirmarPassword'
          ? e.target.value !== form.password
          : form.confirmarPassword !== e.target.value)
      ) {
        setAvisoPassword('Las contraseñas no coinciden');
      } else if (
        form.password !== '' &&
        (e.target.name === 'confirmarPassword'
          ? e.target.value === form.password
          : form.confirmarPassword === e.target.value)
      ) {
        setAvisoPassword('¡Las contraseñas coinciden!');
      } else {
        setAvisoPassword('------------------');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmarPassword) {
      setAvisoPassword('Las contraseñas no coinciden');
      return;
    }
    // Aquí iría la lógica de registro (API, etc)
    alert('¡Registro exitoso!');
    navigate('/login');
  };

  const handleReset = () => {
    setForm({
      nombre: '',
      apellido: '',
      documento: '',
      usuario: '',
      email: '',
      password: '',
      confirmarPassword: ''
    });
    setAvisoPassword('------------------');
  };

  return (
    <>
    <h2>Registrarse</h2>
    <section id="registro" className="registro-section">
      <div className="titulos">
        <img
          src="/img/Logo Sabores Venearg (1).png"
          alt="Logo Sabores Venearg"
          width="200"
          height="200"
        />
        
      </div>

      <div className="formulario-registro">
        <form id="form-registro" onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingresa tu nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              placeholder="Ingresa tu apellido"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="documento">Documento</label>
            <input
              type="text"
              id="documento"
              name="documento"
              placeholder="Ingresa tu documento"
              value={form.documento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Crea un usuario"
              value={form.usuario}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu correo"
              value={form.email}
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
              placeholder="Crea una contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label htmlFor="confirmarPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              placeholder="Confirma tu contraseña"
              value={form.confirmarPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="campo">
            <label className="avisoPassword" id="avisoPassword">{avisoPassword}</label>
          </div>
          <div className="botones-registro">
            <button type="submit" className="btn" id="btnRegistrarse">Registrarse</button>
            <button type="button" className="btn" id="btnBorrarDatos" onClick={handleReset}>Borrar Datos</button>
          </div>
        </form>
      </div>

      <div className="login-link">
        <p>
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </section>
    </>
  );
}

export default Registro;
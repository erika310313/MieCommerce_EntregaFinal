import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './layouts/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Productos from './layouts/Productos'
import ProductoDetalle from './layouts/ProductoDetalle'
import Nosotros from './components/Nosotros'
import Contactanos from './components/Contactanos'
import Login from './components/Login'
import Carrito from './layouts/Carrito'
import Registro from './components/Registro'
import { CarritoProvider } from './contexts/CarritoContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'

const PrivateRoute = ({ children, roles = ['usuario', 'admin'] }) => {
  const { usuarioLogeado, adminLogeado } = useAuth();

  if (roles.includes('admin') && adminLogeado) {
    return children;
  }
  if (roles.includes('usuario') && usuarioLogeado) {
    return children;
  }
  // Si no está autorizado, redirige al login
  return <Navigate to="/login" replace />;
};

function App() {
  const endpoint = "https://68100d8b27f2fdac24101ef5.mockapi.io/productos";
  
  return (
    <>
      <Router>
        <AuthProvider>
          <CarritoProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/comidas"
                element={<Productos titulo="Comidas" categoria="comidas" endpoint={endpoint} />}
              />
              <Route path="/comidas/:id" element={<ProductoDetalle />} />
              <Route
                path="/postres"
                element={<Productos titulo="Postres" categoria="postres" endpoint={endpoint} />}
              />
              <Route path="/postres/:id" element={<ProductoDetalle />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contactanos />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />

              {/* Rutas protegidas */}
              <Route path="/carrito" element={<PrivateRoute><Carrito /></PrivateRoute>} />
              <Route path="/perfil" element={<PrivateRoute roles={['usuario']}><p>Página de Perfil de Usuario</p></PrivateRoute>} />
              <Route path="/admin" element={<PrivateRoute roles={['admin']}><p>Panel de Administración</p></PrivateRoute>} />
            </Routes>
            <Footer />
          </CarritoProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;

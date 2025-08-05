import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  const [adminLogeado, setAdminLogeado] = useState(false);
  const navigate = useNavigate();

  const manejarUser = () => {
    setUsuarioLogeado(true);
    setAdminLogeado(false); 
    navigate('/perfil'); 
  };

  const manejarAdmin = () => {
    setAdminLogeado(true);
    setUsuarioLogeado(false);
    navigate('/admin'); 
  };

  const cerrarSesion = () => {
    setUsuarioLogeado(false);
    setAdminLogeado(false);
    navigate('/'); 
  };

  const contextValue = {
    usuarioLogeado,
    adminLogeado,
    manejarUser,
    manejarAdmin,
    cerrarSesion,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
import React, { createContext, useState, useContext, useEffect } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [productosCarrito, setProductosCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('productosCarrito');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      console.error("Error al cargar el carrito de localStorage:", error);
      return []; 
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error);
    }
  }, [productosCarrito]);

  const agregarAlCarrito = (producto) => {
    const cantidadAgregar = producto.cantidad ? producto.cantidad : 1;
    const idProducto = String(producto.id);

    setProductosCarrito((currentCart) => {
      const existe = currentCart.find(p => String(p.id) === idProducto);

      if (existe) {
        return currentCart.map((p) => {
          if (String(p.id) === idProducto) {
            return { ...p, cantidad: p.cantidad + cantidadAgregar };
          }
          return p;
        });
      } else {
        return [...currentCart, { ...producto, cantidad: cantidadAgregar }];
      }
    });
  };

  const vaciarCarrito = () => {
    setProductosCarrito([]);
  };

  const borrarProductoCarrito = (id) => {
    setProductosCarrito((currentCart) => currentCart.filter((p) => String(p.id) !== String(id)));
  };

  const contextValue = {
    productosCarrito,
    agregarAlCarrito,
    vaciarCarrito,
    borrarProductoCarrito,
  };

  return (
    <CarritoContext.Provider value={contextValue}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};
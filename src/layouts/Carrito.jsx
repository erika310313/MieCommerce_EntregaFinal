import React from 'react';
import "../styles/Carrito.css"
import { useCarrito } from '../contexts/CarritoContext';

function Carrito() {
  const { productosCarrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();

  const total = productosCarrito.reduce(
    (acc, item) => acc + (item.precio || 0) * (item.cantidad || 0),
    0
  );

  return (
    <section className="carrito-container">
      <h2>Tu Carrito</h2>
      {productosCarrito.length === 0 ? (
        <p className="carrito-vacio">El carrito está vacío.</p>
      ) : (
        <>
          <div className="lista-productos">
            {productosCarrito.map(item => (
              <div key={item.id} className="item-carrito">
                <img src={item.imagen} alt={item.nombre} className="item-imagen" />
                <div className="item-info">
                  <h4>{item.nombre}</h4>
                  {/* Se añaden verificaciones para evitar errores de tipo */}
                  <p className="item-precio">${(item.precio || 0).toFixed(2)} x {item.cantidad || 0}</p>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="btn-eliminar"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="resumen-carrito">
            <p className="total-precio">Total: ${total.toFixed(2)}</p>
            <div className="acciones-carrito">
              <button onClick={vaciarCarrito} className="btn-vaciar">Vaciar Carrito</button>
              <button className="btn-finalizar">Finalizar Compra</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Carrito;
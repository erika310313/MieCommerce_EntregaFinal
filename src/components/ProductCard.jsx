import React from 'react';
import { Link } from 'react-router-dom';

function ProductoCard({ producto, functionCarrito, adminLogeado, onEdit, onDelete }) {
  if (!producto || !functionCarrito) {
    return null;
  }

  const handleAgregarAlCarrito = () => {
    functionCarrito(producto);
    alert(`Se agregó 1 unidad de ${producto.nombre} al carrito.`);
  };

  const urlDetalle = (producto.categoria === "postres") 
    ? `/postres/${producto.id}` 
    : `/comidas/${producto.id}`;

  return (
    <div className="card">
      <Link to={urlDetalle}>
        <img src={producto.imagen} alt={producto.nombre} />
      </Link>
      <h3 className="card-title">{producto.nombre}</h3>
      <p className="card-price">${producto.precio}</p>
      
      <div className="card-actions">
        {adminLogeado && (
          <>
            <button onClick={() => onEdit(producto)} className="card-btn btn-edit">
              Editar
            </button>
            <button onClick={() => onDelete(producto)} className="card-btn btn-delete">
              Eliminar
            </button>
          </>
        )}
        <button 
          onClick={handleAgregarAlCarrito} 
          className="card-btn"
          disabled={adminLogeado}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

export default ProductoCard;

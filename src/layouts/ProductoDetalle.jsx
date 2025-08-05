import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { useCarrito } from '../contexts/CarritoContext';

function ProductoDetalle() { 
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useCarrito(); 

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      setError(null);
      const isComida = id.startsWith('c'); 
      const isPostre = id.startsWith('p'); 

      let endpoint = '';
      if (isComida) {
        endpoint = `https://68100d8b27f2fdac24101ef5.mockapi.io/productos/${id}`;
      } else if (isPostre) {
        endpoint = `https://68100d8b27f2fdac24101ef5.mockapi.io/postres/${id}`;
      } else {
        setError("Categoría de producto desconocida.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducto(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  const handleAgregarAlCarrito = () => {
    if (producto) {
      agregarAlCarrito({ ...producto, cantidad: cantidad });
      alert(`Se agregaron ${cantidad} unidades de ${producto.nombre} al carrito.`);
    }
  };

  if (loading) return <p className="loading-message">Cargando detalles del producto...</p>;
  if (error) return <p className="error-message">Error al cargar el producto: {error}</p>;
  if (!producto) return <p className="not-found-message">Producto no encontrado.</p>;

  return (
    <section className="detalle-container">
      <img src={producto.imagen} alt={producto.nombre} className="detalle-imagen" />
      <div className="detalle-info">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <p className="detalle-precio">${producto.precio}</p>

        <div className="detalle-contador">
          <button onClick={() => setCantidad(prev => Math.max(1, prev - 1))} className="btn-contador">-</button>
          <span>{cantidad}</span>
          <button onClick={() => setCantidad(prev => prev + 1)} className="btn-contador">+</button>
        </div>
        <button onClick={handleAgregarAlCarrito} className="btn-agregar">
          Agregar al Carrito
        </button>
      </div>
    </section>
  );
}

export default ProductoDetalle;
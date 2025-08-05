import React, { useEffect, useState } from "react"
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import ProductoCard from '../components/ProductCard';
import ProductoForm from '../components/ProductoForm';
import { useCarrito } from '../contexts/CarritoContext';
import { useAuth } from '../contexts/AuthContext'

const SectionStyled = styled.section`
  max-width: 1200px;
  margin: var(--spacing-xxl) auto;
  padding: 0 var(--spacing-md);
`;

const ProductosTitulo = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
`;

const AdminActions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
`;

const AgregarButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 10px 20px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6a2a70;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  padding-left: 40px; /* Espacio para el icono */
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-light-gray);
  font-size: 1rem;
  background-color: var(--color-white);
`;

const SearchIconSvg = styled.svg`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: var(--color-dark-gray);
  width: 20px;
  height: 20px;
`;

const ProductosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-xl);
  justify-content: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.disabled ? 'var(--color-light-gray)' : 'var(--color-primary)'};
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 1rem;

  &:hover {
    background-color: ${props => props.disabled ? 'var(--color-light-gray)' : '#6a2a70'};
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.25rem;
  color: var(--color-primary);
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.25rem;
  color: var(--color-danger);
`;

function Productos({ titulo, categoria, endpoint }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);

  // Estados para búsqueda y paginación
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const { agregarAlCarrito } = useCarrito();
  const { adminLogeado } = useAuth();
  
  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allProducts = await response.json();
      
      const filteredProducts = Array.isArray(allProducts) 
        ? allProducts
            .filter(p => p && p.categoria && p.categoria.toLowerCase() === categoria.toLowerCase())
        : [];
      
      setProductos(filteredProducts);
    } catch (e) {
      console.error("Error en fetchProductos:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [endpoint, categoria]);

  // Lógica de filtrado de productos en base a la búsqueda
  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productosFiltrados.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleGuardarProducto = () => {
    setMostrarFormulario(false);
    setProductoEnEdicion(null);
    fetchProductos();
    toast.success('¡Producto guardado exitosamente!');
  };

  const handleEditarProducto = (producto) => {
    setProductoEnEdicion(producto);
    setMostrarFormulario(true);
  };

  const handleEliminarProducto = async (producto) => {
    // Reemplazar window.confirm con un componente de modal
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${producto.nombre}"?`)) {
      try {
        const response = await fetch(`https://68100d8b27f2fdac24101ef5.mockapi.io/productos/${producto.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        fetchProductos();
        toast.info('Producto eliminado exitosamente.');
      } catch (e) {
        setError(`Error al eliminar el producto: ${e.message}`);
        toast.error(`Error al eliminar el producto: ${e.message}`);
      }
    }
  };

  if (loading) return <LoadingMessage>Cargando productos...</LoadingMessage>;
  if (error) return <ErrorMessage>Error al cargar los productos: {error}</ErrorMessage>;

  return (
    <SectionStyled>
      <Helmet>
        <title>{titulo} | Mi Restaurante</title>
        <meta name="description" content={`Explora nuestra deliciosa selección de ${titulo.toLowerCase()}.`} />
      </Helmet>
      <ProductosTitulo>{titulo}</ProductosTitulo>
      <ToastContainer position="bottom-right" autoClose={3000} />
      
      <SearchBarContainer>
        <SearchInputWrapper>
          <SearchIconSvg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </SearchIconSvg>
          <SearchInput 
            type="text" 
            placeholder="Buscar productos..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reiniciar la paginación al buscar
            }}
          />
        </SearchInputWrapper>
      </SearchBarContainer>

      {adminLogeado && (
        <AdminActions>
          <AgregarButton onClick={() => { setMostrarFormulario(true); setProductoEnEdicion(null); }} aria-label="Agregar nuevo producto">
            <FaPlus /> Agregar Nuevo Producto
          </AgregarButton>
        </AdminActions>
      )}
      
      {mostrarFormulario && (
        <ProductoForm
          productoParaEditar={productoEnEdicion}
          onGuardar={handleGuardarProducto}
          onCancelar={() => setMostrarFormulario(false)}
        />
      )}
      
      <ProductosContainer>
        {currentProducts.length > 0 ? (
          currentProducts.map(producto => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              functionCarrito={agregarAlCarrito}
              adminLogeado={adminLogeado}
              onEdit={() => handleEditarProducto(producto)}
              onDelete={() => handleEliminarProducto(producto)}
            />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </ProductosContainer>

      {productosFiltrados.length > productsPerPage && (
        <PaginationContainer>
          <PaginationButton onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </PaginationButton>
          <span>Página {currentPage} de {totalPages}</span>
          <PaginationButton onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Siguiente
          </PaginationButton>
        </PaginationContainer>
      )}

    </SectionStyled>
  );
}

export default Productos;
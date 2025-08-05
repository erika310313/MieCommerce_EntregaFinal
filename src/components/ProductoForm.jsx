import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const FormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto; /* Permite scroll si el formulario es muy largo */
  padding: 20px;
`;

const FormWrapper = styled.div`
  background-color: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  position: relative; /* Asegura que el contenido esté dentro de la caja */
`;

const FormTitle = styled.h3`
  text-align: center;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-md);
`;

const LabelStyled = styled.label`
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: bold;
`;

const InputStyled = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-light-gray);
  font-size: 1rem;
`;

const TextAreaStyled = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-light-gray);
  font-size: 1rem;
  resize: vertical;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-lg);
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
  width: 48%;

  &.guardar {
    background-color: var(--color-primary);
    color: var(--color-white);
    &:hover {
      background-color: #6a2a70;
    }
  }

  &.cancelar {
    background-color: var(--color-light-gray);
    color: var(--color-dark-gray);
    &:hover {
      background-color: #ddd;
    }
  }
`;

function ProductoForm({ productoParaEditar, onGuardar, onCancelar }) {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    categoria: '',
  });

  // Si se recibe un producto para editar, inicializar el formulario con sus datos
  useEffect(() => {
    if (productoParaEditar) {
      setProducto(productoParaEditar);
    }
  }, [productoParaEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const metodo = productoParaEditar ? 'PUT' : 'POST';
      const url = productoParaEditar 
        ? `https://68100d8b27f2fdac24101ef5.mockapi.io/productos/${producto.id}` 
        : 'https://68100d8b27f2fdac24101ef5.mockapi.io/productos';
      
      const response = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Llamar a la función de refresco del componente padre
      onGuardar();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      toast.error(`Error al guardar el producto: ${error.message}`);
    }
  };

  return (
    <FormContainer>
      <FormWrapper as="form" onSubmit={handleSubmit}>
        <FormTitle>{productoParaEditar ? 'Editar Producto' : 'Agregar Nuevo Producto'}</FormTitle>
        <FormGroup>
          <LabelStyled htmlFor="nombre">Nombre</LabelStyled>
          <InputStyled
            type="text"
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyled htmlFor="descripcion">Descripción</LabelStyled>
          <TextAreaStyled
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            rows="3"
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyled htmlFor="precio">Precio</LabelStyled>
          <InputStyled
            type="number"
            id="precio"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            step="0.01"
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyled htmlFor="imagen">URL de la Imagen</LabelStyled>
          <InputStyled
            type="url"
            id="imagen"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <LabelStyled htmlFor="categoria">Categoría</LabelStyled>
          <InputStyled
            type="text"
            id="categoria"
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <ButtonContainer>
          <ActionButton type="submit" className="guardar">
            Guardar
          </ActionButton>
          <ActionButton type="button" onClick={onCancelar} className="cancelar">
            Cancelar
          </ActionButton>
        </ButtonContainer>
      </FormWrapper>
    </FormContainer>
  );
}

export default ProductoForm;
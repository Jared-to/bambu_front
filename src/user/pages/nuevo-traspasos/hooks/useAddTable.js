import { useCallback, useState } from "react";


export const useAddTable = (products, selectedProducts, setSelectedProducts) => {
  //?estados
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  // Función del buscador
  const handleSearch = useCallback((value) => {
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const lowercasedValue = value.toLowerCase();

    const foundProducts = products.filter((product) =>
      product.descripcion && product.descripcion.toLowerCase().includes(lowercasedValue)
    );

    setFilteredProducts(foundProducts.length > 0 ? foundProducts : []);
  }, [products]);

  // Agregar un producto a la lista
  const handleAddProduct = useCallback((product) => {
    const existingProduct = selectedProducts.find(item =>
      item.id_inventario === product.id_inventario 
    );

    if (existingProduct) {

      return;
    } else {
      if (product.stock <= 0) {
        alert('Stock insuficiente');
        return
      }
      
      setSelectedProducts(prevProducts => [
        ...prevProducts,
        {
          ...product,
          precio: product.precio_venta,
          codigo_barra: null,
          precioSugerido: product.precio_venta,
          cantidad: 1,
          subTotal: product.precio_venta,
          tipo: 'incrementar',
          fechaVencimiento: '',
          descuento: 0,
        }
      ]);
    }

    setFilteredProducts([]);
    setSearchTerm('');
  }, [selectedProducts]);

  //cambiar cantidad
  const handleChangeCantidad = useCallback((value, product) => {

    setSelectedProducts(prevProducts =>
      prevProducts.map(item => {
        if (item.id_inventario === product.id_inventario 
        ) {
          const cantidadSolicitada = value;
          const stockDisponible = item.stock + (item.cantidadOrigin || 0); // Stock actual más la cantidad original en la venta

          if (cantidadSolicitada > stockDisponible) {
            // Notificar al usuario y ajustar automáticamente
            alert(`La cantidad solicitada (${cantidadSolicitada}) supera el stock disponible (${stockDisponible}). Se ajustará automáticamente.`);
            return {
              ...item,
              cantidad: stockDisponible,
              subTotal: item.precio * stockDisponible,
            };
          } else if (cantidadSolicitada <= 0) {
            // Validar que la cantidad no sea negativa o cero
            alert(`La cantidad debe ser mayor a 0.`);
            return item;
          } else {
            // Actualizar con la cantidad solicitada
            return {
              ...item,
              cantidad: cantidadSolicitada,
              subTotal: item.precio * cantidadSolicitada,
            };
          }
        }
        return item;
      })
    );
  }, [setSelectedProducts]);

  // Quitar el producto de la lista
  const handleRemoveProductInv = useCallback((product) => {
    setSelectedProducts(prevProducts =>
      prevProducts.filter(item =>
        item.id_inventario !== product.id_inventario 
      )
    );
  }, [setSelectedProducts]);

  return{
    handleAddProduct,
    handleSearch,
    handleChangeCantidad,
    handleRemoveProductInv,
    searchTerm,
    filteredProducts,
    
  }
}

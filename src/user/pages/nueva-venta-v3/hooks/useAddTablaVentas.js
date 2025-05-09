import { useCallback, useState } from "react";


export const useAddTablaVentas = (products, selectedProducts, setSelectedProducts) => {

  //?estados
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  // Agregar un producto a la lista
  const handleAddProduct = useCallback((id_producto, variant) => {

    // Buscar todos los productos en selectedProducts con el mismo id_producto
    const existingProducts = selectedProducts.filter(
      (item) => item.id_producto === id_producto
    );

    // Verificar si alguna de las variantes de los productos existentes coincide con la nueva variante
    const variantExists = existingProducts.some(
      (item) => item.variante === variant
    );

    if (variantExists) {
      console.warn("Esta variante ya está en la lista.");
      return;
    }

    // Buscar el producto en la lista original de productos
    const product = products.find((p) => p.id_producto === id_producto);
    //buscar variante
    const variantSelect = product.variantes.find((v) => v.nombre === variant)

    if (!product) {
      console.error("Producto no encontrado.");
      return;
    }

    if (variant.stock <= 0) {
      alert("Stock insuficiente para esta variante.");
      return;
    }

    // Agregar el nuevo producto con la variante seleccionada
    setSelectedProducts((prevProducts) => [
      ...prevProducts,
      {
        ...product,
        cantidad: 1,
        variante: variantSelect.nombre,
        precio: parseFloat(variantSelect.precio),
        subTotal: parseFloat(variantSelect.precio),
      },
    ]);

    setFilteredProducts([]);
    setSearchTerm("");
  }, [selectedProducts, products]);


  // Quitar el producto de la lista
  const handleRemoveProduct = useCallback((product) => {
    setSelectedProducts(prevProducts =>
      prevProducts.filter(item =>
        !(item.id_inventario === product.id_inventario && item.variante === product.variante)
      )
    );
  }, [setSelectedProducts]);


  // Incrementar cantidad
  const handleIncrementQuantity = useCallback((product) => {

    setSelectedProducts(prevProducts =>
      prevProducts.map(item => {
        if (item.id_producto === product.id_producto && item.variante === product.variante) {
          const cantidad = item.cantidad + 1;
          const subTotal = cantidad * item.precio;
          return {
            ...item,
            cantidad,
            subTotal
          };
        }
        return item;
      })
    );
  }, [setSelectedProducts]);

  // Decrementar cantidad
  const handleDecrementQuantity = useCallback((product) => {

    setSelectedProducts(prevProducts =>
      prevProducts.map(item => {
        if (item.id_producto === product.id_producto && item.variante === product.variante && item.cantidad > 1) {
          const cantidad = item.cantidad - 1;
          const subTotal = cantidad * item.precio;

          return {
            ...item,
            cantidad,
            subTotal
          };
        }
        return item;
      })
    );
  }, [setSelectedProducts]);
  return {
    handleAddProduct,
    handleRemoveProduct,
    handleDecrementQuantity,
    handleIncrementQuantity
  }
}

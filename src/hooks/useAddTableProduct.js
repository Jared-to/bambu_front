import { useCallback, useState } from "react";

export const useAddTableProduct = (products, selectedProducts, setSelectedProducts) => {
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
      product.alias && product.alias.toLowerCase().includes(lowercasedValue)
    );

    setFilteredProducts(foundProducts.length > 0 ? foundProducts : []);
  }, [products]);

  // Agregar un producto a la lista
  const handleAddProduct = useCallback((product) => {
    const existingProduct = selectedProducts.find(item =>
      item.codigo_barras === product.codigo_barras && item.id_producto === product.id_producto
      && item.almacen_id === product.almacen_id
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

  const handleAddProductInv = useCallback((product) => {
    const existingProduct = selectedProducts.find(item =>
      item.codigo === product.codigo
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
          codigo_barra: null,
          precioSugerido: product.precio,
          cantidad: 1,
          subTotal: product.precio,
          tipo: 'incrementar',
          fechaVencimiento: '',
          descuento: 0,
        }
      ]);
    }

    setFilteredProducts([]);
    setSearchTerm('');
  }, [selectedProducts]);
  // Agregar un producto a la lista ajuste
  const handleAddProductAjuste = useCallback((product) => {
    const existingProduct = selectedProducts.find(item =>
       item.id_producto === product.id_producto
      && item.almacen_id === product.almacen_id
    );

    if (existingProduct) {

      return;
    } else {
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

  // Quitar el producto de la lista
  const handleRemoveProduct = useCallback((product) => {
    setSelectedProducts(prevProducts =>
      prevProducts.filter(item =>
         item.id_producto !== product.id_producto
        || item.almacen_id !== product.almacen_id
      )
    );
  }, [setSelectedProducts]);

  // Incrementar cantidad
  const handleIncrementQuantity = useCallback((product) => {
    setSelectedProducts(prevProducts =>
      prevProducts.map(item => {
        if ( item.id_producto === product.id_producto) {
          const cantidad = item.cantidad + 1;
          return {
            ...item,
            cantidad,
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
        if ( item.producto_id === product.producto_id && item.cantidad > 1) {
          const cantidad = item.cantidad - 1;
          return {
            ...item,
            cantidad,
          };
        }
        return item;
      })
    );
  }, [setSelectedProducts]);

  // Controlar tipo
  const handleChangeType = useCallback((value, product) => {
    setSelectedProducts(prevProducts =>
      prevProducts.map(item => {
        if ( item.id_producto === product.id_producto) {
          return {
            ...item,
            tipo: value,
          };
        }
        return item;
      })
    );
  }, [setSelectedProducts]);

  // Controlar fecha de vencimiento
  const handleChangeFechaVencimiento = useCallback((value, product) => {
    setSelectedProducts(prevProducts =>
      prevProducts.map(item => {
        if (item.codigo === product.codigo) {
          return {
            ...item,
            fechaVencimiento: value,
          };
        }
        return item;
      })
    );
  }, [setSelectedProducts]);

  // Cambiar precio iv
  const handleChangePrecio = useCallback((value, product) => {
    setSelectedProducts(prevProducts =>
      prevProducts.map(item => {
        if (item.codigo === product.codigo) {
          const precio = parseFloat(value) || 0;
          return {
            ...item,
            precio,
            subTotal: precio * item.cantidad,
          };
        }
        return item;
      })
    );
  }, [setSelectedProducts]);

  // Cambiar precio ve
  const handleChangePrecioVen = useCallback((value, product) => {

    setSelectedProducts(prevProducts =>
      prevProducts.map(item => {
        if (
          item.id_producto === product.id_producto &&
          item.almacen_id === product.almacen_id
        ) {
          const precioIngresado = parseFloat(value) || 0;

          // Ajustar el precio si está fuera del rango permitido
          const precio = Math.max(item.precio_min_venta, Math.min(precioIngresado, item.precioSugerido));

          return {
            ...item,
            precio: precio,
            subTotal: precio * item.cantidad,
          };
        }
        return item;
      })
    );
  }, [setSelectedProducts]);


  // Cambiar descuento
  const handleChangeDescuento = useCallback((value, product) => {
    setSelectedProducts(prevProducts =>
      prevProducts.map(item => {
        if ( item.id_producto === product.id_producto) {
          const descuento = parseFloat(value) || 0;
          console.log(descuento);

          return {
            ...item,
            descuento,
            subTotal: (item.precio * item.cantidad) - descuento,
          };
        }
        return item;
      })
    );
  }, [setSelectedProducts]);

  //cambiar cantidad
  const handleChangeCantidad = useCallback((value, product) => {

    setSelectedProducts(prevProducts =>
      prevProducts.map(item => {
        if ( item.id_producto === product.id_producto
          && item.almacen_id === product.almacen_id
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


  const handleChangeCantidadInv = useCallback((value, product) => {
    setSelectedProducts(prevProducts =>
      prevProducts.map(item => {
        if (item.codigo === product.codigo) {
          const cantidad = value;
          if (cantidad > item.stock) {
            return {
              ...item,
              cantidad: item.stock,
              subTotal: item.precio * parseInt(item.stock),
            };
          } else {
            return {
              ...item,
              cantidad,
              subTotal: item.precio * cantidad,
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
        item.codigo !== product.codigo || item.id_producto !== product.id_producto
      )
    );
  }, [setSelectedProducts]);

  //asignar codigo de barras
  const handleChangeCode = useCallback((value, product) => {

    setSelectedProducts(prevProducts =>
      prevProducts.map(item => {
        if (item.codigo === product.codigo) {
          return {
            ...item,
            codigo_barra: value,
          };
        }
        return item;
      })
    );
  }, [setSelectedProducts]);

  return {
    searchTerm,
    handleSearch,
    filteredProducts,
    handleAddProduct,
    handleAddProductAjuste,
    handleRemoveProduct,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleChangeType,
    handleChangeFechaVencimiento,
    handleChangePrecio,
    handleChangeDescuento,
    handleChangeCantidad,
    handleChangeCode,
    handleAddProductInv,
    handleChangeCantidadInv,
    handleRemoveProductInv,
    handleChangePrecioVen
  };
};

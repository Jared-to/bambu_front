
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';


export const useInventarioStore = () => {
  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const usuario = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const inventarioInicial = async (formulario) => {

    const productos = formulario.productoSelect.map(product => ({
      producto_id: product.id,
      cantidad: parseFloat(product.cantidad),
      precio_compra: parseFloat(product.precio).toFixed(2),
    }))

    const datos = {
      almacen_id: formulario.almacen,
      productos
    }

    dispatch(checking());
    try {
      const token = sessionStorage.getItem('token');
      const { data } = await inventarioApi.post('/inventario/inicial', datos, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      dispatch(onTrue({ message: data }));

    } catch (error) {
      console.log(error);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response.data
    }
  };

  const getInventario = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('inventario', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(onTrue({ message: true }));

      return data;
    } catch (error) {
      console.log("catch", error);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
    }
  }
  const getInventarioInfo = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('inventario/' + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(onTrue({ message: true }));

      return data;
    } catch (error) {
      console.log("catch", error);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response.data
    }
  }
  const getAlmacenProducto = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`inventario/almacenes/producto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(onTrue({ message: true }));

      return data;
    } catch (error) {
      console.log("catch", error);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response.data
    }
  }

  const getInfoProduct = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`inventario/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(onTrue({ message: true }));

      return data;
    } catch (error) {
      console.log("catch", error);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
    }
  }

  const getProductCode = async (idAlmacen, codigo_barra) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`inventario/producto-codigo?codigoBarras=${codigo_barra}&almacenId=${idAlmacen}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(onTrue({ message: true }));

      return data;
    } catch (error) {
      console.log("catch", error);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
    }
  }

  const ajusteInventario = async (formulario) => {
    const detalles = formulario.productoSelect.map(product => ({
      producto_id: product.id_producto,
      cantidad: parseFloat(product.cantidad),
      unidad_medida: product.unidad_medida,
      tipo: product.tipo
    }))

    const datos = {
      almacen_id: formulario.almacen,
      fecha: formulario.fecha,
      glosa: formulario.glosa,
      id_usuario: usuario,
      detalles
    }


    dispatch(checking());
    try {
      const { data } = await inventarioApi.post('/inventario/ajuste', datos, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      dispatch(onTrue({ message: data }));

    } catch (response) {
      console.log(response);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response.data
    }
  }

  const getAjustesInventario = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('inventario/ajuste', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(onTrue({ message: true }));

      return data;
    } catch (error) {
      console.log("catch", error);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
    }
  }

  const getAjusteInventario = async (id) => {

    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`inventario/ajuste/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(onTrue({ message: true }));

      return data;
    } catch (error) {
      console.log("catch", error);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
    }
  }

  const updateAjusteInventario = async (formulario, id) => {

    const detalles = formulario.productoSelect.map(product => ({
      producto_id: product.id_producto,
      cantidad: parseFloat(product.cantidad),
      unidad_medida: product.unidad_medida,
      tipo: product.tipo
    }))

    const datos = {
      almacen_id: formulario.almacen,
      fecha: formulario.fecha,
      glosa: formulario.glosa,
      id_usuario: usuario,
      detalles
    }

    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`/inventario/ajuste/${id}`, datos, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      dispatch(onTrue({ message: data }));

    } catch (response) {
      console.log(response);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response.data
    }
  }
  const deleteAjuste = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.delete(`inventario/ajuste/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(onTrue({ message: true }));

      return data;
    } catch (error) {
      console.log("catch", error);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response.data
    }
  }

  //?/-------------------movimientos inventario----------------
  const getMovimientosProduct = async (id, fechaIn, fechaFn) => {

    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`inventario/movimientos/producto?productoId=${id}&fechaIn=${fechaIn}&fechaFn=${fechaFn}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(onTrue({ message: true }));

      return data;
    } catch (error) {
      console.log("catch", error);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response.data
    }
  }
  return {
    inventarioInicial,
    getInventario,
    getInventarioInfo,
    getAlmacenProducto,
    getInfoProduct,
    getProductCode,
    ajusteInventario,
    getAjustesInventario,
    getAjusteInventario,
    updateAjusteInventario,
    deleteAjuste,
    getMovimientosProduct
  }
}


import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';


export const useCuotasStore = () => {

  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const nuevaCuota = async (formulario) => {
    const user = sessionStorage.getItem('userId');

    const datos = {
      glosa: formulario.glosa,
      ventaId: formulario.id,
      metodoPago: formulario.metodo_pago,
      monto: parseFloat(formulario.monto)
    }

    dispatch(checking());
    try {
      const { data } = await inventarioApi.post('/ventas/cuotas', datos, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      dispatch(onTrue({ message: data }));

    } catch (error) {
      console.log(error);
      dispatch(onFalse(error.response.data));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response.data;
    }
  };

  const updateVenta = async (formulario, id) => {

    const detalles = formulario.productoSelect.map(prod => ({
      cantidad: prod.cantidad,
      id_producto: prod.id_producto,
      codigo_barras: prod.codigo_barras,
      almacen_id: prod.almacen_id,
      precio: prod.precio,
      descuento: prod.descuento,
      subtotal: prod.subTotal,
      unidad_medida: prod.unidad_medida
    }))

    const datos = {
      cliente: formulario.cliente,
      fecha: formulario.fecha,
      tipo_pago: formulario.tipoPago,
      total: formulario.subtotal,
      descuento: formulario.descuento,
      detalles: detalles
    };


    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`/ventas/${id}`, datos, {
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
      return;
    }
  };

  const getCuotas = async (idVenta) => {
    dispatch(checking());

    try {
      const { data } = await inventarioApi.get(`ventas/cuotas/${idVenta}`, {
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

  const getVenta = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`ventas/${id}`, {
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

  const deleteVenta = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.delete(`ventas/${id}`, {
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

  return {
    errorMessage,
    message,
    //*operaciones
    nuevaCuota,
    getCuotas
  }
}
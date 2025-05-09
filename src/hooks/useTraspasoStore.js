
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';


export const useTraspasoStore = () => {

  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const crearTraspaso = async (formulario) => {
    const user = sessionStorage.getItem('userId');

    const detalles = formulario.selectedProducts.map(prod => ({
      id_inventario: prod.id_inventario,
      cantidad: prod.cantidad
    }))
    const datos = {
      almacenOrigen: formulario.almacenOrigen,
      almacenDestino: formulario.almacenDestino,
      glosa: formulario.glosa,
      fecha: formulario.fecha,
      user,
      detalles: detalles
    };

    dispatch(checking());
    try {
      const token = sessionStorage.getItem('token');
      const { data } = await inventarioApi.post('/traspasos', datos, {
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
  };
  const updateTraspaso = async (formulario, id) => {
    const user = sessionStorage.getItem('userId');

    const detalles = formulario.selectedProducts.map(prod => ({
      id_inventario: prod.id_inventario,
      cantidad: prod.cantidad
    }))
    const datos = {
      almacenOrigen: formulario.almacenOrigen,
      almacenDestino: formulario.almacenDestino,
      glosa: formulario.glosa,
      fecha: formulario.fecha,
      user,
      detalles: detalles
    };
    dispatch(checking());
    try {
      const token = sessionStorage.getItem('token');
      const { data } = await inventarioApi.patch(`/traspasos/${id}`, datos, {
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

  const getTraspasos = async () => {
    dispatch(checking());
    try {
      const token = sessionStorage.getItem('token');
      const { data } = await inventarioApi.get('traspasos', {
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

  const getTraspaso = async (id) => {
    dispatch(checking());
    try {
      const token = sessionStorage.getItem('token');
      const { data } = await inventarioApi.get(`traspasos/${id}`, {
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
  const deleteTraspaso = async (id) => {
    dispatch(checking());
    try {
      const token = sessionStorage.getItem('token');
      const { data } = await inventarioApi.delete(`traspasos/${id}`, {
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
    errorMessage,
    message,
    //*operaciones
    crearTraspaso,
    updateTraspaso,
    getTraspasos,
    getTraspaso,
    deleteTraspaso
  }
}
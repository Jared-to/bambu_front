
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';


export const useDescuentoStore = () => {
  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('userId');

  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const crearDescuento = async (formulario) => {
    const datos = {
      usuarioId: user,
      descuento: formulario.descuento,
      porcentaje: parseFloat(formulario.porcentaje),
      fechaInicio: formulario.fechaIn,
      fechaFin: formulario.fechaFn,
    };

    dispatch(checking());
    try {
      const { data } = await inventarioApi.post('/descuentos', datos, {
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
  const updateDescuento = async (formulario, id) => {
    const datos = {
      usuarioId: user,
      descuento: formulario.descuento,
      porcentaje: parseFloat(formulario.porcentaje),
      fechaInicio: formulario.fechaIn,
      fechaFin: formulario.fechaFn,
    };


    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`/descuentos/${id}`, datos, {
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

  const getDescuentos = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('descuentos', {
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
  const getDescuentosActivos = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('descuentos/activos', {
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

  const descuentoStado = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`descuentos/estado/${id}`, {
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
  const getDescuento = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`descuentos/${id}`, {
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
  const deleteDescuento = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.delete(`descuentos/${id}`, {
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
    message,
    errorMessage,
    crearDescuento,
    updateDescuento,
    getDescuentos,
    getDescuento,
    deleteDescuento,
    getDescuentosActivos,
    descuentoStado
  }
}

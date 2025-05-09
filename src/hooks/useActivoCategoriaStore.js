
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';


export const useActivoCategoriaStore = () => {
  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const createActivoCategoria = async (formulario) => {
    const datos = {
      nombre: formulario.nombre,
      descripcion: formulario.descripcion
    };

    dispatch(checking());
    try {
      const { data } = await inventarioApi.post('/categoria/activos', datos, {
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
  const updateActivoCategoria  = async (formulario, id) => {
    const datos = {
      nombre: formulario.nombre,
      descripcion: formulario.descripcion
    };

    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`/categoria/activos/${id}`, datos, {
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

  const getActivosCategorias  = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('/categoria/activos', {
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

  const getActivoCategoria  = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`/categoria/activos/${id}`, {
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
  const deleteActivoCategoria  = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.delete(`/categoria/activos/${id}`, {
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
    message,
    errorMessage,
    createActivoCategoria,
    updateActivoCategoria,
    getActivosCategorias,
    getActivoCategoria,
    deleteActivoCategoria
  }
}

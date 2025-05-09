
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';


export const useProveedorStore = () => {

  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const crearProveedor = async (formulario) => {
    const datos = {
      nombre: formulario.nombre,
      contacto_principal: formulario.contacto,
      telefono: formulario.telefono,
      direccion: formulario.direccion,
      ciudad: formulario.ciudad,
    };


    dispatch(checking());
    try {
      const { data } = await inventarioApi.post('/proveedores', datos, {
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
  const updateProveedor = async (formulario, id) => {
    const datos = {
      nombre: formulario.nombre,
      contacto_principal: formulario.contacto,
      telefono: formulario.telefono,
      direccion: formulario.direccion,
      ciudad: formulario.ciudad,
    };


    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`/proveedores/${id}`, datos, {
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

  const getProveedores = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('proveedores', {
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

  const getProveedor = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`proveedores/${id}`, {
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
    updateProveedor,
    getProveedores,
    getProveedor,
    crearProveedor
  }
}
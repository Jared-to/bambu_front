
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';


export const useConfigStore = () => {
  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const subirQr = async (formulario) => {

    const formData = new FormData();

    formData.append('file', formulario.qr);

    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch('/config/qr', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Importante para enviar archivos

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
      throw error.response.data;

    }
  };
  const subirImagen= async (formulario) => {

    const formData = new FormData();

    formData.append('file', formulario.imagen);

    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch('/config/imagen', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Importante para enviar archivos

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
      throw error.response.data;

    }
  };

  const getConfig = async () => {

    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('/config', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Importante para enviar archivos
        }
      })

      dispatch(onTrue({ message: data }));
      return data;
    } catch (response) {
      console.log(response);
      dispatch(onFalse(error.response.data.error));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response.data;
    }
  };
  const cambiarRedes = async (formulario) => {

    const datos = {
      linkFacebook: formulario.linkFace,
      linkInstagram: formulario.linkInstagram,
      telefonoPrincipal: formulario.telefono
    }

    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch('/config/redes', datos, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      throw error.response.data;

    }
  };

  return {
    message,
    errorMessage,
    subirQr,
    getConfig,
    cambiarRedes,
    subirImagen
  }
}

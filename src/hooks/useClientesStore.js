
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';


export const useClientesStore = () => {

  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const crearCliente = async (formulario) => {
    const datos = {
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      direccion: formulario.direccion,
      cumpleanios: formulario.cumpleanios,
      telefono: formulario.telefono,
    };


    dispatch(checking());
    try {

      const { data } = await inventarioApi.post('/clientes', datos, {
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
  const updateCliente = async (formulario, id) => {
    const datos = {
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      direccion: formulario.direccion,
      cumpleanios: formulario.cumpleanios,
      telefono: formulario.telefono,
    };


    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`/clientes/${id}`, datos, {
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

  const traerClientes = async () => {
    dispatch(checking());
    try {

      const { data } = await inventarioApi.get('clientes', {
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

  const traerCliente = async (id) => {
    dispatch(checking());
    try {

      const { data } = await inventarioApi.get(`clientes/${id}`, {
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
  const deleteCliente = async (id) => {
    dispatch(checking());
    try {

      const { data } = await inventarioApi.delete(`clientes/${id}`, {
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
  const traerPerfilCliente = async (id) => {
    dispatch(checking());
    try {

      const { data } = await inventarioApi.get(`clientes/perfil/${id}`, {
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
  const traerPerfilClienteFechas = async (id, fechaIn, fechaFn) => {
    dispatch(checking());
    try {

      const { data } = await inventarioApi.get(`clientes/perfil/${id}?fechaInicio=${fechaIn}&fechaFin=${fechaFn}`, {
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
  const dischargePDF = async () => {
    dispatch(checking());
    try {

      const response = await inventarioApi.get(`/reportes/clientes`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Cambiar el tipo de respuesta a 'blob' para archivos binarios
      });

      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      // Suponiendo que el servidor envía el archivo con un nombre, sino, asigna un nombre por defecto
      link.setAttribute('download', 'clientes.pdf');
      document.body.appendChild(link);
      link.click();

      // Limpiar el URL para liberar memoria
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      dispatch(onTrue({ message: 'Archivo descargado con éxito' }));
      return response.data;
    } catch (error) {
      console.log("catch", error);
      dispatch(onFalse(error.response.data.message[0]));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);

      throw error.response.data;
    }
  }
  return {
    errorMessage,
    message,
    //*operaciones
    crearCliente,
    traerCliente,
    updateCliente,
    traerClientes,
    deleteCliente,
    traerPerfilCliente,
    traerPerfilClienteFechas,
    dischargePDF
  }
}
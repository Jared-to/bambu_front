
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';



export const useAlmacenesStore = () => {
  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const crearAlmacen = async (formulario) => {
    const datos = {
      nombre: formulario.nombre,
      ubicacion: formulario.ubicacion,
      telefono: formulario.telefono,
      HoraAtencion: formulario.horaAtencion,
      linkGPS: formulario.linkGps
    };

    dispatch(checking());
    try {

      const { data } = await inventarioApi.post('/almacenes', datos, {
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
  const updateAlmacen = async (formulario, id) => {
    const datos = {
      nombre: formulario.nombre,
      ubicacion: formulario.ubicacion,
      telefono: formulario.telefono,
      HoraAtencion: formulario.horaAtencion,
      linkGPS: formulario.linkGps
    };
    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`/almacenes/${id}`, datos, {
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

  const getAlmacenes = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('almacenes', {
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

  const getAlmacen = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`almacenes/${id}`, {
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
  const isStatus = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`almacenes/estado/${id}`, {
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

  const deleteAlmacen = async (id) => {
    dispatch(checking());

    try {
      const { data } = await inventarioApi.delete(`almacenes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(onTrue({ message: true }));

      return data;
    } catch (error) {
      console.log("catch", error);
      dispatch(onFalse(error.response.data.message));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);

      throw error.response.data
    }
  }
  const getProductoAlmacen = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`inventario/almacen/${id}`, {
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

  const getInfoProductoAlmacen = async (idAlmacen, idProducto) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`inventario/almacen/${idAlmacen}/producto/${idProducto}`, {
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
    crearAlmacen,
    updateAlmacen,
    getAlmacenes,
    getAlmacen,
    getProductoAlmacen,
    getInfoProductoAlmacen,
    deleteAlmacen,
    isStatus
  }
}

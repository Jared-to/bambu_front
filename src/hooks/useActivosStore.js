
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';


export const useActivosStore = () => {
  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('userId');

  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const createActivo = async (formulario) => {
    const datos = {
      descripcion: formulario.descripcion,
      marca: formulario.marca,
      fechaAdquisicion: formulario.fechaAdquisicion,
      fechaVencimiento: formulario.fechaVencimiento,
      tipo: formulario.tipo,
      proveedor: formulario.proveedor,
      categoria: formulario.categoria,
      cantidad: parseInt(formulario.cantidad)
    };

    if (datos.tipo === 'noperecedero') {
      delete datos.fechaVencimiento
    }
    dispatch(checking());
    try {
      const { data } = await inventarioApi.post('/activos', datos, {
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
  const updateActivo = async (formulario, id) => {
    const datos = {
      descripcion: formulario.descripcion,
      marca: formulario.marca,
      fechaAdquisicion: new Date(formulario.fechaAdquisicion),
      fechaVencimiento: new Date(formulario.fechaVencimiento),
      tipo: 'perecedero',
      proveedor: formulario.proveedor,
      categoria: formulario.categoria,
      cantidad: parseInt(formulario.cantidad)
    };

    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`/activos/${id}`, datos, {
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

  const getActivos = async (tipo) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('activos?&tipo=' + tipo, {
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

  const getActivo = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`activos/${id}`, {
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
  const deleteActivo = async (id) => {
    dispatch(checking());
    try {

      const { data } = await inventarioApi.delete(`activos/${id}`, {
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
  //==========MOVIMIENTOS=============
  const createRegistro = async (formulario, id_activo) => {
    const datos = {
      fecha: formulario.fecha,
      glosa: formulario.glosa,
      tipo: formulario.tipo,
      cantidad: parseInt(formulario.cantidad),
      user
    };

    dispatch(checking());
    try {
      const { data } = await inventarioApi.post(`/movimientos/activos/${id_activo}`, datos, {
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
  const getMovimientosActivo = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('movimientos/activos/' + id, {
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
  const getMovimientosActivoFechas = async (id, fechaInicio, fechaFn) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`movimientos/activos/por-rango-fechas?id_activo=${id}&fechaInicio=${fechaInicio}&fechaFin=${fechaFn}`, {
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
    throw error.response.data
  }


  return {
    message,
    errorMessage,
    createActivo,
    updateActivo,
    getActivos,
    getActivo,
    deleteActivo,
    createRegistro,
    getMovimientosActivo,
    getMovimientosActivoFechas
  }
}

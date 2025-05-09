
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';


export const useGastosStore = () => {
  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const usuario = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const crearGasto = async (formulario) => {
    const caja = sessionStorage.getItem('idCaja');
    if (!caja) {
      throw new Error('Se debe de abrir una caja ');
    }
    const datos = {
      cajaId: caja,
      usuarioId: usuario,
      tipo: formulario.tipo,
      glosa: formulario.glosa,
      detalle: formulario.detalle,
      monto: parseFloat(formulario.monto),
      categoriaId: formulario.categoria,
      tipo_pago: formulario.metodo_pago,
      fecha: formulario.fecha,
      almacen: formulario.almacen
    };

    dispatch(checking());
    try {
      const { data } = await inventarioApi.post('/gastos', datos, {
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
  const updateGasto = async (formulario, id) => {
    const datos = {
      tipo: formulario.tipo,
      glosa: formulario.glosa,
      detalle: formulario.detalle,
      monto: parseFloat(formulario.monto),
      categoriaId: formulario.categoria,
      tipo_pago: formulario.metodo_pago,
      fecha: formulario.fecha,
      almacen: formulario.almacen
    };

    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`/gastos/${id}`, datos, {
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

  const getGasto = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`gastos/${id}`, {
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
  const deleteGasto = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.delete(`gastos/${id}`, {
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
  const getGastos = async (fechaInicio = null, fechaFin = null) => {
    dispatch(checking());

    try {
      const { data } = await inventarioApi.get(`gastos?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
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

  const dischargePDFReporte = async (fechaInicio, fechaFin) => {
    dispatch(checking());

    try {
      const response = await inventarioApi.get(`/reportes/gastos?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
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
      link.setAttribute('download', 'reporte-gastos.pdf');
      document.body.appendChild(link);
      link.click();

      // Limpiar el URL para liberar memoria
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      dispatch(onTrue({ message: 'Archivo descargado con éxito' }));

      console.log(data);

      return response;
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
    message,
    errorMessage,
    crearGasto,
    updateGasto,
    getGastos,
    getGasto,
    deleteGasto,
    dischargePDFReporte
  }
}

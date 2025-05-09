
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';


export const useCajaStore = () => {
  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const usuario = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const abrirCaja = async (formulario) => {
    const datos = {
      usuarioId: usuario,
      saldoApertura: parseFloat(formulario.saldo_inicial)
    };

    dispatch(checking());
    try {
      const { data } = await inventarioApi.post('/cajas', datos, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      dispatch(onTrue({ message: data }));
      sessionStorage.setItem('idCaja', data.id)


      return data;

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
  const reabrirCaj = async (id) => {
    dispatch(checking());
    try {

      const { data } = await inventarioApi.patch(`cajas/reabrir/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(onTrue({ message: true }));
      sessionStorage.setItem('idCajaEdit', data.id);

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
  const verificarCaja = async () => {

    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`cajas/verificar/${usuario}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      dispatch(onTrue({ message: data }));
      sessionStorage.setItem('idCaja', data.id_caja)

      return data;
    } catch (error) {
      console.log(error);
      dispatch(onFalse(error.response.data.message));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      return error.response.data.message;
    }
  };

  const getCajas = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('cajas', {
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

  const getCaja = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`cajas/${id}`, {
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

  const cerrarCaja = async () => {
    const caja = sessionStorage.getItem('idCaja');
    if (!caja) {
      return;
    }
    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`cajas/${caja}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(onTrue({ message: true }));
      sessionStorage.removeItem('idCaja');
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
  const cerrarCajaReabierta = async () => {
    const cajaEdit = sessionStorage.getItem('idCajaEdit');
    if (!cajaEdit) {
      return;
    }
    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`cajas/cerrarCajaEdit/${cajaEdit}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(onTrue({ message: true }));
      sessionStorage.removeItem('idCajaEdit');
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
  const eliminarCaja = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.delete(`cajas/${id}`, {
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
  const dischargePDF = async (id) => {
    dispatch(checking());

    try {
      const response = await inventarioApi.get(`/reportes/caja/${id}`, {
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
      link.setAttribute('download', 'reporte-caja.pdf');
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
    message,
    errorMessage,
    abrirCaja,
    verificarCaja,
    getCajas,
    getCaja,
    cerrarCaja,
    reabrirCaj,
    eliminarCaja,
    cerrarCajaReabierta,
    dischargePDF
  }
}

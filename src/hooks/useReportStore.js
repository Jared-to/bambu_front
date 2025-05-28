
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';


export const useReportStore = () => {
  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const usuario = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const getGeneral = async (fechaInicio = null, fechaFin = null, almacen, usuario) => {
    dispatch(checking());

    try {
      const { data } = await inventarioApi.get(`reportes/general?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&almacen=${almacen}&usuario=${usuario}`, {
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
  const dischargeExcelVentas = async (fechaIn, fechaFn) => {
    dispatch(checking());
    try {
      const response = await inventarioApi.get(`/excel/ventas?fechaInicio=${fechaIn}&fechaFin=${fechaFn}`, {
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
      link.setAttribute('download', 'ventas.xlsx');
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
    getGeneral,
    dischargeExcelVentas
  }
}


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

  return {
    message,
    errorMessage,
    getGeneral
  }
}


import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';

import { PDFDocument } from 'pdf-lib';
import printJS from 'print-js';

export const usePedidosStore = () => {
  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const usuario = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');
  const caja = sessionStorage.getItem('idCaja');
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores
  const handlePrint = async (pdfBlob) => {
    const arrayBuffer = await pdfBlob.arrayBuffer();
    const originalPdf = await PDFDocument.load(arrayBuffer);
    const newPdf = await PDFDocument.create();
  
    const [originalPage] = await newPdf.copyPages(originalPdf, [0]);
  
    for (let i = 0; i < 2; i++) {
      newPdf.addPage(originalPage);
    }
  
    const newPdfBytes = await newPdf.save();
    const finalBlob = new Blob([newPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(finalBlob);
  
    printJS({
      printable: url,
      type: 'pdf',
      showModal: true,
      style: '@page { size: 80mm 297mm portrait; }',
    });
  
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  const getPedidosPendientes = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`pedidos`, {
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
      throw error.response?.data;
    }
  }
  const getPedidosAceptados = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`pedidos/aceptados`, {
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
      throw error.response?.data;
    }
  }
  const getPedidosEntregados = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`pedidos/entregados`, {
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
      throw error.response?.data;
    }
  }
  const getPedidosCancelados = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`pedidos/cancelados`, {
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
      throw error.response?.data;
    }
  }

  const getPedidosInfo = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`pedidos/${id}`, {
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
      throw error.response?.data;
    }
  }
  const aceptarPedido = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`pedidos/aceptar/${id}/${usuario}`, {
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
      throw error.response?.data;
    }
  }
  const eliminarPedido = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.delete(`pedidos/${id}`, {
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
      throw error.response?.data;
    }
  }

  const cancelarPedido = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`pedidos/cancelar/${id}/${usuario}`, {
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
      throw error.response?.data;
    }
  }
  const restaurarPedido = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`pedidos/restaurar/${id}/${usuario}`, {
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
      throw error.response?.data;
    }
  }

  const confimarPedido = async (id, metodo_pago) => {
    if (!caja) {
      throw { message: "Debe abrir una caja." }
    }
    dispatch(checking());
    try {
      const { data } = await inventarioApi.post(`pedidos/confirmar/${id}/${caja}/${usuario}/${metodo_pago}`, {
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
      throw error.response?.data;
    }
  }
  const dischargePDF = async (id) => {
    dispatch(checking());
    try {
      const response = await inventarioApi.get(`/reportes/pedido/venta/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      handlePrint(response.data); // Imprimir automáticamente

      dispatch(onTrue({ message: 'Archivo impreso con éxito' }));
      return response.data;
    } catch (error) {
      console.log("catch", error);
      dispatch(onFalse(error.response?.data?.message?.[0] || "Error al imprimir el PDF"));
      setTimeout(() => dispatch(clearErrorMessage()), 5000);
      throw error.response?.data || error;
    }
  };

  return {
    message,
    errorMessage,
    getPedidosPendientes,
    getPedidosInfo,
    aceptarPedido,
    eliminarPedido,
    getPedidosAceptados,
    restaurarPedido,
    cancelarPedido,
    getPedidosCancelados,
    confimarPedido,
    getPedidosEntregados,
    dischargePDF
  }
}

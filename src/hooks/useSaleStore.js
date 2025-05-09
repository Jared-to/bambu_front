
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';
import printJS from 'print-js';
import { PDFDocument } from 'pdf-lib';
export const useSaleStore = () => {

  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
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
  const nuevaVentav2 = async (formulario) => {

    const user = sessionStorage.getItem('userId');
    const caja = sessionStorage.getItem('idCaja');
    if (!caja) {
      throw { message: 'Debes de abrir una caja.' };
    }

    const detalles = formulario.productoSelect.map(prod => ({
      cantidad: prod.cantidad,
      id_producto: prod.id_producto,
      precio: prod.precio,
      nombreVariante: prod.variante,
      descuento: 0,
      subtotal: prod.subTotal,
      unidad_medida: prod.unidad_medida,
    }))
    // Calcular subtotal
    const calcularSubtal = () => {
      const total = formulario.productoSelect.reduce((acc, producto) => acc + producto.subTotal, 0 || 0).toFixed(2);
      return parseFloat(total);
    };
    const datos = {
      ventaAlContado: true,
      cajaId: caja,
      vendedor: user,
      cliente: formulario.cliente,
      fecha: formulario.fecha,
      tipo_pago: formulario.metodoPago,
      total: calcularSubtal(),
      subtotal: calcularSubtal(),
      descuento: formulario.descuentoSelect,
      almacen: formulario.almacen,
      glosa: formulario.glosa,
      montoRecibido: parseFloat(formulario.montoRecibido),
      detalles: detalles,
    };

    if (formulario.descuentoSelect === 'xx') {
      delete datos.descuento;
    }
    if (formulario.metodoPago === 'EFECTIVO') {
      delete datos.montoRecibido;
    }
    dispatch(checking());
    try {
      const { data } = await inventarioApi.post('/ventas', datos, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      dispatch(onTrue({ message: data }));
      return data;
    } catch (error) {
      console.log(error);
      dispatch(onFalse(error.response.data));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response.data;
    }
  };

  const updateVentav2 = async (formulario, id) => {

    const detalles = formulario.productoSelect.map(prod => ({
      cantidad: prod.cantidad,
      id_producto: prod.id_producto,
      nombreVariante: prod.variante,
      precio: prod.precio,
      descuento: 0,
      subtotal: prod.subTotal,
      unidad_medida: prod.unidad_medida,
    }))
    // Calcular subtotal
    const calcularSubtal = () => {
      const total = formulario.productoSelect.reduce((acc, producto) => acc + producto.subTotal, 0 || 0).toFixed(2);
      return parseFloat(total);
    };
    const datos = {
      ventaAlContado: true,
      cliente: formulario.cliente,
      fecha: formulario.fecha,
      tipo_pago: formulario.metodoPago,
      total: calcularSubtal(),
      subtotal: calcularSubtal(),
      descuento: formulario.descuentoSelect,
      almacen: formulario.almacen,
      glosa: formulario.glosa,
      montoRecibido: parseFloat(formulario.montoRecibido),
      detalles: detalles,
    };

    if (formulario.descuentoSelect === 'xx') {
      delete datos.descuento;
    }
    if (formulario.metodoPago === 'EFECTIVO') {
      delete datos.montoRecibido;
    }
    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch('/ventas/' + id, datos, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      dispatch(onTrue({ message: data }));

    } catch (error) {
      console.log(error);
      dispatch(onFalse(error.response.data));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response.data;
    }
  };
  const getVentas = async (fechaInicio = null, fechaFin = null) => {
    dispatch(checking());

    try {
      const { data } = await inventarioApi.get(`ventas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
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

  const getVenta = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`ventas/${id}`, {
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
  const getVentaEdit = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`ventas/edit/${id}`, {
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

  const deleteVenta = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.delete(`ventas/${id}`, {
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
      const response = await inventarioApi.get(`/reportes/ventas/${id}`, {
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
      link.setAttribute('download', 'venta.pdf');
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

  const dischargePDFRollo = async (id) => {
    dispatch(checking());
    try {
      const response = await inventarioApi.get(`/reportes/ventas/rollo/${id}`, {
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
  const dischargePDFPedido = async (id, tipo) => {
    dispatch(checking());

    try {
      const response = await inventarioApi.get(`/reportes/pedido/${id}/${tipo}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Cambiar el tipo de respuesta a 'blob' para archivos binarios
      });

      handlePrint(response.data); // Imprimir automáticamente
      dispatch(onTrue({ message: 'Archivo impreso con éxito' }));

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
  const dischargePDFReporte = async (fechaInicio, fechaFin) => {
    dispatch(checking());

    try {
      const response = await inventarioApi.get(`/reportes/ventasFecha?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
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
      link.setAttribute('download', 'reporte-venta.pdf');
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
    errorMessage,
    message,
    //*operaciones
    nuevaVentav2,
    updateVentav2,
    getVentas,
    getVenta,
    getVentaEdit,
    deleteVenta,
    dischargePDF,
    dischargePDFRollo,
    dischargePDFPedido,
    dischargePDFReporte
  }
}
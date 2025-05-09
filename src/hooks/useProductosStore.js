
import { useDispatch, useSelector } from 'react-redux'

import { inventarioApi } from '../api/inventario';
import { checking, clearErrorMessage, onFalse, onTrue } from '../store/functions/authFunctions';

export const useProductosStore = () => {

  const { message, errorMessage } = useSelector(state => state.functions);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  //aqui soran las peticiones a la api los comente por ahora pq aun no hay api
  //tambien llaman a los metodos reducer para cambiar el estado y asignar los valores

  const crearProducto = async (formulario) => {


    const formData = new FormData();
    formData.append('alias', formulario.alias);
    formData.append('descripcion', formulario.descripcion);
    formData.append('unidad_medida', formulario.unidadMedida);
    formData.append('sku', formulario.sku);
    formData.append('categoriaId', formulario.categoria);

    // Agregar variantes (suponiendo que formulario.variantes es un array de objetos)
    formulario.variantes.forEach((variante, index) => {
      formData.append(`variantes[${index}][nombre]`, variante.nombre);
      formData.append(`variantes[${index}][precio]`, parseFloat(variante.precio).toFixed(2));
    });
    // Agregar la imagen si está presente
    if (formulario.img.preview !== 'https://res.cloudinary.com/dsuvpnp9u/image/upload/v1736440720/tli4lpfen5fucruno3l2.jpg') {
      formData.append('file', formulario.img);
    }

    dispatch(checking());

    try {
      const { data } = await inventarioApi.post('/productos', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Importante para enviar archivos
        },
      });

      dispatch(onTrue({ message: data }));
    } catch (error) {
      console.log(error);
      dispatch(onFalse(error.response?.data?.error || 'Error al crear el producto'));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response?.data;
    }
  };

  const updateProducto = async (formulario, id) => {
    // Crear un objeto FormData para manejar los datos y la imagen

    const formData = new FormData();
    formData.append('alias', formulario.alias);
    formData.append('descripcion', formulario.descripcion);
    formData.append('unidad_medida', formulario.unidadMedida);
    formData.append('sku', formulario.sku);
    formData.append('categoriaId', formulario.categoria);

    // Agregar variantes (suponiendo que formulario.variantes es un array de objetos)
    formulario.variantes.forEach((variante, index) => {
      formData.append(`variantes[${index}][nombre]`, variante.nombre);
      formData.append(`variantes[${index}][precio]`, parseFloat(variante.precio).toFixed(2));
    });
    // Agregar la imagen si está presente
    if (formulario.img.preview !== 'https://res.cloudinary.com/dsuvpnp9u/image/upload/v1736440720/tli4lpfen5fucruno3l2.jpg') {
      formData.append('file', formulario.img);
    }

    dispatch(checking());

    try {
      const { data } = await inventarioApi.patch(`/productos/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Importante para enviar archivos
        },
      });

      dispatch(onTrue({ message: data }));
    } catch (error) {
      console.log(error);
      dispatch(onFalse(error.response?.data?.message || 'Error al crear el producto'));

      // Limpia el mensaje de error después de 5 segundos
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5000);
      throw error.response?.data;
    }
  };

  const getProductos = async () => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('productos', {
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
  const getProductosCategoria = async (id_categoria) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get('productos/categoria/' + id_categoria, {
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
  const getProducto = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.get(`productos/${id}`, {
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

  const statusProducto = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.patch(`productos/estado/${id}`, {
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
  const deleteProducto = async (id) => {
    dispatch(checking());
    try {
      const { data } = await inventarioApi.delete(`productos/${id}`, {
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
    crearProducto,
    updateProducto,
    getProductos,
    getProducto,
    getProductosCategoria,
    statusProducto,
    deleteProducto
  }
}

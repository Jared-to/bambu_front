import { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

import { CabezeraTraspaso } from "./components/CabezeraTraspaso"
import { useForm } from "../../../hooks/useForm"
import { TablaProductos } from "./components/TablaProductos"
import { useAlmacenesStore } from "../../../hooks/useAlmacenesStore"
import { useTraspasoStore } from "../../../hooks/useTraspasoStore"
import { formatDateToInput } from "../../helpers/ObtenerFechaHoraLocal";


export const PagNuevoTraspasos = () => {
  //?Estados
  const { id } = useParams();
  const navigate = useNavigate()
  const { crearTraspaso, updateTraspaso, getTraspaso } = useTraspasoStore()
  const { getProductoAlmacen, getAlmacenes } = useAlmacenesStore();
  const [products, setProducts] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [almacenDisabled, setAlmacenDisabled] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { formState, onInputChange, resetForm, setFormState } = useForm({
    fecha: formatDateToInput(new Date()),
    almacenOrigen: '',
    almacenDestino: '',
    glosa: ''
  });
  //?Funciones
  const handleGetData = async () => {
    const data = await getAlmacenes();
    setAlmacenes(data);
  };

  const handleChangeAlmacen = async (e) => {
    const value = e.target.value;
    const products = await getProductoAlmacen(value);

    setProducts(products.inventario);

    onInputChange({ target: { name: 'almacenOrigen', value: value } })
    setAlmacenDisabled(true)
  }

  const handleChangeCant = () => {
    setSelectedProducts([]);
    setAlmacenDisabled(false);
  }
  //traer datos para editar el traspaso
  const handleGetDataEdit = async (id) => {
    const data = await getTraspaso(id);

    setFormState({
      fecha: formatDateToInput(data.fecha) || '',
      almacenOrigen: data.almacenOrigen.id || '',
      almacenDestino: data.almacenDestino.id || '',
      glosa: data.glosa || '',
    })
    const products = await getProductoAlmacen(data.almacenOrigen.id);

    setProducts(products.inventario);

    setSelectedProducts((prev) =>
      data.detalles.map((detalle) => {
        return {
          ...detalle.inventario.product,
          categoria: detalle.inventario.product.categoria,
          id_inventario: detalle.inventario.id,
          cantidad: detalle.cantidad,
          stock: detalle.inventario.stock,
          cantidadOrigin: detalle.cantidad,
        };
      })
    );
    setAlmacenDisabled(true);

  }
  //enviar form
  const handleSaveForm = async (e) => {
    e.preventDefault();

    if (selectedProducts.length === 0) {
      toast.error('Debes seleccionar productos.');
      return;
    }
    if (formState.almacenOrigen === formState.almacenDestino) {
      toast.error('El almacén Origen no puede ser igual al destino.');
      return
    }
    const form = {
      ...formState,
      selectedProducts
    }

    if (id) {
      toast.promise(
        updateTraspaso(form,id),
        {
          loading: "Cargando Petición",
          success: () => {
            navigate('/user/traspasos');
            resetForm();
            handleGetData();
            setAlmacenDisabled(false);
            return "Traspaso editado con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    } else {
      toast.promise(
        crearTraspaso(form),
        {
          loading: "Cargando Petición",
          success: () => {
            navigate('/user/traspasos');
            resetForm();
            handleGetData();
            setAlmacenDisabled(false);
            return "Traspaso creado con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    }
  }
  //efectos
  useEffect(() => {
    handleGetData();
    if (id) {
      handleGetDataEdit(id);
    }
  }, [])


  return (
    <Box>
      <form onSubmit={handleSaveForm}>
        <CabezeraTraspaso
          id={id}
          handleChangeAlmacen={handleChangeAlmacen}
          formState={formState}
          onInputChange={onInputChange}
          almacenes={almacenes}
          almacenDisabled={almacenDisabled}
          handleChangeCant={handleChangeCant}
        />
        <TablaProductos
          products={products}
          typografy={'Nunito'}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
        <Box display={'flex'} justifyContent={'right'} gap={2} mt={2}>
          <Button
            onClick={() => navigate('/user/traspasos')}
            variant="outlined"
            sx={{
              backgroundColor: "white",
              color: "rgb(200, 50, 50)",
              fontWeight: "bold",
              textTransform: "none",
              px: 3,
              py: 0.6,
              borderRadius: 2,
              border: "2px solid rgb(200, 50, 50)",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s, transform 0.2s",
              "&:hover": {
                backgroundColor: "rgba(200, 50, 50, 0.1)",
                borderColor: "rgb(180, 40, 40)",
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "rgb(64, 125, 223)",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              px: 3,
              py: 0.6,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s, transform 0.2s",
              "&:hover": {
                backgroundColor: "rgb(45, 105, 200)",
              },
            }}
          >
            Guardar
          </Button>
        </Box>
      </form >
    </Box >
  )
}

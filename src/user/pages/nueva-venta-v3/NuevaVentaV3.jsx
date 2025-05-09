import { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast";

import { PaperInfo } from "./components/PaperInfo"
import { useClientesStore } from "../../../hooks/useClientesStore";
import { useForm } from "../../../hooks/useForm";
import { SeccionProducts } from "./components/SeccionProducts";
import { useCategoriaStore } from "../../../hooks/useCategoriaStore";
import { useAddTablaVentas } from "./hooks/useAddTablaVentas";
import { useSaleStore } from "../../../hooks/useSaleStore";
import { useAlmacenesStore } from "../../../hooks/useAlmacenesStore";
import { formatDateToInput } from "../../helpers/ObtenerFechaHoraLocal";
import { useCajaStore } from "../../../hooks/useCajaStore";
import { ModalCajaApertura } from "../home/modals/ModalCajaApertura";
import { formatTime } from "../../../helpers/formtTime";
import { useSelector } from "react-redux";
import { useDescuentoStore } from "../../../hooks/useDescuentoStore";

export const NuevaVentaV3 = () => {
  //?Estados
  const { id } = useParams();
  const { load } = useSelector(state => state.functions)
  const sucursal = sessionStorage.getItem('sucursal');
  const { verificarCaja, abrirCaja, cerrarCaja } = useCajaStore();
  const navigate = useNavigate();
  const { traerClientes } = useClientesStore();
  const { getCategorias } = useCategoriaStore();
  const { getAlmacenes, getProductoAlmacen } = useAlmacenesStore()
  const { nuevaVentav2, updateVentav2, getVenta, dischargePDFRollo } = useSaleStore()
  const { getDescuentosActivos } = useDescuentoStore()
  const [clientes, setClientes] = useState([]);
  const [descuentos, setDescuentos] = useState([])
  const [categorias, setCategorias] = useState([]);
  const [productoSelect, setProductoSelect] = useState([]);
  const [products, setProducts] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [contador, setContador] = useState(null); // Tiempo restante en segundos
  const intervalRef = useRef(null); // Para manejar el intervalo
  const [modalCaja, setModalCaja] = useState(false);
  const [sucursalDisabled, setSucursalDisabled] = useState(false);
  const { formState, onInputChange, setFormState, resetForm } = useForm({
    cliente: '',
    metodoPago: 'EFECTIVO',
    total: 0,
    descuento: 0,
    fecha: formatDateToInput(new Date()),
    almacen: sucursal ? sucursal : '',
    descuentoSelect: "xx",
    glosa: "",
    montoRecibido: ""
  })
  //?Funciones
  // traer datos async
  const handleGetData = async () => {
    const data = await traerClientes();
    const categorias = await getCategorias();
    const alm = await getAlmacenes();
    const descuen = await getDescuentosActivos();
    setDescuentos(descuen)
    setClientes(data);
    setCategorias(categorias);
    setAlmacenes(alm);
    if (sucursal) {
      setSucursalDisabled(true)
      onInputChange({ target: { name: 'almacen', value: sucursal } });
      const prod = await getProductoAlmacen(sucursal);
      setProducts(prod.inventario)
    } else {
      setSucursalDisabled(false)
      onInputChange({ target: { name: 'almacen', value: alm[0].id } });
      const prod = await getProductoAlmacen(alm[0].id);
      setProducts(prod.inventario)
    }
    onInputChange({ target: { name: 'cliente', value: data[0].id } });
  }

  //traer datos para editar
  const handleEdit = async () => {
    const venta = await getVenta(id);
    setFormState({
      cliente: venta?.cliente?.id,
      metodoPago: venta?.tipo_pago,
      total: 0,
      descuento: 0,
      fecha: formatDateToInput(venta.fecha),
      glosa: venta.glosa || "",
      descuentoSelect: venta?.descuento?.id || "xx",
      montoRecibido: venta.montoRecibido || 0
    })

    setProductoSelect(prev => {
      return venta.detalles.map(detalle => ({
        ...detalle,
        imagen: detalle.producto.imagen,
        alias: detalle.producto.alias,
        descripcion: detalle.producto.descripcion,
        id_producto: detalle.producto.id,
        precio: detalle.precio,
        variante: detalle.nombreVariante,
        subTotal: detalle.subtotal,
      }))
    }
    )

  }
  //controlar almacen
  const handleChangeAlmacen = async (val) => {

    onInputChange({ target: { name: 'almacen', value: val } });
    const prod = await getProductoAlmacen(val);

    setProducts(prod.inventario)
    setProductoSelect([]);

  }

  // Modal
  const handleOpenModalCaja = () => setModalCaja(true);
  const handleCloseModalCaja = () => setModalCaja(false);
  // Función para iniciar el contador
  const initContador = (fechaInicio) => {
    const inicio = new Date(fechaInicio).getTime();
    const fin = inicio + 24 * 60 * 60 * 1000; // 24 horas en milisegundos

    // Guardar fechaInicio en sessionStorage
    sessionStorage.setItem("contadorInicio", fechaInicio);
    sessionStorage.setItem("contadorFin", fin.toString());

    const tiempoRestante = Math.floor((fin - Date.now()) / 1000); // Diferencia en segundos
    setContador(tiempoRestante);

    // Inicia el intervalo
    startInterval();
  };
  // Función que verifica el estado de la caja y maneja el contador
  const handleVerificarCaja = async () => {
    const data = await verificarCaja(); // Llamada a la API para verificar la caja

    // Si la caja está abierta y tiene una fecha
    if (data?.fecha) {
      const fechaApertura = new Date(data.fecha).getTime();
      const fechaActual = Date.now();
      const tiempoPasado = fechaActual - fechaApertura; // Diferencia en milisegundos
      sessionStorage.setItem('idCaja', data.id_caja)
      // Verificar si han pasado más de 24 horas (24 horas = 24 * 60 * 60 * 1000 ms)
      if (tiempoPasado > 24 * 60 * 60 * 1000) {
        // Si han pasado más de 24 horas, cerrar la caja automáticamente
        await stopContador();

        await toast.promise(
          cerrarCaja(),
          {
            loading: "Cerrando la caja automáticamente...",
            success: () => "Caja cerrada con éxito!",
            error: (err) => `Error: ${err.message}`,
          }
        );
      } else {
        // Si no han pasado 24 horas, iniciar el contador
        initContador(data.fecha);
      }
    } else {
      // Si la caja está cerrada o no existe, detener el contador
      clearInterval(intervalRef.current);
      //limpiar id si la caja ya estaba cerrada por otra persona
      sessionStorage.removeItem("idCaja");

    }
  };

  // Iniciar el intervalo
  const startInterval = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setContador((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            sessionStorage.removeItem("contadorInicio");
            sessionStorage.removeItem("contadorFin");
            intervalRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };
  // Detener el contador y limpiar datos
  const stopContador = async () => {
    await toast.promise(
      cerrarCaja(),
      {
        loading: "Cargando Petición",
        success: (res) => {
          return "Caja Cerrada con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    sessionStorage.removeItem("contadorInicio");
    sessionStorage.removeItem("contadorFin");
    sessionStorage.removeItem("idCaja");
    setContador(null);
  };
  //hooks
  const {
    handleAddProduct,
    handleRemoveProduct,
    handleDecrementQuantity,
    handleIncrementQuantity
  } = useAddTablaVentas(products, productoSelect, setProductoSelect);


  //enviar form
  const handleSaveForm = (e) => {
    e.preventDefault()
    if (load) {
      return
    }
    const form = {
      ...formState,
      productoSelect,

    }
    if (productoSelect.length === 0) {
      toast.error('Debes Seleccionar Productos para Generar una Venta.');
      return;
    }
    if (id) {
      toast.promise(
        updateVentav2(form, id),
        {
          loading: "Cargando Petición",
          success: () => {
            setProductoSelect([]);
            navigate('/user/registros-ventas')
            return "Venta editada con éxito!";
          },
          error: (err) => {
            return `Error: ${err.message}`
          },
        });
    } else {
      toast.promise(
        nuevaVentav2(form),
        {
          loading: "Cargando Petición",
          success: (res) => {
            dischargePDFRollo(res.id);
            setProductoSelect([]);
            setFormState(prev => ({
              ...prev,
              glosa: "",
              descuentoSelect: "xx"
            }))
            return "Venta creada con éxito!";
          },
          error: (err) => {
            return `Error: ${err.message}`
          },
        });
    }
  }

  //efectos
  useEffect(() => {
    handleVerificarCaja();
    handleGetData()
    if (id) {
      handleEdit()
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [])

  return (
    <Box>
      <Box display={{ xs: 'block', md: 'flex' }} justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, fontFamily: "Nunito, sans-serif", color: "#333" }}
          >
            {id ? 'Editar' : 'Nueva'} Venta
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {id ? 'Editar' : 'Crear'} una nueva venta llenando los campos a continuación
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
          {contador ? (
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <Typography fontSize="0.9rem" color="red" fontFamily="Nunito">
                Tiempo:
              </Typography>
              <Typography fontSize="1.5rem" fontFamily="Nunito" fontWeight={700} color="primary">
                {formatTime(contador)}
              </Typography>
            </Box>
          ) : (
            <Typography fontSize="0.9rem" fontFamily="Nunito" color="textSecondary">
              Caja Cerrada
            </Typography>
          )}
          {!contador ?
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "100%",
                marginBottom: "10px",
                "&:hover": {
                  backgroundColor: "#1976d2", // Hover effect
                }
              }}
              onClick={handleOpenModalCaja}
            >
              Abrir Caja
            </Button>
            :
            <Button
              variant="contained"
              color="secondary"
              sx={{
                width: "100%",
                "&:hover": {
                  backgroundColor: "#d32f2f", // Hover effect
                }
              }}
              onClick={stopContador}
            >
              Cerrar Caja
            </Button>
          }
        </Box>
      </Box>
      <Grid container mt={1} spacing={2}>
        <Grid item xs={12} md={5}>
          <PaperInfo
            sucursalDisabled={sucursalDisabled}
            onChangeAlmacen={handleChangeAlmacen}
            formState={formState}
            onInputChange={onInputChange}
            clientes={clientes}
            almacenes={almacenes}
            productoSelect={productoSelect}
            handleRemoveProduct={handleRemoveProduct}
            handleDecrementQuantity={handleDecrementQuantity}
            handleIncrementQuantity={handleIncrementQuantity}
            handleSaveForm={handleSaveForm}
            load={load}
            descuentos={descuentos}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <SeccionProducts
            handleAddProduct={handleAddProduct}
            categorias={categorias}
            setProducts={setProducts}
            products={products}
          />
        </Grid>
      </Grid>
      <ModalCajaApertura open={modalCaja} handleClose={handleCloseModalCaja} abrirCaja={abrirCaja} inicialContador={initContador} />
    </Box>
  )
}

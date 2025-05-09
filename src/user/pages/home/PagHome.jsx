import { useEffect, useRef, useState } from "react";

import { Box, Grid, Typography } from "@mui/material";
import CardInfo from "./components/CardInfo";
import toast from "react-hot-toast";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import GroupIcon from '@mui/icons-material/Group';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { useSelector } from "react-redux";

import { Caja } from "./components/Caja";
import { useCajaStore } from "../../../hooks/useCajaStore";
import { ModalCajaApertura } from "./modals/ModalCajaApertura";
import { useInicioStore } from "../../../hooks/useInicioStore";
import { HeadHome } from "./components/HeadHome";
import { PaperClients } from "./components/PaperClients";
import { PaperVentas } from "./components/PaperVentas";
import { Chart } from "./components/Chart";
import { CajaEdit } from "./components/CajaEdit";
import { CajaChart } from "./components/CajaChart";
import { BartSucursales } from "./components/BartSucursales";

export const PagHome = () => {
  //? Estados
  const { user } = useSelector(state => state.auth)
  const caja = sessionStorage.getItem('idCajaEdit');
  const { verificarCaja, abrirCaja, cerrarCaja, cerrarCajaReabierta } = useCajaStore();
  const { getDatos } = useInicioStore()
  const [datos, setDatos] = useState({});
  const [modalCaja, setModalCaja] = useState(false);
  const [contador, setContador] = useState(null); // Tiempo restante en segundos
  const intervalRef = useRef(null); // Para manejar el intervalo

  //? Funciones

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
  //traer datos generales 
  const handleGetData = async () => {
    const data = await getDatos();

    setDatos(data)
  }
  const cerrarCajaEdit = async () => {
    await toast.promise(
      cerrarCajaReabierta(),
      {
        loading: "Cargando Petición",
        success: () => {
          cerrarCajaReabierta();
          return "Caja cerrada con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );

  }
  //efectos
  useEffect(() => {
    handleVerificarCaja();
    handleGetData()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  const cuadros = [
    {
      descripcion: 'Ventas Hechas',
      data: datos?.generales?.numVentas,
      bgColor: '#0d6efd',
      icon: AddShoppingCartIcon,
      color: 'white',
      link: 'registros-ventas'
    },
    {
      descripcion: 'Gastos Hechos',
      data: datos?.generales?.numGastos,
      bgColor: '#0dcaf0',
      icon: MoneyOffIcon,
      color: 'white',
      link: 'gastos'
    },
    {
      descripcion: 'Clientes Registrados',
      data: datos?.generales?.numClientes,
      bgColor: '#ffc107',
      icon: GroupIcon,
      color: 'white',
      link: 'clientes'
    },
    {
      descripcion: 'Productos',
      data: datos?.generales?.numProducts,
      icon: ViewInArIcon,
      bgColor: '#dc3545',
      color: 'white',
      link: 'productos'
    }
  ]
  return (
    <Box>
      {/* <Typography textAlign={'center'} fontFamily={'Nunito'} fontWeight={500} variant="h5">
      INICIO
    </Typography> */}
      {/* <HeadHome /> */}
      {
        user.rol === 'admin' &&
        <Grid container spacing={2}>
          {cuadros.map((cuadro, index) => (
            <Grid item key={index} xs={12} md={6} lg={3}>
              <CardInfo description={cuadro.descripcion} number={cuadro.data} bgColor={cuadro.bgColor} colorText={cuadro.color} link={cuadro.link} Icon={cuadro.icon} />
            </Grid>
          ))}
        </Grid>
      }
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6} >
          <Caja handleOpenModalCaja={handleOpenModalCaja} contador={contador} handleStopContador={stopContador} />
          {caja &&
            <CajaEdit handleStopContador={cerrarCajaEdit} />
          }
        </Grid>
        <Grid item xs={12} md={6}>
          {
            user.rol === 'admin' &&
            <PaperVentas data={datos.ultimasVentas} />

          }
        </Grid>
        <Grid item xs={12} md={6}>
          {
            user.rol === 'admin' &&
            <Chart data={datos?.productosMasVendidos} />

          }
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <CajaChart />
        </Grid>
        <Grid item xs={12}>
          <BartSucursales />
        </Grid> */}
      </Grid>
      <ModalCajaApertura open={modalCaja} handleClose={handleCloseModalCaja} abrirCaja={abrirCaja} inicialContador={initContador} />
    </Box>
  );
};

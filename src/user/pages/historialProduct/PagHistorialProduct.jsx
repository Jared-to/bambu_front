import { useEffect, useState } from "react";
import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { useParams } from "react-router-dom";

import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';

import { TextFieldComponent } from "../../components/TextFieldComponent";
import { useForm } from "../../../hooks/useForm";
import { TablaIngresos } from "./components/TablaIngresos";
import { TablaSalidas } from "./components/TablaSalidas";
import { useInventarioStore } from "../../../hooks/useInventarioStore";
import { useProductosStore } from "../../../hooks/useProductosStore";
import { CuadrosInfo } from "../../elements/CuadrosInfo";

const styleTableBody = {
  fontFamily: "Nunito, sans-serif",
  fontSize: "0.95rem",
  color: "#555",
  maxWidth: 150,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "10px",
};

export const PagHistorialProduct = () => {
  //?estados
  const { id } = useParams();
  const { getInventarioInfo, getMovimientosProduct } = useInventarioStore();
  const { getProducto } = useProductosStore()
  const [info, setInfo] = useState({})
  const [entradas, setEntradas] = useState([]);
  const [salidas, setSalidas] = useState([]);
  const [totales, setTotales] = useState({ ingresos: 0, salidas: 0 })

  const { formState, onInputChange } = useForm({
    fechaIn: new Date().toISOString().split('T')[0],
    fechaFn: new Date().toISOString().split('T')[0],
  });
  //?funciones
  //datos generales
  const handleGetData = async (id) => {
    const data = await getProducto(id);
    setInfo(data)
  }
  //movimientos
  const handleGetMovimientos = async (e) => {
    e.preventDefault()
    const data = await getMovimientosProduct(
      id,
      formState.fechaIn, formState.fechaFn)
    const filter1 = data.filter(state => state.tipo === 'ingreso');
    const filter2 = data.filter(state => state.tipo !== 'ingreso');
      
    setEntradas(filter1);
    setSalidas(filter2);

  }
  const handleGetMovimientosIn = async (id) => {
    const data = await getMovimientosProduct(
      id,
      formState.fechaIn, formState.fechaFn)
    const filter1 = data.filter(state => state.tipo === 'ingreso');
    const filter2 = data.filter(state => state.tipo !== 'ingreso');

    setEntradas(filter1);
    setSalidas(filter2);

  }
  //efecto
  useEffect(() => {
    if (id) {
      handleGetData(id);
      handleGetMovimientosIn(id)
    }
  }, []);

  useEffect(() => {
    const total = {
      ingresos: 0,
      salidas: 0
    }
    entradas.forEach(ent => {
      total.ingresos += ent.cantidad
    })
    salidas.forEach(ent => {
      total.salidas += ent.cantidad
    })

    setTotales(total);

  }, [entradas])


  return (
    <Box sx={{ p: 3 }}>
      {/* Paper con la información del producto */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderTop: '4px solid #bfc9d9',
          borderRadius: 2, // Bordes redondeados para mayor estética
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: 'Nunito, sans-serif', // Fuente personalizada
            fontWeight: 600, // Peso para destacar el título
            color: 'text.primary',
          }}
        >
          Información del Producto
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 500,
            color: 'text.secondary', // Colores secundarios para texto descriptivo
            mt: 1, // Espaciado superior
          }}
        >
          <strong>Producto:</strong> {info?.alias}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 500,
            color: 'text.secondary', // Colores secundarios para texto descriptivo
            mt: 1, // Espaciado superior
          }}
        >
          <strong>Descripción:</strong> {info?.descripcion}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 500,
            color: 'text.secondary',
            mt: 1,
          }}
        >
          <strong>SKU:</strong> {info?.sku}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 500,
            color: 'text.secondary',
            mt: 1,
          }}
        >
          <strong>Categoria:</strong> {info?.categoria?.nombre}
        </Typography>
      </Paper>


      {/* Filtros de fechas */}
      <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filtrar por Fechas
        </Typography>
        <form onSubmit={handleGetMovimientos}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography fontFamily={'Nunito'} fontWeight={500}>Fecha Inicio</Typography>
              <TextFieldComponent
                formState={formState}
                onInputChange={onInputChange}
                name="fechaIn"
                type={"date"}
                small
                requerid
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography fontFamily={'Nunito'} fontWeight={500}>Fecha Fin</Typography>
              <TextFieldComponent
                formState={formState}
                onInputChange={onInputChange}
                name="fechaFn"
                type={"date"}
                small
                requerid
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" size="small" sx={{ mt: 1 }}>
            Generar
          </Button>
        </form>
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CuadrosInfo dato={totales?.ingresos || 0} titulo={'Total Ingresos'} Icon={VerticalAlignTopIcon} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CuadrosInfo dato={totales?.salidas || 0} titulo={'Total Salidas'} Icon={VerticalAlignBottomIcon} />
        </Grid>
      </Grid>

      {/* Tablas de ingresos y salidas */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontFamily={'Nunito'} gutterBottom>
            Ingresos
          </Typography>
          <TablaIngresos data={entradas} styleTableBody={styleTableBody} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontFamily={'Nunito'} gutterBottom>
            Salidas
          </Typography>
          <TablaSalidas data={salidas} styleTableBody={styleTableBody} />
        </Grid>
      </Grid>
    </Box>
  );
};

import { useEffect, useState } from "react";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { useForm } from "../../../hooks/useForm";
import { TextFieldComponent } from "../../components/TextFieldComponent";
import { useActivosStore } from "../../../hooks/useActivosStore";
import { TablaEgresosActivos } from "./components/TablaEgresosActivos";
import { TablaIngresoActivos } from "./components/TablaIngresoActivos";

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

export const PagActivosMovimientos = () => {
  //?Estados
  const { id } = useParams()
  const { getActivo, getMovimientosActivo, getMovimientosActivoFechas } = useActivosStore()

  const [info, setInfo] = useState({})
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([])
  const { formState, onInputChange } = useForm({
    fechaIn: new Date().toISOString().split('T')[0],
    fechaFn: new Date().toISOString().split('T')[0],
  });
  //traer datos iniciales
  const handleGetData = async () => {
    const data = await getActivo(id);
    setInfo(data);
    //traer datos iniciales ingreso y egreso
    const datos = await getMovimientosActivo(id);
    const ing = datos.filter(dat => (dat.tipo === 'ingreso'));
    const egre = datos.filter(dat => (dat.tipo !== 'ingreso'));
    setIngresos(ing);
    setEgresos(egre);
  }
  // por fechas
  const handleGetMovientosFechas = async (e) => {
    e.preventDefault();
    const datos = await getMovimientosActivoFechas(id, formState.fechaIn, formState.fechaFn);
    const ing = datos.filter(dat => (dat.tipo === 'ingreso'));
    const egre = datos.filter(dat => (dat.tipo !== 'ingreso'));
    setIngresos(ing);
    setEgresos(egre);
  }
  //efecto
  useEffect(() => {
    if (id) {
      handleGetData()
    }
  }, [])


  return (
    <Box>
      {/* Paper con la información del producto */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderTop: '4px solid #bfc9d9',
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 600,
            color: 'text.primary',
            textAlign: 'center', // Centrar el título
            mb: 2, // Espaciado inferior
          }}
        >
          Información del Activo
        </Typography>

        <Grid container spacing={2}>
          {/* Primera columna */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 500,
                color: 'text.secondary',
                mt: 1,
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
              <strong>Marca:</strong> {info?.marca}
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
              <strong>Proveedor:</strong> {info?.categoria?.nombre}
            </Typography>
          </Grid>

          {/* Segunda columna */}
          <Grid item xs={12} sm={6}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 500,
                color: 'text.secondary',
                mt: 1,
              }}
            >
              <strong>Tipo:</strong> {info?.tipo}
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
              <strong>Fecha de Adquisición:</strong>{' '}
              {new Date(
                new Date(info.fechaAdquisicion).setDate(
                  new Date(info.fechaAdquisicion).getDate() + 1
                )
              ).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </Typography>
            {info.tipo !== 'noperecedero' &&
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 500,
                  color: 'text.secondary',
                  mt: 1,
                }}
              >
                <strong>Fecha de Vencimiento:</strong>{' '}
                {new Date(
                  new Date(info.fechaVencimiento).setDate(
                    new Date(info.fechaVencimiento).getDate() + 1
                  )
                ).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </Typography>
            }
          </Grid>
        </Grid>
      </Paper>


      {/* Filtros de fechas */}
      <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filtrar por Fechas
        </Typography>
        <form onSubmit={handleGetMovientosFechas}>
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
      <Grid container>
        <Grid item xs={12}>
          <Typography textAlign={'center'} fontFamily={'Nunito'} fontWeight={600} gutterBottom>
            INGRESOS
          </Typography>
          <TablaIngresoActivos data={ingresos} styleTableBody={styleTableBody} />
        </Grid>
        <Grid item xs={12}>
          <Typography textAlign={'center'} fontFamily={'Nunito'} fontWeight={600} gutterBottom>
            EGRESOS
          </Typography>
          <TablaEgresosActivos data={egresos} styleTableBody={styleTableBody} />
        </Grid>
      </Grid>
    </Box>
  )
}

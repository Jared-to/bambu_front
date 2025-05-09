import { useEffect, useState } from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { CabezeraPerfil } from './components/CabezeraPerfil'
import { TablaVentasCliente } from './components/TablaVentasCliente'
import { TablaCuotasCliente } from './components/TablaCuotasCliente'
import { TextFieldComponent } from '../../components/TextFieldComponent'
import { useForm } from '../../../hooks/useForm'
import { useClientesStore } from '../../../hooks/useClientesStore'

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
export const PagPerfilCliente = () => {
  //?Estados
  const { id } = useParams()
  const [cliente, setCliente] = useState({});
  const [ventas, setVentas] = useState([]);
  const [cobros, setCobros] = useState([]);
  const { traerPerfilCliente, traerPerfilClienteFechas } = useClientesStore();
  const { formState, onInputChange } = useForm({
    fechaIn: new Date().toISOString().split('T')[0],
    fechaFn: new Date().toISOString().split('T')[0],
  });
  //Funciones
  const handleGetDataInicial = async (id) => {
    const data = await traerPerfilCliente(id);

    setCliente(data.cliente);
    setVentas(data.ventas);
    setCobros(data.cobros)
  }
  const handleGetData = async (e) => {
    e.preventDefault();
    const data = await traerPerfilClienteFechas(id, formState.fechaIn, formState.fechaFn);

    setCliente(data.cliente);
    setVentas(data.ventas);
    setCobros(data.cobros)
  }

  //efectos
  useEffect(() => {
    if (id) {
      handleGetDataInicial(id)
    }
  }, [])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CabezeraPerfil data={cliente} />
        </Grid>
        <Grid item xs={12}>
          {/* Filtros de fechas */}
          <Paper elevation={0} sx={{ p: 2, mb: 3, borderTop: '4px solid rgb(130, 141, 158)' }}>
            <Typography variant="h6" gutterBottom>
              Filtrar por Fechas
            </Typography>
            <form onSubmit={handleGetData}>
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
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2,borderTop: '4px solid rgb(155, 97, 230)' }} elevation={0}>
            <Typography variant='h5' textAlign={'center'} fontFamily={'Nunito'}>
              Ventas
            </Typography>
            <TablaVentasCliente data={ventas} styleTableBody={styleTableBody} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2,borderTop: '4px solid rgb(185, 212, 87)' }} elevation={0}>
            <Typography variant='h5' textAlign={'center'} fontFamily={'Nunito'}>
              Cobros Hechos
            </Typography>
            <TablaCuotasCliente data={cobros} styleTableBody={styleTableBody} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

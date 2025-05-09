import { useEffect, useState } from 'react'
import { Box, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'

import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import QrCodeIcon from '@mui/icons-material/QrCode';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PaymentIcon from '@mui/icons-material/Payment';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import { fechaFormateada } from '../../helpers/ObtenerFechaActualText'
import { HeaderRecordSucursales } from './components/HeaderRecordSucursales'
import { manejarRangosFechas } from '../../helpers/manejarRangosFechas'
import { useAlmacenesStore } from '../../../hooks/useAlmacenesStore'
import { useForm } from '../../../hooks/useForm'
import { useUserStore } from '../../../hooks/useUserStore'
import { CuadrosInfo } from '../../elements/CuadrosInfo'
import { TablaVentasReporte } from './components/TablaVentasReporte';
import { TablaGastosReporte } from './components/TablaGastosReporte';
import { useReportStore } from '../../../hooks/useReportStore';

export const PagReporteSucursales = () => {
  //?Estados
  const { getAlmacenes } = useAlmacenesStore();
  const { getUsers } = useUserStore();
  const { getGeneral } = useReportStore()
  const [sucursales, setSucursales] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [ventas, setVentas] = useState([])
  const [totals, setTotals] = useState({
    totalVEfec: 0,
    totalVQr: 0,
    totalVNeto: 0,
    totalGEfec: 0,
    totalGQr: 0,
    totalGNeto: 0,
    totalNeto: 0
  })
  const { formState, onInputChange } = useForm({
    almacen: "xx",
    usuario: "xx"
  })

  //?Funciones
  //traer datos principales
  const handleGetDataPR = async () => {
    const data = await getAlmacenes();
    const users = await getUsers()
    setSucursales(data);
    setUsuarios(users);
  }
  const handleGetDataFech = async (startDat, endDat) => {
    handleGetData(startDat, endDat, formState.almacen, formState.usuario)
  }
  const handleGetDataFechas = async (e) => {
    e.preventDefault()
    handleGetData(startDate, endDate, formState.almacen, formState.usuario)
  }
  //control de fechas
  const { endDate, handlePeriodClick, setEndDate, setStartDate, startDate } = manejarRangosFechas(handleGetDataFech)

  //traer datos async
  const handleGetData = async (fechaIn = 'xx', fechaFn = 'xx', almacen, usuario) => {
    let totalVEfec = 0;
    let totalVQr = 0;
    let totalVNeto = 0;
    let totalGEfec = 0;
    let totalGQr = 0;
    let totalGNeto = 0;
    const data = await getGeneral(fechaIn, fechaFn, almacen, usuario);
    setGastos(data.gastos);
    setVentas(data.ventas);

    data.ventas.forEach((venta) => {
      if (venta.tipo_pago === 'EFECTIVO') {
        totalVEfec += venta.total;
      } else if (venta.tipo_pago === 'QR') {
        
        totalVQr += venta.total;
      }
      totalVNeto += venta.total;
    });

    data.gastos.forEach((gasto) => {
      if (gasto.tipo_pago === 'EFECTIVO') {
        totalGEfec += gasto.monto;
      } else if (gasto.tipo_pago === 'QR') {
        totalGQr += gasto.monto;
      }
      totalGNeto += gasto.monto;
    });
    setTotals({
      totalVEfec,
      totalVQr,
      totalVNeto,
      totalGEfec,
      totalGQr,
      totalGNeto,
      totalNeto: totalVEfec - totalGNeto
    });
  }
  useEffect(() => {
    handleGetDataPR()
    handleGetData(startDate, endDate, formState.almacen, formState.usuario)
  }, [])

  useEffect(() => {
    handleGetData(startDate, endDate, formState.almacen, formState.usuario)

  }, [formState.almacen, formState.usuario])


  return (
    <Box>
      <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'} justifyContent={{ xs: "center", md: 'space-between' }}>
        <Typography variant="h5" fontWeight={600} fontFamily={'Nunito'} gutterBottom>
          Reporte en {fechaFormateada}
        </Typography>
        <Box display={'flex'} gap={2} width={{ xs: '100%', md: '30%' }}>
          <Box width={'50%'}>
            <Typography fontSize={'0.9rem'} fontWeight={600} fontFamily={'Nunito'}>
              Sucursal
            </Typography>
            <FormControl fullWidth>
              <Select
                size="small"
                onChange={onInputChange}
                name="almacen"
                value={formState.almacen}
                required
              >
                <MenuItem value={"xx"}>Todas</MenuItem>
                {
                  sucursales.map(almc => (
                    <MenuItem key={almc.id} value={almc.id}>{almc.nombre}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
          <Box width={'50%'}>
            <Typography fontSize={'0.9rem'} fontWeight={600} fontFamily={'Nunito'}>
              Usuarios
            </Typography>
            <FormControl fullWidth>
              <Select
                size="small"
                onChange={onInputChange}
                name="usuario"
                value={formState.usuario}
                required
              >
                <MenuItem value={"xx"}>Todos</MenuItem>
                {
                  usuarios.map(almc => (
                    <MenuItem key={almc.id} value={almc.id}>{almc.fullName}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      {/* cabecera */}
      <HeaderRecordSucursales startDate={startDate} setStartDate={setStartDate} setEndDate={setEndDate} endDate={endDate} handlePeriodClick={handlePeriodClick} handleGetData={handleGetDataFechas} />

      <Grid container spacing={2} mb={5}>
        <Grid item xs={12} md={4}>
          <CuadrosInfo dato={totals.totalVQr.toFixed(2)} titulo={'Total Ventas QR'} Icon={QrCodeIcon} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CuadrosInfo dato={totals.totalVEfec.toFixed(2)} titulo={'Total Ventas Efectivo'} Icon={RequestQuoteIcon} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CuadrosInfo dato={totals.totalVNeto.toFixed(2)} titulo={'Total Ventas'} Icon={PaymentIcon} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CuadrosInfo dato={totals.totalGQr.toFixed(2)} titulo={'Total Gastos QR'} Icon={QrCodeIcon} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CuadrosInfo dato={totals.totalGEfec.toFixed(2)} titulo={'Total Gastos Efectivo'} Icon={RequestQuoteIcon} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CuadrosInfo dato={totals.totalGNeto.toFixed(2)} titulo={'Total Gastos'} Icon={PaymentIcon} />
        </Grid>
        <Grid item xs={12} md={12}>
          <CuadrosInfo dato={totals.totalNeto.toFixed(2)} titulo={'Total Neto'} Icon={PointOfSaleIcon} />
        </Grid>
      </Grid>
      <Typography textAlign={'center'} fontSize={'2rem'} fontFamily={'Nunito'} fontWeight={600} gutterBottom>
        Reporte
      </Typography>
      <Box>
        <Typography fontFamily={'Nunito'} fontWeight={600} gutterBottom>
          Ventas
        </Typography>
        <TablaVentasReporte data={ventas} />
      </Box>
      <Box>
        <Typography fontFamily={'Nunito'} fontWeight={600} gutterBottom>
          Gastos
        </Typography>
        <TablaGastosReporte data={gastos} />
      </Box>
    </Box>
  )
}

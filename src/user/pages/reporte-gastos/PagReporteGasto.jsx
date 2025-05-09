import { useEffect, useState } from "react";
import { Box, Divider, FormControl, Grid, IconButton, MenuItem, Pagination, Paper, Select, Tooltip, Typography } from "@mui/material"
import { useSelector } from "react-redux";

import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import QrCodeIcon from '@mui/icons-material/QrCode';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PaymentIcon from '@mui/icons-material/Payment';

import pdf from "../../../../public/icons/pdf.svg";
import { CuadrosInfo } from "../../elements/CuadrosInfo"
import { Filter } from "../../components/Filter.component";
import { fechaFormateada } from "../../helpers/ObtenerFechaActualText";
import { usePagination } from "../../../hooks/usePagination";
import { manejarRangosFechas } from "../../helpers/manejarRangosFechas";
import { useGastosStore } from "../../../hooks/useGastosStore";
import { HeaderRecordsGasto } from "./components/HeaderRecordsGasto";
import { TableGastos } from "./components/TableGastos";
import { useUserStore } from "../../../hooks/useUserStore";


export const PagReporteGasto = () => {
  //?estados
  const { getGastos, dischargePDFReporte } = useGastosStore()
  const { getUsers } = useUserStore()
  const { user } = useSelector(state => state.auth);
  const [gastos, setGastos] = useState([]);
  const [users, setUsers] = useState([]);
  const [userSelect, setUserSelect] = useState("");
  const [selectMetodoPago, setSelectMetodoPago] = useState("")
  const [totals, setTotals] = useState({
    totalEfec: 0,
    totalQr: 0,
    totalNeto: 0
  })
  const handleGetDataFech = async (startDat, endDat) => {
    handleGetData(startDat, endDat)
  }
  //hooks de filtrado
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(gastos, 'codigo', 5)
  //control de fechas
  const { endDate, handlePeriodClick, setEndDate, setStartDate, startDate } = manejarRangosFechas(handleGetDataFech)
  //?Funciones

  //traer datos async
  const handleGetData = async (fechaIn = 'xx', fechaFn = 'xx') => {

    const data = await getGastos(fechaIn, fechaFn);
    // Aplicar filtro por usuario si se ha seleccionado uno
    const filteredData = userSelect ? data.filter(gasto => gasto.usuario.id === userSelect) : data;

    const filteredData2 = selectMetodoPago ? filteredData.filter(venta => venta.tipo_pago === selectMetodoPago) : filteredData;

    setGastos(filteredData2);
    calculateTotals(filteredData2)
  }
  const handleGetDataFechas = async (e) => {
    e.preventDefault()
    handleGetData(startDate, endDate)
  }
  const handleGetUsers = async () => {
    if (user.rol === 'admin') {
      const data = await getUsers();
      setUsers(data)
    }
  }
  // Calcular los totales
  const calculateTotals = (data) => {
    let totalEfec = 0;
    let totalQr = 0;
    let totalNeto = 0;

    data.forEach((gasto) => {
      if (gasto.tipo_pago === 'EFECTIVO') {
        totalEfec += gasto.monto;
      } else if (gasto.tipo_pago === 'QR') {
        totalQr += gasto.monto;
      }
      totalNeto += gasto.monto;
    });

    setTotals({
      totalEfec,
      totalQr,
      totalNeto
    });
  }
  //descargar pdf de reporte
  const handleDischargPDF = async () => {
    await dischargePDFReporte(startDate, endDate);
  }
  //efectos
  useEffect(() => {

    handleGetData(startDate, endDate)
    handleGetUsers()
  }, [])

  useEffect(() => {
    handleGetData(startDate, endDate)
  }, [userSelect, selectMetodoPago])

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} fontFamily={'Nunito'} gutterBottom>
        Gastos en {fechaFormateada}
      </Typography>
      {/* cabecera */}
      <HeaderRecordsGasto startDate={startDate} setStartDate={setStartDate} setEndDate={setEndDate} endDate={endDate} handlePeriodClick={handlePeriodClick} handleGetDataFechas={handleGetDataFechas} />

      <Grid container spacing={2} mb={5}>
        <Grid item xs={12} md={4}>
          <CuadrosInfo dato={totals.totalQr} titulo={'Total Gastos QR'} Icon={QrCodeIcon} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CuadrosInfo dato={totals.totalEfec} titulo={'Total Gastos Efectivo'} Icon={RequestQuoteIcon} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CuadrosInfo dato={totals.totalNeto} titulo={'Total Neto'} Icon={PaymentIcon} />
        </Grid>
      </Grid>
      {/* cuerpo */}
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter message={'Total Gastos'} totalMessage={gastos.length} nameSearch="codigo" changeSearch={setSearchName} valueSearch={searchName} Icon={ViewInArOutlinedIcon} />
        <Divider sx={{ mt: 2 }} />
        {user.rol === 'admin' &&
          <Box mt={1} display={'flex'} justifyContent={'space-between'}>
            <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
              <Box>
                <Typography fontFamily={'Nunito'}>Filtrar por Vendedor</Typography>
                <FormControl sx={{ width: 250 }}>
                  <Select
                    size="small"
                    value={userSelect}
                    onChange={(e) => {
                      setUserSelect(e.target.value);
                    }}
                  >
                    <MenuItem value={""}>Todos los Vendedores</MenuItem>
                    {users.map(user => (
                      <MenuItem key={user.id} value={user.id}>{user.fullName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography fontFamily={'Nunito'}>Filtrar por Metodo de Pago</Typography>
                <FormControl sx={{ width: 250 }}>
                  <Select
                    size="small"
                    value={selectMetodoPago}
                    onChange={(e) => {
                      setSelectMetodoPago(e.target.value);
                    }}
                  >
                    <MenuItem value={""}>Todos los Gastos</MenuItem>
                    <MenuItem value={"EFECTIVO"}>Efectivo</MenuItem>
                    <MenuItem value={"QR"}>QR</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box>
              <Tooltip title="Descargar (PDF)" placement="top">
                <IconButton
                  onClick={() => handleDischargPDF()}
                  sx={{
                    backgroundColor: "#f1f1f1",
                    borderRadius: 1,
                    padding: 1,
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <img src={pdf} alt="PDF" style={{ width: 20, height: 20 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        }
        <TableGastos paginated={paginatedData} />
      </Paper>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  )
}

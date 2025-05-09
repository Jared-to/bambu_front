import { useEffect, useState } from "react";
import { Box, Divider, FormControl, Grid, IconButton, MenuItem, Pagination, Paper, Select, Tooltip, Typography } from "@mui/material"
import { useSelector } from "react-redux";

import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import QrCodeIcon from '@mui/icons-material/QrCode';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PaymentIcon from '@mui/icons-material/Payment';

import pdf from "../../../../public/icons/pdf.svg";
import { usePagination } from "../../../hooks/usePagination"
import { Filter } from "../../components/Filter.component";
import HeaderRecordsSale from "./components/HeaderRecordsSale";
import { useSaleStore } from "../../../hooks/useSaleStore";
import { TablaVentas } from "./components/TablaVentas";
import { manejarRangosFechas } from "../../helpers/manejarRangosFechas";
import { CuadrosInfo } from "../../elements/CuadrosInfo";
import { fechaFormateada } from "../../helpers/ObtenerFechaActualText";
import { useUserStore } from "../../../hooks/useUserStore";



export const PagRegistrosVentas = () => {
  //?Estados
  const { getVentas, getVentaEdit, deleteVenta, dischargePDF, dischargePDFRollo, dischargePDFReporte } = useSaleStore();
  const { getUsers } = useUserStore()
  const [ventas, setVentas] = useState([]);
  const { user } = useSelector(state => state.auth);
  const [orderDirection, setOrderDirection] = useState('desc');
  const [orderPaginated, setOrderPaginated] = useState([])
  const [users, setUsers] = useState([]);
  const [userSelect, setUserSelect] = useState("");
  const [selectMetodoPago, setSelectMetodoPago] = useState("")
  const [totals, setTotals] = useState({
    totalEfec: 0,
    totalQr: 0,
    totalNeto: 0
  })
  const handleGetDataFech = (startDat, endDat) => {

    handleGetData(startDat, endDat)
  }
  //hooks
  //hooks de filtrado
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(orderPaginated, 'codigo', 5)
  //control de fechas
  const { endDate, handlePeriodClick, setEndDate, setStartDate, startDate } = manejarRangosFechas(handleGetDataFech)
  //?funciones
  //traer datos async
  const handleGetData = async (fechaIn = 'xx', fechaFn = 'xx') => {
    const data = await getVentas(fechaIn, fechaFn);
    
    // Aplicar filtro por vendedor si se ha seleccionado uno
    const filteredData = userSelect ? data.filter(venta => venta.vendedor.id === userSelect) : data;

    const filteredData2 = selectMetodoPago ? filteredData.filter(venta => venta.tipo_pago === selectMetodoPago) : filteredData;

    setVentas(filteredData2);
    setOrderPaginated(filteredData2);
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
  //descargar pdf de reporte
  const handleDischargeReportPDF = async () => {
    await dischargePDFReporte(startDate, endDate)
  }
  // Calcular los totales
  const calculateTotals = (data) => {
    let totalEfec = 0;
    let totalQr = 0;
    let totalNeto = 0;

    data.forEach((venta) => {
      if (venta.tipo_pago === 'EFECTIVO') {
        totalEfec += venta.total;
      } else if (venta.tipo_pago === 'QR') {
        totalQr += venta.total;
      }
      totalNeto += venta.total;
    });

    setTotals({
      totalEfec,
      totalQr,
      totalNeto
    });
  };
  //reodernar
  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
    setOrderPaginated(prevRecords => {
      return [...ventas].sort((a, b) => {
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);

        return orderDirection === 'asc' ? dateB - dateA : dateA - dateB;
      });
    });
  };

  //efectos
  useEffect(() => {
    handleGetData(startDate, endDate);
    handleGetUsers()
  }, [])

  useEffect(() => {
    handleGetData(startDate,endDate)
  }, [userSelect, selectMetodoPago])



  return (
    <Box>
      <Typography variant="h5" fontWeight={600} fontFamily={'Nunito'} gutterBottom>
        Ventas en {fechaFormateada}
      </Typography>
      {/* cabecera */}
      <HeaderRecordsSale startDate={startDate} setStartDate={setStartDate} setEndDate={setEndDate} endDate={endDate} handlePeriodClick={handlePeriodClick} handleGetDataFechas={handleGetDataFechas} />
      <Grid container spacing={2} mb={5}>
        <Grid item xs={12} md={4}>
          <CuadrosInfo dato={totals.totalQr} titulo={'Total Ventas QR'} Icon={QrCodeIcon} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CuadrosInfo dato={totals.totalEfec} titulo={'Total Ventas Efectivo'} Icon={RequestQuoteIcon} />
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
        <Filter message={'Total Ventas'} totalMessage={ventas.length} nameSearch="codigo" changeSearch={setSearchName} valueSearch={searchName} Icon={ViewInArOutlinedIcon} />
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
                    <MenuItem value={""}>Todos las Ventas</MenuItem>
                    <MenuItem value={"EFECTIVO"}>Efectivo</MenuItem>
                    <MenuItem value={"QR"}>QR</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box>
              <Tooltip title="Descargar (PDF)" placement="top">
                <IconButton
                  onClick={()=>handleDischargeReportPDF()}
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
        <TablaVentas paginated={paginatedData} getVenta={getVentaEdit} eliminarVenta={deleteVenta} handleGetData={handleGetData} dischargePDF={dischargePDF} dischargePDFRollo={dischargePDFRollo} handleSort={handleSort} orderDirection={orderDirection} />
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

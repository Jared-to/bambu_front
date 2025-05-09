import { useEffect, useState } from "react"
import { Box, Pagination, Paper, Tab, Tabs } from "@mui/material";
import { useSelector } from "react-redux";

import FilterFramesIcon from '@mui/icons-material/FilterFrames';

import { usePagination } from "../../../hooks/usePagination";
import { Head } from "../../components/Head.component";
import { Filter } from "../../components/Filter.component";
import { TablaPedidosAceptados } from "./components/TablaPedidosAceptados";
import { usePedidosStore } from "../../../hooks/usePedidosStore";
import { PagPedidosPendientes } from "../pedidosPendientes/PagPedidosPendientes";
import { PagPedidosCancelados } from "../pedidosCancelados/PagPedidosCancelados";
import { PedidosEntregados } from "./components/PedidosEntregados";


export const PagPedidos = () => {
  //?estados
  const [value, setValue] = useState(1);
  const { user } = useSelector(state => state.auth);
  const { getPedidosAceptados, getPedidosInfo, cancelarPedido, confimarPedido, eliminarPedido, dischargePDF } = usePedidosStore();
  const [pedidos, setPedidos] = useState([]);
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(pedidos, 'nombreSolicitante', 10)
  //?Funciones
  const handleGetOrders = async () => {
    const data = await getPedidosAceptados();
    setPedidos(data)
  }
  //tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //efectos
  useEffect(() => {
    if (value === 2) {
      handleGetOrders()
    }
  }, [value])



  return (
    <Box>
      <Head title={'Pedidos'} subtitle={'Gestion de Pedidos'} whitCaja={false} />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab value={1} label="Pedidos Pendientes" />
          <Tab value={2} label="Pedidos Aceptados" />
          <Tab value={3} label="Pedidos Entregados" />
          <Tab value={4} label="Pedidos Cancelados" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={1}>
        <PagPedidosPendientes />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Paper
          sx={{
            p: 2,
            border: "1px solid #dbe0e6",
            borderRadius: 2,
          }}
          elevation={0}
        >
          <Filter message={'Pedidos Aceptados'} totalMessage={pedidos.length} nameSearch="descripcion" changeSearch={setSearchName} valueSearch={searchName} Icon={FilterFramesIcon} />
          <TablaPedidosAceptados paginated={paginatedData} getPedidosInfo={getPedidosInfo} cancelarPedido={cancelarPedido} confimarPedido={confimarPedido} handleGetData={handleGetOrders} eliminarPedido={eliminarPedido} user={user} dischargePDFPedido={dischargePDF} />
        </Paper>
        <Box display={'flex'} justifyContent={'right'} mt={2}>
          <Pagination
            color="primary"
            count={Math.ceil(filteredEmployees.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PedidosEntregados dischargePDF={dischargePDF} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <PagPedidosCancelados />
      </TabPanel>
    </Box>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
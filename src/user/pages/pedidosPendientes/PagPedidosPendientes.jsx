import { useEffect, useState } from "react"
import { Box, Divider, Pagination, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom";

import DvrIcon from '@mui/icons-material/Dvr';

import { usePagination } from "../../../hooks/usePagination"
import { Head } from "../../components/Head.component"
import { Filter } from "../../components/Filter.component"
import { TablaPedidosPendientes } from "./components/TablaPedidosPendientes";
import { usePedidosStore } from "../../../hooks/usePedidosStore";
import { useSaleStore } from "../../../hooks/useSaleStore";


export const PagPedidosPendientes = () => {
  //?Estados
  const navigate=useNavigate()
  const { getPedidosPendientes, getPedidosInfo, aceptarPedido, eliminarPedido } = usePedidosStore()
  const { dischargePDFPedido } = useSaleStore()

  const [pedidosPendientes, setPedidosPendientes] = useState([])

  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(pedidosPendientes, 'nombreSolicitante', 10)

  //?Funciones
  const handleGetData = async () => {
    const data = await getPedidosPendientes();
    setPedidosPendientes(data);
  }

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <Box>
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter message={'Pedidos Pendientes'} totalMessage={pedidosPendientes.length} nameSearch="el Cliente" changeSearch={setSearchName} valueSearch={searchName} Icon={DvrIcon} />
        <TablaPedidosPendientes paginated={paginatedData} getPedidosInfo={getPedidosInfo} aceptarPedido={aceptarPedido} rechazarPedido={eliminarPedido} handleGetData={handleGetData} dischargePDFPedido={dischargePDFPedido}/>
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

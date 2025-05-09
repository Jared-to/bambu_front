import { useEffect, useMemo, useState } from "react";
import { Box, Pagination, Paper } from "@mui/material";
import { useSelector } from "react-redux";

import FilterFramesIcon from '@mui/icons-material/FilterFrames';

import { usePedidosStore } from "../../../../hooks/usePedidosStore"
import { usePagination } from "../../../../hooks/usePagination";
import { TablaPedidosEntregados } from "./TablaPedidosEntregados";
import { Filter } from "../../../components/Filter.component";


export const PedidosEntregados = ({ dischargePDF }) => {
  //?Estados
  const { user } = useSelector(state => state.auth);
  const { getPedidosEntregados, getPedidosInfo, eliminarPedido } = usePedidosStore()
  const [pedidos, setPedidos] = useState([]);
  const [orderDirection, setOrderDirection] = useState('desc');

  const sortedPedidos = useMemo(() => {
    return [...pedidos].sort((a, b) => {
      const dateA = new Date(a.fechaPedido);
      const dateB = new Date(b.fechaPedido);

      return orderDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [pedidos, orderDirection]);

  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(sortedPedidos, 'nombreSolicitante', 10)

  //?Funciones
  const handleGetOrders = async () => {
    const data = await getPedidosEntregados();
    setPedidos(data)
  }
  const handleDischargePDF = async (id) => {
    await dischargePDF(id)
  }


  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };


  //efectos
  useEffect(() => {
    handleGetOrders()
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
        <Filter message={'Pedidos Entregados'} totalMessage={pedidos.length} nameSearch="descripcion" changeSearch={setSearchName} valueSearch={searchName} Icon={FilterFramesIcon} />
        <TablaPedidosEntregados
          paginated={paginatedData}
          getPedidosInfo={getPedidosInfo}
          handleGetData={handleGetOrders}
          eliminarPedido={eliminarPedido}
          user={user}
          handleSort={handleSort}
          orderDirection={orderDirection}
          handleDischargePDF={handleDischargePDF}
        />
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

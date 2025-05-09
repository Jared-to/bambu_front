import { useEffect, useState } from 'react'
import { Box, Divider, Pagination, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import FilterFramesIcon from '@mui/icons-material/FilterFrames';

import { usePagination } from '../../../hooks/usePagination';
import { Head } from '../../components/Head.component';
import { Filter } from '../../components/Filter.component';
import { TablaPedidosCancelados } from './components/TablaPedidosCancelados';
import { usePedidosStore } from '../../../hooks/usePedidosStore';

export const PagPedidosCancelados = () => {
  //?estados
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const { getPedidosCancelados, getPedidosInfo, eliminarPedido, restaurarPedido } = usePedidosStore()
  const [pedidos, setPedidos] = useState([]);
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(pedidos, 'nombreSolicitante', 10)

  //?Funciones
  const handleGetPedidosCancelados = async () => {
    const data = await getPedidosCancelados();
    setPedidos(data)
  }

  useEffect(() => {
    if (user.rol==='admin') {
      
      handleGetPedidosCancelados()
    }else{
      navigate('/user')
    }

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
        <Filter message={'Pedidos Cancelados'} totalMessage={pedidos.length} nameSearch="solicitante" changeSearch={setSearchName} valueSearch={searchName} Icon={FilterFramesIcon} />
        <TablaPedidosCancelados paginated={paginatedData} getPedidosInfo={getPedidosInfo} eliminarPedido={eliminarPedido} restaurarPedido={restaurarPedido} handleGetData={handleGetPedidosCancelados} />
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

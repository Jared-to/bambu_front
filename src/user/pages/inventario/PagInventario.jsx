import { useEffect, useState } from "react";
import { Box, Divider, Pagination, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import { usePagination } from "../../../hooks/usePagination";
import { Head } from "../../components/Head.component";
import { Filter } from "../../components/Filter.component";
import { TablaInventario } from "./components/TablaInventario";
import { useInventarioStore } from "../../../hooks/useInventarioStore";
import { useProductosStore } from "../../../hooks/useProductosStore";


export const PagInventario = () => {
  //?Estados
  const { getInventario, getAlmacenProducto, getInfoProduct, getMovimientos } = useInventarioStore();
  const { getProducto }= useProductosStore()

  const [productos, setProductos] = useState([])
  const navigate = useNavigate();

  //?funciones
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(productos, 'alias', 7)

  const handleGetInventario = async () => {
    const data = await getInventario();
    
    setProductos(data)
  }

  //efecto
  useEffect(() => {
    if (productos.length === 0) {
      handleGetInventario()
    }
  }, [])


  return (
    <Box>
      <Head title={'Inventario'} subtitle={'Gestion de Inventario'} textButton={'Agregar Inventario'} handleFunctionButton={() => navigate('inventario-inicial')} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter Icon={Inventory2OutlinedIcon} message={'Total Productos'} totalMessage={productos.length} nameSearch="nombre" changeSearch={setSearchName} valueSearch={searchName} />
        <Divider sx={{ mt: 2 }} />
        <TablaInventario paginated={paginatedData} getAlmacenProducto={getAlmacenProducto} getInfoProduct={getProducto} getMovimientos={getMovimientos} />
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

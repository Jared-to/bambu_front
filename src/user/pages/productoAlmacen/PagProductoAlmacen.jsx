import { useEffect, useState } from "react";
import { Box, Divider, Pagination, Paper } from "@mui/material"

import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';

import { Filter } from "../../components/Filter.component"
import { usePagination } from "../../../hooks/usePagination"
import { Head } from "../../components/Head.component";
import { TablaProductosAlmacen } from "./components/TablaProductosAlmacen";
import { useParams } from "react-router-dom";
import { useAlmacenesStore } from "../../../hooks/useAlmacenesStore";
import { ModalInfoProductInv } from "../../ui/modals/ModalInfoProductInv";



export const PagProductoAlmacen = () => {

  //?estados
  const { id } = useParams();

  const { getProductoAlmacen, getInfoProductoAlmacen } = useAlmacenesStore();
  const [productos, setProductos] = useState({ productos: [] });
  const [productoInfo, setProductoInfo] = useState({ on: false, data: undefined })
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(productos.inventario, 'descripcion', 7)

  //?funciones
  const handleGetProductsAlmacen = async () => {
    const data = await getProductoAlmacen(id);
    
    setProductos(data)
  }

  const handleGetInfoProducAlmacen = async (idProduct) => {
    const data = await getInfoProductoAlmacen(id, idProduct);

    setProductoInfo({ on: true, data: data })
  }

  const handleCloseInfoProduct = async () => {
    setProductoInfo({ on: false, data: undefined })
  }
  //efectos
  useEffect(() => {
    handleGetProductsAlmacen()
  }, [])

  return (
    <Box>
      <Head title={'Sucursal ' + productos.nombre} subtitle={'Productos Por Sucursal'} whitCaja={false} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter Icon={WarehouseOutlinedIcon} message={'Total Productos'} totalMessage={productos?.inventario?.length || 0} nameSearch="descripción" changeSearch={setSearchName} valueSearch={searchName} />
        <Divider sx={{ mt: 2 }} />
        <TablaProductosAlmacen paginated={paginatedData} handleGetInfoProducAlmacen={handleGetInfoProducAlmacen} />
      </Paper>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalInfoProductInv handleClose={handleCloseInfoProduct} open={productoInfo.on} product={productoInfo.data} />
    </Box>
  )
}

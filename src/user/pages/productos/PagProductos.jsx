import { useEffect, useState } from "react";
import { Box, Divider, Pagination, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom";

import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';

import { Head } from "../../components/Head.component"
import { Filter } from "../../components/Filter.component"
import { usePagination } from "../../../hooks/usePagination"
import { TablaProductos } from "./components/TablaProductos";
import { ModalInfoProduct } from "../../elements/ModalInfoProduct";
import { useProductosStore } from "../../../hooks/useProductosStore";

export const PagProductos = () => {
  //?Estados
  const { getProductos, getProducto, deleteProducto, statusProducto } = useProductosStore()

  const navigate = useNavigate();
  const [producto, setProducto] = useState(undefined);
  const [productos, setproductos] = useState([])
  const [modalInfo, setModalInfo] = useState(false)
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(productos, 'alias', 8)

  //?fnciones
  const navigateTo = () => {
    navigate('agregar-producto')
  }
  //modal
  const handleOpenModal = async (id) => {
    if (id !== undefined) {
      const data = await getProducto(id);
      
      setProducto(data);
    }
    setModalInfo(true)
  }
  const handleCloseModal = () => {
    setProducto({})
    setModalInfo(false)
  }
  //traer datos async
  const handleGetProductos = async () => {
    const data = await getProductos();
    setproductos(data)

  }
  //efectt
  useEffect(() => {

    if (productos.length === 0) {
      handleGetProductos()
    }
  }, [])

  return (
    <Box>
      <Head title={'Productos'} subtitle={'Gestion de Productos'} textButton={'Agregar Producto'} handleFunctionButton={navigateTo} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }} 
        elevation={0}
      >
        <Filter message={'Total Productos'} btn={true} textButton={'Categorias'} handleFunctionButton={()=>navigate('/user/productos/categorias')} totalMessage={productos.length} nameSearch="el nombre" changeSearch={setSearchName} valueSearch={searchName} Icon={ViewInArOutlinedIcon} />
        <Divider sx={{ mt: 2 }} />
        <TablaProductos paginated={paginatedData} handleOpenModal={handleOpenModal} handleGetProductos={handleGetProductos} deleteProducto={deleteProducto} statusProducto={statusProducto} />
      </Paper>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalInfoProduct handleClose={handleCloseModal} open={modalInfo} product={producto} />
    </Box>
  )
}

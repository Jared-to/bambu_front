import { useEffect, useState } from "react";
import { Box, Divider, Pagination, Paper } from "@mui/material"

import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';

import { Head } from "../../components/Head.component";
import { Filter } from "../../components/Filter.component";
import { usePagination } from "../../../hooks/usePagination";
import { TablaAlmacenes } from "./components/TablaAlmacenes";
import { ModalAlmacen } from "./components/ModalAlmacen";
import { useAlmacenesStore } from "../../../hooks/useAlmacenesStore";
import { getEnvVariables } from "../../../helpers/getEnvValriables";


export const PagAlmacenes = () => {
  //?Estados
  const {ALMACENES_DISPONIBLES }= getEnvVariables()
  const almacenesDisponibles=parseInt(ALMACENES_DISPONIBLES);
  const { getAlmacenes, getAlmacen, crearAlmacen, updateAlmacen, deleteAlmacen,isStatus } = useAlmacenesStore()

  const [almacenes, setAlmacenes] = useState([]);
  const [almacen, setAlmacen] = useState(undefined);
  const [modalAlmacen, setmodalAlmacen] = useState(false);
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(almacenes, 'nombre', 7)

  //?funciones
  const handleOpenModal = async (id) => {
    if (id !== undefined) {
      const data = await getAlmacen(id);
      setAlmacen(data);
    }
    setmodalAlmacen(true)
  }
  const handleCloseModal = () => {
    setAlmacen(undefined);
    setmodalAlmacen(false)
  }
  //datos async
  const handleGetAlmacenes = async () => {
    const data = await getAlmacenes();

    setAlmacenes(data);
  }

  //efecto
  useEffect(() => {
    if (almacenes.length === 0) {
      handleGetAlmacenes()
    }
  }, [])

  return (
    <Box>
      <Head
        title={'Sucursales'}
        subtitle={'Gestion de Sucursales'}
        textButton={'Agregar Sucursal'}
        handleFunctionButton={() => handleOpenModal()}
        whitCaja={almacenes.length === almacenesDisponibles ? false : true}
      />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter Icon={WarehouseOutlinedIcon} message={'Total Sucursales'} totalMessage={almacenes.length} nameSearch="nombre" changeSearch={setSearchName} valueSearch={searchName} />
        <Divider sx={{ mt: 2 }} />
        <TablaAlmacenes paginated={paginatedData} handleOpenModal={handleOpenModal} deleteAlmacen={deleteAlmacen} handleGetData={handleGetAlmacenes} isStatus={isStatus} />
      </Paper>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalAlmacen open={modalAlmacen} handleClose={handleCloseModal} handleGetData={handleGetAlmacenes} createAlmacen={crearAlmacen} updatealmacen={updateAlmacen} almacen={almacen} />
    </Box>
  )
}

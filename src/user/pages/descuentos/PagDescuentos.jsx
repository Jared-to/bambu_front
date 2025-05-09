import { useEffect, useState } from "react"
import { Box, Divider, Pagination, Paper } from "@mui/material"

import DiscountIcon from '@mui/icons-material/Discount';

import { usePagination } from "../../../hooks/usePagination"
import { Head } from "../../components/Head.component"
import { Filter } from "../../components/Filter.component"
import { ModalDescuentos } from "./components/ModalDescuentos";
import { TablaDescuentos } from "./components/TablaDescuentos";
import { useDescuentoStore } from "../../../hooks/useDescuentoStore";


export const PagDescuentos = () => {
  //?Estados
  const { crearDescuento, getDescuentos, getDescuento,updateDescuento,deleteDescuento,descuentoStado } = useDescuentoStore();
  const [descuentos, setDescuentos] = useState([]);
  const [modalDescuento, setModalDescuento] = useState({ on: false, data: undefined })
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(descuentos, 'codigo', 7)

  //?Funciones
  const handleOpenModalDescuento = async (id) => {
    if (id) {
      const data = await getDescuento(id);
      setModalDescuento({ on: true, data: data })
    } else {
      setModalDescuento({ on: true, data: undefined })
    }
  }
  const handleCloseModalDescuento = () => setModalDescuento({ on: false, data: undefined });

  //traer datos async
  const handleGetData = async () => {
    const data = await getDescuentos();

    setDescuentos(data);
  }

  //efecto
  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <Box>
      <Head title={'Descuentos'} subtitle={'Gestion de Descuentos'} textButton={'Nuevo Descuento'} handleFunctionButton={() => handleOpenModalDescuento()} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter Icon={DiscountIcon} message={'Total Descuentos'} textButton={'Categorias'} handleFunctionButton={() => navigate('categorias')} totalMessage={descuentos.length} nameSearch="codigo" changeSearch={setSearchName} valueSearch={searchName} />
        <Divider sx={{ mt: 2 }} />
        {/* tabla */}
        <TablaDescuentos paginated={paginatedData} handleOpenModalDescuento={handleOpenModalDescuento} handleGetData={handleGetData} deleteDescuento={deleteDescuento} descuentoStado={descuentoStado}/>
      </Paper>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalDescuentos open={modalDescuento.on} descuento={modalDescuento.data} handleClose={handleCloseModalDescuento} crearDescuento={crearDescuento} handleGetData={handleGetData} updateDescuento={updateDescuento} />
    </Box>
  )
}

import { useEffect, useState } from "react";
import { Box, Divider, Pagination, Paper } from "@mui/material";

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { usePagination } from "../../../hooks/usePagination";
import { Head } from "../../components/Head.component";
import { Filter } from "../../components/Filter.component";
import { TablaAjuste } from "./components/TablaAjuste";
import { ModalAjuste } from "./components/ModalAjuste";
import { useInventarioStore } from "../../../hooks/useInventarioStore";

export const PagAjusteInventario = () => {
  //?estados
  const { getAjustesInventario, getAjusteInventario,deleteAjuste } = useInventarioStore()

  const [ajuste, setAjuste] = useState(undefined)
  const [ajustes, setAjustes] = useState([]);
  const [modalAjuste, setModalAjuste] = useState(false);
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(ajustes, 'glosa', 7)

  //?funciones
  //traer data async
  const handleGetAjustes = async () => {
    const data = await getAjustesInventario();

    setAjustes(data)
  }
  //modalAjuste
  const handleOpenModalAjuste = async (id) => {

    if (id !== undefined) {
      const data = await getAjusteInventario(id);
      setAjuste(data);
    }
    setModalAjuste(true);
  }
  const handleCloseModalAjuste = () => {
    setModalAjuste(false);
    setAjuste(undefined);
  }

  //efectos
  useEffect(() => {
    if (ajustes.length === 0) {
      handleGetAjustes()
    }
  }, [])


  return (
    <Box>
      <Head title={'Ajustes de Inventario'} subtitle={'Gestion de Ajustes'} textButton={'Nuevo Ajuste'} handleFunctionButton={()=>handleOpenModalAjuste()} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter Icon={SettingsOutlinedIcon} message={'Total Ajustes'} totalMessage={ajustes.length} nameSearch="alias" changeSearch={setSearchName} valueSearch={searchName} />
        <Divider sx={{ mt: 2 }} />
        <TablaAjuste paginated={paginatedData} getAjusteInventario={getAjusteInventario} handleOpenModalAjuste={handleOpenModalAjuste} deleteAjuste={deleteAjuste} handleGetData={handleGetAjustes} />
      </Paper>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalAjuste open={modalAjuste} handleClose={handleCloseModalAjuste} handleGetData={handleGetAjustes} ajuste={ajuste} />
    </Box>
  )
}

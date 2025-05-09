import { useEffect, useState } from "react"
import { Box, Divider, Pagination, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom";

import MoveUpIcon from '@mui/icons-material/MoveUp';

import { Head } from "../../components/Head.component"
import { Filter } from "../../components/Filter.component";
import { usePagination } from "../../../hooks/usePagination";
import { TablaTraspasos } from "./components/TablaTraspasos";
import { useTraspasoStore } from "../../../hooks/useTraspasoStore";


export const PagTraspasos = () => {
  //?ESTADO
  const navigate = useNavigate()
  const { getTraspasos, getTraspaso, deleteTraspaso } = useTraspasoStore()
  const [trapasos, setTrapasos] = useState([]);
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(trapasos, 'glosa', 7)

  //?Funciones
  const handleGetData = async () => {
    const data = await getTraspasos();
    setTrapasos(data)
  }

  //efecto
  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <Box>
      <Head title={'Traspasos'} subtitle={'Gestion de Traspasos'} textButton={'Nuevo Traspaso'} handleFunctionButton={() => navigate('nuevo-traspaso')} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter Icon={MoveUpIcon} message={'Total Traspasos'} totalMessage={trapasos.length} nameSearch="Nombre" changeSearch={setSearchName} valueSearch={searchName} />
        <Divider sx={{ mt: 2 }} />
        {/* tabla */}
        <TablaTraspasos
          paginated={paginatedData}
          getTraspaso={getTraspaso}
          deleteTraspaso={deleteTraspaso}
          handleGetData={handleGetData}
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

import { useEffect, useState } from "react";
import { Box, Divider, Pagination, Paper } from "@mui/material"

import LaunchIcon from '@mui/icons-material/Launch';

import { Head } from "../../components/Head.component"
import { Filter } from "../../components/Filter.component"
import { usePagination } from "../../../hooks/usePagination"
import { TablaCajas } from "./components/TablaCajas";
import { useCajaStore } from "../../../hooks/useCajaStore";



export const PagCajas = () => {
  //?Estados
  const { getCajas,eliminarCaja,reabrirCaj } = useCajaStore()

  const [cajas, setCajas] = useState([]);

  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(cajas, 'codigo', 7)

  //?funciones
  const handleGetData = async () => {
    const data = await getCajas();

    setCajas(data);
  }

  useEffect(() => {
    if (cajas.length === 0) {
      handleGetData()
    }
  }, [])

  return (
    <Box>
      <Head title={'Cajas'} subtitle={'Gestion de Cajas'} whitCaja={false} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter message={'Total Cajas'} totalMessage={cajas.length} nameSearch="Usuario" changeSearch={setSearchName} valueSearch={searchName} Icon={LaunchIcon} />
        <Divider sx={{ mt: 2 }} />
        <TablaCajas paginated={paginatedData} handleGetData={handleGetData} eliminarCaja={eliminarCaja} reabrirCaj={reabrirCaj} />
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

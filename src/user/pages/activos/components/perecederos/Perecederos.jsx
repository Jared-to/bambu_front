import { useEffect, useState } from "react";
import { Box, Divider, Pagination } from "@mui/material"
import { useNavigate } from "react-router-dom";

import LinearScaleIcon from '@mui/icons-material/LinearScale';

import { Head } from "../../../../components/Head.component"
import { Filter } from "../../../../components/Filter.component";
import { ModalPerecederos } from "./components/ModalPerecederos";
import { useActivosStore } from "../../../../../hooks/useActivosStore";
import { usePagination } from "../../../../../hooks/usePagination";
import { TablaPerecederos } from "./components/TablaPerecederos";
import { useActivoCategoriaStore } from "../../../../../hooks/useActivoCategoriaStore";


export const Perecederos = () => {
  //?Estados
  const navigate = useNavigate()
  const { getActivos, createActivo, updateActivo, getActivo, deleteActivo,createRegistro } = useActivosStore();
  const { getActivosCategorias } = useActivoCategoriaStore()
  const [modalPerecederos, setModalPerecederos] = useState({ on: false, data: undefined });
  const [activos, setActivos] = useState([])
  const [categorias, setCategorias] = useState([])

  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(activos, 'descripcion', 7)

  //?funciones
  // modal perecederos
  const handleOpenModalPerecederos = async (id) => {
    if (!id) {
      setModalPerecederos({ on: true, data: undefined })
    } else {
      const data = await getActivo(id);
      setModalPerecederos({ on: true, data: data })

    }
  }
  const handleCloseModalPerecederos = () => setModalPerecederos({ on: false, data: undefined })
  //traer datos activos async
  const handleGetData = async () => {
    const data = await getActivos('perecedero');
    setActivos(data);
  }
  //traer categorias
  const handleGetCategorias = async () => {
    const data = await getActivosCategorias()
    setCategorias(data);
  }

  //efecto
  useEffect(() => {
    if (activos.length === 0) {
      handleGetData()
    }
    if (categorias.length === 0) {
      handleGetCategorias()
    }
  }, [])
  return (
    <Box>
      <Head title={'Perecederos'} subtitle={'Gestión de Activos Perecederos'} textButton={'Nuevo'} handleFunctionButton={() => handleOpenModalPerecederos()} />
      <Filter
        message={'Total Perecederos'}
        totalMessage={activos.length}
        btn={true}
        textButton={'Categorias'}
        handleFunctionButton={() => navigate('categorias')}
        nameSearch="descripcion"
        Icon={LinearScaleIcon}
        changeSearch={setSearchName}
        valueSearch={searchName}
      />
      <Divider sx={{ mt: 2 }} />
      {/* tabla */}
      <TablaPerecederos paginated={paginatedData} handleOpenModal={handleOpenModalPerecederos} getActivo={getActivo} deleteActivo={deleteActivo} handleGetData={handleGetData} createRegistro={createRegistro} />
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalPerecederos open={modalPerecederos.on} handleClose={handleCloseModalPerecederos} activo={modalPerecederos.data} createActivo={createActivo} updateActivo={updateActivo} categorias={categorias} handleGetData={handleGetData} />
    </Box>
  )
}

import { useEffect, useState } from "react";
import { Box, Divider, Pagination } from "@mui/material"
import { useNavigate } from "react-router-dom";

import LinearScaleIcon from '@mui/icons-material/LinearScale';

import { Head } from "../../../../components/Head.component"
import { Filter } from "../../../../components/Filter.component"
import { useActivoCategoriaStore } from "../../../../../hooks/useActivoCategoriaStore";
import { usePagination } from "../../../../../hooks/usePagination";
import { ModalNoPerecederos } from "./components/ModalNoPerecederos";
import { useActivosStore } from "../../../../../hooks/useActivosStore";
import { TablaNoPerecederos } from "./components/TablaNoPerecederos";

export const NoPerecederos = () => {
  //?Estados
  const navigate = useNavigate()
  const { getActivos, createActivo, updateActivo, getActivo, deleteActivo,createRegistro } = useActivosStore();
  const { getActivosCategorias } = useActivoCategoriaStore();
  const [modalPerecederos, setModalPerecederos] = useState({ on: false, data: undefined });
  const [activos, setActivos] = useState([])
  const [categorias, setCategorias] = useState([]);

  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(activos, 'descripcion', 7)

  //?funciones
  // modal perecederos
  const handleOpenModalNoPerecederos = async (id) => {
    if (!id) {
      setModalPerecederos({ on: true, data: undefined })
    } else {
      const data = await getActivo(id);
      setModalPerecederos({ on: true, data: data })

    }
  }
  const handleCloseModalNoPerecederos = () => setModalPerecederos({ on: false, data: undefined })
  //traer datos activos async
  const handleGetData = async () => {
    const data = await getActivos('noperecedero');
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
      <Head title={'Perecederos'} subtitle={'Gestión de Activos No Perecederos'} textButton={'Nuevo'} handleFunctionButton={() => handleOpenModalNoPerecederos()} />
      <Filter
        message={'Total No Perecederos'}
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
      <TablaNoPerecederos paginated={paginatedData} getActivo={getActivo} handleGetData={handleGetData} handleOpenModal={handleOpenModalNoPerecederos} deleteActivo={deleteActivo}  createRegistro={createRegistro}/>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalNoPerecederos open={modalPerecederos.on} handleClose={handleCloseModalNoPerecederos} activo={modalPerecederos.data} createActivo={createActivo} updateActivo={updateActivo} categorias={categorias} handleGetData={handleGetData} />
    </Box>
  )
}

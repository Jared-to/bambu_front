
import { useEffect, useState } from 'react';
import { Box, Divider, Pagination, Paper } from '@mui/material';

import MergeTypeIcon from '@mui/icons-material/MergeType';

import { useActivoCategoriaStore } from '../../../hooks/useActivoCategoriaStore';
import { usePagination } from '../../../hooks/usePagination';
import { Head } from '../../components/Head.component';
import { Filter } from '../../components/Filter.component';
import { TablaActivosCategorias } from './components/TablaGastosCategorias';
import { ModalActivoCategoria } from './components/ModalGastoCategoria';

export const PagActivosCategorias = () => {
  //?Estados
  const { getActivosCategorias, getActivoCategoria, createActivoCategoria, updateActivoCategoria, deleteActivoCategoria } = useActivoCategoriaStore()

  const [categoria, setCategoria] = useState(undefined);
  const [categorias, setCategorias] = useState([])
  const [modalCategory, setmodalCategory] = useState(false);
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(categorias, 'nombre', 7)

  //?funciones
  const handleOpenModal = async (id) => {
    if (id !== undefined) {
      const data = await getActivoCategoria(id);

      setCategoria(data);
    }
    setmodalCategory(true)
  }
  const handleCloseModal = () => {
    setCategoria(setCategoria)
    setmodalCategory(false)
  }

  //traer datos async
  const handleGetCategories = async () => {

    const data = await getActivosCategorias();
    setCategorias(data);
  }

  //efecto
  useEffect(() => {

    if (categorias.length === 0) {
      handleGetCategories()
    }
  }, [])
  return (
    <Box>
      <Head title={'Activos: Categorias'} subtitle={'Gestion de Categorias de los Activos'} textButton={'Agregar Categoria'} handleFunctionButton={() => handleOpenModal()} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
          width: { xs: '100%', md: '70%' }
        }}
        elevation={0}
      >
        <Filter message={'Total Categorias'} totalMessage={categorias.length} Icon={MergeTypeIcon} nameSearch="nombre" changeSearch={setSearchName} valueSearch={searchName} />
        <Divider sx={{ mt: 2 }} />
        <TablaActivosCategorias paginated={paginatedData} handleOpenModal={handleOpenModal}  deleteCategoria={deleteActivoCategoria} handleGetData={handleGetCategories}/>
      </Paper>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalActivoCategoria open={modalCategory} handleClose={handleCloseModal} createCategory={createActivoCategoria} updateCategory={updateActivoCategoria} handleGetData={handleGetCategories} categoria={categoria} />
    </Box>
  )
}

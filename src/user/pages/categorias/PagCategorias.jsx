import { useEffect, useState } from "react";
import { Box, Divider, Pagination, Paper } from "@mui/material"

import { Head } from "../../components/Head.component";
import { Filter } from "../../components/Filter.component";
import { usePagination } from "../../../hooks/usePagination";
import { TablaCategorias } from "./components/TablaCategorias";
import { ModalCategoria } from "./components/ModalCategoria";
import { useCategoriaStore } from "../../../hooks/useCategoriaStore";


export const PagCategorias = () => {
  //?Estados
  const { getCategorias, crearCategoria, getCategoria, updateCategoria, deleteCategoria, isStatus } = useCategoriaStore()

  const [categoria, setCategoria] = useState(undefined);
  const [categorias, setCategorias] = useState([])
  const [modalCategory, setmodalCategory] = useState(false);
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(categorias, 'nombre', 7)

  //?funciones
  const handleOpenModal = async (id) => {
    if (id !== undefined) {
      const data = await getCategoria(id);

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
    const data = await getCategorias();
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
      <Head title={'Categorias'} subtitle={'Gestion de Categorias'} textButton={'Agregar Categoria'} handleFunctionButton={() => handleOpenModal()} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
          width: { xs: '100%', md: '70%' }
        }}
        elevation={0}
      >
        <Filter message={'Total Categorias'} totalMessage={categorias.length} nameSearch="nombre" changeSearch={setSearchName} valueSearch={searchName} />
        <Divider sx={{ mt: 2 }} />
        <TablaCategorias paginated={paginatedData} handleOpenModal={handleOpenModal} deleteCategoria={deleteCategoria} handleGetData={handleGetCategories} isStatus={isStatus} />
      </Paper>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalCategoria open={modalCategory} handleClose={handleCloseModal} createCategory={crearCategoria} handleGetData={handleGetCategories} categoria={categoria} updateCategory={updateCategoria} />
    </Box>
  )
}

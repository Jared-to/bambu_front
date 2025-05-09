import { useEffect, useState } from "react";
import { Box, Divider, Pagination, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';

import { Head } from "../../components/Head.component";
import { Filter } from "../../components/Filter.component";
import { usePagination } from "../../../hooks/usePagination";
import { TablaGastos } from "./components/TablaGastos";
import { ModalGasto } from "./components/ModalGasto";
import { useGastosStore } from "../../../hooks/useGastosStore";
import { useGastosCategoriaStore } from "../../../hooks/useGastosCategoria";
import { useAlmacenesStore } from "../../../hooks/useAlmacenesStore";


export const PagGastos = () => {
  //?estados
  const { user } = useSelector(state => state.auth);
  const rol = user.rol;
  const { crearGasto, getGastos, getGasto, updateGasto, deleteGasto } = useGastosStore();
  const { getAlmacenes } = useAlmacenesStore()
  const { getCategorias } = useGastosCategoriaStore()

  const navigate = useNavigate()
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([])
  const [almacenes, setAlmacenes] = useState([])
  const [modalGasto, setModalGasto] = useState({ on: false, data: undefined });
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(gastos, 'codigo', 7)

  //?funciones
  //modal
  const handleOpenModal = async (id) => {
    if (id) {
      const data = await getGasto(id);
      setModalGasto({ on: true, data: data });
    } else {
      setModalGasto({ on: true, data: undefined });
    }
  }
  const handleCloseModal = () => {
    setModalGasto({ on: false, data: undefined });
  }
  //traer datos gastos async
  const handleGetData = async () => {
    const data = await getGastos('xx', 'xx');
    const almacenes = await getAlmacenes()
    setGastos(data);
    setAlmacenes(almacenes);
  }
  //traer categorias
  const handleGetCategorias = async () => {
    const data = await getCategorias()
    setCategorias(data);
  }
  //efecto
  useEffect(() => {
    if (gastos.length === 0) {
      handleGetData()
    }
    if (categorias.length === 0) {
      handleGetCategorias()
    }
  }, [])

  return (
    <Box>
      <Head title={'Gastos'} subtitle={'Gestion de Gastos'} textButton={'Nuevo Gasto'} handleFunctionButton={() => handleOpenModal()} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter Icon={PaymentOutlinedIcon} message={'Total Gastos'} btn={rol === 'user' ? false : true} textButton={'Categorias'} handleFunctionButton={() => navigate('categorias')} totalMessage={gastos.length} nameSearch="codigo" changeSearch={setSearchName} valueSearch={searchName} />
        <Divider sx={{ mt: 2 }} />
        {/* tabla */}
        <TablaGastos paginated={paginatedData} handleOpenModal={handleOpenModal} getGasto={getGasto} deleteGasto={deleteGasto} handleGetData={handleGetData} />
      </Paper>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalGasto open={modalGasto.on} handleClose={handleCloseModal} crearGasto={crearGasto} categorias={categorias} handleGetData={handleGetData} updateGasto={updateGasto} gasto={modalGasto.data} almacenes={almacenes} />
    </Box>
    )
}

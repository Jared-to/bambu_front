import { useState } from "react";
import { Box, Divider, Pagination, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

import { Head } from "../../components/Head.component";
import { Filter } from "../../components/Filter.component";
import { usePagination } from "../../../hooks/usePagination";
import { TablaCompras } from "./components/TablaCompras";
const compras = [
  {
    id: 1,
    codigo: 'CM001',
    usuario: 'Administrador',
    fecha: '11/11/2024',
    total: 3500,
    proveedor: 'Pil',
  },
  {
    id: 2,
    codigo: 'CM002',
    usuario: 'Gerente',
    fecha: '12/11/2024',
    glosa: '',
    total: 4200,
    proveedor: 'Nestlé',
  },
  {
    id: 3,
    codigo: 'CM003',
    usuario: 'Contador',
    fecha: '13/11/2024',
    glosa: '',
    total: 1500,
    proveedor: 'Coca-Cola',
  },
  {
    id: 4,
    codigo: 'CM004',
    usuario: 'Supervisor',
    fecha: '14/11/2024',
    glosa: '',
    total: 2800,
    proveedor: 'Pepsi',
  },
  {
    id: 5,
    codigo: 'CM005',
    usuario: 'Administrador',
    fecha: '15/11/2024',
    glosa: '',
    total: 5000,
    proveedor: 'Lácteos San Juan',
  },
  {
    id: 6,
    codigo: 'CM006',
    usuario: 'Asistente',
    fecha: '16/11/2024',
    glosa: '',
    total: 3200,
    proveedor: 'Distribuidora Andes',
  },
];

export const PagCompras = () => {
  //?estados
  const navigate=useNavigate();
  const [modalCompra, setModalCompra] = useState(false)
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(compras, 'codigo', 7)

  //?funciones
  const handleOpenModalCompra = () => {
    setModalCompra(true);
  };
  const handleCloseModalCompra = () => {
    setModalCompra(false);
  }
  return (
    <Box>
      <Head title={'Compras'} subtitle={'Gestion de Compras'} textButton={'Nueva Compra'} handleFunctionButton={()=>navigate('nueva-compra')} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter Icon={ShoppingBasketOutlinedIcon} message={'Total Compras'} totalMessage={6} nameSearch="codigo" changeSearch={setSearchName} valueSearch={searchName} />
        <Divider sx={{ mt: 2 }} />
        <TablaCompras paginated={paginatedData} />
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

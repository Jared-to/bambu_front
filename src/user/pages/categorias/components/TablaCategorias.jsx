
import { useMemo, useState } from "react";
import { Avatar, Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";
import toast from "react-hot-toast";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { TableHeadComponent } from "../../../components/TableHead.component";
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { ModalEliminar } from "../../../elements/ModalEliminar";

const styleTableBody = {
  fontFamily: 'Nunito, sans-serif',
  fontSize: "0.9rem",
  color: '#333',
  maxWidth: 150,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};


export const TablaCategorias = ({ paginated, handleOpenModal, deleteCategoria, handleGetData,isStatus }) => {
  //?Estados
  const [orderDirection, setOrderDirection] = useState('desc');
  const [modalDelete, setModalDelete] = useState({ on: false, data: undefined })

  //?funciones
  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };
  const sortedUsers = useMemo(() => {
    return [...paginated].sort((a, b) => {
      if (orderDirection === 'asc') {
        return a.nombre.localeCompare(b.nombre);
      } else {
        return b.nombre.localeCompare(a.nombre);
      }
    });
  }, [paginated, orderDirection]);
  //Modal eliminar
  const handleOpenModalDelete = (id) => setModalDelete({ on: true, data: id });
  const handleCloseModalDelete = () => setModalDelete({ on: false, data: undefined });

  //funcion eliminar 
  const handleDeleteGasto = () => {
    toast.promise(
      deleteCategoria(modalDelete.data),
      {
        loading: "Cargando Petición",
        success: () => {
          handleCloseModalDelete();
          handleGetData();
          return "Categoria eliminado con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }
  return (
    <TableContainer>
      <Table>
        <TableHeadComponent columns={['#',
          <TableSortLabel
            active={true}
            direction={orderDirection}
            onClick={handleSort}
          >
            Nombre
          </TableSortLabel>
          , 'DESCRIPCION', 'ESTADO', 'ACCIONES']} />
        <TableBody>
          {sortedUsers.map((categoria, index) => (
            <TableRow key={index} >
              <TableCell sx={styleTableBody} align="center" >
                {index + 1}
              </TableCell>
              {/* <TableCell sx={styleTableBody} align="center">
                <Avatar
                  src={categoria.image}
                  alt={categoria.descripcion}
                  sx={{ width: 50, height: 50, margin: '0 auto', borderRadius: 2 }}
                />
              </TableCell> */}
              <TableCell sx={styleTableBody} align="center" >
                {categoria.nombre}
              </TableCell>
              <TableCell sx={styleTableBody} align="center" >
                {categoria.descripcion}
              </TableCell>
              <TableCell sx={styleTableBody} align="center" >
                <StatusBox status={categoria.estado} handleGetData={handleGetData} isStatus={isStatus} id={categoria.id} />
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box display={'flex'} justifyContent={'center'} gap={1}>
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModal(categoria.id)}
                    Icon={EditOutlinedIcon}
                    colorText={'#288ec7'}
                    hoverBg={'#288ec7'}
                  />
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalDelete(categoria.id)}
                    Icon={DeleteOutlineOutlinedIcon}
                    colorText={'red'}
                    hoverBg={'red'}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalEliminar open={modalDelete.on} handleClose={handleCloseModalDelete} handleFunction={handleDeleteGasto} />

    </TableContainer>
  )
}

const StatusBox = ({ status, id, isStatus, handleGetData }) => {

  const handleStatus = async () => {
    await isStatus(id);
    await handleGetData()
  }

  if (status) {
    return (
      <Box onClick={handleStatus} sx={{ cursor: 'pointer' }} display={'inline-block'} p={'5px'} borderRadius={2} border={'1px solid #28C76F'} color={'#28C76F'}>
        Activo
      </Box>
    )
  } else {
    return (
      <Box onClick={handleStatus} sx={{ cursor: 'pointer' }} display={'inline-block'} p={'5px'} borderRadius={2} border={'1px solid #FF0000'} color={'#FF0000'}>
        Inactivo
      </Box>
    )
  }
} 

import { useMemo, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";
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

export const TablaGastosCategorias = ({ paginated, handleOpenModal, deleteCategoria, handleGetData }) => {
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

  //modal eliminar
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
          , 'DESCRIPCION', 'ACCIONES']} />
        <TableBody>
          {sortedUsers.map((categoria, index) => (
            <TableRow key={index} >
              <TableCell sx={styleTableBody} align="center" >
                {index + 1}
              </TableCell>
              <TableCell sx={styleTableBody} align="center" >
                {categoria.nombre}
              </TableCell>
              <TableCell sx={styleTableBody} align="center" >
                {categoria.descripcion}
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

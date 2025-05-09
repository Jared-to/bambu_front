import { useMemo, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material"
import toast from "react-hot-toast";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { TableHeadComponent } from "../../../components/TableHead.component"
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { ModalEliminar } from "../../../elements/ModalEliminar";

const styleTableBody =
{
  fontFamily: 'Nunito, sans-serif', fontSize: "0.9rem", color: '#333', maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
}


export const TablaUsuarios = ({ paginated = [], handleOpenModal, handleGetUsers, isStatus, deleteUser }) => {
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
        return a.fullName.localeCompare(b.fullName);
      } else {
        return b.fullName.localeCompare(a.fullName);
      }
    });
  }, [paginated, orderDirection]);
  //modal eliminar
  const handleOpenModalDelete = (id) => setModalDelete({ on: true, data: id });
  const handleCloseModalDelete = () => setModalDelete({ on: false, data: undefined });

  //funcion eliminar 
  const handleDeleteUsuario = () => {
    toast.promise(
      deleteUser(modalDelete.data),
      {
        loading: "Cargando Petición",
        success: () => {
          handleCloseModalDelete();
          handleGetUsers();
          return "Usuario eliminado con éxito!";
        },
        error: (err) => `No se puede eliminar este usuario.`,
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
            NOMBRE
          </TableSortLabel>
          , 'USERNAME', 'CELULAR', 'ESTATUS', 'ROL', 'SUCURSAL', 'ACCIONES']} />
        <TableBody>
          {sortedUsers.map((user, index) => (
            <TableRow key={index} >
              <TableCell sx={styleTableBody} align="center"> {index + 1} </TableCell>
              <TableCell sx={styleTableBody} align="center" > {user.fullName} </TableCell>
              <TableCell sx={styleTableBody} align="center"> {user.username} </TableCell>
              <TableCell sx={styleTableBody} align="center"> {user.celular} </TableCell>
              <TableCell sx={styleTableBody} align="center"> <StatusBox status={user.isActive} id={user.id} isStatus={isStatus} handleGetUsers={handleGetUsers} /> </TableCell>
              <TableCell sx={styleTableBody} align="center"> {user.roles[0]} </TableCell>
              <TableCell sx={styleTableBody} align="center"> {user?.almacen?.nombre || ""} </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box display={'flex'} justifyContent={'center'} gap={2}>
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModal(user.id)}
                    Icon={EditOutlinedIcon}
                    colorText={'#288ec7'}
                    hoverBg={'#288ec7'}
                  />
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalDelete(user.id)}
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
      <ModalEliminar open={modalDelete.on} handleClose={handleCloseModalDelete} handleFunction={handleDeleteUsuario} />
    </TableContainer>
  )
}

const StatusBox = ({ status, id, isStatus, handleGetUsers }) => {

  const handleStatus = async () => {
    await isStatus(id);
    await handleGetUsers()
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

import { useMemo, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { TableHeadComponent } from "../../../components/TableHead.component"
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { ModalEliminar } from "../../../elements/ModalEliminar";

const styleTableBody =
{
  fontFamily: 'Nunito, sans-serif', fontSize: "0.9rem", color: '#333', maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
}

export const TablaClients = ({ paginated = [], handleOpenModal, deleteCliente, handleGetData }) => {
  //estados
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate()
  const rol = user.rol;
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
  const handleDeleteCliente = () => {
    toast.promise(
      deleteCliente(modalDelete.data),
      {
        loading: "Cargando Petición",
        success: () => {
          handleCloseModalDelete();
          handleGetData();
          return "Cliente eliminado con éxito!";
        },
        error: (err) => `No se puede eliminar este cliente.`,
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
          , 'APELLIDO', 'DIRECCION', 'TELEFONO', 'ACCIONES']} />
        <TableBody>
          {sortedUsers.map((client, index) => (
            <TableRow key={index} >
              <TableCell sx={styleTableBody} align="center"> {index + 1} </TableCell>
              <TableCell sx={styleTableBody} align="center" > {client.nombre} </TableCell>
              <TableCell sx={styleTableBody} align="center"> {client.apellido} </TableCell>
              <TableCell sx={styleTableBody} align="center"> {client.direccion} </TableCell>
              <TableCell sx={styleTableBody} align="center"> {client.telefono} </TableCell>

              <TableCell sx={styleTableBody} align="center">
                <Box display={'flex'} justifyContent={'center'} gap={2}>
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModal(client.id)}
                    Icon={EditOutlinedIcon}
                    colorText={'#288ec7'}
                    hoverBg={'#288ec7'}
                  />
                  {rol !== 'user' &&
                    <ButtonIcon
                      handleFunctionButton={() => handleOpenModalDelete(client.id)}
                      Icon={DeleteOutlineOutlinedIcon}
                      colorText={'red'}
                      hoverBg={'red'}
                    />
                  }
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalEliminar open={modalDelete.on} handleClose={handleCloseModalDelete} handleFunction={handleDeleteCliente} />
    </TableContainer>
  )
}

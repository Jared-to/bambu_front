import { useMemo, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { TableHeadComponent } from "../../../components/TableHead.component";
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { ModalInfoTraspaso } from "./ModalInfoTraspaso";
import { ModalEliminar } from "../../../elements/ModalEliminar";
import toast from "react-hot-toast";

const styleTableBody =
{
  fontFamily: 'Nunito, sans-serif', fontSize: "0.9rem", color: '#333', maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
}

export const TablaTraspasos = ({ paginated = [], getTraspaso, handleGetData,deleteTraspaso }) => {
  //?Estados
  const navigate = useNavigate()
  const [orderDirection, setOrderDirection] = useState('desc');
  const [modalDelete, setModalDelete] = useState({ on: false, data: undefined })
  const [modalInfo, setModalInfo] = useState({ on: false, data: undefined })
  //?funciones
  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };
  const sortedUsers = useMemo(() => {
    return [...paginated].sort((a, b) => {
      if (orderDirection === 'asc') {
        return a.fecha.localeCompare(b.fecha);
      } else {
        return b.fecha.localeCompare(a.fecha);
      }
    });
  }, [paginated, orderDirection]);
  //modal info
  const handleOpenModalInfo = async (id) => {
    const data = await getTraspaso(id);
    setModalInfo({ data: data, on: true });
  };
  const handleCloseModalInfo = async () => setModalInfo({ data: undefined, on: false });
  //modal eliminar
  const handleOpenModalDelete = (id) => setModalDelete({ on: true, data: id });
  const handleCloseModalDelete = () => setModalDelete({ on: false, data: undefined });
  //funcion eliminar 
  const handleDeleteTraspaso = () => {
    toast.promise(
      deleteTraspaso(modalDelete.data),
      {
        loading: "Cargando Petición",
        success: () => {
          handleCloseModalDelete();
          handleGetData();
          return "Traspaso eliminado con éxito!";
        },
        error: (err) => `No se puede eliminar este usuario.`,
      }
    );
  }
  
  return (
    <TableContainer>
      <Table>
        <TableHeadComponent columns={[
          <TableSortLabel
            active={true}
            direction={orderDirection}
            onClick={handleSort}
          >
            FECHA
          </TableSortLabel>
          , 'USERNAME', 'GLOSA', 'ALMACEN ORIGEN', 'ALMACEN DESTINO', 'ACCIONES']} />
        <TableBody>
          {sortedUsers.map((traspaso, index) => (
            <TableRow key={index} >
              <TableCell sx={styleTableBody} align="center" >
                {new Date(traspaso.fecha).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell sx={styleTableBody} align="center"> {traspaso?.responsable?.fullName || ''} </TableCell>
              <TableCell sx={styleTableBody} align="center" > {traspaso.glosa} </TableCell>
              <TableCell sx={styleTableBody} align="center"> {traspaso?.almacenOrigen?.nombre} </TableCell>

              <TableCell sx={styleTableBody} align="center"> {traspaso?.almacenDestino?.nombre} </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box display={'flex'} justifyContent={'center'} gap={2}>
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalInfo(traspaso.id)}
                    Icon={InfoOutlinedIcon}
                    colorText="#f2ca5e"
                    hoverBg="#d6ab35"
                  />
                  <ButtonIcon
                    handleFunctionButton={() => navigate('editar-traspaso/' + traspaso.id)}
                    Icon={EditOutlinedIcon}
                    colorText={'#288ec7'}
                    hoverBg={'#288ec7'}
                  />
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalDelete(traspaso.id)}
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
      <ModalInfoTraspaso open={modalInfo.on} handleClose={handleCloseModalInfo} info={modalInfo.data} />
      <ModalEliminar open={modalDelete.on} handleClose={handleCloseModalDelete} handleFunction={handleDeleteTraspaso} />
    </TableContainer>
  )
}

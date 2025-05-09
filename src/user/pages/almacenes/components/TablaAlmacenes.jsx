import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonBase, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";
import toast from "react-hot-toast";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';

import ubi from '../../../../../public/icons/ubicacion.png';
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

export const TablaAlmacenes = ({ paginated, handleOpenModal, deleteAlmacen, handleGetData,isStatus }) => {
  const navigate = useNavigate();
  const [orderDirection, setOrderDirection] = useState('desc');
  const [modalDelete, setModalDelete] = useState({ on: false, data: undefined });

  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };

  const sortedUsers = useMemo(() => {
    return [...paginated].sort((a, b) =>
      orderDirection === 'asc'
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre)
    );
  }, [paginated, orderDirection]);

  const handleOpenModalDelete = (id) => setModalDelete({ on: true, data: id });
  const handleCloseModalDelete = () => setModalDelete({ on: false, data: undefined });

  const handleDeleteAlmacen = () => {
    toast.promise(deleteAlmacen(modalDelete.data), {
      loading: "Cargando Petición",
      success: () => {
        handleCloseModalDelete();
        handleGetData();
        return "Sucursal eliminada con éxito!";
      },
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <TableContainer>
      <Table>
        <TableHeadComponent columns={[
          '#',
          <TableSortLabel active direction={orderDirection} onClick={handleSort}>
            Nombre
          </TableSortLabel>,
          'UBICACIÓN',
          'TELÉFONO',
          'PRODUCTOS',
          'ATENCIÓN',
          'MAPS',
          'ESTADO',
          'ACCIONES'
        ]} />
        <TableBody>
          {sortedUsers.map((almacen, index) => (
            <TableRow key={almacen.id}>
              <TableCell sx={styleTableBody} align="center">{index + 1}</TableCell>
              <TableCell sx={styleTableBody} align="center">{almacen.nombre}</TableCell>
              <TableCell sx={styleTableBody} align="center">{almacen.ubicacion}</TableCell>
              <TableCell sx={styleTableBody} align="center">{almacen.telefono}</TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Button
                  onClick={() => navigate(`sucursal/${almacen.id}`)}
                  variant="outlined"
                  size="small"
                  startIcon={<ViewInArOutlinedIcon />}
                >
                  Productos
                </Button>
              </TableCell>
              <TableCell sx={styleTableBody} align="center">{almacen.HoraAtencion}</TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box display={'flex'} justifyContent={'center'}>
                  <ButtonBase
                    onClick={() => window.open(almacen.linkGPS, '_blank')}
                    sx={{
                      width: 35,
                      height: 35,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Box
                      component="img"
                      src={ubi}
                      alt="Ubicación"
                      sx={{ width: '100%', height: '100%' }}
                    />
                  </ButtonBase>
                </Box>
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <StatusBox status={almacen.estado} handleGetData={handleGetData} isStatus={isStatus} id={almacen.id} />
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box display="flex" justifyContent="center" gap={1}>
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModal(almacen.id)}
                    Icon={EditOutlinedIcon}
                    colorText={'#288ec7'}
                    hoverBg={'#288ec7'}
                  />
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalDelete(almacen.id)}
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
      <ModalEliminar open={modalDelete.on} handleClose={handleCloseModalDelete} handleFunction={handleDeleteAlmacen} />
    </TableContainer>
  );
};
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
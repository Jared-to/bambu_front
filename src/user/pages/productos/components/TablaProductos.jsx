import { useMemo, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Paper, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { TableHeadComponent } from "../../../components/TableHead.component";
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { ModalEliminar } from "../../../elements/ModalEliminar";
import toast from "react-hot-toast";

const styleTableBody = {
  fontFamily: 'Nunito, sans-serif',
  fontSize: "0.9rem",
  color: '#333',
  maxWidth: 150,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const categoryBoxStyle = {
  display: 'inline-block',
  padding: '4px 8px',
  backgroundColor: '#e3f2fd',
  borderRadius: '8px',
  fontSize:'0.9rem',
  textAlign: 'center',
  fontWeight: 600,
  color: '#1976d2',
  fontFamily: 'Nunito, sans-serif',
};

export const TablaProductos = ({ paginated, handleOpenModal, handleGetProductos, deleteProducto, statusProducto }) => {
  //?Estados
  const navigate = useNavigate();
  const [modalDelete, setModalDelete] = useState({ on: false, data: undefined })
  //?funciones

  //modal eliminar
  const handleOpenModalDelete = (id) => setModalDelete({ on: true, data: id });
  const handleCloseModalDelete = () => setModalDelete({ on: false, data: undefined });
  //funcion eliminar
  const handleDeleteProduct = async () => {
    toast.promise(
      deleteProducto(modalDelete.data),
      {
        loading: "Cargando Petición",
        success: () => {
          handleCloseModalDelete();
          handleGetProductos();
          return "Producto eliminado con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }
  return (
    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={2} mt={2}>
      {paginated.map((producto) => (
        <Box key={producto.id} sx={{
          borderRadius: 2,
          boxShadow: 0,
          p: 2,
          bgcolor: '#fff',
          border: '1px solid #e0e0e0',
        }}>
          <Avatar
            src={producto.imagen}
            alt={producto.alias}
            sx={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 2 }}
          />
          <Typography variant="h6" mt={1} fontWeight="bold" fontFamily={'Nunito'} noWrap>
            {producto.alias}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontFamily={'Nunito'} noWrap>
            {producto.descripcion}
          </Typography>
          <Box display="flex" justifyContent="right" fontFamily={'Nunito'} mt={1}>
            <Paper sx={categoryBoxStyle} elevation={0} >
              {producto?.categoria?.nombre}
            </Paper>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <StatusBox status={producto.estado} id={producto.id} isStatus={statusProducto} handleGetProductos={handleGetProductos} />
            <Box display={'flex'} justifyContent={'right'}>
              <Box display="flex" gap={2} mt={1}>
                <ButtonIcon
                  handleFunctionButton={() => handleOpenModal(producto.id)}
                  Icon={InfoOutlinedIcon}
                  colorText={'#f2ca5e'}
                  hoverBg={'#d6ab35'}
                  title="Información"
                />
                <ButtonIcon
                  handleFunctionButton={() => navigate('editar-producto/' + producto.id)}
                  Icon={EditOutlinedIcon}
                  colorText={'#288ec7'}
                  hoverBg={'#288ec7'}
                  title="Editar"
                />
                <ButtonIcon
                  handleFunctionButton={() => handleOpenModalDelete(producto.id)}
                  Icon={DeleteOutlineOutlinedIcon}
                  colorText={'red'}
                  hoverBg={'red'}
                  title="Eliminar"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
      <ModalEliminar open={modalDelete.on} handleClose={handleCloseModalDelete} handleFunction={handleDeleteProduct} />
    </Box>
  )
}

const StatusBox = ({ status, id, isStatus, handleGetProductos }) => {

  const handleStatus = async () => {
    await isStatus(id);
    await handleGetProductos()
  }

  if (status) {
    return (
      <Box onClick={handleStatus} sx={{ cursor: 'pointer' }} display={'inline-block'} p={'5px'} borderRadius={2} border={'1px solid #28C76F'} color={'#28C76F'} fontSize={'0.9rem'} fontFamily={'Nunito'}>
        Activo
      </Box>
    )
  } else {
    return (
      <Box onClick={handleStatus} sx={{ cursor: 'pointer' }} display={'inline-block'} p={'5px'} borderRadius={2} border={'1px solid #FF0000'} color={'#FF0000'} fontSize={'0.9rem'} fontFamily={'Nunito'}>
        Inactivo
      </Box>
    )
  }
}
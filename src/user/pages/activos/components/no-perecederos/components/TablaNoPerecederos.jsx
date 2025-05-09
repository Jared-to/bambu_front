import { useMemo, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import { TableHeadComponent } from "../../../../../components/TableHead.component";
import { ModalEliminar } from "../../../../../elements/ModalEliminar";
import { ModalRegistroActivo } from "../../modals/ModalRegistroActivo";

const styleTableBody = {
  fontFamily: "Nunito, sans-serif",
  fontSize: "0.95rem",
  color: "#555",
  maxWidth: 150,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "10px",
};

const styleTableRowHover = {
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
};

export const TablaNoPerecederos = ({ paginated, handleOpenModal, getActivo, deleteActivo, handleGetData, createRegistro }) => {
  // ?Estados
  const navigate=useNavigate()
  const [orderDirection, setOrderDirection] = useState("desc");
  const [modalInfo, setModalInfo] = useState({ on: false, data: undefined });
  const [modalRegistro, setModalRegistro] = useState({ on: false, data: undefined });
  const [modalDelete, setModalDelete] = useState({ on: false, data: undefined })
  const [anchorEl, setAnchorEl] = useState({});
  // ?Funciones
  const handleSort = () => {
    setOrderDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };
  //filtros
  const sortedUsers = useMemo(() => {
    return [...paginated].sort((a, b) => {
      if (orderDirection === "asc") {
        return a.fechaAdquisicion.localeCompare(b.fechaAdquisicion);
      } else {
        return b.fechaAdquisicion.localeCompare(a.fechaAdquisicion);
      }
    });
  }, [paginated, orderDirection]);
  //menu
  const handleClick = (event, id) => {
    setAnchorEl(prev => ({ ...prev, [id]: event.currentTarget }));
  };
  const handleClose = (id) => {
    setAnchorEl(prev => ({ ...prev, [id]: null }));
  };
  //modal info
  const handleOpenInfoModal = async (id) => {
    if (!id) {
      alert('Activo no Encontrado')
      return
    }
    const data = await getActivo(id)
    setModalInfo({ on: true, data: data });
  }
  const handleCloseInfoModal = () => {
    setModalInfo({ on: false, data: undefined });
  }
  //modal eliminar
  const handleOpenModalDelete = (id) => setModalDelete({ on: true, data: id });
  const handleCloseModalDelete = () => setModalDelete({ on: false, data: undefined });

  //funcion eliminar 
  const handleDeleteGasto = () => {
    toast.promise(
      deleteActivo(modalDelete.data),
      {
        loading: "Cargando Petición",
        success: () => {
          handleCloseModalDelete();
          handleGetData();
          return "Activo eliminado con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }

  //modal Registro
  const handleOpenModalRegistro = (id) => setModalRegistro({ on: true, data: id });
  const handleCloseModalRegistro = () => setModalRegistro({ on: false, data: undefined });

  return (
    <TableContainer sx={{ mt: 2 }} >
      <Table>
        <TableHeadComponent
          columns={[
            "#",
            "DESCRIPCION",
            "MARCA",
            "CATEGORIA",
            "CANTIDAD",
            <TableSortLabel
              active={true}
              direction={orderDirection}
              onClick={handleSort}
            >
              FECHA DE ADQUISICION
            </TableSortLabel>,
            "PROVEEDOR",
            ""
          ]}
        />
        <TableBody>
          {sortedUsers.map((prod, index) => (
            <TableRow key={index} sx={styleTableRowHover}>
              <TableCell sx={styleTableBody} align="center">
                {prod.codigo || index + 1}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {prod.descripcion}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {prod.marca}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box
                  sx={{
                    borderRadius: '5px',
                    padding: '2px 12px',
                    display: 'inline-block',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {prod?.categoria?.nombre}
                </Box>
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {prod.cantidad}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {new Date(new Date(prod.fechaVencimiento).setDate(new Date(prod.fechaVencimiento).getDate() + 1))
                  .toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                }
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box
                  sx={{
                    borderRadius: '5px',
                    padding: '2px 12px',
                    display: 'inline-block',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {prod.proveedor}
                </Box>
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Tooltip title={"Opciones"} placement='top'>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, prod.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl[prod.id]}
                  open={Boolean(anchorEl[prod.id])}
                  onClose={() => handleClose(prod.id)}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => handleOpenModalRegistro(prod.id)}>
                    <CompareArrowsIcon />
                    Nuevo Registro
                  </MenuItem>
                  <MenuItem onClick={() => navigate('movimientos/' + prod.id)}>
                    <ShowChartIcon />
                    Registros
                  </MenuItem>
                  <MenuItem onClick={() => handleOpenModal(prod.id)}>
                    <EditOutlinedIcon />
                    Editar
                  </MenuItem>
                  <MenuItem onClick={() => handleOpenModalDelete(prod.id)}>
                    <DeleteOutlineOutlinedIcon />
                    Eliminar
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalRegistroActivo open={modalRegistro.on} handleClose={handleCloseModalRegistro} id={modalRegistro.data} registrarRegistro={createRegistro} handleGetData={handleGetData} />
      <ModalEliminar open={modalDelete.on} handleClose={handleCloseModalDelete} handleFunction={handleDeleteGasto} />
    </TableContainer>
  )
}

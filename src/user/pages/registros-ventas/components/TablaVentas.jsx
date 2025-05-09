import { useMemo, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Tooltip } from "@mui/material"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { TableHeadComponent } from "../../../components/TableHead.component"
import { ModalInfoVenta } from "../modals/ModalInfoVenta";
import ModalEliminarVenta from "../modals/ModalEliminarVenta";
const styleTableBody =
{
  fontFamily: 'Nunito, sans-serif', fontSize: "0.9rem", color: '#333', maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
}

export const TablaVentas = ({ paginated = [], getVenta, eliminarVenta, handleGetData, dischargePDF, dischargePDFRollo, handleSort, orderDirection }) => {
  //?Estados
  const { user } = useSelector(state => state.auth);
  const rol = user.rol;
  const navigate = useNavigate()
  const caja = sessionStorage.getItem('idCaja');
  const cajaEdit = sessionStorage.getItem('idCajaEdit');

  const [modalEliminar, setModalEliminar] = useState({ on: false, data: undefined })
  const [modalVenta, setModalVenta] = useState({ on: false, data: undefined })
  const [anchorEl, setAnchorEl] = useState({});
  const [isNotaDialogOpen, setIsNotaDialogOpen] = useState(false);
  const [selectedVentaId, setSelectedVentaId] = useState(null);
  //?funciones

  //menu
  const handleClick = (event, id) => {
    setAnchorEl(prev => ({ ...prev, [id]: event.currentTarget }));
  };
  const handleClose = (id) => {
    setAnchorEl(prev => ({ ...prev, [id]: null }));
  };

  //modalinfo
  const handleOpenModalInfo = async (id) => {
    if (!id) {
      console.log(id + ' No valido');
      return
    }
    const data = await getVenta(id)
    setModalVenta({ on: true, data: data })
  }
  const handleCloseModalInfo = () => setModalVenta({ on: false, data: undefined })

  //modal eliminar
  const handleOpenModalDelete = (id) => {
    setModalEliminar({ on: true, data: id });
  }
  const handleCloseModalDelete = () => {
    setModalEliminar({ on: false, data: undefined })
  }
  //generar nota de venta
  //modal escoger PDF
  const handleOpenNotaDialog = (id) => {
    setSelectedVentaId(id);
    setIsNotaDialogOpen(true);
  };

  const handleCloseNotaDialog = () => {
    setSelectedVentaId(null);
    setIsNotaDialogOpen(false);
  };



  return (
    <TableContainer>
      <Table>
        <TableHeadComponent columns={['#',
           'VENDEDOR', 'METODO DE PAGO',
          <TableSortLabel
            active={true}
            direction={orderDirection}
            onClick={handleSort}
          >
            FECHA
          </TableSortLabel>,
          'Subtotal',
          'DESCUENTO',
          'TOTAL'
          , 'ACCIONES']} />
        <TableBody>
          {paginated.map((venta, index) => (
            <TableRow key={index} >
              <TableCell sx={styleTableBody} align="center"> {venta.codigo} </TableCell>
              <TableCell sx={styleTableBody} align="center"> {venta?.vendedor?.fullName} </TableCell>
              <TableCell sx={styleTableBody} align="center"> {venta.tipo_pago} </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {new Date(venta.fecha).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell sx={styleTableBody} align="center"> {venta?.subtotal?.toFixed(2)} Bs. </TableCell>
              <TableCell sx={styleTableBody} align="center"> {(venta.subtotal - venta.total)?.toFixed(2)} Bs. </TableCell>
              <TableCell sx={styleTableBody} align="center"> {venta?.total?.toFixed(2)} Bs. </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Tooltip title={"Opciones"} placement='top'>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, venta.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl[venta.id]}
                  open={Boolean(anchorEl[venta.id])}
                  onClose={() => handleClose(venta.id)}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => handleOpenModalInfo(venta.id)}>
                    <GridViewIcon />
                    Ver Informacion
                  </MenuItem>
                  <MenuItem onClick={() => handleOpenNotaDialog(venta.id)}>
                    <PictureAsPdfIcon />
                    Nota de venta
                  </MenuItem>
                  {(venta?.caja?.id === caja || venta?.caja?.id === cajaEdit) &&
                    <MenuItem onClick={() => navigate(`/user/ventas/editar-venta/${venta.id}`)}>
                      <EditOutlinedIcon />
                      Editar
                    </MenuItem>
                  }
                  {((venta?.caja?.id === caja || venta?.caja?.id === cajaEdit) && rol === 'admin') && (
                    <MenuItem onClick={() => handleOpenModalDelete(venta.id)}>
                      <DeleteOutlineOutlinedIcon />
                      Eliminar
                    </MenuItem>
                  )}

                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalInfoVenta handleClose={handleCloseModalInfo} open={modalVenta.on} infoVenta={modalVenta.data} />
      <ModalEliminarVenta open={modalEliminar.on} onClose={handleCloseModalDelete} onDelete={eliminarVenta} id={modalEliminar.data} handleGetData={handleGetData} />
      <Dialog open={isNotaDialogOpen} onClose={handleCloseNotaDialog}>
        <DialogTitle>Seleccionar Nota de Venta</DialogTitle>
        <DialogContent>
          <DialogContentText>Seleccione el formato de nota de venta que desea descargar.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { dischargePDF(selectedVentaId); handleCloseNotaDialog(); }}>
            Nota de venta (PDF)
          </Button>
          <Button onClick={() => { dischargePDFRollo(selectedVentaId); handleCloseNotaDialog(); }}>
            Nota de venta (Rollo)
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  )
}

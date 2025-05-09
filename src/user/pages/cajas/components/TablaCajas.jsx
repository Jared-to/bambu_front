import { useMemo, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Paper, Typography, MenuItem, IconButton, Tooltip, Menu } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GridViewIcon from '@mui/icons-material/GridView';

import { TableHeadComponent } from "../../../components/TableHead.component";
import ModalEliminarCaja from "../modals/ModalEliminarCaja";
import { boxStyle, customScrollbar, styleTableBody, tablaCellStyle, tableContainerStyle } from "../styles/stylesTable"
import toast from "react-hot-toast";


export const TablaCajas = ({ paginated, handleGetData, eliminarCaja, reabrirCaj }) => {
  //? Estados
  const navigate = useNavigate()
  const [orderDirection, setOrderDirection] = useState('desc');
  const [anchorEl, setAnchorEl] = useState({});
  const [modalEliminarCaja, setModalEliminarCaja] = useState({ on: false, data: undefined })
  //? Funciones
  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };

  const sortedUsers = useMemo(() => {
    return [...paginated].sort((a, b) => {
      if (orderDirection === 'asc') {
        return a.fecha_apertura.localeCompare(b.fecha_apertura);
      } else {
        return b.fecha_apertura.localeCompare(a.fecha_apertura);
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
  //modal
  const handleOpenModalDelete = (id) => setModalEliminarCaja({ on: true, data: id });
  const handleCloseModalDelete = () => setModalEliminarCaja({ on: false, data: undefined });

  //editar caja
  const handleEditCaja = async (id) => {
    const caja = sessionStorage.getItem('idCajaEdit');

    if (caja) {
      toast.error('Debes cerrar la caja para editar una nueva.');
      return;
    }
    await toast.promise(
      reabrirCaj(id),
      {
        loading: "Cargando Petición",
        success: () => {
          handleGetData();
          return "Caja reabierta con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );

  }
  return (
    <TableContainer sx={{ ...tableContainerStyle, ...customScrollbar }}>
      <Table>
        <TableHeadComponent columns={['USUARIO',
          <TableSortLabel
            active={true}
            direction={orderDirection}
            onClick={handleSort}
          >
            FECHA APERTURA
          </TableSortLabel>,
          'FECHA CIERRE', 'SALDO APERTURA', 'GASTOS QR', 'GASTOS EFECTIVO', 'VENTAS QR', 'VENTAS EFECTIVO', 'TOTAL QR', 'TOTAL EFECTIVO', 'SALDO CIERRE', '']}
        />
        <TableBody>
          {sortedUsers.map((caja, index) => (
            <TableRow key={index}>
              <TableCell sx={tablaCellStyle} align="center">{caja?.usuario?.fullName}</TableCell>
              <TableCell sx={tablaCellStyle} align="center">
                {new Date(caja?.fecha_apertura).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell sx={tablaCellStyle} align="center">
                {caja?.fecha_cierre ?
                  new Date(caja?.fecha_cierre).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  : 'Abierta'}
              </TableCell>
              <TableCell align="center">
                <Paper sx={{ ...boxStyle, backgroundColor: '#e8f5e9', borderColor: '#c8e6c9' }} elevation={0}>
                  <Typography variant="body2" fontWeight={600} color="#388e3c">{caja.saldo_apertura} Bs.</Typography>
                </Paper>
              </TableCell>
              <TableCell align="center">
                <Paper sx={{ ...boxStyle, backgroundColor: '#e3f2fd', borderColor: '#bbdefb' }} elevation={0}>
                  <Typography variant="body2" fontWeight={500} color="#1976d2">{caja.gastos_QR} Bs.</Typography>
                </Paper>
              </TableCell>
              <TableCell align="center">
                <Paper sx={{ ...boxStyle, backgroundColor: '#e3f2fd', borderColor: '#bbdefb' }} elevation={0}>
                  <Typography variant="body2" fontWeight={500} color="#1976d2">{caja.gastos_efectivo} Bs.</Typography>
                </Paper>
              </TableCell>
              <TableCell align="center">
                <Paper sx={{ ...boxStyle, backgroundColor: '#fff8e1', borderColor: '#ffecb3' }} elevation={0}>
                  <Typography variant="body2" fontWeight={600} color="#f9a825">{caja.ventas_QR} Bs.</Typography>
                </Paper>
              </TableCell>
              <TableCell align="center">
                <Paper sx={{ ...boxStyle, backgroundColor: '#fff8e1', borderColor: '#ffecb3' }} elevation={0}>
                  <Typography variant="body2" fontWeight={600} color="#f9a825">{caja.ventas_Efectivo} Bs.</Typography>
                </Paper>
              </TableCell>
              <TableCell align="center">
                <Paper sx={{ ...boxStyle, backgroundColor: '#e8f5e9', borderColor: '#c8e6c9' }} elevation={0}>
                  <Typography variant="body2" fontWeight={600} color="#388e3c">{caja.saldo_cierre_QR} Bs.</Typography>
                </Paper>
              </TableCell>
              <TableCell align="center">
                <Paper sx={{ ...boxStyle, backgroundColor: '#e8f5e9', borderColor: '#c8e6c9' }} elevation={0}>
                  <Typography variant="body2" fontWeight={600} color="#388e3c">{caja.saldo_cierre_efectivo} Bs.</Typography>
                </Paper>
              </TableCell>
              <TableCell align="center">
                <Paper sx={{ ...boxStyle, backgroundColor: '#ffebee', borderColor: '#ffcdd2' }} elevation={0}>
                  <Typography variant="body2" fontWeight={600} color="#d32f2f">{caja.saldo_cierre_neto} Bs.</Typography>
                </Paper>
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {caja?.fecha_cierre &&
                  <Tooltip title={"Opciones"} placement='top'>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, caja.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                }
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl[caja.id]}
                  open={Boolean(anchorEl[caja.id])}
                  onClose={() => handleClose(caja.id)}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => navigate(`info/${caja.id}`)}>
                    <GridViewIcon />
                    Ver Informacion
                  </MenuItem>
                  <MenuItem onClick={() => handleEditCaja(caja.id)}>
                    <EditOutlinedIcon />
                    Editar
                  </MenuItem>
                  <MenuItem onClick={() => handleOpenModalDelete(caja.id)}>
                    <DeleteOutlineOutlinedIcon />
                    Eliminar
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalEliminarCaja open={modalEliminarCaja.on} onClose={handleCloseModalDelete} id={modalEliminarCaja.data} onDelete={eliminarCaja} handleGetData={handleGetData} />
    </TableContainer>
  );
};

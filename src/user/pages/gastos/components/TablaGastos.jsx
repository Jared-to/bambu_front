import { useMemo, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";
import toast from "react-hot-toast";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { TableHeadComponent } from "../../../components/TableHead.component";
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { ModalInfoGasto } from "./ModalInfoGasto";
import { ModalEliminar } from "../../../elements/ModalEliminar";

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


export const TablaGastos = ({ paginated, handleOpenModal, getGasto, deleteGasto, handleGetData }) => {

  // ?Estados
  const [orderDirection, setOrderDirection] = useState("desc");
  const [modalInfo, setModalInfo] = useState({ on: false, data: undefined })
  const [modalDelete, setModalDelete] = useState({ on: false, data: undefined })
  const caja = sessionStorage.getItem('idCaja');
  const cajaEdit = sessionStorage.getItem('idCajaEdit');


  // ?Funciones
  const handleSort = () => {
    setOrderDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };
  //filtros
  const sortedUsers = useMemo(() => {
    return [...paginated].sort((a, b) => {
      if (orderDirection === "asc") {
        return a.fecha.localeCompare(b.fecha);
      } else {
        return b.fecha.localeCompare(a.fecha);
      }
    });
  }, [paginated, orderDirection]);

  //modal info
  const handleOpenInfoModal = async (id) => {
    if (!id) {
      alert('Gasto no Encontrado')
      return
    }
    const data = await getGasto(id)
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
      deleteGasto(modalDelete.data),
      {
        loading: "Cargando Petición",
        success: () => {
          handleCloseModalDelete();
          handleGetData();
          return "Gasto eliminado con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }
  return (
    <TableContainer sx={{ mt: 2 }} >
      <Table>
        <TableHeadComponent
          columns={[
            "#",
            "USUARIO",
            "TIPO",
            "CATEGORIA",
            "GLOSA",
            <TableSortLabel
              active={true}
              direction={orderDirection}
              onClick={handleSort}
            >
              FECHA
            </TableSortLabel>,
            "METODO DE PAGO",
            "MONTO",
            ""
          ]}
        />
        <TableBody>
          {sortedUsers.map((ajuste, index) => (
            <TableRow key={index} sx={styleTableRowHover}>
              <TableCell sx={styleTableBody} align="center">
                {ajuste.codigo}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {ajuste.usuario.fullName}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box
                  sx={{
                    borderRadius: "12px",
                    padding: "4px 4px",
                    backgroundColor: ajuste.tipo === "Variables" ? "#e8f5e9" : "#fffde7",
                    color: ajuste.tipo === "Variables" ? "#388e3c" : "#f57f17",
                    fontWeight: "bold",
                  }}
                >
                  {ajuste.tipo}
                </Box>

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
                  {ajuste?.categoria?.nombre}
                </Box>
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {ajuste.glosa}
              </TableCell>
              <TableCell align="center">
                {new Date(ajuste.fecha).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {ajuste.tipo_pago}
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
                  {ajuste.monto} Bs.
                </Box>
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box display={'flex'} justifyContent={'center'} gap={1}>
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenInfoModal(ajuste.id)}
                    Icon={InfoOutlinedIcon}
                    colorText="#f2ca5e"
                    hoverBg="#d6ab35"
                  />
                  {
                    (ajuste.caja.id === caja || ajuste.caja.id === cajaEdit) &&
                    <>
                      <ButtonIcon
                        handleFunctionButton={() => handleOpenModal(ajuste.id)}
                        Icon={EditOutlinedIcon}
                        colorText={'#288ec7'}
                        hoverBg={'#288ec7'}
                      />
                      <ButtonIcon
                        handleFunctionButton={() => handleOpenModalDelete(ajuste.id)}
                        Icon={DeleteOutlineOutlinedIcon}
                        colorText={'red'}
                        hoverBg={'red'}
                      />
                    </>
                  }
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalInfoGasto open={modalInfo.on} handleClose={handleCloseInfoModal} gasto={modalInfo.data} />
      <ModalEliminar open={modalDelete.on} handleClose={handleCloseModalDelete} handleFunction={handleDeleteGasto} />
    </TableContainer>
  )
}

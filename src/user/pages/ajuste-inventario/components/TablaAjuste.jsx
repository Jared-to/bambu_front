import { useMemo, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Avatar } from "@mui/material";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { TableHeadComponent } from "../../../components/TableHead.component";
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { ModalInfoAjuste } from "./ModalInfoAjuste";
import { ModalEliminar } from "../../../elements/ModalEliminar";
import toast from "react-hot-toast";

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


export const TablaAjuste = ({ paginated, getAjusteInventario, handleOpenModalAjuste, deleteAjuste, handleGetData }) => {
  // ?Estados
  const [modalInfoAjuste, setModalInfoAjuste] = useState({ on: false, data: undefined })
  const [orderDirection, setOrderDirection] = useState("desc");
  const [modalDelete, setModalDelete] = useState({ on: false, data: undefined })

  // ?Funciones
  const handleSort = () => {
    setOrderDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

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
  const handleOpenModalInfo = async (id) => {
    const data = await getAjusteInventario(id);
    setModalInfoAjuste({ on: true, data: data });
  }
  const handleCloseModalInfo = () => {
    setModalInfoAjuste({ on: false, data: undefined });
  }
  //modal eliminar
  const handleOpenModalDelete = (id) => setModalDelete({ on: true, data: id });
  const handleCloseModalDelete = () => setModalDelete({ on: false, data: undefined });

  //funcion elminar ajuste
  const handleDeleteAjuste = async () => {
    toast.promise(
      deleteAjuste(modalDelete.data),
      {
        loading: "Cargando Petición",
        success: () => {
          handleCloseModalDelete();
          handleGetData();
          return "Ajuste eliminado con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }
  return (
    <TableContainer >
      <Table>
        <TableHeadComponent
          columns={[
            "#",
            "ALMACEN",
            <TableSortLabel
              active={true}
              direction={orderDirection}
              onClick={handleSort}
            >
              FECHA
            </TableSortLabel>,
            "USUARIO",
            "GLOSA",
            "ACCIONES",
          ]}
        />
        <TableBody>
          {sortedUsers.map((ajuste, index) => (
            <TableRow key={index} sx={styleTableRowHover}>
              <TableCell sx={styleTableBody} align="center">
                {ajuste.codigo}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {ajuste?.almacen?.nombre}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {new Date(ajuste.fecha).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell align="center">
                {ajuste?.usuario?.nombre}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {ajuste.glosa}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box display={"flex"} justifyContent={"center"} gap={1}>
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalInfo(ajuste.id)}
                    Icon={InfoOutlinedIcon}
                    colorText="#f2ca5e"
                    hoverBg="#d6ab35"
                  />
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalAjuste(ajuste.id)}
                    Icon={EditOutlinedIcon}
                    colorText="#288ec7"
                    hoverBg="#288ec7"
                  />
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalDelete(ajuste.id)}
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
      <ModalInfoAjuste open={modalInfoAjuste.on} handleClose={handleCloseModalInfo} ajuste={modalInfoAjuste.data} />
      <ModalEliminar open={modalDelete.on} handleClose={handleCloseModalDelete} handleFunction={handleDeleteAjuste} />

    </TableContainer>
  )
}

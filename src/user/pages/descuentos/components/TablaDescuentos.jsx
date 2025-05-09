import { useMemo, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";
import toast from "react-hot-toast";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { TableHeadComponent } from "../../../components/TableHead.component";
import { ButtonIcon } from "../../../components/ButtonIcon.component";
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
export const TablaDescuentos = ({ paginated = [], handleOpenModalDescuento, handleGetData, deleteDescuento, descuentoStado }) => {
  //?Estados
  const [orderDirection, setOrderDirection] = useState("desc");
  const [modalDelete, setModalDelete] = useState({ on: false, data: undefined })

  // ?Funciones
  const handleSort = () => {
    setOrderDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };
  //filtros
  const sortedUsers = useMemo(() => {
    return [...paginated].sort((a, b) => {
      if (orderDirection === "asc") {
        return a.fechaInicio.localeCompare(b.fechaInicio);
      } else {
        return b.fechaInicio.localeCompare(a.fechaInicio);
      }
    });
  }, [paginated, orderDirection]);

  //modal eliminar
  const handleOpenModalDelete = (id) => setModalDelete({ on: true, data: id });
  const handleCloseModalDelete = () => setModalDelete({ on: false, data: undefined });

  //funcion eliminar 
  const handleDeleteDescuento = () => {
    toast.promise(
      deleteDescuento(modalDelete.data),
      {
        loading: "Cargando Petición",
        success: () => {
          handleCloseModalDelete();
          handleGetData();
          return "Descuento eliminado con éxito!";
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
            "DESCUENTO",
            "PORCENTAJE",
            <TableSortLabel
              active={true}
              direction={orderDirection}
              onClick={handleSort}
            >
              FECHA INICIO
            </TableSortLabel>,
            "FECHA FIN",
            "ESTADO",
            ""
          ]}
        />
        <TableBody>
          {sortedUsers.map((descuento, index) => (
            <TableRow key={index} sx={styleTableRowHover}>
              <TableCell sx={styleTableBody} align="center">
                {descuento.codigo}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {descuento.descuento}
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
                  {descuento.porcentaje} %
                </Box>
              </TableCell>
              <TableCell align="center">
                {new Date(descuento.fechaInicio).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {new Date(descuento.fechaFin).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <StatusBox status={descuento.estado} id={descuento.id} isStatus={descuentoStado} handleGetDescuentos={handleGetData} />
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box display={'flex'} justifyContent={'center'} gap={1}>
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalDescuento(descuento.id)}
                    Icon={EditOutlinedIcon}
                    colorText={'#288ec7'}
                    hoverBg={'#288ec7'}
                  />
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalDelete(descuento.id)}
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
      <ModalEliminar open={modalDelete.on} handleClose={handleCloseModalDelete} handleFunction={handleDeleteDescuento} />
    </TableContainer>
  )
}


const StatusBox = ({ status, id, isStatus, handleGetDescuentos }) => {

  const handleStatus = async () => {
    await isStatus(id);
    await handleGetDescuentos()
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
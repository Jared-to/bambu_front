import { useMemo, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { TableHeadComponent } from "../../../components/TableHead.component";
import { ButtonIcon } from "../../../components/ButtonIcon.component";

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
const ejemploGasto = {
  fecha: "11/11/2024",
  usuario: "Administrador",
  glosa: "Gasto de taxi",
  detalle: "Gasto al llevar el taxi",
  tipo: "Fijo",
  monto: 50,
};


export const TablaCompras = ({ paginated }) => {
  // ?Estados
  const [orderDirection, setOrderDirection] = useState("desc");
  const [modalInfo, setModalInfo] = useState(false)
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
  const handleOpenInfoModal = () => setModalInfo(true);
  const handleCloseInfoModal = () => setModalInfo(false);
  return (
    <TableContainer >
      <Table>
        <TableHeadComponent
          columns={[
            "#",
            "USUARIO",
            "ESTATUS",
            <TableSortLabel
              active={true}
              direction={orderDirection}
              onClick={handleSort}
            >
              FECHA
            </TableSortLabel>,
            "PROVEEDOR",
            "TOTAL",
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
                {ajuste.usuario}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {ajuste.estatus}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {ajuste.fecha}
              </TableCell>
              <TableCell align="center">
                {ajuste.proveedor}
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
                  {ajuste.total} Bs.
                </Box>
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box display={'flex'} justifyContent={'center'} gap={1}>
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenInfoModal()}
                    Icon={InfoOutlinedIcon}
                    colorText="#f2ca5e"
                    hoverBg="#d6ab35"
                  />
                  <ButtonIcon
                    Icon={EditOutlinedIcon}
                    colorText={'#288ec7'}
                    hoverBg={'#288ec7'}
                  />
                  <ButtonIcon
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
    </TableContainer>
  )
}

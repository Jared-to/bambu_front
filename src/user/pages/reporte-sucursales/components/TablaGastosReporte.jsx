import { useMemo, useState } from "react";
import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


import { TableHeadComponent } from "../../../components/TableHead.component";
import { usePagination } from "../../../../hooks/usePagination";
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { useGastosStore } from "../../../../hooks/useGastosStore";
import { ModalInfoGasto } from "../../gastos/components/ModalInfoGasto";


const styleTableBody =
{
  fontFamily: 'Nunito, sans-serif', fontSize: "0.9rem", color: '#333', maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
}

export const TablaGastosReporte = ({ data = [] }) => {
  //?Estados
  const { getGasto } = useGastosStore()
  const [orderDirection, setOrderDirection] = useState('desc');
  const [modalInfo, setModalInfo] = useState({ on: false, data: undefined })
  //hooks de filtrado
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(data, 'codigo', 5)

  //?funciones
  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };
  const sortedUsers = useMemo(() => {
    return [...paginatedData].sort((a, b) => {
      if (orderDirection === 'asc') {
        return a?.fecha?.localeCompare(b.fecha);
      } else {
        return b.fecha?.localeCompare(a.fecha);
      }
    });
  }, [paginatedData, orderDirection]);
  //modal
  const handleOpenModalInfo = async (id) => {
    const data = await getGasto(id);
    setModalInfo({ on: true, data: data });
  }
  const handleCloseModalInfo = async () => setModalInfo({ on: false, data: undefined })
  return (
    <Box>
      <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
        <Table>
          <TableHeadComponent columns={['#','CAJA',
            <TableSortLabel
              active={true}
              direction={orderDirection}
              onClick={handleSort}
            >
              FECHA
            </TableSortLabel>
            , 'SUCURSAL', 'USUARIO', 'TOTAL', 'METODO DE PAGO', '']} />
          <TableBody>
            {sortedUsers.map((gasto, index) => (
              <TableRow key={index} >
                <TableCell sx={styleTableBody} align="center"> {gasto.codigo} </TableCell>
                <TableCell sx={styleTableBody} align="center"> {gasto?.caja?.codigo} </TableCell>
                <TableCell sx={styleTableBody} align="center">
                  {new Date(gasto.fecha).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell sx={styleTableBody} align="center"> {gasto?.almacen?.nombre}</TableCell>
                <TableCell sx={styleTableBody} align="center">
                  {gasto?.usuario?.fullName}
                </TableCell>
                <TableCell sx={styleTableBody} align="center"> {gasto.monto} Bs. </TableCell>
                <TableCell sx={styleTableBody} align="center"> {gasto.tipo_pago} </TableCell>
                <TableCell sx={styleTableBody} align="center">
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalInfo(gasto.id)}
                    Icon={InfoOutlinedIcon}
                    colorText="#f2ca5e"
                    hoverBg="#d6ab35"
                  />
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalInfoGasto open={modalInfo.on} handleClose={handleCloseModalInfo} gasto={modalInfo.data} />
    </Box>
  )
}

import { useMemo, useState } from "react";
import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Tooltip } from "@mui/material"

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { TableHeadComponent } from "../../../components/TableHead.component"
import { ModalInfoVenta } from "../../registros-ventas/modals/ModalInfoVenta";
import { usePagination } from "../../../../hooks/usePagination";
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { useSaleStore } from "../../../../hooks/useSaleStore";

const styleTableBody =
{
  fontFamily: 'Nunito, sans-serif', fontSize: "0.9rem", color: '#333', maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
}
export const TablaVentasReporte = ({ data = [], }) => {
  //?Estados
  const { getVenta } = useSaleStore()
  const [modalVenta, setModalVenta] = useState({ on: false, data: undefined })
  const [orderDirection, setOrderDirection] = useState('desc');

  //hooks de filtrado
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(data, 'codigo', 5)

  //?funciones
  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };
  const sortedUsers = useMemo(() => {
    return [...paginatedData].sort((a, b) => {
      if (orderDirection === 'asc') {
        return a?.fecha.localeCompare(b.fecha);
      } else {
        return b.fecha.localeCompare(a.fecha);
      }
    });
  }, [paginatedData, orderDirection]);


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


  return (
    <Box>
      <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
        <Table>
          <TableHeadComponent columns={['#', ' CAJA',
            <TableSortLabel
              active={true}
              direction={orderDirection}
              onClick={handleSort}
            >
              FECHA
            </TableSortLabel>,
            'SUCURSAL', 'VENDEDOR', 'TOTAL', 'METODO DE PAGO'
            , '']} />
          <TableBody>
            {sortedUsers.map((venta, index) => (
              <TableRow key={index} >
                <TableCell sx={styleTableBody} align="center"> {venta.codigo} </TableCell>
                <TableCell sx={styleTableBody} align="center"> {venta?.caja?.codigo} </TableCell>
                <TableCell sx={styleTableBody} align="center">
                  {new Date(venta.fecha).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell sx={styleTableBody} align="center"> {venta?.almacen?.nombre} </TableCell>
                <TableCell sx={styleTableBody} align="center"> {venta?.vendedor?.fullName} </TableCell>
                <TableCell sx={styleTableBody} align="center"> {venta.total} Bs. </TableCell>
                <TableCell sx={styleTableBody} align="center"> {venta.tipo_pago} </TableCell>
                <TableCell sx={styleTableBody} align="center">
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalInfo(venta.id)}
                    Icon={InfoOutlinedIcon}
                    colorText="#f2ca5e"
                    hoverBg="#d6ab35"
                  />

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ModalInfoVenta handleClose={handleCloseModalInfo} open={modalVenta.on} infoVenta={modalVenta.data} />
      </TableContainer>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  )
}

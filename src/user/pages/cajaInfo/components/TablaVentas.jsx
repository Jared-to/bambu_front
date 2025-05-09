import { useEffect, useState } from "react";
import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { TableHeadComponent } from "../../../components/TableHead.component";
import { usePagination } from "../../../../hooks/usePagination";
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { ModalInfoVenta } from "../../registros-ventas/modals/ModalInfoVenta";

const styleTableBody = {
  fontFamily: 'Nunito, sans-serif',
  fontSize: "0.9rem",
  color: '#333',
  maxWidth: 150,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const TablaVentas = ({ data = [], getVenta }) => {
  //?estados
  const [row, setRow] = useState(7);
  const [paginat, setpaginat] = useState(data)
  const [orderDirection, setOrderDirection] = useState('desc');
  const [modalVenta, setModalVenta] = useState({ on: false, data: undefined })

  //?funciones
  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
    setpaginat(prevRecords => {
      return [...data].sort((a, b) => {
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);

        return orderDirection === 'asc' ? dateB - dateA : dateA - dateB;
      });
    });
  };
  //modalinfo
  const handleOpenModalInfo = async (id) => {
    if (!id) {
      console.log(id + ' No valido');
      alert('Error: Contactarse con el supervisor.')
      return
    }
    const data = await getVenta(id)
    setModalVenta({ on: true, data: data })
  }
  const handleCloseModalInfo = () => setModalVenta({ on: false, data: undefined })

  useEffect(() => {
    setpaginat(data)
  }, [data])

  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(paginat, 'codigo', row)

  return (
    <Box>
      <Box display={'flex'} justifyContent={'right'}>
        {/* <Box>
          <Typography fontFamily={'Nunito'}>Mostrar Filas</Typography>
          <FormControl sx={{ width: 250 }}>
            <Select
              size="small"
              onChange={(e) => setRow(e.target.value)}
              value={row}
            >
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={10000}>Todo</MenuItem>
            </Select>
          </FormControl>
        </Box> */}
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 0 }}>
        <Table>
          <TableHeadComponent columns={['#',
            'CLIENTE',
            , 'VENDEDOR', 'TOTAL', 'METODO DE PAGO',
            <TableSortLabel
              active={true}
              direction={orderDirection}
              onClick={handleSort}
            >
              FECHA
            </TableSortLabel>]} />
          <TableBody>
            {paginatedData.map((venta, index) => (
              <TableRow key={index} >
                <TableCell sx={styleTableBody} align="center"> {venta.codigo} </TableCell>
                <TableCell sx={styleTableBody} align="center" > {venta?.nombreCliente} </TableCell>
                <TableCell sx={styleTableBody} align="center"> {venta?.vendedor?.fullName} </TableCell>
                <TableCell sx={styleTableBody} align="center"> {venta.total} Bs. </TableCell>
                {/* <TableCell sx={styleTableBody} align="center"> {venta.descuento} Bs. </TableCell> */}
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
      </TableContainer>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalInfoVenta handleClose={handleCloseModalInfo} open={modalVenta.on} infoVenta={modalVenta.data} />
    </Box>
  )
}

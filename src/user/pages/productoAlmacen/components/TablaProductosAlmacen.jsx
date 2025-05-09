import { useMemo, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Paper, Avatar } from "@mui/material";


import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { TableHeadComponent } from "../../../components/TableHead.component";
import { ButtonIcon } from "../../../components/ButtonIcon.component";

const styleTableBody = {
  fontFamily: 'Nunito, sans-serif',
  fontSize: "0.9rem",
  color: '#333',
  maxWidth: 150,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const categoryBoxStyle = {
  display: 'inline-block',
  padding: '4px 8px',
  backgroundColor: '#e3f2fd',
  borderRadius: '8px',
  textAlign: 'center',
  fontWeight: 600,
  color: '#1976d2',
  fontFamily: 'Nunito, sans-serif',
};


export const TablaProductosAlmacen = ({ paginated, handleGetInfoProducAlmacen }) => {
  //?Estados
  const [orderDirection, setOrderDirection] = useState('desc');
  //?funciones
  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };
  const sortedUsers = useMemo(() => {
    return [...paginated].sort((a, b) => {
      if (orderDirection === 'asc') {
        return a.categoria.localeCompare(b.categoria);
      } else {
        return b.categoria.localeCompare(a.categoria);
      }
    });
  }, [paginated, orderDirection]);
  
  return (
    <TableContainer>
      <Table>
        <TableHeadComponent columns={['#', '', 'DESCRIPCION', 'STOCK', 'UNIDAD DE MEDIDA',
          <TableSortLabel
            active={true}
            direction={orderDirection}
            onClick={handleSort}
          >
            CATEGORIA
          </TableSortLabel>
          , 'PRECIO', 'ACCIONES']} />
        <TableBody>
          {sortedUsers.map((producto, index) => (
            <TableRow key={index} >
              <TableCell sx={styleTableBody} align="center"> {producto.codigo} </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Avatar
                  src={producto.imagen}
                  alt={producto.alias}
                  sx={{ width: 50, height: 50, margin: '0 auto', borderRadius: 2 }}
                />
              </TableCell>
              <TableCell sx={styleTableBody} align="center" >
                {producto.descripcion}
              </TableCell>
              <TableCell sx={styleTableBody} align="center"> {producto.stock} </TableCell>
              <TableCell sx={styleTableBody} align="center"> {producto.unidad_medida} </TableCell>

              <TableCell align="center">
                <Paper sx={categoryBoxStyle} elevation={0}>
                  {producto?.categoria?.nombre}
                </Paper>
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
                  {producto.precio_venta} Bs.
                </Box>
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box display={'flex'} justifyContent={'center'} gap={1}>
                  <ButtonIcon
                    handleFunctionButton={() => handleGetInfoProducAlmacen(producto.id_producto)}
                    Icon={InfoOutlinedIcon}
                    colorText={'#f2ca5e'}
                    hoverBg={'#d6ab35'}

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

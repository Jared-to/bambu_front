import { useMemo, useState } from 'react';

import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from '@mui/material'
import { usePagination } from '../../../../hooks/usePagination';
import { TableHeadComponent } from '../../../components/TableHead.component';



export const TablaEgresosActivos = ({ data = [], styleTableBody }) => {
  //?estados
  const [orderDirection, setOrderDirection] = useState("desc");

  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(data, 'glosa', 7)

  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };
  const sortedUsers = useMemo(() => {
    return [...paginatedData].sort((a, b) => {
      if (orderDirection === "asc") {
        return a.fecha.localeCompare(b.fecha);
      } else {
        return b.fecha.localeCompare(a.fecha);
      }
    });
  }, [paginatedData, orderDirection]);
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHeadComponent
            columns={[
              'DETALLE',
              <TableSortLabel
                active={true}
                direction={orderDirection}
                onClick={handleSort}
              >
                FECHA
              </TableSortLabel>,
              "CANTIDAD", "USUARIO",]}
          />
          <TableBody>
            {sortedUsers.map(record => (
              <TableRow key={record.fecha}>
                <TableCell sx={styleTableBody} align="center">{record?.glosa}</TableCell>
                <TableCell sx={styleTableBody} align="center">
                  {new Date(record.fecha).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell sx={styleTableBody} align="center">{record.cantidad}</TableCell>
                <TableCell sx={styleTableBody} align="center">{record?.user?.fullName}</TableCell>
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
    </Box>
  )
}

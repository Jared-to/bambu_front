import { useMemo, useState } from "react";
import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material"

import { TableHeadComponent } from "../../../components/TableHead.component"
import { usePagination } from "../../../../hooks/usePagination";


export const TablaSalidas = ({ data = [], styleTableBody }) => {
  //?estados
  const [orderDirection, setOrderDirection] = useState("desc");

  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(data, 'descripcion', 7)

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
              // 'ALMACEN',
              <TableSortLabel
                active={true}
                direction={orderDirection}
                onClick={handleSort}
              >
                FECHA
              </TableSortLabel>,
              "SUCURSAL",
              "REFERENCIA", "CANTIDAD"]}
          />
          <TableBody>
            {sortedUsers.map(record => (
              <TableRow key={record.fecha}>
                {/* <TableCell sx={styleTableBody} align="center">{record?.almacen?.nombre}</TableCell> */}
                <TableCell sx={styleTableBody} align="center">
                  {new Date(record.fecha).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell sx={styleTableBody} align="center">{record?.almacen?.nombre}</TableCell>
                <TableCell sx={styleTableBody} align="center">{record.descripcion}</TableCell>
                <TableCell sx={styleTableBody} align="center">{record.cantidad}</TableCell>
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

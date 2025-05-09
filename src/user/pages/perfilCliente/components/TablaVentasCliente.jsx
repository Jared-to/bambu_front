import { useMemo, useState } from "react";

import { usePagination } from "../../../../hooks/usePagination";
import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";
import { TableHeadComponent } from "../../../components/TableHead.component";

export const TablaVentasCliente = ({ data, styleTableBody }) => {
  //?estados
  const [orderDirection, setOrderDirection] = useState("desc");

  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(data, 'codigo', 7)

  //?fUNCIONES
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
      <TableContainer >
        <Table>
          <TableHeadComponent
            columns={[
              <TableSortLabel
                active={true}
                direction={orderDirection}
                onClick={handleSort}
              >
                FECHA
              </TableSortLabel>,
              "VENDEDOR", "TOTAL", "DEUDA"]}
          />
          <TableBody>
            {sortedUsers.map(record => (
              <TableRow key={record.fecha}>
                <TableCell sx={styleTableBody} align="center">
                  {new Date(record.fecha).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell sx={styleTableBody} align="center">{record?.vendedor?.fullName}</TableCell>
                <TableCell sx={styleTableBody} align="center">{record?.total} Bs.</TableCell>
                <TableCell sx={styleTableBody} align="center">{record?.deuda} Bs.</TableCell>

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

import { useMemo, useState } from "react";
import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";
import { TableHeadComponent } from "../../../components/TableHead.component";
import { usePagination } from "../../../../hooks/usePagination";

const styleTableBody = {
  fontFamily: 'Nunito, sans-serif',
  fontSize: "0.9rem",
  color: '#333',
  maxWidth: 150,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const TablaGastos = ({ data }) => {
  // ?Estados
  const [orderDirection, setOrderDirection] = useState("desc");

  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(data, 'codigo', 7)

  // ?Funciones
  const handleSort = () => {
    setOrderDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };
  //filtros
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
      <TableContainer component={Paper} sx={{boxShadow:0}} >
        <Table>
          <TableHeadComponent
            columns={[
              "#",
              "USUARIO",
              "TIPO",
              "CATEGORIA",
              "GLOSA",
              <TableSortLabel
                active={true}
                direction={orderDirection}
                onClick={handleSort}
              >
                FECHA
              </TableSortLabel>,
              "METODO DE PAGO",
              "MONTO",
            ]}
          />
          <TableBody>
            {sortedUsers.map((gasto, index) => (
              <TableRow key={index} >
                <TableCell sx={styleTableBody} align="center">
                  {gasto.codigo}
                </TableCell>
                <TableCell sx={styleTableBody} align="center">
                  {gasto.usuario.fullName}
                </TableCell>
                <TableCell sx={styleTableBody} align="center">
                  <Box
                    sx={{
                      borderRadius: "12px",
                      padding: "4px 4px",
                      backgroundColor: gasto.tipo === "Variables" ? "#e8f5e9" : "#fffde7",
                      color: gasto.tipo === "Variables" ? "#388e3c" : "#f57f17",
                      fontWeight: "bold",
                    }}
                  >
                    {gasto.tipo}
                  </Box>

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
                    {gasto?.categoria?.nombre}
                  </Box>
                </TableCell>
                <TableCell sx={styleTableBody} align="center">
                  {gasto.glosa}
                </TableCell>
                <TableCell align="center">
                  {new Date(gasto.fecha).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell sx={styleTableBody} align="center">
                  {gasto.tipo_pago}
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
                    {gasto.monto} Bs.
                  </Box>
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
    </Box>
  )
}

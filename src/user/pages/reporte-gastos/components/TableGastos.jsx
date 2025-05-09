import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel } from "@mui/material";
import { TableHeadComponent } from "../../../components/TableHead.component";


const styleTableBody =
{
  fontFamily: 'Nunito, sans-serif', fontSize: "0.9rem", color: '#333', maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
}
export const TableGastos = ({ paginated = [] }) => {
  const [orderDirection, setOrderDirection] = useState('desc');
  //?funciones
  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };
  const sortedUsers = useMemo(() => {
    return [...paginated].sort((a, b) => {
      if (orderDirection === 'asc') {
        return a?.fecha?.localeCompare(b.fecha);
      } else {
        return b.fecha?.localeCompare(a.fecha);
      }
    });
  }, [paginated, orderDirection]);

  return (
    <TableContainer>
      <Table>
        <TableHeadComponent columns={['#',
          <TableSortLabel
            active={true}
            direction={orderDirection}
            onClick={handleSort}
          >
            FECHA
          </TableSortLabel>
          , 'MONTO', 'METODO DE PAGO', 'USUARIO', 'TIPO', 'CATEGORIA']} />
        <TableBody>
          {sortedUsers.map((gasto, index) => (
            <TableRow key={index} >
              <TableCell sx={styleTableBody} align="center"> {gasto.codigo} </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {new Date(gasto.fecha).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell sx={styleTableBody} align="center"> {gasto.monto} Bs. </TableCell>
              <TableCell sx={styleTableBody} align="center"> {gasto.tipo_pago} </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {gasto?.usuario?.fullName}
              </TableCell>
              <TableCell sx={styleTableBody} align="center"> {gasto.tipo} </TableCell>
              <TableCell sx={styleTableBody} align="center"> {gasto?.categoria?.nombre} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

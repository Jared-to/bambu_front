import { useMemo, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Typography } from '@mui/material'
import { TableHeadComponent } from '../../../components/TableHead.component'

const styleTableBody =
{
  fontFamily: 'Nunito, sans-serif', fontSize: "0.9rem", color: '#333', maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
}
export const TablaCuotas = ({ cuotas = [] }) => {
  const [orderDirection, setOrderDirection] = useState("asc");

  //filtros
  const sortedUsers = useMemo(() => {
    return [...cuotas].sort((a, b) => {
      if (orderDirection === "asc") {
        return a.fechaProxPago.localeCompare(b.fechaProxPago);
      } else {
        return b.fechaProxPago.localeCompare(a.fechaProxPago);
      }
    });
  }, [cuotas, orderDirection]);
  const handleSort = () => {
    setOrderDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };
  return (
    <Paper sx={{ p: 2 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        fontFamily="Nunito"
        gutterBottom
        sx={{
          color: "#4A4A4A",
          textAlign: "center",
          borderBottom: "2px solid #e0e0e0",
          paddingBottom: 1,
        }}
      >
        Información de las Cuotas
      </Typography>
      <TableContainer >
        <Table>
          <TableHeadComponent
            columns={
              [
                <TableSortLabel
                  active={true}
                  direction={orderDirection}
                  onClick={handleSort}
                >
                  FECHA PROX DE PAGO
                </TableSortLabel>,
                'FECHA PAGO',
                'MONTO ESPERADO',
                'MONTO PAGADO',
                'GLOSA',
                'ESTADO',
                '#'
              ]}
          />
          <TableBody>
            {sortedUsers.map(cuota => (
              <TableRow key={cuota.id}>
                <TableCell sx={styleTableBody} align='center'>
                  {new Date(cuota.fechaProxPago).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell sx={styleTableBody} align='center'>
                  {cuota.fechaPago ? new Date(cuota.fechaPago).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }) : ''}
                </TableCell>
                <TableCell sx={styleTableBody} align='center'> {cuota?.monto} </TableCell>
                <TableCell sx={styleTableBody} align='center'> {cuota?.montoPagado} </TableCell>
                <TableCell sx={styleTableBody} align='center'>{cuota?.glosa} </TableCell>
                <TableCell sx={styleTableBody} align='center'>{cuota?.estado ? 'Pagado' : 'Aun por pagar'} </TableCell>
                <TableCell sx={styleTableBody} align='center'>{cuota?.metodoPago || ''} </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

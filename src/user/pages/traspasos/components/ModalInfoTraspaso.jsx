import { Box, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import Barcode from "react-barcode"

import { TableHeadComponent } from "../../../components/TableHead.component"
import { ModalInfo } from "../../../components/ModalInfo.component"

const styleTableBody = {
  fontFamily: "Nunito, sans-serif",
  fontSize: "0.95rem",
  color: "#555",
  maxWidth: 150,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "10px",
};
export const ModalInfoTraspaso = ({ open, handleClose, info = {} }) => {
  const { responsable, almacenDestino, almacenOrigen, fecha, detalles } = info

  return (
    <ModalInfo open={open} handleClose={handleClose} title={'Información del Traspaso '} big={true}>
      <Box sx={{ padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
        {/* Información General */}
        <Divider sx={{ marginBottom: "16px" }} />
        <Grid container spacing={3} sx={{ marginBottom: "24px" }}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Responsable:</strong>
            </Typography>
            <Typography variant="body2" color="#777">{responsable?.fullName || "No disponible"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Almacén Origen:</strong>
            </Typography>
            <Typography variant="body2" color="#777">{almacenOrigen?.nombre}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Almacén Destino:</strong>
            </Typography>
            <Typography variant="body2" color="#777">{almacenDestino?.nombre}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Fecha:</strong>
            </Typography>
            <Typography variant="body2" color="#777">
              {new Date(fecha).toLocaleString("es-ES", {
                year: "numeric",
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }) || "No disponible"}
            </Typography>
          </Grid>
        </Grid>

        {/* Tabla de Productos */}
        <Divider sx={{ marginBottom: "16px" }} />
        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: "8px" }}>
          <Table>
            <TableHeadComponent columns={['Descripcion', ' Medida', 'Cantidad', 'Categoria']} />
            <TableBody>
              {detalles?.length > 0 ? (
                detalles.map((producto, index) => (
                  <TableRow key={index} >
                    <TableCell sx={styleTableBody} align="center">{producto?.inventario?.product?.descripcion}</TableCell>
                    <TableCell sx={styleTableBody} align="center">{producto?.inventario?.product?.unidad_medida}</TableCell>
                    <TableCell
                      align="center"
                      sx={styleTableBody}
                    >
                      {producto.cantidad}
                    </TableCell>
                    <TableCell sx={styleTableBody} align="center">
                      {producto?.inventario?.product?.categoria?.nombre}
                    </TableCell>

                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: "#999", fontStyle: "italic" }}>
                    No hay productos disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ModalInfo>
  )
}

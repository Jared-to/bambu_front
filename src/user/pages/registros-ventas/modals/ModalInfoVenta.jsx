
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";

import { ModalInfo } from '../../../components/ModalInfo.component'
import { TableHeadComponent } from "../../../components/TableHead.component";
import Barcode from "react-barcode";

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

export const ModalInfoVenta = ({ open, handleClose, infoVenta = {} }) => {

  const { vendedor, subtotal, almacen, cliente, detalles = [], fecha, codigo, tipo_pago, } = infoVenta || {}

  return (
    <ModalInfo open={open} handleClose={handleClose} title={'Información de la Venta ' + codigo} big={true}>
      <Box sx={{ padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
        {/* Información General */}
        <Divider sx={{ marginBottom: "16px" }} />
        <Grid container spacing={3} sx={{ marginBottom: "24px" }}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Vendedor:</strong>
            </Typography>
            <Typography variant="body2" color="#777">{vendedor?.fullName || "No disponible"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Sucursal:</strong>
            </Typography>
            <Typography variant="body2" color="#777">{almacen?.nombre || "No disponible"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Cliente:</strong>
            </Typography>
            <Typography variant="body2" color="#777">{cliente?.nombreCliente || "No disponible"}</Typography>
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
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Metodo de Pago :</strong>
            </Typography>
            <Typography variant="body2" color="#777">{tipo_pago || "No disponible"}</Typography>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Subtotal :</strong>
            </Typography>
            <Typography variant="body2" color="#777">{subtotal + ' Bs.' || "No disponible"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Descuento :</strong>
            </Typography>
            <Typography variant="body2" color="#777">{infoVenta?.nombreDescuento || "Sin Descuento"}</Typography>
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Total Descuento :</strong>
            </Typography>
            <Typography variant="body2" color="#777">{(infoVenta?.subtotal - infoVenta?.total)?.toFixed(2) + ' Bs.' || "No disponible"}</Typography>
          </Grid> */}
          {
            tipo_pago === 'QR-EFECTIVO' &&
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={500} color="#555" variant="body1">
                <strong>Total Efectivo :</strong>
              </Typography>
              <Typography variant="body2" color="#777">{(infoVenta?.montoEfectivo)?.toFixed(2) + ' Bs.' || "No disponible"}</Typography>
            </Grid>
          }
          {
            tipo_pago === 'QR-EFECTIVO' &&
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={500} color="#555" variant="body1">
                <strong>Total QR:</strong>
              </Typography>
              <Typography variant="body2" color="#777">{(infoVenta?.montoQR)?.toFixed(2) + ' Bs.' || "No disponible"}</Typography>
            </Grid>
          }
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Total :</strong>
            </Typography>
            <Typography variant="body2" color="#777">{(infoVenta?.total)?.toFixed(2) + ' Bs.' || "No disponible"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Nota :</strong>
            </Typography>
            <Typography variant="body2" color="#777">{infoVenta?.glosa || "Ninguna"}</Typography>
          </Grid>
        </Grid>

        {/* Tabla de Productos */}
        <Divider sx={{ marginBottom: "16px" }} />
        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: "8px" }}>
          <Table>
            <TableHeadComponent columns={['Producto', ' Variante', 'Cantidad', 'Precio', 'Subtotal']} />
            <TableBody>
              {detalles?.length > 0 ? (
                detalles.map((producto, index) => (
                  <TableRow key={index} >
                    <TableCell sx={styleTableBody} align="center">{producto?.nombreProducto}</TableCell>
                    <TableCell sx={styleTableBody} align="center">{producto?.nombreVariante}</TableCell>
                    <TableCell
                      align="center"
                      sx={styleTableBody}
                    >
                      {producto.cantidad}
                    </TableCell>
                    <TableCell sx={styleTableBody} align="center">{producto.precio} Bs</TableCell>
                    <TableCell sx={styleTableBody} align="center">{producto.subtotal + producto.descuento} Bs</TableCell>

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

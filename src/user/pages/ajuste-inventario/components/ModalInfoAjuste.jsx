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


export const ModalInfoAjuste = ({ open, handleClose, ajuste }) => {
  const { usuario, glosa, fecha, almacen, detalles } = ajuste || {};

  return (
    <ModalInfo open={open} handleClose={handleClose} title={'Información del Ajuste'} big={true}>
      <Box sx={{ padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
        {/* Información General */}
        <Divider sx={{ marginBottom: "16px" }} />
        <Grid container spacing={3} sx={{ marginBottom: "24px" }}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Usuario:</strong>
            </Typography>
            <Typography variant="body2" color="#777">{usuario?.nombre || "No disponible"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500} color="#555" variant="body1">
              <strong>Glosa:</strong>
            </Typography>
            <Typography variant="body2" color="#777">{glosa || "No disponible"}</Typography>
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
              <strong>Almacén:</strong>
            </Typography>
            <Typography variant="body2" color="#777">{almacen?.nombre || "No disponible"}</Typography>
          </Grid>
        </Grid>

        {/* Tabla de Productos */}
        <Divider sx={{ marginBottom: "16px" }} />
        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: "8px" }}>
          <Table>
            <TableHeadComponent columns={["Producto", 'Descripción', 'Unidad de Medida', 'Tipo', 'Cantidad']} />
            <TableBody>
              {detalles?.length > 0 ? (
                detalles.map((producto, index) => (
                  <TableRow key={index} >
                    <TableCell sx={styleTableBody} align="center">{producto?.alias}</TableCell>
                    <TableCell sx={styleTableBody} align="center">{producto?.descripcion}</TableCell>
                    <TableCell sx={styleTableBody} align="center">{producto.unidad_medida}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: producto.tipo === "incrementar" ? "#388e3c" : "#d32f2f",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {producto.tipo}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={styleTableBody}
                    >
                      {producto.cantidad}
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
  );
};

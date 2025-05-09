import { Box, Typography, Grid, Divider } from "@mui/material";
import { ModalInfo } from "../../../components/ModalInfo.component";

export const ModalInfoGasto = ({ open, handleClose, gasto }) => {

  return (
    <ModalInfo open={open} handleClose={handleClose} title={"Detalles del Gasto"}>
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#f5f5f5",
          borderRadius: "12px",
          boxShadow: "0px 6px 12px rgba(0,0,0,0.10)",
        }}
      >
        <Divider sx={{ marginBottom: 3 }} />

        <Grid container spacing={3}>
          {/* Fecha */}
          <Grid item xs={12} md={6}>
            <Typography fontWeight={600} fontSize="0.95rem" color="#555">
              Fecha y Hora:
            </Typography>
            <Typography fontSize="1rem" sx={{ color: "#333" }}>
              {new Date(gasto?.fecha).toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Grid>

          {/* Usuario */}
          <Grid item xs={12} md={6}>
            <Typography fontWeight={600} fontSize="0.95rem" color="#555">
              Usuario:
            </Typography>
            <Typography fontSize="1rem" sx={{ color: "#333" }}>
              {gasto?.usuario?.fullName || ''}
            </Typography>
          </Grid>

          {/* pago */}
          <Grid item xs={6}>
            <Typography fontWeight={600} fontSize="0.95rem" color="#555">
              Metodo de Pago:
            </Typography>
            <Typography fontSize="1rem" sx={{ color: "#333" }}>
              {gasto?.tipo_pago || ''}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography fontWeight={600} fontSize="0.95rem" color="#555">
              Categoria:
            </Typography>
            <Typography fontSize="1rem" sx={{ color: "#333" }}>
              {gasto?.categoria?.nombre || ''}
            </Typography>
          </Grid>
          {/* Glosa */}
          <Grid item xs={6}>
            <Typography fontWeight={600} fontSize="0.95rem" color="#555">
              Glosa:
            </Typography>
            <Typography fontSize="1rem" sx={{ color: "#333" }}>
              {gasto?.glosa || ''}
            </Typography>
          </Grid>

          {/* Detalle */}
          <Grid item xs={6}>
            <Typography fontWeight={600} fontSize="0.95rem" color="#555">
              Detalle:
            </Typography>
            <Typography fontSize="1rem" sx={{ color: "#333" }}>
              {gasto?.detalle || ''}
            </Typography>
          </Grid>

          {/* Tipo */}
          <Grid item xs={12} md={6}>
            <Typography fontWeight={600} fontSize="0.95rem" color="#555">
              Tipo:
            </Typography>
            <Typography fontSize="1rem" sx={{ color: "#333" }}>
              {gasto?.tipo || ''}
            </Typography>
          </Grid>

          {/* Monto */}
          <Grid item xs={12} md={6}>
            <Typography fontWeight={600} fontSize="0.95rem" color="#555">
              Monto:
            </Typography>
            <Typography fontSize="1rem" sx={{ color: "#007BFF", fontWeight: 600 }}>
              {gasto?.monto.toFixed(2) || ''} Bs.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box display={'flex'} gap={2}>
              <Typography fontWeight={600} fontSize="0.95rem" color="#555">
                Sucursal:
              </Typography>
              <Typography fontSize="1rem" sx={{ color: "#007BFF", fontWeight: 600 }}>
                {gasto?.almacen?.nombre || ''}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: 3 }} />

      </Box>
    </ModalInfo>
  );
};

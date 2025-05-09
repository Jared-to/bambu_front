import { Box, Divider, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import pdf from "../../../../../public/icons/pdf.svg";

export const PaperInfo = ({ caja = {},handleDischarPDF }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        padding: 2,
        borderRadius: 3,
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="body1"
        fontWeight={700}
        fontFamily="Nunito"
        gutterBottom
        sx={{ color: "#333", textAlign: "center" }}
      >
        Información de la {caja.codigo || "Caja"}
      </Typography>
      <Typography
        variant="body2"
        fontFamily="Nunito"
        sx={{ color: "#555" }}
      >
        Usuario: {caja?.usuario?.fullName || "No disponible"}
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography
        variant="body2"
        fontFamily="Nunito"
        sx={{ color: "#555" }}
      >
        Fecha Apertura:
        {caja?.fecha_apertura
          ? new Date(caja.fecha_apertura).toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
          : " No disponible"}
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography
        variant="body2"
        fontFamily="Nunito"
        sx={{ color: "#555" }}
      >
        Fecha Cierre:
        {caja?.fecha_cierre
          ? new Date(caja.fecha_cierre).toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
          : " No disponible"}
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography
        variant="body2"
        fontFamily="Nunito"
        sx={{ color: "#555" }}
      >
        Saldo Apertura: {caja?.saldo_apertura || 0} Bs.
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography
        variant="body2"
        fontFamily="Nunito"
        sx={{ color: "#555" }}
      >
        Gasto QR: {caja.gastos_QR || 0} Bs.
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography
        variant="body2"
        fontFamily="Nunito"
        sx={{ color: "#555" }}
      >
        Gastos Efectivo: {caja.gastos_efectivo || 0} Bs.
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography
        variant="body2"
        fontFamily="Nunito"
        sx={{ color: "#555" }}
      >
        Ventas QR: {caja.ventas_QR || 0} Bs.
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography
        variant="body2"
        fontFamily="Nunito"
        sx={{ color: "#555" }}
      >
        Ventas Efectivo: {caja.ventas_Efectivo || 0} Bs.
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography
        variant="body2"
        fontFamily="Nunito"
        sx={{ color: "#555" }}
      >
        Total QR: {caja.saldo_cierre_QR || 0} Bs.
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography
        variant="body2"
        fontFamily="Nunito"
        sx={{ color: "#555" }}
      >
        Total Efectivo: {caja.saldo_cierre_efectivo || 0} Bs.
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
        <Tooltip title="Reporte de Caja (PDF)" placement="top">
          <IconButton
          onClick={()=>handleDischarPDF()}
            sx={{
              backgroundColor: "#f1f1f1",
              borderRadius: 1,
              padding: 1,
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            <img src={pdf} alt="PDF" style={{ width: 20, height: 20 }} />
          </IconButton>
        </Tooltip>
        <Typography
          variant="body1"
          fontFamily="Nunito"
          fontWeight={700}
          sx={{ marginTop: 3, color: "#333", textAlign: "center" }}
        >
          Saldo Cierre: {caja.saldo_cierre_neto || 0} Bs.
        </Typography>
      </Box>
    </Paper>
  );
};
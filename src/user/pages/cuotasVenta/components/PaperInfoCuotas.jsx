import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PaperInfoCuotas = ({ info = {}, handleOpenModal }) => {
  const navigate = useNavigate()
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        borderRadius: 5,
        background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
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
        Información de la Venta: {info.codigoVenta || "Venta"}
      </Typography>

      <Typography
        variant="body1"
        fontFamily="Nunito"
        sx={{
          color: "#666",
          mt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <strong>Vendedor:</strong>&nbsp; {info?.vendedor?.fullName || "No disponible"}
      </Typography>

      <Typography
        variant="body1"
        fontFamily="Nunito"
        sx={{
          color: "#666",
          mt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <strong>Día de Cobranza:</strong>&nbsp; {info?.diaCobranza || "No disponible"}
      </Typography>

      <Divider
        sx={{
          marginY: 2,
          backgroundColor: "#e0e0e0",
        }}
      />

      <Typography
        variant="body1"
        fontFamily="Nunito"
        sx={{
          color: "#333",
          fontWeight: 600,
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Total Venta:</span>
        <span>{info.totalVenta || 0} Bs.</span>
      </Typography>

      <Divider
        sx={{
          marginY: 2,
          backgroundColor: "#e0e0e0",
        }}
      />

      <Typography
        variant="body1"
        fontFamily="Nunito"
        sx={{
          color: "#333",
          fontWeight: 600,
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Total Deuda:</span>
        <span>{info.montoPorPagar || 0} Bs.</span>
      </Typography>

      <Typography
        variant="body1"
        fontFamily="Nunito"
        sx={{
          color: "#333",
          fontWeight: 600,
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Total Pagado:</span>
        <span>{info.totalVenta - info.montoPorPagar || 0} Bs.</span>
      </Typography>
      <Box
        gap={2}
        display="flex"
        justifyContent="flex-end"
        sx={{
          mt: 3,
        }}
      >
        <Button
          onClick={() => navigate('/user/registros-ventas')}
          variant="contained"
          color="error"
          sx={{
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            paddingX: 3,
          }}
        >
          Cancelar
        </Button>
        <Button
          disabled={info?.estadoPago}
          onClick={() => handleOpenModal()}
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#155a9c",
            },
            borderRadius: 2,
            paddingX: 3,
          }}
        >
          Nueva Cuota
        </Button>
      </Box>
    </Paper>
  );
};

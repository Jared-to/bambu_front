import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { formatTime } from "../../../../helpers/formtTime";

export const Caja = ({ handleOpenModalCaja, contador, handleStopContador }) => {
  return (
    <Paper  sx={{
      p: 3,
      borderRadius: 6,
      background: "white",
      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)"
    }}>
      <Typography variant="h5" fontWeight={700} textAlign="center" fontFamily={'Nunito'} color="primary" mb={2}>
        Caja
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box textAlign="center">
        {contador ? (
          <>
            <Typography fontSize="0.85rem" color="red" mb={1} fontFamily={'Nunito'}>
              Se cerrará en:
            </Typography>
            <Typography fontSize={'1.5rem'} fontWeight={700} color="primary" fontFamily={'Nunito'}>
              {formatTime(contador)}
            </Typography>
          </>
        ) : (
          <Typography variant="h5" fontWeight={500} color="textSecondary" fontFamily={'Nunito'}>
            Caja Cerrada
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{
            width: "50%",
            borderRadius: 6,
            py: 1,
            fontSize: "0.9rem",
            bgcolor: contador ? "linear-gradient(90deg, #ff5f6d, #ff9966)" : "linear-gradient(90deg, #4facfe, #00f2fe)",
            color: "white",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            },
          }}
          onClick={contador ? handleStopContador : handleOpenModalCaja}
        >
          {contador ? "Cerrar Caja" : "Abrir Caja"}
        </Button>
      </Box>
    </Paper>



  );
};
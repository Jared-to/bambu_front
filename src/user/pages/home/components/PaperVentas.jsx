import { Box, List, Paper, Typography } from "@mui/material";

export const PaperVentas = ({ data = [] }) => {

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 4, border: "1px solid #dbe0e6" }}>
      <Typography
        fontWeight={600}
        fontFamily={"Nunito"}
        textAlign={"center"}
        color="primary"
        sx={{ marginBottom: 2, fontSize: "1.2rem" }}
      >
        Últimas Ventas
      </Typography>
      <Box>
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr"
          gap={2}
          sx={{ paddingBottom: '8px' }}
        >
          <Typography fontSize={'0.9rem'} fontFamily={'Nunito'} fontWeight={'bold'} align="center" >
            Código
          </Typography>
          <Typography fontSize={'0.9rem'} fontFamily={'Nunito'} fontWeight={'bold'} align="center">
            Fecha y hora
          </Typography>
          <Typography fontSize={'0.9rem'} fontFamily={'Nunito'} fontWeight={'bold'} align="center">
            Total
          </Typography>
        </Box>
        <Box display={'flex'} flexDirection="column" gap={1}>
          {data.length > 0 ? (
            data.map((venta, index) => (
              <Box
                key={index}
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr"
                gap={2}
                border="1px solid black"
                borderRadius={2}
                p={2}
                sx={{
                  boxShadow: 1, "&:hover": {
                    transform: 'scale(1.02)',
                    transition: ' 0.3s',
                  }
                }}

              >
                <Typography fontSize={'0.9rem'} align="center" fontFamily={'Nunito'}>{venta?.codigo}</Typography>
                <Typography fontSize={'0.9rem'} align="center" fontFamily={'Nunito'}>
                  {new Date(venta.fecha).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Typography fontSize={'0.9rem'} align="center" fontFamily={'Nunito'}>{venta.total.toFixed(2)} Bs.</Typography>
              </Box>
            ))
          ) : (
            <Typography fontSize="0.9rem" color="text.secondary" textAlign="center">
              No hay ventas.
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

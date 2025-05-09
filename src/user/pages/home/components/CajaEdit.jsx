import { Box, Button, Divider, Paper, Typography } from "@mui/material"


export const CajaEdit = ({ handleStopContador }) => {
  return (
    <Paper elevation={0} sx={{ p: 2,mt: 2, borderRadius: 4, border: "1px solid #dbe0e6", }}>
      <Box
        sx={{
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#fff",
          border: "1px solid #dbe0e6",
        }}
      >
        <Typography
          variant="h6"
          fontFamily="Nunito"
          fontWeight={600}
          textAlign="center"
          mb={2}
        >
          Editar Caja
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ marginTop: "20px", display: 'flex' }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: "100%",
              "&:hover": {
                backgroundColor: "#d32f2f", // Hover effect
              }
            }}
            onClick={handleStopContador}
          >
            Cerrar Caja
          </Button>

        </Box>
      </Box>
    </Paper>
  )
}

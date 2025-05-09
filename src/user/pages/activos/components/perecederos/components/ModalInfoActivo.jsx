import { Box, Divider, Grid, Typography } from "@mui/material"
import { ModalInfo } from "../../../../../components/ModalInfo.component"

export const ModalInfoActivo = ({ open, handleClose, activo }) => {

  return (
    <ModalInfo open={open} handleClose={handleClose} title={"Detalles del Activo"}>
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
            <Typography fontFamily={'Nunito'} fontWeight={600} fontSize="0.95rem" color="#555">
              Fecha de Adquisición:
            </Typography>
            <Typography fontFamily={'Nunito'} fontSize="1rem" sx={{ color: "#333" }}>
              {new Date(new Date(activo?.fechaAdquisicion).setDate(new Date(activo?.fechaAdquisicion).getDate() + 1))
                .toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              }
            </Typography>
          </Grid>

          {/* Marca */}
          <Grid item xs={6}>
            <Typography fontFamily={'Nunito'} fontWeight={'bold'} fontSize="0.95rem" color="#555">
              Marca:
            </Typography>
            <Typography fontFamily={'Nunito'} fontSize="1rem" sx={{ color: "#333" }}>
              {activo?.marca || ''}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography fontFamily={'Nunito'} fontWeight={'bold'} fontSize="0.95rem" color="#555">
              Categoria:
            </Typography>
            <Typography fontFamily={'Nunito'} fontSize="1rem" sx={{ color: "#333" }}>
              {activo?.categoria?.nombre || ''}
            </Typography>
          </Grid>
          {/* Proveedor */}
          <Grid item xs={6}>
            <Typography fontFamily={'Nunito'} fontWeight={'bold'} fontSize="0.95rem" color="#555">
              Proveedor:
            </Typography>
            <Typography fontFamily={'Nunito'} fontSize="1rem" sx={{ color: "#333" }}>
              {activo?.proveedor || ''}
            </Typography>
          </Grid>

          {/* Descripción */}
          <Grid item xs={6}>
            <Typography fontFamily={'Nunito'} fontWeight={'bold'} fontSize="0.95rem" color="#555">
              Descripción:
            </Typography>
            <Typography fontFamily={'Nunito'} fontSize="1rem" sx={{ color: "#333" }}>
              {activo?.descripcion || ''}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography fontFamily={'Nunito'} fontWeight={'bold'} fontSize="0.95rem" color="#555">
              Cantidad:
            </Typography>
            <Box bgcolor={'white'} display={'inline-block'} borderRadius={2} p={'4px'}>
              <Typography fontFamily={'Nunito'} fontSize="1rem" sx={{ color: "#333" }}>
                {activo?.cantidad || ''}
              </Typography>
            </Box>
          </Grid>
          {/* Fecha Vencimiento */}
          <Grid item xs={12} md={12}>
            <Typography fontFamily={'Nunito'} fontWeight={'bold'} fontSize="0.95rem" color="#555">
              Fecha de Vencimiento::
            </Typography>
            <Typography fontFamily={'Nunito'} fontSize="1rem" sx={{ color: "#007BFF", fontWeight: 600 }}>
              {new Date(new Date(activo?.fechaVencimiento).setDate(new Date(activo?.fechaVencimiento).getDate() + 1))
                .toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long", // Esto convierte el mes a texto
                  year: "numeric",
                })
              }
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: 3 }} />

      </Box>
    </ModalInfo>
  )
}

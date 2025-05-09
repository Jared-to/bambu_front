import { Box, Typography, Grid, Paper, Divider } from '@mui/material';
import Barcode from 'react-barcode';

import { ModalInfo } from "../../components/ModalInfo.component";

export const ModalInfoProductInv = ({ open, handleClose, product }) => {
  
  return (
    <ModalInfo open={open} handleClose={handleClose} title="Información del Producto" big={true}>
      <Box padding={3} bgcolor="#f9f9f9">
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            borderRadius: 3,
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container spacing={3}>
            {/* Imagen del producto */}
            <Grid item xs={12} sm={5}>
              <Box
                sx={{
                  width: "100%",
                  height: 250,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f4f4f4",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                {product?.product?.imagen ? (
                  <img
                    src={product?.product?.imagen}
                    alt={product.alias || "Sin imagen"}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Typography variant="body1" color="textSecondary" textAlign="center">
                    Sin imagen disponible
                  </Typography>
                )}
              </Box>
            </Grid>

            {/* Detalles del producto */}
            <Grid item xs={12} sm={7}>
              <Typography
                variant="h5"
                fontWeight="bold"
                fontFamily="Nunito, sans-serif"
                sx={{ marginBottom: 1, color: "#333" }}
              >
                {product?.product?.alias || "Alias no disponible"}
              </Typography>
              <Typography
                variant="body1"
                fontFamily="Nunito, sans-serif"
                sx={{ marginBottom: 2, color: "#555" }}
              >
                {product?.product?.descripcion || "Descripción no disponible"}
              </Typography>

              <Divider sx={{ marginY: 2 }} />

              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    SKU:
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    {product?.product?.sku || "No especificado"}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    Código:
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    {product?.product?.codigo || "No especificado"}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" fontWeight="bold" color="textSecondary">
                    Stock Total:
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    {product?.stock || "No especificado"}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ marginY: 2 }} />

              {/* Código de barras */}
              {product?.codigo_barras && (
                <Box display="flex" justifyContent="center" mt={2}>
                  <Barcode
                    value={product.codigo_barras}
                    width={2}
                    height={60}
                    displayValue
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ModalInfo>
  );
};

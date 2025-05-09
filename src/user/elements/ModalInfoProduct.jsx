import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

export const ModalInfoProduct = ({ open, handleClose, product }) => {

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography
          sx={{
            fontWeight: 700,
            fontFamily: 'Nunito, sans-serif',
            color: '#333',
            textAlign: 'center',
          }}
        >
          Información del Producto
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={3}>
          {/* Imagen */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{
                fontFamily: 'Nunito, sans-serif',
                marginBottom: '8px',
                textAlign: 'center',
              }}
            >
              Imagen
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
                border: '1px solid #ddd',
                backgroundColor: product?.imagen ? '#fff' : '#f0f0f0',
              }}
            >
              {product?.imagen ? (
                <img
                  src={product.imagen}
                  alt="Producto"
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  No hay imagen disponible
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Información del Producto */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1" fontWeight={600} sx={{ fontFamily: 'Nunito, sans-serif' }}>
              Alias:
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              {product?.alias || 'N/A'}
            </Typography>

            <Typography variant="body1" fontWeight={600} sx={{ fontFamily: 'Nunito, sans-serif' }}>
              Descripción:
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              {product?.descripcion || 'N/A'}
            </Typography>

            <Typography variant="body1" fontWeight={600} sx={{ fontFamily: 'Nunito, sans-serif' }}>
              Categoría:
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              {product?.categoria?.nombre || 'N/A'}
            </Typography>

            <Typography variant="body1" fontWeight={600} sx={{ fontFamily: 'Nunito, sans-serif' }}>
              Unidad de Medida:
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              {product?.unidad_medida || 'N/A'}
            </Typography>

            <Typography variant="body1" fontWeight={600} sx={{ fontFamily: 'Nunito, sans-serif' }}>
              SKU:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {product?.sku || 'N/A'}
            </Typography>
          </Grid>

          {/* Variantes */}
          {
            product?.variantes?.map((variante, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Typography variant="body1" fontWeight={600} sx={{ fontFamily: 'Nunito, sans-serif' }}>
                  Variante: {index + 1}
                </Typography>
                <Typography variant="body1" fontWeight={600} sx={{ fontFamily: 'Nunito, sans-serif' }}>
                  {variante.nombre} - {variante.precio + ' Bs.'}
                </Typography>
              </Grid>
            ))
          }
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          sx={{
            textTransform: 'none',
            fontFamily: 'Nunito, sans-serif',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

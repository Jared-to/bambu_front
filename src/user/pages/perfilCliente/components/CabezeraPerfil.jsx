import { Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material"

const styleTextField = {
  borderRadius: 2,
  '& .MuiInputBase-root': {
    borderRadius: '8px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',  // Borde suave y claro
    },
    '&:hover fieldset': {
      borderColor: '#aaa',  // Cuando el campo se activa, el borde es un poco más oscuro
    },
  },
}
export const CabezeraPerfil = ({ data = {} }) => {
  return (
    <Paper sx={{ p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderTop: '4px solid rgb(64, 125, 223)' }}>
      <Typography variant="h5" textAlign={'center'} fontFamily={'Nunito'} gutterBottom>
        Información del Cliente
      </Typography>
      <Grid container spacing={3} display={'flex'} justifyContent={'center'}>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label='Nombre Completo'
            size="small"
            value={data?.nombre + " " + data?.apellido || ''}
            InputProps={{
              readOnly: true,
              style: {
                backgroundColor: '#f5f5f5',  // Fondo suave para el input
              },
            }}
            sx={styleTextField}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label="Cumpleaños"
            value={
              data?.cumpleanios
                ? new Date(data.cumpleanios).toLocaleDateString('es-ES', { day: '2-digit', month: 'long' })
                : ''
            }
            size="small"
            type="text"
            InputProps={{
              readOnly: true,
              style: {
                backgroundColor: '#f5f5f5',
              },
            }}
            sx={styleTextField}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label='Deuda'
            value={data?.deudaTotal || 0}
            size="small"
            InputProps={{
              readOnly: true,
              style: {
                backgroundColor: data.deudaTotal === 0 ? '#dbf6e5' : '#fff1d6',
                color: data.deudaTotal === 0 ? '#118d60' : '#b76e4c',
              },
              endAdornment: (
                <InputAdornment position="start">
                  Bs.
                </InputAdornment>
              )
            }}
            sx={styleTextField}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label='Total Ventas'
            value={data?.totalVentas || 0}
            size="small"
            InputProps={{
              readOnly: true,
              style: {
                backgroundColor: '#e6fffb', // Lavanda clara
              },
              endAdornment: (
                <InputAdornment position="start">
                  Bs.
                </InputAdornment>
              )
            }}
            sx={styleTextField}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label='Dirección'
            value={data?.direccion || ''}
            size="small"
            InputProps={{
              readOnly: true,
              style: {
                backgroundColor: '#f5f5f5',
              },
            }}
            sx={styleTextField}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label='Teléfono'
            value={data?.telefono || ''}
            size="small"
            InputProps={{
              readOnly: true,
              style: {
                backgroundColor: '#f5f5f5',
              },
            }}
            sx={styleTextField}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

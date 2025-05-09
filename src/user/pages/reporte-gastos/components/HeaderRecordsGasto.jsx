import { Box, Button, TextField, Grid, Typography } from '@mui/material';

export const HeaderRecordsGasto = ({ startDate, setStartDate, endDate, setEndDate, handlePeriodClick, handleGetDataFechas }) => {
  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 0, mb: 2 }}>
      <Typography variant="h6" fontFamily={'Nunito'} gutterBottom sx={{ fontWeight: 400, color: '#333' }}>
        Filtrar Gastos por periodo
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {/* Botones de selección de periodo */}
          <Grid container spacing={2} >
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePeriodClick('Hoy')}
                sx={{ width: '100%', padding: '7px', textTransform: 'none', borderRadius: 4 }}
              >
                Hoy
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handlePeriodClick('Ayer')}
                sx={{ width: '100%', padding: '7px', textTransform: 'none', borderRadius: 4 }}
              >
                Ayer
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                color="error"
                onClick={() => handlePeriodClick('Semana')}
                sx={{ width: '100%', padding: '7px', textTransform: 'none', borderRadius: 4 }}
              >
                Semana
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handlePeriodClick('Mes')}
                sx={{ width: '100%', padding: '7px', textTransform: 'none', borderRadius: 4 }}
              >
                Mes
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handlePeriodClick('Todas')}
                sx={{ width: '100%', padding: '7px', textTransform: 'none', borderRadius: 4 }}
              >
                Todos los Gastos
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Cuadro de selección de fechas */}
          <form onSubmit={handleGetDataFechas}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  size='small'
                  label="Fecha de inicio"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={startDate !== 'xx' ? startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      backgroundColor: '#fff',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  size='small'
                  label="Fecha de fin"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={endDate !== 'xx' && endDate !== null ? endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      backgroundColor: '#fff',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  type='submit'
                  variant="contained"
                  sx={{
                    padding: '7px 12px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    backgroundColor: '#3f51b5',
                    '&:hover': {
                      backgroundColor: '#303f9f',
                    },
                    width: '100%',
                    maxWidth: '200px',
                    borderRadius: 4
                  }}
                >
                  Generar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Grid, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';

export const CajaChart = () => {
  const [timeFrame, setTimeFrame] = useState('semana'); // Valor inicial de tiempo

  // Datos ficticios para cada opción
  const data = {
    semana: {
      pData: [15, 1, 7, 15, 0, 0, 1],
      xLabels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    },
    mes: {
      pData: [30, 22, 18, 25, 20, 15, 40, 32, 28, 35, 26, 17],
      xLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
    todo: {
      pData: [50, 40, 35, 45, 60, 55, 70, 80, 65, 75, 85, 90],
      xLabels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    },
  };

  const handleTimeFrameChange = (event) => {
    
    setTimeFrame(event.target.value);
  };

  return (
    <Box bgcolor={'white'} p={2} borderRadius={3} width={'95%'}>
      <Typography fontWeight={'bold'}>Rango de Tiempo</Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="time-frame-label">Seleccionar</InputLabel>
        <Select
          labelId="time-frame-label"
          value={timeFrame}
          onChange={handleTimeFrameChange}
          label="Seleccionar"
        >
          <MenuItem value={'semana'}>Última Semana</MenuItem>
          <MenuItem value={'mes'}>Último Mes</MenuItem>
          <MenuItem value={'todo'}>Ver Todo</MenuItem>
        </Select>
      </FormControl>
      <Grid container>
        <Grid item xs={2} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Typography color={'#109121'} fontWeight={'bold'} fontSize={'2.5rem'}>
            {data[timeFrame].pData.reduce((a, b) => a + b, 0)} {/* Total de los datos */}
          </Typography>
          <Typography fontWeight={'bold'} textAlign={'center'}>Ventas {timeFrame === 'semana' ? 'Semanal' : timeFrame === 'mes' ? 'Mensuales' : 'Totales'}</Typography>
        </Grid>
        <Grid item xs={10}>
          <BarChart
            colors={['#4F1091']}
            height={300}
            series={[
              { data: data[timeFrame].pData, label: 'Ventas', id: 'pvId', stack: 'total' },
            ]}
            xAxis={[{
              data: data[timeFrame].xLabels,
              scaleType: 'band',
            }]}
            yAxis={[{}]}
            grid={{ horizontal: true, vertical: false }} // Activar cuadrícula horizontal
          />
        </Grid>
      </Grid>
    </Box>
  );
};

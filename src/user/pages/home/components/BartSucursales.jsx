import { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { TextField, MenuItem, Box, Typography } from "@mui/material";

export const BartSucursales = () => {
  // Estados para el rango de fechas
  const [fechaInicio, setFechaInicio] = useState("2024-02-01");
  const [fechaFin, setFechaFin] = useState("2024-02-07");

  // Estado para seleccionar la cantidad de cajas
  const [numCajas, setNumCajas] = useState(5);

  // Datos simulados de ventas y gastos por caja
  const data = [
    { caja: "Caja 1", ingresos: 1200, gastos: 500 },
    { caja: "Caja 2", ingresos: 1500, gastos: 700 },
    { caja: "Caja 3", ingresos: 900, gastos: 400 },
    { caja: "Caja 4", ingresos: 1800, gastos: 900 },
    { caja: "Caja 5", ingresos: 1100, gastos: 600 },
    { caja: "Caja 6", ingresos: 1300, gastos: 800 },
    { caja: "Caja 7", ingresos: 1600, gastos: 750 },
  ];

  // Filtrar los datos según el número de cajas seleccionado
  const dataFiltrada = data.slice(0, numCajas);

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Box>

        {/* Controles */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          {/* Rango de fechas */}
          <Box display="flex" alignItems="center">
            <Typography variant="body1" fontWeight={600} mr={1}>
              Fecha Inicial:
            </Typography>
            <TextField
              type="date"
              size="small"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              sx={{ width: 150 }}
            />

            <Typography variant="body1" fontWeight={600} mx={2}>
              Fecha Final:
            </Typography>
            <TextField
              type="date"
              size="small"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              sx={{ width: 150 }}
            />
          </Box>

          {/* Selector de cantidad de cajas */}
          <Box>
            <Typography variant="body1" fontWeight={600}>Cantidad de Cajas:</Typography>
            <TextField
              select
              value={numCajas}
              onChange={(e) => setNumCajas(e.target.value)}
              size="small"
              sx={{ width: 100 }}
            >
              <MenuItem value={3}>3 Cajas</MenuItem>
              <MenuItem value={5}>5 Cajas</MenuItem>
              <MenuItem value={7}>7 Cajas</MenuItem>
            </TextField>
          </Box>
        </Box>

        {/* Gráfico de barras */}
        <BarChart
          xAxis={[{ scaleType: "band", data: dataFiltrada.map((c) => c.caja) }]}
          series={[
            { data: dataFiltrada.map((c) => c.ingresos), label: "Ingresos", color: "green" },
            { data: dataFiltrada.map((c) => c.gastos), label: "Gastos", color: "red" },
            { data: dataFiltrada.map((c) => c.ingresos - c.gastos), label: "Total Neto", color: "blue" },
          ]}
          width={1200}
          height={300}
        />

      </Box>
    </Box>
  );
};

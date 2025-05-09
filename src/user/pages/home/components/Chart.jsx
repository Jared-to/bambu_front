import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";

export const Chart = ({ data = [] }) => {


  return (
    <Box  sx={{ p: 2, borderRadius: 4, border: "1px solid #dbe0e6", }}>
      <Typography variant="h5" fontFamily={'Nunito'} textAlign={'center'}>
        Productos mas Vendidos
      </Typography>
      <PieChart
        series={[
          {
            data: data.map((product) => ({
              id: product.productoId,
              label: product.productoDescripcion,
              value: parseInt(product.totalCantidad),
            })),
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={300} // Altura del gráfico
        sx={{
          "& .MuiChartsSlice-text": {
            fontSize: "12px", // Tamaño del texto en las etiquetas
          },
          // Ocultar la leyenda
          "& .MuiChartsLegend-root": {
            display: "none",
          },
        }}
      />


    </Box>
  );
};

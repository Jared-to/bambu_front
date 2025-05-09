import { useState } from "react";


export const manejarRangosFechas = (handleGetDataFechas) => {
  // Estado para manejar las fechas seleccionadas
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // Función para manejar la selección de periodo
  const handlePeriodClick = (period) => {
    const today = new Date();
    let start = today;
    let end = today;

    switch (period) {
      case 'Hoy':
        // Rango para el día de hoy
        start = new Date();
        end = new Date();
        break;
      case 'Ayer':
        // Rango para ayer (restamos 1 día)
        start = new Date(today);
        start.setDate(today.getDate() - 1);
        end = new Date(today);
        end.setDate(today.getDate() );
        break;
      case 'Semana':
        // Rango para los últimos 7 días
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        end = new Date(today);
        break;
      case 'Mes':
        // Rango para el mes anterior
        start = new Date(today.getFullYear(), today.getMonth(), 1); // Primer día del mes actual
        end = new Date(today); // Fecha actual
        end.setDate(today.getDate() + 2);
        break;
      case 'Todas':
        // No establecer un rango, es decir, obtener todas las ventas
        start = 'xx';
        end = 'xx';
        break;
      default:
        break;
    }

    // Asigna las fechas al estado
    setStartDate(start);
    setEndDate(end);

    handleGetDataFechas(start,end);

  };
  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handlePeriodClick
  }
}


export const styleTableBody = {
  fontFamily: 'Nunito, sans-serif',
  fontSize: "0.9rem",
  color: '#333',
  maxWidth: 150,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const boxStyle = {
  display: 'inline-block',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: '12px',
  padding: '6px',
  textAlign: 'center',
  minWidth: '80px',
  border: '1px solid #ddd',
};

export const tableContainerStyle = {
  maxWidth: '100%',
  overflowX: 'auto',  // Scroll horizontal
  scrollbarWidth: 'thin',  // Para Firefox
  scrollbarColor: '#7247aa #f1f1f1',  // Para Firefox, cambia color del pulgar y la pista
};

// Estilos del Scroll en Webkit (Chrome, Safari, Edge)
export const customScrollbar = {
  '::-webkit-scrollbar': {
    width: '10px',  // Ajusta el ancho de la barra
    height: '10px',  // Ajusta la altura del scroll horizontal
    backgroundColor: 'red',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',  // Redondear los bordes
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',  // Color del "pulgar"
    borderRadius: '10px',  // Redondear el "pulgar"
    border: '2px solid #f1f1f1',  // Bordes del "pulgar"
  },
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',  // Color cuando se pasa el ratón por encima
  }
};

export const tablaCellStyle = {
  fontSize: "0.85rem", // Ajustar tamaño de fuente
  maxWidth: "120px", // Establecer un ancho máximo
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
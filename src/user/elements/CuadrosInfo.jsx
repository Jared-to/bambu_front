import { Box, Typography, SvgIcon } from '@mui/material';
import { useState } from 'react';

export const CuadrosInfo = ({ titulo, dato, Icon }) => {
  const [hover, setHover] = useState(false);

  const handleOn = () => {
    setHover(true);
  };
  const handleOff = () => {
    setHover(false);
  };

  return (
    <Box
      onMouseEnter={handleOn}
      onMouseLeave={handleOff}
      p={4}
      sx={{
        borderRadius: 3,
        border: `1px solid ${hover ? '#333' : '#e0e0e0'}`, // Cambia el borde en hover
        bgcolor: hover ? '#000000' : '#ffffff',
        color: hover ? '#ffffff' : '#333333',
        transition: 'all 0.3s ease-in-out',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.01)',
        },
      }}
    >
      {/* Icono + Título */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
        {Icon && (
          <SvgIcon component={Icon} sx={{ fontSize: 40, color: hover ? '#ffffff' : '#333333', mr: 2 }} />
        )}
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          fontFamily={'Nunito'}
          gutterBottom
        >
          {titulo}
        </Typography>
      </Box>

      {/* Dato */}
      <Typography
        variant="h5"
        fontWeight="bold"
        fontFamily={'Nunito'}
      >
        {dato}
      </Typography>
    </Box>
  );
};

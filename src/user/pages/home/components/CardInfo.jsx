import { Box, Typography, Link, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import InfoIcon from '@mui/icons-material/Info';


const CardInfo = ({ number, description, link, bgColor, colorText, Icon }) => {

  const navigate=useNavigate()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Card sx={{ maxWidth: 345, width: '100%', backgroundColor: bgColor || '#00bcd4', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          {/* Número */}
          <Typography variant="h3" fontFamily={'Nunito'} sx={{ fontWeight: 'bold', color: colorText }}>
            {number}
          </Typography>

          {/* Descripción */}
          <Typography variant="body1" fontFamily={'Nunito'} sx={{ fontWeight: '500', color: colorText }}>
            {description}
          </Typography>
        </CardContent>
        
        {/* Icono de fondo en la parte derecha */}
        <Box 
          sx={{
            position: 'absolute', 
            top: '40%', 
            right: 0, 
            transform: 'translateY(-50%)', 
            opacity: 0.1, 
            zIndex: 0, 
          }}
        >
          {Icon ? (
            <Icon sx={{ color: 'black', fontSize: '7rem' }} />
          ) : (
            <InfoIcon sx={{ color: 'black', fontSize: '7rem' }} />
          )}
        </Box>

        {/* Enlace */}
        {link && (
          <Box sx={{ marginTop: 1, pl: 1, pb: 1, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.2)' }}>
            <Typography onClick={()=>navigate(link)}  fontFamily={'Nunito'} sx={{ color: '#fff', textDecoration: 'none',cursor:'pointer' }}>
              Más información
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default CardInfo;

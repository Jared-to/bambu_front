import InfoIcon from '@mui/icons-material/Info';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotifyType = ({ data = {}, typography }) => {
  const navigate = useNavigate();
  const SelectIcon = () => {
    return <InfoIcon sx={{ color: 'warning.main', fontSize: '1.5rem' }} />;
  };

  const calcDate = () => {
    const now = new Date();
    const past = new Date(data.fechaPedido);
    const diff = now - past;

    const msInSecond = 1000;
    const msInMinute = msInSecond * 60;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
    const msInWeek = msInDay * 7;

    const weeks = Math.floor(diff / msInWeek);
    const days = Math.floor((diff % msInWeek) / msInDay);
    const hours = Math.floor((diff % msInDay) / msInHour);
    const minutes = Math.floor((diff % msInHour) / msInMinute);
    const seconds = Math.floor((diff % msInMinute) / msInSecond);

    if (weeks > 0) {
      return `${weeks} semana${weeks > 1 ? 's' : ''} y ${days} día${days > 1 ? 's' : ''}`;
    }
    if (days > 0) {
      return `${days} día${days > 1 ? 's' : ''} y ${hours} hora${hours > 1 ? 's' : ''}`;
    }
    if (hours > 0) {
      return `${hours} hora${hours > 1 ? 's' : ''} y ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
      return `${minutes} minuto${minutes > 1 ? 's' : ''} y ${seconds} segundo${seconds > 1 ? 's' : ''}`;
    }
    return `${seconds} segundo${seconds !== 1 ? 's' : ''}`;
  };

  return (
    <Box
      onClick={() => navigate('/user/pedidos')}
      display="flex"
      alignItems="center"
      p={1.5}
      borderRadius="8px"
      bgcolor="rgba(255, 255, 255, 0.1)"
      sx={{
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.15)',
        },
        transition: 'background-color 0.3s ease',
      }}
    >
      <Box width="100%" display="flex" flexDirection="row" alignItems="center">
        <Box mr={2}>
          <Avatar sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 40, height: 40 }}>
            <SelectIcon />
          </Avatar>
        </Box>
        <Box>
          <Typography fontWeight={500} fontSize="0.9rem" fontFamily={typography} color="text.primary">
            Solicitante: {data.nombreSolicitante + ' ' + data.apellidoSolicitante}
          </Typography>
          <Typography fontSize="0.75rem" fontFamily={typography} color="text.secondary">
            {calcDate()}
          </Typography>
          <Typography fontSize="0.75rem" fontFamily={typography} color="text.secondary">
            Método de Pago: {data.metodoPago}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default NotifyType;
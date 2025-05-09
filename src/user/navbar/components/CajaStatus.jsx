import { Box, Typography } from "@mui/material";

const CajaStatus = ({ contador }) => {
  return (
    <Box
      mr={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        borderRadius: '5px',
        padding: '2px 12px',
        display: 'inline-block',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        color={contador === null ? 'red' : 'green'}
        fontSize={'1rem'}
        fontFamily="Nunito"
        fontWeight={600}
      >
        {contador === null ? 'Caja cerrada' : `Caja abierta - ${contador}`}
      </Typography>
    </Box>
  );
};

export default CajaStatus;

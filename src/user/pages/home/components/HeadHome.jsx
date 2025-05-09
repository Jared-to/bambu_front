import { Box, Grid, Typography, Button } from '@mui/material';
import img from '../../../../../public/fondoTa.webp'
import img2 from '../../../../../public/ITEMS.bo_.png'
import { useSelector } from 'react-redux';

export const HeadHome = () => {
  const { user } = useSelector(stae => stae.auth)
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} display={'flex'} justifyContent={'center'}>
        <Box
          width={1000}
          p={4}
          borderRadius={3}
          sx={{
            background: 'linear-gradient(135deg, rgb(52, 9, 90), rgb(101, 29, 165))', // Degradado morado
            color: 'white',
            boxShadow: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '180px', // Altura del Box
          }}
        >
          {/* Contenido de texto */}
          <Box>
            <Typography
              fontFamily={'Nunito'}
              variant="h4"
              fontWeight={'bold'}
            >
              Bienvenido de vuelta, {user.name}
            </Typography>
            <Typography
              fontFamily={'Nunito'}
              variant="body1"
              color="#c6ccd1"
            >
              Estas son las últimas estadísticas del sistema.
            </Typography>
          </Box>

          {/* Imagen en la parte derecha */}
          <Box
            component="img"
            src={img2}
            alt="Estadísticas"
            sx={{
              height: '100%', // Imagen llena el alto del Box
              borderRadius: 3, // Opcional, para bordes redondeados
              boxShadow: 3, // Añade un poco de sombra
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        display="flex"
        justifyContent="center"
      >
        <Box
          width="100%"
          height={'240px'}
          borderRadius={3}
          sx={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative', // Necesario para colocar el cuadro encima
            overflow: 'hidden', // Evita desbordes del contenido
            border: '2px solid #ddd', // Borde sutil
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Sombra suave
          }}
        >
          <Box
            sx={{
              position: 'absolute', // Cuadro encima
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff', // Color del texto
              textAlign: 'center',
            }}
          >
            <a
              href='https://items.bo/'
              target="_blank"
              style={{
                textDecoration: 'none',
              }}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                fontFamily="Nunito"
                color='white'
                sx={{ mb: 1 }}
              >
                ITEMS.BO
              </Typography>
            </a>
            <Typography
              variant="body1"
              fontFamily="Nunito"
              sx={{ maxWidth: '80%' }}
            >
              Explora nuestra colección y encuentra lo que necesitas.
            </Typography>
          </Box>
        </Box>
      </Grid>


    </Grid>
  );
};

import { useEffect, useState } from 'react';

import { Typography, Grid, Box } from '@mui/material';
import { QrCode, Contacts } from '@mui/icons-material';
import PhotoCameraBackOutlinedIcon from '@mui/icons-material/PhotoCameraBackOutlined';

import { ModalQr } from './components/ModalQr';
import { useConfigStore } from '../../../hooks/useConfigStore';
import { ModalContactos } from './components/ModalContactos';
import { ModalImagen } from './components/ModalImagen';

export const PagConfig = () => {
  //?Estados
  const { getConfig, subirQr, cambiarRedes,subirImagen } = useConfigStore();
  const [data, setData] = useState({})
  const [modalQR, setModalQR] = useState(false);
  const [modalContac, setModalContac] = useState(false);
  const [modalImagen, setModalImagen] = useState(false);

  //?Funciones
  const handleOpenModal = () => setModalQR(true);
  const handleCloseModal = () => setModalQR(false);
  //modal contactos
  const handleOpenModalContact = () => setModalContac(true);
  const handleCloseModalContact = () => setModalContac(false);

  //modal imagen
  const handleOpenModalImagen = () => setModalImagen(true);
  const handleCloseModalImagen = () => setModalImagen(false);
  const handleGetData = async () => {
    const data = await getConfig()
    setData(data)
  }

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
      <Typography variant="h4" gutterBottom>
        Configuración
      </Typography>
      <Grid container spacing={3} justifyContent="center" maxWidth={600}>
        <Grid item xs={12} sm={6}>
          <Box
            onClick={handleOpenModal}
            p={3}
            bgcolor="white"
            borderRadius={4}
            boxShadow={3}
            sx={{
              transition: '0.4s ease',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Typography
              fontWeight={700}
              fontSize="1.5rem"
              textAlign="center"
              fontFamily="Nunito"
              color="primary.main"
            >
              QR de Pago
            </Typography>
            <Box display="flex" justifyContent="center" my={4}>
              <QrCode sx={{ fontSize: 60, color: 'primary.main' }} />
            </Box>
            <Box textAlign="center" fontFamily="Nunito" mb={3}>
              <Typography variant="body1" color="text.secondary" fontFamily={'Nunito'}>
                Gestiona tu código QR de pago.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            onClick={handleOpenModalContact}
            p={3}
            bgcolor="white"
            borderRadius={4}
            boxShadow={3}
            sx={{
              transition: '0.4s ease',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Typography
              fontWeight={700}
              fontSize="1.5rem"
              textAlign="center"
              fontFamily="Nunito"
              color="secondary"
            >
              Redes de Contacto
            </Typography>
            <Box display="flex" justifyContent="center" my={4}>
              <Contacts sx={{ fontSize: 60, color: 'secondary.main' }} />
            </Box>
            <Box textAlign="center" fontFamily="Nunito" mb={3}>
              <Typography variant="body1" color="text.secondary" fontFamily={'Nunito'}>
                Administra las redes de contacto de la pagina.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            onClick={handleOpenModalImagen}
            p={3}
            bgcolor="white"
            borderRadius={4}
            boxShadow={3}
            sx={{
              transition: '0.4s ease',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Typography
              fontWeight={700}
              fontSize="1.5rem"
              textAlign="center"
              fontFamily="Nunito"
              color="coral"
            >
              Imagen Principal
            </Typography>
            <Box display="flex" justifyContent="center" my={4}>
              <PhotoCameraBackOutlinedIcon sx={{ fontSize: 60, color: 'coral' }} />
            </Box>
            <Box textAlign="center" fontFamily="Nunito" mb={3}>
              <Typography variant="body1" color="text.secondary" fontFamily={'Nunito'}>
                Administra la Imagen Principal.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ModalQr open={modalQR} handleClose={handleCloseModal} qr={data.imagenQR} subirQr={subirQr} handleGetData={handleGetData} />
      <ModalContactos open={modalContac} handleClose={handleCloseModalContact} data={data} updateSocial={cambiarRedes} handleGetData={handleGetData} />
      <ModalImagen open={modalImagen} handleClose={handleCloseModalImagen} imagen={data.imagenPrincipal} subirImagen={subirImagen} handleGetData={handleGetData}  />
    </Box>
  );
};

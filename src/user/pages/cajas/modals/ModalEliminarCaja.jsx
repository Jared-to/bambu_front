
import { Modal, Box, Typography, Button } from '@mui/material';
import { Delete as DeleteIcon, Cancel as CancelIcon } from '@mui/icons-material';
import toast from 'react-hot-toast';

 const ModalEliminarCaja = ({ open, onClose, onDelete, id, handleGetData }) => {
  const handleDeleteCaja = async () => {

    if (!id) {
      return
    }

    await toast.promise(
      onDelete(id),
      {
        loading: "Cargando Petición",
        success: () => {
          handleGetData();
          onClose();
          return "Caja eliminada con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-eliminar-venta"
      aria-describedby="modal-para-confirmar-la-eliminacion-de-la-venta"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontFamily={'Nunito'} textAlign={'center'}>
          ¿Estás seguro de que quieres eliminar esta caja?
        </Typography>
        <Typography variant="body1" fontFamily={'Nunito'} textAlign={'center'} sx={{ mt: 2 }}>
          Esta acción eliminara las ventas y gastos asociados a la caja.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onClose}
            startIcon={<CancelIcon />}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteCaja}
            startIcon={<DeleteIcon />}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalEliminarCaja;
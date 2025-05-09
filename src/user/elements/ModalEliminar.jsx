import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const ModalEliminar = ({ open, handleClose, handleFunction }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: { borderRadius: 4, p: 2, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' },
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningAmberIcon sx={{ color: 'orange', fontSize: 32 }} />
        <Typography variant="h6" component="span" fontWeight="bold">
          ¿Estás seguro de eliminar este elemento?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ color: 'text.secondary', fontSize: 16, lineHeight: 1.5, textAlign: 'justify' }}
        >
          Esta acción no se puede deshacer. El elemento será eliminado permanentemente.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', mt: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            borderColor: 'text.primary',
            color: 'text.primary',
            '&:hover': { backgroundColor: 'action.hover' },
          }}
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleFunction}
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
          sx={{ boxShadow: '0px 4px 10px rgba(255, 0, 0, 0.4)' }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

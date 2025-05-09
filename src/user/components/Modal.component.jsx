import { useMemo } from "react";
import { Box, Button, Fade, IconButton, Modal, Typography } from "@mui/material";

import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

import PropTypes from "prop-types";

export const ModalComponent = ({ big = false, title, children, handleSaveform, handleClose, open, }) => {
  const style = useMemo(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    width: { xs: '90%', sm: big ? 600 : 350, md: big ? 800 : 450, lg: big ? 900 : 450, xl: big ? 1100 : 470 },
    boxShadow: 24,
    borderRadius: 4,
    p: 2
  }), []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={"modal-modal-" + title}
      aria-describedby={"modal-modal-" + title}
    >
      <Fade in={open}>
        <Box sx={{ ...style, maxHeight: '90vh', overflow: 'auto' }}>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography id="modal-modal-title" fontSize={'1.4rem'} fontWeight={500} fontFamily={'Nunito'}>
              {title}
            </Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Box>
          <form action="" onSubmit={handleSaveform}>
            <Box id="modal-modal-description">
              {children}
            </Box>
            <Box mt={3} display="flex" justifyContent={'right'} gap={2}>
              <Button
                variant="outlined"
                onClick={handleClose}
                color="error"
                sx={{ '&:hover': { backgroundColor: '#ff0000', color: 'white' } }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Guardar
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal >
  )
}

ModalComponent.propTypes = {
  handleClose: PropTypes.func.isRequired,
  medium: PropTypes.bool,
  big: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
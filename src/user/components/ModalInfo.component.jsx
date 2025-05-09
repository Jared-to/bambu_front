import { useMemo } from "react";
import { Box, Button, Fade, IconButton, Modal, Typography } from "@mui/material";

import ClearIcon from '@mui/icons-material/Clear';



export const ModalInfo = ({ big = false, title, children, handleClose, open, }) => {
  const style = useMemo(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    width: { xs: big ? '90%' : '90%', sm: big ? 600 : 350, md: big ? 800 : 450, lg: big ? 800 : 450, xl: big ? 1000 : 470 },
    boxShadow: 24,
    borderRadius: 4,
    p: 2,
    overflowY: "auto",
    scrollbarGutter: "stable",
    "&::-webkit-scrollbar": {
      width: "8px",
      height: '5px'
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#b0bec5",
      borderRadius: "4px",
      height: '5px'
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#78909c",
      height: '5px'
    },

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
            <Typography id="modal-modal-title" fontSize={'1.5rem'}>
              {title}
            </Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Box>
          <Box id="modal-modal-description">
            {children}
          </Box>
          <Box mt={3} display="flex" justifyContent={'right'} gap={2}>
            <Button
              onClick={handleClose}
              type="submit"
              variant="contained"
              color="success"
              size="small"
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal >
  )
}

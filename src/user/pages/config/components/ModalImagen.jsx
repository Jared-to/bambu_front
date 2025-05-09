import { Box, Grid, Typography } from "@mui/material"
import toast from "react-hot-toast"

import { useForm } from "../../../../hooks/useForm"
import { ModalComponent } from "../../../components/Modal.component"
import { TextFieldComponent } from "../../../components/TextFieldComponent"


export const ModalImagen = ({ open, handleClose, imagen, subirImagen, handleGetData }) => {
  //?Estados
  const { formState, onInputChange, resetForm } = useForm({
    imagen: ''
  })
  //?Funciones
  const handleSaveForm = (e) => {
    e.preventDefault();

    toast.promise(
      subirImagen(formState),
      {
        loading: "Cargando Petición",
        success: () => {
          handleClose();
          resetForm();
          handleGetData()
          return "Imagen subida con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  };
  
  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Imagen Principal"
      handleSaveform={handleSaveForm}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} >
          <Typography textAlign={'center'} fontFamily={'Nunito'} variant="body2" fontWeight={600} mb={1}>
            Imagen Actual
          </Typography>
          {imagen !== 'imagen' ?
            <Box
              sx={{
                backgroundImage: `url(${imagen})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: 250,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
            :
            <Typography textAlign={'center'} fontFamily={'Nunito'} variant="body2" fontWeight={600} mb={1}>
              No Hay un QR asignado aun.
            </Typography>
          }
        </Grid>
        <Grid item xs={12}>
          <Typography fontFamily={'Nunito'} variant="body2" fontWeight={600} mb={1}>
            Subir Nueva Imagen Principal
          </Typography>
          <TextFieldComponent
            formState={formState}
            onInputChange={onInputChange}
            name={'imagen'}
            type={'file'}
            requerid
            small
          />
        </Grid>
      </Grid>
    </ModalComponent>
  )
}

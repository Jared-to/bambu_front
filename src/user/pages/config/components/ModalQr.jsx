import { Box, Grid, Typography } from "@mui/material"
import toast from "react-hot-toast"

import { useForm } from "../../../../hooks/useForm"
import { ModalComponent } from "../../../components/Modal.component"
import { TextFieldComponent } from "../../../components/TextFieldComponent"


export const ModalQr = ({ open, handleClose, qr, subirQr,handleGetData }) => {
  //?Estados
  const { formState, onInputChange, resetForm } = useForm({
    qr: ''
  })
  //?Funciones
  const handleSaveForm = (e) => {
    e.preventDefault();

    toast.promise(
      subirQr(formState),
      {
        loading: "Cargando Petición",
        success: () => {
          handleClose();
          resetForm();
          handleGetData()
          return "QR subido con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );

  };
  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="QR para Pagos"
      handleSaveform={handleSaveForm}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} >
          <Typography fontFamily={'Nunito'} variant="body2" fontWeight={600} mb={1}>
            Qr Actual
          </Typography>
          {qr !== 'qr' ?
            <Box
              sx={{
                backgroundImage: `url(${qr})`,
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
            Qr Nuevo (Subir imagen del QR)
          </Typography>
          <TextFieldComponent
            formState={formState}
            onInputChange={onInputChange}
            name={'qr'}
            type={'file'}
            requerid
            small
          />
        </Grid>
      </Grid>
    </ModalComponent>
  )
}

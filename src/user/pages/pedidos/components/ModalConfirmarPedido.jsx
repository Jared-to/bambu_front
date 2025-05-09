import toast from "react-hot-toast"
import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material"

import { useForm } from "../../../../hooks/useForm"
import { ModalComponent } from "../../../components/Modal.component"


export const ModalConfirmarPedido = ({ open, handleClose, data, dischargePDFPedido, handleGetData,confimarPedido }) => {
  //?Estados
  const { formState, onInputChange } = useForm({
    metodoPago: ''
  })

  //?Funciones
  const handleSaveForm = async (e) => {
    e.preventDefault();
    toast.promise(
      confimarPedido(data,formState.metodoPago),
      {
        loading: "Cargando Petición",
        success: (data) => {
          dischargePDFPedido(data.id);
          handleGetData();
          handleClose();
          return "Pedido enviado con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }
  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Confirmar Metodo de Pago"
      handleSaveform={handleSaveForm}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} >
          <Typography
            fontSize={'0.9rem'}
            style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
          >
            Metodo de Pago
          </Typography>
          <FormControl fullWidth>
            <Select
              size="small"
              onChange={onInputChange}
              name="metodoPago"
              value={formState["metodoPago"]}
              required
            >
              <MenuItem value="">Seleccionar Método</MenuItem>
              <MenuItem value="EFECTIVO">Efectivo</MenuItem>
              <MenuItem value="QR">QR</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </ModalComponent>
  )
}

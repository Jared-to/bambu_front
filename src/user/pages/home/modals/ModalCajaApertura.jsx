import { Grid, Typography } from '@mui/material';
import toast from 'react-hot-toast';

import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

import { ModalComponent } from '../../../components/Modal.component'
import { useForm } from '../../../../hooks/useForm'
import { TextFieldComponent } from '../../../components/TextFieldComponent';

export const ModalCajaApertura = ({ open, handleClose, abrirCaja, inicialContador }) => {

  const { formState, onInputChange, resetForm } = useForm({
    saldo_inicial: 0
  })

  const handleSaveForm = async (e) => {
    e.preventDefault();
    toast.promise(
      abrirCaja(formState),
      {
        loading: "Cargando Petición",
        success: (res) => {
          handleClose();
          resetForm();
          inicialContador(res.fecha_apertura)
          return "Caja abierta con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }

  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Abrir Caja"
      handleSaveform={handleSaveForm}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} >
          <Typography
            fontSize={'0.9rem'}
            style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
          >
            Saldo Inicial
          </Typography>
          <TextFieldComponent
            formState={formState}
            helper={'Campo Obligatorio'}
            onInputChange={onInputChange}
            name={'saldo_inicial'}
            placeholder={'Saldo inicial de la Caja'}
            type={'number'}
            small={true}
            nome='BOB'
          />
        </Grid>
      </Grid>
    </ModalComponent>
  )
}

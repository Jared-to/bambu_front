import { Alert, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';

import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import { ModalComponent } from '../../../components/Modal.component';
import { TextFieldComponent } from '../../../components/TextFieldComponent';
import { useForm } from '../../../../hooks/useForm';
import { formatDateToInput } from '../../../helpers/ObtenerFechaHoraLocal';
import toast from 'react-hot-toast';


const inputs = [
  {
    label: "Fecha",
    type: "datetime-local",
    name: "fecha",
    reqerid: true,
  },
  {
    label: "Monto",
    type: "number",
    name: "monto",
    placeholder: "Ingrese el monto ",
    icon: <CreditCardOutlinedIcon />,
    reqerid: true,
  },
];

export const ModalCuota = ({ open, handleClose, id, info = {}, nuevaCuota, handleGetData }) => {
  const { formState, onInputChange, resetForm } = useForm({
    fecha: formatDateToInput(new Date()),
    monto: 0,
    glosa: '',
    metodo_pago: 'EFECTIVO'
  })

  const handleSaveForm = async (e) => {
    e.preventDefault()
    const form = {
      ...formState,
      id
    }
    toast.promise(
      nuevaCuota(form), {
      loading: "Cargando Petición",
      success: () => {
        resetForm()
        handleClose();
        handleGetData(id);
        return 'Cuota Agregada con exito';
      },
      error: (err) => `Error: ${err.message}`,
    });
  }
  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Registro Cuota"
      handleSaveform={handleSaveForm}
    >
      <Grid container spacing={1}>
        {/* <Grid item xs={12}>
          <Alert severity='info'>
            Monto esperado: {info.monto} Bs.
          </Alert>
        </Grid> */}
        {/* Fecha y Monto */}
        {inputs.map((input) => (
          <Grid item xs={12} key={input.name}>
            <Typography fontSize={'0.9rem'} fontWeight={600}>
              {input.label}
            </Typography>
            <TextFieldComponent
              requerid={input.reqerid}
              formState={formState}
              onInputChange={onInputChange}
              name={input.name}
              placeholder={input.placeholder}
              icon={input.icon}
              type={input.type}
              small={true}
            />
          </Grid>
        ))}

        {/* Glosa y Detalle en una misma fila */}
        <Grid item xs={12}>
          <Typography fontSize={'0.9rem'} fontWeight={600}>
            Glosa
          </Typography>
          <TextFieldComponent
            requerid={true}
            formState={formState}
            onInputChange={onInputChange}
            name="glosa"
            placeholder="Ingrese la glosa/Nota"
            icon={<DocumentScannerOutlinedIcon />}
            type="text"
            small={true}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography fontSize={'0.9rem'} fontWeight={600}>
            Método de Pago
          </Typography>
          <FormControl fullWidth>
            <Select
              size="small"
              onChange={onInputChange}
              name="metodo_pago"
              value={formState.metodo_pago}
              required
            >
              <MenuItem value="EFECTIVO">Efectivo</MenuItem>
              <MenuItem value="QR">QR</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </ModalComponent>
  )
}

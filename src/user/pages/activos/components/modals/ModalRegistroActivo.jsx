import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import toast from 'react-hot-toast';


import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import { ModalComponent } from '../../../../components/Modal.component'
import { useForm } from '../../../../../hooks/useForm';
import { TextFieldComponent } from '../../../../components/TextFieldComponent';
import { formatDateToInput } from '../../../../helpers/ObtenerFechaHoraLocal';
const inputs = [
  {
    label: "Fecha",
    type: "datetime-local",
    name: "fecha",
  },
  {
    label: "Glosa/Nota",
    type: "text",
    name: "glosa",
    placeholder: "Ingrese la Glosa/Nota",
    icon: <DocumentScannerOutlinedIcon />,
  },
  {
    label: "Cantidad",
    type: "number",
    name: "cantidad",
    placeholder: "Ingrese la Cantidad",
    icon: <ArticleOutlinedIcon />,
  },
];

export const ModalRegistroActivo = ({ open, handleClose, id,registrarRegistro,handleGetData }) => {
  //?Estados
  const { formState, onInputChange,resetForm } = useForm({
    fecha: formatDateToInput(new Date()),
    glosa: '',
    cantidad: '',
    tipo:'ingreso'
  });

  //?Funciones
  // Función para manejar guardar el formulario
  const handleSaveForm = async (e) => {
    e.preventDefault();
    toast.promise(
      registrarRegistro(formState,id), {
      loading: "Cargando Petición",
      success: () => {
        handleClose();
        resetForm();
        handleGetData()
        return 'Registro registrado con exito.'
      },
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Nuevo Registro"
      handleSaveform={handleSaveForm}
    >
      <Grid container spacing={1}>
        {inputs.map((input) => (
          <Grid item xs={12} key={input.name}>
            <Typography
              fontSize={'0.9rem'}
              style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
            >
              {input.label}
            </Typography>
            <TextFieldComponent
              formState={formState}
              helper={'Campo Obligatorio'}
              onInputChange={onInputChange}
              name={input.name}
              placeholder={input.placeholder}
              icon={input.icon}
              type={input.type}
              small={true}
              requerid
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography
            fontSize={'0.9rem'}
            style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
          >
            Tipo
          </Typography>
          <FormControl fullWidth>
            <Select
              size="small"
              onChange={onInputChange}
              name="tipo"
              value={formState["tipo"]}
            >
              <MenuItem value={"ingreso"}>Ingreso</MenuItem>
              <MenuItem value={"egreso"}>Egreso</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </ModalComponent>
  )
}

import { Grid, Typography } from "@mui/material"
import toast from "react-hot-toast";

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';

import { ModalComponent } from "../../../components/Modal.component"
import { useForm } from "../../../../hooks/useForm"
import { TextFieldComponent } from "../../../components/TextFieldComponent";
import { useEffect } from "react";
import { formatDateToInput } from "../../../helpers/ObtenerFechaHoraLocal";


const inputs = [
  {
    label: "Nombre del Descuento",
    type: "text",
    name: "descuento",
    placeholder: "Nombre del Descuento",
    icon: <ArticleOutlinedIcon />,
    reqerid: true,
  },
  {
    label: "Porcentaje",
    type: "number",
    name: "porcentaje",
    placeholder: "Ingrese el porcentaje del Descuento",
    icon: <PercentOutlinedIcon />,
    reqerid: true,
  },
  {
    label: "Fecha Inicio",
    type: "date",
    name: "fechaIn",
    reqerid: true,
  },
  {
    label: "Fecha Fin",
    type: "date",
    name: "fechaFn",
    reqerid: true,
  },
];
export const ModalDescuentos = ({ open, handleClose, crearDescuento, handleGetData, descuento, updateDescuento }) => {
  //?Estados
  const { formState, onInputChange, resetForm, setFormState } = useForm({
    descuento: '',
    porcentaje: '',
    fechaIn: '',
    fechaFn: ''
  });

  //enviar form
  const handleSaveForm = async (e) => {
    e.preventDefault()
    if (descuento) {
      toast.promise(
        updateDescuento(formState,descuento.id), {
        loading: "Cargando Petición",
        success: () => {
          handleClose();
          handleGetData();
          resetForm()
          return 'Descuento editado con éxito!.';
        },
        error: (err) => `Error: ${err.message}`,
      });
    } else {
      toast.promise(
        crearDescuento(formState), {
        loading: "Cargando Petición",
        success: () => {
          handleClose();
          handleGetData();
          resetForm()
          return 'Descuento Creado con éxito!.';
        },
        error: (err) => `Error: El nombre del descuento no puede ser igual.`,
      });
    }
  }
  //efecto
  useEffect(() => {
    if (descuento) {
      setFormState({
        descuento: descuento.descuento,
        porcentaje: descuento.porcentaje,
        fechaIn: descuento.fechaInicio.split("T")[0],
        fechaFn: descuento.fechaFin.split("T")[0],
      })
    }
  }, [descuento])

  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Registro Descuento"
      handleSaveform={handleSaveForm}
    >
      <Grid container spacing={1}>
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
      </Grid>
    </ModalComponent>
  )
}

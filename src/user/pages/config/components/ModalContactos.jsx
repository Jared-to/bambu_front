import { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import toast from 'react-hot-toast';

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

import { ModalComponent } from '../../../components/Modal.component';
import { TextFieldComponent } from '../../../components/TextFieldComponent';
import { useForm } from '../../../../hooks/useForm';

const inputs = [
  {
    label: "WhatsApp ",
    type: "number",
    name: "telefono",
    placeholder: "Numero de WhatsApp principal",
    icon: <WhatsAppIcon />,
  },
  {
    label: "Link de Facebook",
    type: "text",
    name: "linkFace",
    placeholder: "https://es-la.facebook.com/",
    icon: <FacebookOutlinedIcon />,
  },
  {
    label: "Link de Instagram",
    type: "text",
    name: "linkInstagram",
    placeholder: "https://www.instagram.com/",
    icon: <InstagramIcon />,
  },
];
export const ModalContactos = ({ open, handleClose, data = {}, updateSocial, handleGetData }) => {
  //?Estados
  const { formState, onInputChange, resetForm, setFormState } = useForm({
    telefono: '',
    linkFace: '',
    linkInstagram: ''
  });
  //?Funciones
  const handleSaveForm = (e) => {
    e.preventDefault();

    toast.promise(
      updateSocial(formState),
      {
        loading: "Cargando Petición",
        success: () => {
          handleClose();
          resetForm();
          handleGetData();
          return "Redes cambiadas con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );

  };

  useEffect(() => {
    if (data) {
      setFormState({
        telefono: data.telefonoPrincipal,
        linkFace: data.linkFacebook,
        linkInstagram: data.linkInstagram
      })
    }
  }, [data])

  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Contactos"
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
              requerid={true}
            />
          </Grid>
        ))}

      </Grid>
    </ModalComponent>
  )
}

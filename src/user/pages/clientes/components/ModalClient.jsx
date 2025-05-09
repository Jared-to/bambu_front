import { useEffect } from "react";
import { Grid, Typography, } from "@mui/material";
import toast from "react-hot-toast";

import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CelebrationIcon from '@mui/icons-material/Celebration';

import { ModalComponent } from "../../../components/Modal.component";
import { useForm } from "../../../../hooks/useForm";
import { TextFieldComponent } from "../../../components/TextFieldComponent";

const inputs = [
  {
    label: "Nombre ",
    type: "text",
    name: "nombre",
    placeholder: "Ingrese el nombre",
    icon: <PersonIcon />,
  },
  {
    label: "Apellido",
    type: "text",
    name: "apellido",
    placeholder: "Ingrese el apellido",
    icon: <AccountCircleIcon />,
  },
  {
    label: "Dirección",
    type: "text",
    name: "direccion",
    placeholder: "Ingrese la direccion",
    icon: <LocationOnIcon />,
  },
  {
    label: "Cumpleaños",
    type: "date",
    name: "cumpleanios",
    placeholder: "Ingrese la Cumpleaños",
    icon: <CelebrationIcon />,
  },
  {
    label: "Telefono",
    type: "number",
    name: "telefono",
    placeholder: "Ingrese la telefono",
    icon: <PhoneIcon />,
  },
];
export const ModalClient = ({ open, handleClose, createClient, handleGetData, updateClient, client = undefined }) => {
  // Estados
  const { formState, onInputChange, resetForm, setFormState } = useForm({
    nombre: "",
    apellido: "",
    direccion: "",
    cumpleanios: "",
    telefono: "",
  });

  useEffect(() => {
    if (client !== undefined) {
      setFormState({
        nombre: client.nombre || "",
        apellido: client.apellido || "",
        direccion: client.direccion,
        cumpleanios: client.cumpleanios || "",
        telefono: client.telefono || '',
      });
    }
  }, [client]);

  useEffect(() => {
    if (!open) {
      setFormState({
        nombre: "",
        apellido: "",
        direccion: '',
        cumpleanios: '' || "",
        telefono: '',
      })
    }
  }, [open])


  const handleSaveForm = (e) => {
    e.preventDefault();

    if (client !== undefined) {
      toast.promise(
        updateClient(formState, client.id),
        {
          loading: "Cargando Petición",
          success: () => {
            handleClose();
            resetForm();
            handleGetData();
            return "Cliente editado con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    } else {
      toast.promise(
        createClient(formState),
        {
          loading: "Cargando Petición",
          success: () => {
            handleClose();
            resetForm();
            handleGetData();
            return "Cliente creado con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    }
  };
  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Registro Cliente"
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

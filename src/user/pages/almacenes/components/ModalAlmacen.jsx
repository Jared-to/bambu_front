import { useEffect } from "react";
import { Grid, Typography, } from "@mui/material";
import toast from "react-hot-toast";

import WarehouseIcon from '@mui/icons-material/Warehouse';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

import { ModalComponent } from "../../../components/Modal.component";
import { useForm } from "../../../../hooks/useForm";
import { TextFieldComponent } from "../../../components/TextFieldComponent";

const inputs = [
  {
    label: "Nombre ",
    type: "text",
    name: "nombre",
    placeholder: "Ingrese el nombre del almacen",
    requeri: true,
    icon: <WarehouseIcon />,
  },
  {
    label: "Ubicación ",
    type: "text",
    name: "ubicacion",
    placeholder: "Ingrese la ubicación del almacen",
    icon: <LocationOnOutlinedIcon />,
  },
  {
    label: "Telefono",
    type: "text",
    name: "telefono",
    placeholder: "Ingrese el telefono de referencia",
    icon: <PersonPinOutlinedIcon />,
  },
  {
    label: "Horario de Atencion ",
    type: "text",
    name: "horaAtencion",
    placeholder: "Hora cotidiano de atencin",
    icon: <WatchLaterOutlinedIcon />,
  },
  {
    label: "Link de Ubicación GPS ",
    type: "text",
    name: "linkGps",
    placeholder: "Hora cotidiano de atencin",
    icon: <AddLocationAltOutlinedIcon />,
  },
];
export const ModalAlmacen = ({ open, handleClose, createAlmacen, handleGetData, updatealmacen, almacen = undefined }) => {
  // Estados
  const { formState, onInputChange, resetForm, setFormState } = useForm({
    nombre: "",
    ubicacion: "",
    telefono: "",
    horaAtencion: '',
    linkGps: ''
  });
  //?funciones
  useEffect(() => {
    if (almacen !== undefined) {

      setFormState({
        nombre: almacen.nombre || "",
        ubicacion: almacen.ubicacion || "",
        telefono: almacen?.telefono || "",
        horaAtencion: almacen?.HoraAtencion || "",
        linkGps: almacen?.linkGPS || ""
      });
    }
  }, [almacen]);
  useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open])


  const handleSaveForm = (e) => {
    e.preventDefault();

    if (almacen !== undefined) {
      toast.promise(
        updatealmacen(formState, almacen.id),
        {
          loading: "Cargando Petición",
          success: () => {
            handleClose();
            resetForm();
            handleGetData();
            return "Sucursal editado con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    } else {
      toast.promise(
        createAlmacen(formState),
        {
          loading: "Cargando Petición",
          success: () => {
            handleClose();
            resetForm();
            handleGetData();
            return "Sucursal creado con éxito!";
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
      title="Registro Sucursal"
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
              requerid={input.requeri}
            />
          </Grid>
        ))}
      </Grid>
    </ModalComponent>
  )
}

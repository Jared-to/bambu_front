import { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import ArticleIcon from '@mui/icons-material/Article';
import NorthIcon from '@mui/icons-material/North';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useForm } from "../../../../../../hooks/useForm";
import { ModalComponent } from "../../../../../components/Modal.component";
import { TextFieldComponent } from "../../../../../components/TextFieldComponent";

const inputs = [
  {
    label: "Descripción",
    type: "text",
    name: "descripcion",
    placeholder: "Ingrese la Descripción",
    icon: <ArticleIcon />,
    width: 12
  },
  {
    label: "Marca",
    type: "text",
    name: "marca",
    placeholder: "Ingrese la Marca",
    icon: <BrandingWatermarkIcon />,
    width: 6
  },
  {
    label: "Cantidad",
    type: "number",
    name: "cantidad",
    placeholder: "Ingrese la cantidad",
    icon: <NorthIcon />,
    width: 6
  },
  {
    label: "Fecha de Adquisición",
    type: "date",
    name: "fechaAdquisicion",
    width: 12
  },
  {
    label: "Proveedor",
    type: "text",
    name: "proveedor",
    placeholder: "Ingrese el proveedor",
    icon: <AccountCircleIcon />,
    width: 12
  },
];
export const ModalNoPerecederos = ({ open, handleClose, activo, updateActivo, createActivo, categorias = [], handleGetData }) => {

  const { formState, onInputChange, resetForm, setFormState } = useForm({
    descripcion: '',
    marca: '',
    cantidad: '',
    fechaAdquisicion: new Date().toISOString().split('T')[0],
    proveedor: '',
    categoria: '',
    tipo: 'noperecedero'
  })
  //?funciones
  const handleSaveForm = (e) => {
    e.preventDefault();

    if (activo !== undefined) {
      toast.promise(
        updateActivo(formState, activo.id),
        {
          loading: "Cargando Petición",
          success: () => {
            handleClose();
            resetForm();
            handleGetData();
            return "Activo editada con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    } else {
      toast.promise(
        createActivo(formState),
        {
          loading: "Cargando Petición",
          success: () => {
            handleClose();
            resetForm();
            handleGetData();
            return "Activo creada con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    }
  };

  // Efecto para cargar datos del activo (editar)
  useEffect(() => {
    if (activo) {
      const now = new Date(activo.fechaAdquisicion);
      const nowven = new Date(activo.fechaVencimiento);
      setFormState({
        descripcion: activo.descripcion,
        marca: activo.marca,
        cantidad: activo.cantidad,
        fechaAdquisicion: now.toISOString().split('T')[0],
        fechaVencimiento: nowven.toISOString().split('T')[0],
        proveedor: activo.proveedor,
        categoria: activo.categoria.id || ''
      });
    } else {
      resetForm();
    }
  }, [activo]);
  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Activo Perecedero"
      handleSaveform={handleSaveForm}
    >
      <Grid container spacing={1}>
        {inputs.map((input) => (
          <Grid item xs={12} md={input.width} key={input.name}>
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
        <Grid item xs={12} >
          <Typography fontSize={'0.9rem'} fontWeight={600}>
            Categoría
          </Typography>
          <FormControl fullWidth>
            <Select
              size="small"
              onChange={onInputChange}
              name="categoria"
              value={formState["categoria"]}
              required
            >
              <MenuItem disabled value={""}>Categorías</MenuItem>
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </ModalComponent>
  )
}

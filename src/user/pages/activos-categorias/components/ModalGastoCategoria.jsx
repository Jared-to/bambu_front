import { useEffect } from "react";
import { Grid, Typography, } from "@mui/material";
import toast from "react-hot-toast";

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

import { ModalComponent } from "../../../components/Modal.component";
import { useForm } from "../../../../hooks/useForm";
import { TextFieldComponent } from "../../../components/TextFieldComponent";

const inputs = [
  {
    label: "Nombre ",
    type: "text",
    name: "nombre",
    placeholder: "Ingrese el nombre de la categoria",
    icon: <CategoryOutlinedIcon />,
  },
  {
    label: "Descripción ",
    type: "text",
    name: "descripcion",
    placeholder: "Ingrese la descripción de la categoria",
    icon: <DocumentScannerIcon />,
  },
];


export const ModalActivoCategoria = ({ open, handleClose, createCategory, handleGetData, updateCategory, categoria = undefined }) => {
  // Estados
  const { formState, onInputChange, resetForm, setFormState } = useForm({
    nombre: "",
    descripcion: ''
  });
  //?funciones
  useEffect(() => {
    if (categoria !== undefined) {
      setFormState({
        nombre: categoria.nombre || "",
        descripcion: categoria.descripcion || "",

      });
    }
  }, [categoria]);
  useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open])


  const handleSaveForm = (e) => {
    e.preventDefault();

    if (categoria !== undefined) {
      toast.promise(
        updateCategory(formState, categoria.id),
        {
          loading: "Cargando Petición",
          success: () => {
            handleClose();
            resetForm();
            handleGetData();
            return "Categoria editada con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    } else {
      toast.promise(
        createCategory(formState),
        {
          loading: "Cargando Petición",
          success: () => {
            handleClose();
            resetForm();
            handleGetData();
            return "Categoria creada con éxito!";
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
      title="Registro Categoria"
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
    </ModalComponent>)
}

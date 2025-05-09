import { useEffect, useState } from "react";
import { Box, Checkbox, Collapse, FormControlLabel, Grid, Typography, } from "@mui/material";
import toast from "react-hot-toast";

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

import { ModalComponent } from "../../../components/Modal.component";
import { useForm } from "../../../../hooks/useForm";
import { TextFieldComponent } from "../../../components/TextFieldComponent";
import { UploadImagePreview } from "../../../ui/images/UploadImagePreview";

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

export const ModalCategoria = ({ open, handleClose, createCategory, handleGetData, updateCategory, categoria = undefined }) => {
  // Estados
  const [editImg, setEditImg] = useState(false);
  const { formState, onInputChange, resetForm, setFormState } = useForm({
    nombre: "",
    descripcion: '',
    img: ''
  });

  //?funciones
  useEffect(() => {
    if (categoria !== undefined) {
      setFormState({
        nombre: categoria.nombre || "",
        descripcion: categoria.descripcion || "",
        img: categoria.image || ""
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
      const form = {
        ...formState,
        editImg
      }
      toast.promise(
        updateCategory(form, categoria.id),
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
        {/* {categoria &&
          <Grid item xs={12} md={categoria && categoria?.imagen ? 3 : 12}>
            <FormControlLabel
              control={
                <Checkbox
                  color='success'
                  checked={editImg}
                  onChange={(e) => setEditImg(e.target.checked)}
                />
              }
              label="Editar Imágen?"
            />
          </Grid>
        } */}
        {/* <Grid item xs={12} >
          <Collapse in={categoria ? !editImg : false}>
            <Typography variant="body2" fontWeight={600} mb={1}>
              Imagen Actual
            </Typography>
            <Box
              sx={{

                height: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
                border: '1px solid #ddd',
                backgroundColor: '#f9f9f9',
              }}
            >
              <img
                src={categoria?.image || ''}
                alt="Imagen actual del producto"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Collapse>
        </Grid> */}
        {/* <Grid item xs={12}>
          <Collapse in={categoria ? editImg : true}>
            <UploadImagePreview onInputChange={onInputChange} defaultImageUrl="https://res.cloudinary.com/dhdxemsr1/image/upload/v1739824019/mczqepjigy8vf61khwtt.png" />
          </Collapse>
        </Grid> */}
      </Grid>
    </ModalComponent>
  )
}

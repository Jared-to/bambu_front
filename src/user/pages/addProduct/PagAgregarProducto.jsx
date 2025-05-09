import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Checkbox, Collapse, Divider, FormControl, FormControlLabel, Grid, InputAdornment, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { TextFieldComponent } from "../../components/TextFieldComponent";
import { useForm } from "../../../hooks/useForm";
import { UploadImagePreview } from "../../ui/images/UploadImagePreview";
import { useCategoriaStore } from "../../../hooks/useCategoriaStore";
import { useProductosStore } from "../../../hooks/useProductosStore";

const inputs = [
  {
    label: "Nombre del Producto",
    type: "text",
    name: "alias",
    placeholder: "Ingrese el alias del producto",
    requerido: true,
  },
  {
    label: "Descripción del Producto",
    type: "text",
    name: "descripcion",
    placeholder: "Ingrese la descripcion del producto",
  },
];
const inputs2 = [
  // {
  //   label: "Precio minimo de Venta",
  //   type: "number",
  //   name: "precioMinVenta",
  //   placeholder: "Ingrese el precio minimo de venta del producto",
  //   requerido: true,
  // },
  {
    label: "Precio de Venta Referencia",
    type: "number",
    name: "precio",
    placeholder: "Ingrese el precio del producto",
    requerido: true,
  },
];


const medidas = [
  { name: 'Unidades', id: 3 },
  { name: 'Caja', id: 1 },
  { name: 'Metros', id: 2 },
  { name: 'Horas', id: 4 },
]

const styleTextField = {
  borderRadius: 2,
  '.MuiInputLabel-outlined': {
    color: 'black',
    borderRadius: 1,
  },
  '& .MuiOutlinedInput-root': {
    color: 'black',
    borderRadius: 1,
    fontSize: '14px',
    '&:hover fieldset': {
      borderColor: '#bfc9d9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#bfc9d9',
      boxShadow: '1px 0 5px ' + '#bfc9d9'
    },
  },
}

export const PagAgregarProducto = () => {
  //?estados
  const { id } = useParams();
  const { getCategorias } = useCategoriaStore();
  const { crearProducto, getProducto, updateProducto } = useProductosStore()

  const [categorias, setCategorias] = useState([]);
  const [editImg, setEditImg] = useState(false);
  const [producto, setProducto] = useState(undefined);
  const [variantes, setVariantes] = useState([{ id: Date.now(), nombre: '', precio: '' }]);
  const navigate = useNavigate()
  const { formState, onInputChange, setFormState, resetForm } = useForm({
    alias: '',
    descripcion: '',
    precio: '',
    categoria: '',
    unidadMedida: 'Unidades',
    sku: '',
    img: '',
    precioMinVenta: ''
  })

  //?funciones
  //async categorias
  const handleGetCategorias = async () => {
    const data = await getCategorias();
    setCategorias(data);
  }
  //async producto
  const handleGetProducto = async (id) => {
    const data = await getProducto(id);

    setFormState(prevState => ({
      ...prevState,
      alias: data.alias || '',
      descripcion: data.descripcion || '',
      precio: data.precio_venta || '',
      // precioMinVenta: data.precio_min_venta || '',
      categoria: data.categoria.id || '',
      unidadMedida: data.unidad_medida || '',
      sku: data.sku || '',
    }))
    if (data?.variantes && data?.variantes?.length > 0) {
      setVariantes((prev) => {
        return data?.variantes?.map((variante, index) => ({
          id: `${Date.now()}-${index}`, // Puedes usar uuid() si quieres un id único real
          nombre: variante.nombre,
          precio: variante.precio
        }));
      });
    }


    setProducto(data);
  }

  const generateSKU = () => {
    const alias = formState.alias?.substring(0, 3).toUpperCase() || "";
    const categoria = categorias.find(cat => cat.id.toString() === formState.categoria)?.name?.substring(0, 3).toUpperCase() || "";
    const sku = `${alias}-${categoria}-${Date.now().toString().slice(-4)}`;
    setFormState(prevState => ({ ...prevState, sku }));
  };

  //volver
  const handleGetBack = () => {
    navigate('/user/productos')
  }
  const handleAddVariante = () => {
    setVariantes([...variantes, { id: Date.now(), nombre: '', precio: '' }]);
  };

  const handleRemoveVariante = (id) => {
    if (variantes.length > 1) {
      setVariantes(variantes.filter(variante => variante.id !== id));
    }
  };

  const handleVarianteChange = (id, field, value) => {
    setVariantes(variantes.map(variante =>
      variante.id === id ? { ...variante, [field]: value } : variante
    ));
  };

  //enviar form
  const handleSaveForm = (e) => {
    e.preventDefault();
    const form = {
      ...formState,
      variantes
    }
    if (id === undefined) {
      toast.promise(
        crearProducto(form),
        {
          loading: "Cargando Petición",
          success: () => {
            navigate('/user/productos')
            return "Producto creada con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    } else {
      let form = {
        ...formState,
        variantes,
        editImg
      }
      toast.promise(
        updateProducto(form, id),
        {
          loading: "Cargando Petición",
          success: () => {
            navigate('/user/productos')
            return "Producto editado con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    }

  }

  //efecto
  useEffect(() => {

    handleGetCategorias()
  }, [])

  useEffect(() => {
    if (id) {

      handleGetProducto(id);
    } else {

      setProducto(undefined);
    }
  }, [id])


  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontFamily: "Nunito, sans-serif",
              color: "#333",
            }}
          >
            {id ? "Editar" : "Nuevo"} Producto
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Crear un nuevo producto llenando los campos a continuación
          </Typography>
        </Box>
        <Button
          onClick={handleGetBack}
          variant="contained"
          startIcon={<ArrowBackOutlinedIcon />}
          sx={{
            textTransform: "none",
            fontSize: "0.85rem",
            borderRadius: 2,
            padding: "6px 16px",
            backgroundColor: "#2621ba",
            color: "white",
            transition: "0.5s",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          Volver
        </Button>
      </Box>

      <Paper
        sx={{
          p: 3,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <form onSubmit={handleSaveForm}>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <InfoOutlinedIcon fontSize="small" sx={{ color: "#1976d2" }} />
            <Typography fontSize="0.9rem" fontWeight={700} color="#333">
              Información Basica del Producto
            </Typography>
          </Box>

          <Grid container spacing={3} mt={1}>
            {inputs.map(input => (
              <Grid item xs={12} md={6} key={input.name}>
                <Typography variant="body2" fontWeight={600} fontFamily={'Nunito'}>
                  {input.label}
                </Typography>
                <TextFieldComponent
                  requerid={input.requerido}
                  small={true}
                  formState={formState}
                  onInputChange={onInputChange}
                  name={input.name}
                  placeholder={input.placeholder}
                  type={input.type}
                />
              </Grid>
            ))}

            <Grid item xs={12} md={6}>
              <Typography variant="body2" fontWeight={600} mb={1}>
                Categoría
              </Typography>
              <FormControl fullWidth>
                <Select
                  size="small"
                  onChange={onInputChange}
                  name="categoria"
                  value={formState["categoria"]}
                  sx={{ fontSize: '14px', fontFamily: 'Nunito, sans-serif' }}
                  required
                >
                  <MenuItem value="">Selecciona una categoría</MenuItem>
                  {categorias?.map(categoria => (
                    <MenuItem key={categoria.id} value={categoria.id}>{categoria.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" fontWeight={600} mb={1}>
                Unidad de Medida
              </Typography>
              <FormControl fullWidth>
                <Select
                  size="small"
                  onChange={onInputChange}
                  name="unidadMedida"
                  value={formState["unidadMedida"]}
                  sx={{ fontSize: '14px', fontFamily: 'Nunito, sans-serif' }}
                  required
                >
                  <MenuItem value="0">Selecciona una medida</MenuItem>
                  {medidas.map(medida => (
                    <MenuItem key={medida.id} value={medida.name}>{medida.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" fontWeight={600} mb={1}>
                SKU
              </Typography>
              <TextField
                required
                size="small"
                value={formState.sku}
                name="sku"
                onChange={onInputChange}
                placeholder="Ingrese el SKU del producto"
                sx={styleTextField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={generateSKU}
                        size="small"
                        variant="contained"
                        sx={{ textTransform: "none", fontFamily: "Nunito, sans-serif" }}
                      >
                        Generar
                      </Button>
                    </InputAdornment>
                  )
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <Typography variant="body2" fontWeight={600} mb={1}>
                  Variantes
                </Typography>
                <Button
                  onClick={handleAddVariante}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Agregar
                </Button>
              </Box>
              {variantes?.map((variante, index) => (
                <Box display={'flex'} gap={2} alignItems={'center'} key={index} mt={2}>
                  <TextField
                    label="Nombre Variante"
                    size="small"
                    fullWidth
                    value={variante.nombre}
                    onChange={(e) => handleVarianteChange(variante.id, 'nombre', e.target.value)}
                    sx={styleTextField}
                    required
                  />
                  <TextField
                    label="Precio Variante"
                    type="number"
                    size="small"
                    fullWidth
                    value={variante.precio}
                    onChange={(e) => handleVarianteChange(variante.id, 'precio', e.target.value)}
                    sx={styleTextField}
                    required
                  />

                  <Button
                    onClick={() => handleRemoveVariante(variante.id)}
                    variant="outlined"
                    color="error"
                    size="small"
                    disabled={variantes.length === 1} // Evita eliminar si hay solo una
                  >
                    Quitar
                  </Button>
                </Box>

              ))}
            </Grid>
          </Grid>

          <Box display={"flex"} alignItems={"center"} gap={1} mt={1}>
            <InfoOutlinedIcon fontSize="small" sx={{ color: "#1976d2" }} />
            <Typography fontSize="0.9rem" fontWeight={700} color="#333">
              Imagen
            </Typography>
            <Divider />
          </Box>

          <Grid container spacing={3}>
            {/* Vista previa de la imagen existente */}
            <Grid item xs={12} md={4}>
              <Collapse in={id ? !editImg : false}>
                <Typography variant="body2" fontWeight={600} mb={1}>
                  Imagen Actual
                </Typography>
                <Box
                  sx={{
                    width: '250px',
                    height: '250px',
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
                    src={producto?.imagen || ''}
                    alt="Imagen actual del producto"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              </Collapse>
            </Grid>
            {/* Campo de carga de nueva imagen */}
            {id &&
              <Grid item xs={12} md={id && producto?.imagen ? 3 : 12}>
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
            }
            <Collapse in={id ? editImg : true}>
              <UploadImagePreview onInputChange={onInputChange} />
            </Collapse>
          </Grid>


          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              onClick={handleGetBack}
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ textTransform: "none", fontFamily: "Nunito, sans-serif" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              sx={{ textTransform: "none", fontFamily: "Nunito, sans-serif" }}
            >
              Guardar Producto
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

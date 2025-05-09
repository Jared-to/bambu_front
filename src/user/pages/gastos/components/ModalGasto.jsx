import { useEffect, useState } from "react";
import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";

import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import toast from "react-hot-toast";

import { ModalComponent } from "../../../components/Modal.component";
import { TextFieldComponent } from "../../../components/TextFieldComponent";
import { useForm } from "../../../../hooks/useForm";
import { formatDateToInput } from "../../../helpers/ObtenerFechaHoraLocal";

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
    placeholder: "Ingrese el monto del gasto",
    icon: <CreditCardOutlinedIcon />,
    reqerid: true,
  },
];


export const ModalGasto = ({
  open,
  handleClose,
  crearGasto,
  categorias = [],
  handleGetData,
  gasto = undefined,
  updateGasto,
  almacenes = []
}) => {
  //?Estados
  const sucursal = sessionStorage.getItem('sucursal');
  const [disabledSucursal, setDisabledSucursal] = useState(false)
  const { formState, onInputChange, setFormState, resetForm } = useForm({
    fecha: formatDateToInput(new Date()),
    monto: '',
    glosa: '',
    detalle: '',
    tipo: 'Variables',
    categoria: "",
    metodo_pago: "EFECTIVO",
    almacen: sucursal ? sucursal : ""
  });

  // Efecto para cargar datos del gasto (editar)
  useEffect(() => {
    if (gasto) {

      const now = new Date(gasto.fecha);
      setFormState({
        fecha: formatDateToInput(now),
        monto: gasto.monto,
        glosa: gasto.glosa,
        detalle: gasto.detalle,
        tipo: gasto.tipo,
        metodo_pago: gasto.tipo_pago,
        categoria: gasto?.categoria?.id,
        almacen: gasto?.almacen?.id || ""
      });
    } else {
      resetForm();
    }
    if (sucursal) {
      setDisabledSucursal(true);
    } else {
      setDisabledSucursal(false)
    }
  }, [gasto]);

  // Función para manejar guardar el formulario
  const handleSaveForm = async (e) => {
    e.preventDefault();

    const caja = sessionStorage.getItem('idCaja');
    const cajaEdit = sessionStorage.getItem('idCajaEdit');

    if (!caja && !cajaEdit) {
      toast.error('Debe de abrir una caja.');
      return;
    }


    const action = gasto ? updateGasto(formState, gasto.id) : crearGasto(formState);
    const message = gasto ? "Gasto editado con éxito!" : "Gasto creado con éxito!";

    toast.promise(action, {
      loading: "Cargando Petición",
      success: () => {
        handleClose();
        handleGetData();
        resetForm()
        return message;
      },
      error: (err) => `Error: ${err.message}`,
    });
  };

  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Registro Gasto"
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

        {/* Glosa y Detalle en una misma fila */}
        <Grid item xs={6}>
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
        <Grid item xs={6} >
          <Typography fontSize={'0.9rem'} fontWeight={600}>
            Detalle
          </Typography>
          <TextFieldComponent
            formState={formState}
            onInputChange={onInputChange}
            name="detalle"
            placeholder="Ingrese el detalle del gasto"
            icon={<ArticleOutlinedIcon />}
            type="text"
            small={true}
          />
        </Grid>

        {/* Tipo y Método de Pago */}
        <Grid item xs={6}>
          <Typography fontSize={'0.9rem'} fontWeight={600}>
            Tipo
          </Typography>
          <FormControl fullWidth>
            <Select
              size="small"
              onChange={onInputChange}
              name="tipo"
              value={formState["tipo"]}
            >
              <MenuItem value={"Variables"}>Variable</MenuItem>
              <MenuItem value={"Fijos"}>Fijo</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Categoría */}
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12}>
          <Typography fontSize={'0.9rem'} fontWeight={600}>
            Sucursal
          </Typography>
          <FormControl fullWidth>
            <Select
              disabled={disabledSucursal}
              size="small"
              onChange={onInputChange}
              name="almacen"
              value={formState.almacen}
              required
            >
              <MenuItem disabled value={""}>Sucursal</MenuItem>
              {
                almacenes.map(almc => (
                  <MenuItem key={almc.id} value={almc.id}>{almc.nombre}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

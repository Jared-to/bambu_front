import { useEffect, useMemo, useState } from "react";
import { Grid, Paper, TextField, Typography, Box, Select, MenuItem, InputAdornment, Button, Collapse, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { TablaSelectProductsV3 } from "./TablaSelectProductsV3";
import { useNavigate } from "react-router-dom";
import { TextFieldComponent } from "../../../components/TextFieldComponent";

export const PaperInfo = ({ clientes = [], formState, onInputChange, productoSelect = [], almacenes = [], onChangeAlmacen, handleRemoveProduct, handleIncrementQuantity, handleDecrementQuantity, handleSaveForm, sucursalDisabled, load = false, descuentos = [] }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  // Estado para Monto Efectivo y Cambio
  const [montoEfectivo, setMontoEfectivo] = useState("");
  const [montoCambio, setMontoCambio] = useState(0);

  // Calcular subtotal sin descuento
  const calcularSubtotal = useMemo(() => {
    return productoSelect.reduce((acc, producto) => acc + producto.subTotal, 0).toFixed(2);
  }, [productoSelect]);

  // Obtener descuento seleccionado
  const descuentoSeleccionado = useMemo(() => {
    return descuentos.find(desc => desc.id === formState.descuentoSelect) || null;
  }, [formState.descuentoSelect, descuentos]);

  // Calcular el monto del descuento
  const totalDescontado = useMemo(() => {
    if (descuentoSeleccionado) {
      return Math.ceil((calcularSubtotal * descuentoSeleccionado.porcentaje) / 100);
    }
    return 0;
  }, [calcularSubtotal, descuentoSeleccionado]);

  // Calcular total con descuento
  const totalConDescuento = useMemo(() => {
    return Math.ceil(calcularSubtotal - totalDescontado);
  }, [calcularSubtotal, totalDescontado]);

  // Actualizar monto cambio cuando cambie el monto efectivo
  useEffect(() => {
    setMontoCambio((parseFloat(montoEfectivo || 0) - parseFloat(totalConDescuento)).toFixed(2));
    onInputChange({ target: { name: 'montoRecibido', value: montoEfectivo } })
  }, [montoEfectivo, totalConDescuento]);

  useEffect(() => {
    if (formState.montoRecibido > 0) {
      setMontoEfectivo(formState.montoRecibido)
    }
  }, [formState.montoRecibido])

  return (
    <Paper sx={{ p: 3, borderTop: '4px solid green', borderRadius: 2, boxShadow: 1 }}>
      <form onSubmit={handleSaveForm}>
        <Grid container spacing={2}>
          {/* Vendedor */}
          <Grid item xs={12} md={6}>
            <Typography fontFamily={'Nunito'} fontWeight={600} color="text.secondary" fontSize={'14px'}>
              Vendedor
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <AccountCircleIcon sx={{ color: 'gray' }} />
              <TextField
                fullWidth
                value={user.name}
                size="small"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  sx: { bgcolor: "#f5f5f5", borderRadius: 1, fontSize: '14px' }
                }}
              />
            </Box>
          </Grid>

          {/* Fecha y Hora */}
          <Grid item xs={12} md={6}>
            <Typography fontFamily={'Nunito'} fontWeight={600} color="text.secondary" fontSize={'14px'}>
              Fecha y Hora
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <DateRangeIcon sx={{ color: 'gray' }} />
              <TextField
                fullWidth
                value={formState.fecha}
                type="datetime-local"
                size="small"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  sx: { bgcolor: "#f5f5f5", borderRadius: 1, fontSize: '14px' }
                }}
              />
            </Box>
          </Grid>

          {/* Cliente */}
          <Grid item xs={12} md={6}>
            <Typography fontFamily={'Nunito'} fontWeight={600} color="text.secondary" fontSize={'14px'}>
              Cliente
            </Typography>
            <Select
              size="small"
              onChange={onInputChange}
              name="cliente"
              value={formState.cliente}
              sx={{ borderRadius: 1, fontSize: '14px' }}
              fullWidth
              required
            >
              <MenuItem value="">Seleccionar Cliente</MenuItem>
              {clientes.map(cliente => (
                <MenuItem key={cliente.id} value={cliente.id}>{cliente.nombre}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography fontFamily={'Nunito'} fontWeight={600} color="text.secondary" fontSize={'14px'}>
              Sucursal
            </Typography>
            <Select
              disabled={sucursalDisabled}
              size="small"
              onChange={(e) => onChangeAlmacen(e.target.value)}
              name="almacen"
              value={formState.almacen}
              sx={{ borderRadius: 1, fontSize: '14px' }}
              fullWidth
              required
            >
              <MenuItem value="" disabled>Seleccionar Sucursal</MenuItem>
              {almacenes.map(almacen => (
                <MenuItem key={almacen.id} value={almacen.id}>{almacen.nombre}</MenuItem>
              ))}
            </Select>
          </Grid>
          {/* productos */}
          <Grid item xs={12}>
            <TablaSelectProductsV3
              productsSelect={productoSelect}
              handleRemoveProduct={handleRemoveProduct}
              handleIncrementQuantity={handleIncrementQuantity}
              handleDecrementQuantity={handleDecrementQuantity}
            />
          </Grid>
          {/* Total */}
          <Grid item xs={12} md={7}>
            <Typography fontFamily={'Nunito'} fontSize={'14px'} fontWeight={600} color="text.secondary">
              Nota:
            </Typography>
            <TextFieldComponent
              formState={formState}
              onInputChange={onInputChange}
              name={'glosa'}
              placeholder={'Nota si se amerita.'}
              type={'text'}
              small
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography fontFamily={'Nunito'} fontSize={'14px'} fontWeight={600} color="text.secondary">
              Subtotal
            </Typography>
            <TextField
              fullWidth
              value={calcularSubtotal}
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
                sx: { bgcolor: "#f5f5f5", borderRadius: 1 },
                endAdornment: <InputAdornment position="start">BOB</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} md={1}>

          </Grid>
          {/* <Grid item xs={12} md={6}>
            <Typography fontFamily={'Nunito'} fontSize={'14px'} fontWeight={600} color="text.secondary">
              Descuento
            </Typography>
            <Select
              size="small"
              onChange={onInputChange}
              name="descuentoSelect"
              value={formState.descuentoSelect}
              sx={{ borderRadius: 1, fontSize: '14px' }}
              fullWidth
            >
              <MenuItem value="xx">Sin Descuento</MenuItem>
              {
                descuentos.map((descuento) => (
                  <MenuItem key={descuento.id} value={descuento.id}>{descuento.descuento + " - " + (descuento.porcentaje + '%')}</MenuItem>
                ))
              }
            </Select>
          </Grid> */}
          {/* <Grid item xs={12} md={5}>
            <Typography fontFamily={'Nunito'} fontSize={'14px'} fontWeight={600} color="text.secondary">
              Total Descontado
            </Typography>
            <TextField
              fullWidth
              value={totalDescontado}
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
                sx: { bgcolor: "#f5f5f5", borderRadius: 1 },
                endAdornment: <InputAdornment position="start">BOB</InputAdornment>
              }}
            />
          </Grid> */}
          <Grid item xs={12} md={6}>

          </Grid>
          {/* <Grid item xs={12} md={5}>
            <Typography fontFamily={'Nunito'} fontSize={'14px'} fontWeight={600} color="text.secondary">
              Total Neto
            </Typography>
            <TextField
              fullWidth
              value={totalConDescuento}
              size="small"
              variant="outlined"
              InputProps={{
                readOnly: true,
                sx: { bgcolor: "#f5f5f5", borderRadius: 1 },
                endAdornment: <InputAdornment position="start">BOB</InputAdornment>
              }}
            />
          </Grid> */}

          {/* Método de Pago */}
          <Grid item xs={12} md={5}>
            <Typography fontFamily={'Nunito'} fontSize={'Nunito'} fontWeight={600} color="text.secondary">
              Método de Pago
            </Typography>
            <Select
              size="small"
              onChange={onInputChange}
              name="metodoPago"
              value={formState.metodoPago}
              sx={{ borderRadius: 1, fontSize: '14px' }}
              fullWidth
              required
            >
              <MenuItem value="">Seleccionar Método</MenuItem>
              <MenuItem value="EFECTIVO">Efectivo</MenuItem>
              <MenuItem value="QR">QR</MenuItem>
            </Select>
          </Grid>

          {/* Monto Efectivo */}
          <Grid item xs={12} md={6}>
            <Collapse in={formState.metodoPago === 'EFECTIVO'}>
              <Typography fontFamily={'Nunito'} fontSize={'14px'} fontWeight={600} color="text.secondary">
                Monto Recibido
              </Typography>
              <TextField
                fullWidth
                required={formState.metodoPago === 'EFECTIVO'}
                size="small"
                variant="outlined"
                value={montoEfectivo}
                onChange={(e) => setMontoEfectivo(e.target.value)}
                InputProps={{
                  sx: { borderRadius: 1 },
                  endAdornment: <InputAdornment position="start">BOB</InputAdornment>
                }}
              />
            </Collapse>
          </Grid>

          {/* Monto Cambio */}
          <Grid item xs={12} md={6}>
            <Collapse in={formState.metodoPago === 'EFECTIVO'}>
              <Typography fontFamily={'Nunito'} fontSize={'14px'} fontWeight={600} color="text.secondary">
                Monto Cambio
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={montoCambio}
                InputProps={{
                  sx: { borderRadius: 1, fontSize: '14px' },
                  endAdornment: <InputAdornment position="start" sx={{ fontSize: '14px' }}>BOB</InputAdornment>
                }}
              />
            </Collapse>
          </Grid>
          <Grid item xs={12} md={7}>
          </Grid>
          <Grid item xs={12} md={5} display={'flex'} gap={2} mt={3}>
            <Button
              onClick={() => navigate('/user/registros-ventas')}
              variant="contained"
              color="error"
              sx={{
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                paddingX: 3,
              }}
            >
              Cancelar
            </Button>
            <Button
              disabled={load}
              type="submit"
              startIcon={<SaveOutlinedIcon />}
              sx={{
                width: '100%',
                bgcolor: "#6616cd",
                fontSize: "0.85rem",
                borderRadius: 2,
                color: "white",
                textTransform: "none",
                transition: "0.5s",
                "&:hover": { backgroundColor: "black" },
              }}
            >
              {load ? <CircularProgress
                size={24}
                sx={{
                  color: 'white',
                  top: '50%',
                  left: '50%',
                }}
              /> : 'Generar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

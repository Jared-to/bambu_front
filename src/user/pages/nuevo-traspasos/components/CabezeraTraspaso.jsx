
import { Paper, TextField, MenuItem, Typography, Grid, Box, IconButton } from "@mui/material";

import AutorenewIcon from '@mui/icons-material/Autorenew';

import { TextFieldComponent } from "../../../components/TextFieldComponent";

export const CabezeraTraspaso = ({ handleChangeAlmacen, formState, onInputChange, almacenes = [], almacenDisabled, handleChangeCant, id }) => {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderTop: "4px solid rgb(64, 125, 223)",
      }}
    >
      <Typography textAlign={'center'} fontFamily={'Nunito'} variant="h6" sx={{ mb: 2 }}>
        {!id ? 'Nuevo' : 'Editar'} Traspaso
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography fontFamily={'Nunito'} fontWeight={600}>
            Fecha
          </Typography>
          {/* Fecha */}
          <TextFieldComponent
            formState={formState}
            onInputChange={onInputChange}
            name={'fecha'}
            type={'datetime-local'}
            small
            requerid
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box display={'flex'}>
            <Box width={'90%'}>
              <Typography fontFamily={'Nunito'} fontWeight={600}>
                Sucursal Origen
              </Typography>
              {/* Almacén Origen */}
              <TextField
                disabled={almacenDisabled}
                select
                fullWidth
                value={formState.almacenOrigen}
                name="almacenOrigen"
                onChange={handleChangeAlmacen}
                size="small"
                required

              >
                <MenuItem disabled value="">Seleccionar Almacen</MenuItem>
                {almacenes.map(almacen => (
                  <MenuItem key={almacen.id} value={almacen.id}>{almacen.nombre}</MenuItem>
                ))}
              </TextField>
            </Box>
            {almacenDisabled &&
              <Box mt={2}>
                <IconButton onClick={handleChangeCant}>
                  <AutorenewIcon />
                </IconButton>
              </Box>
            }
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontFamily={'Nunito'} fontWeight={600}>
            Sucursal Destino
          </Typography>
          {/* Almacén Destino */}
          <TextField
            select
            fullWidth
            value={formState.almacenDestino}
            name="almacenDestino"
            onChange={onInputChange}
            size="small"
            required
          >
            <MenuItem disabled value="">Seleccionar Almacen</MenuItem>
            {almacenes.map(almacen => (
              <MenuItem key={almacen.id} value={almacen.id}>{almacen.nombre}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography fontFamily={'Nunito'} fontWeight={600}>
            Glosa
          </Typography>
          {/* Glosa */}
          <TextFieldComponent
            formState={formState}
            onInputChange={onInputChange}
            name={'glosa'}
            type={'text'}
            placeholder={'Glosa/Nota'}
            small
            requerid
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

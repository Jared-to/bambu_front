import { InputAdornment, TextField } from '@mui/material'
import { cloneElement } from 'react';

const styleTextField = {
  borderRadius: 2,
  '.MuiInputLabel-outlined': {
    color: 'black',
    borderRadius: 2,
  },
  '& .MuiOutlinedInput-root': {
    color: 'black',
    borderRadius: 2,
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
const styleInputs =
{
  borderRadius: 8,
  border: '1px solid transparent',
  fontFamily: 'Nunito, sans-serif',
  color: 'black',
}
  ;
export const TextFieldComponent = ({ error = false, disabled = false, helper, name, formState, onInputChange, placeholder, type, icon, small = false, requerid = false, nome = false }) => {

  return (
    <TextField
      required={requerid}
      fullWidth
      size={small ? 'small' : ''}
      error={Boolean(error)}
      helperText={Boolean(error) ? helper : ''}
      name={name}
      value={type === 'file' ? undefined : formState[name]}
      onChange={(e) => {
        const value = e.target.value;

        if (type === 'datetime-local' && new Date(value) > new Date()) {
          // Si la fecha es mayor a la actual, no actualices el estado
          return;
        }

        onInputChange(e);
      }}
      placeholder={placeholder}
      type={type || 'text'}
      sx={styleTextField}
      InputProps={{
        readOnly: disabled,
        style: { ...styleInputs },
        startAdornment: icon ? (
          <InputAdornment position="start">
            {cloneElement(icon, { sx: { color: 'gray' } })}
          </InputAdornment>
        ) : null,
        endAdornment: nome ? (
          <InputAdornment position="start">
            {nome}
          </InputAdornment>
        ) : null
      }}
      inputProps={
        type === 'number' ? {
          inputMode: 'numeric', // Mostrar teclado numérico en dispositivos móviles
          pattern: '[0-9]*',    // Aceptar solo números
          min: 0,               // Aceptar solo números positivos
          step:'any'
        } : {}
      }
    />
  )
}

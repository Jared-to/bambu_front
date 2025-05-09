import { useEffect, useState } from "react";
import {
  Box,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import PhoneIcon from "@mui/icons-material/Phone";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { ModalComponent } from "../../../components/Modal.component";
import { useForm } from "../../../../hooks/useForm";
import { TextFieldComponent } from "../../../components/TextFieldComponent";
import { useAlmacenesStore } from "../../../../hooks/useAlmacenesStore";

const inputs = [
  {
    label: "Nombre Completo",
    type: "text",
    name: "nombre",
    placeholder: "Ingrese el nombre",
    icon: <PersonIcon />,
  },
  {
    label: "Username",
    type: "text",
    name: "username",
    placeholder: "Ingrese el username",
    icon: <AccountCircleIcon />,
  },
  {
    label: "Celular",
    type: "tel",
    name: "celular",
    placeholder: "Ingrese el número de celular",
    icon: <PhoneIcon />,
  },
];

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
const linkPerfilHombre = 'https://res.cloudinary.com/dhdxemsr1/image/upload/v1740754107/vqjnmszqdhwhsqdprgwn.jpg';
const linkPerfilMujer = 'https://res.cloudinary.com/dhdxemsr1/image/upload/v1740754107/xstbkoiqdzvqnhxnpym3.jpg';

export const ModalUser = ({ open, handleClose, createUser, handleGetData, updateUser, user = undefined }) => {
  // Estados
  const { getAlmacenes } = useAlmacenesStore()
  const [errors, seterrors] = useState({});
  const [almacenes, setAlmacenes] = useState([])
  const [showPassword, setShowPassword] = useState(false);
  const { formState, onInputChange, resetForm, setFormState } = useForm({
    nombre: "",
    username: "",
    password: "",
    celular: "",
    rol: "admin",
    almacen: "",
    foto: linkPerfilHombre
  });
  //?Funciones
  //controlar vista del password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  //traer datos
  const handleGetAlm = async () => {
    const data = await getAlmacenes();
    setAlmacenes(data);
  }
  //enviar fomrmulario
  const handleSaveForm = (e) => {
    e.preventDefault();

    if (user !== undefined) {
      toast.promise(
        updateUser(formState, user.id),
        {
          loading: "Cargando Petición",
          success: () => {
            handleClose();
            resetForm();
            handleGetData();
            return "Usuario editado con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    } else {


      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;

      if (!passwordRegex.test(formState.password)) {
        seterrors((prev) => ({
          ...prev,
          password: true,
        }));
        toast.error(
          "La contraseña debe tener al menos 6 caracteres, incluir una mayúscula y un número"
        );
        return;
      }

      toast.promise(
        createUser(formState),
        {
          loading: "Cargando Petición",
          success: () => {
            handleClose();
            resetForm();
            handleGetData();
            return "Usuario creado con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    }
  };
  //efectos
  useEffect(() => {
    if (almacenes.length === 0) {
      handleGetAlm()
    }
  }, [])


  useEffect(() => {
    if (user !== undefined) {
      setFormState({
        nombre: user.fullName || "",
        username: user.username || "",
        password: "",
        celular: user.celular || "",
        rol: user.roles[0] || "user",
        almacen: user?.almacen?.id || "",
        foto:user.foto
      });
    }
  }, [user]);

  useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open]);
  return (
    <ModalComponent
      open={open}
      handleClose={handleClose}
      title="Registro Usuario"
      handleSaveform={handleSaveForm}
    >
      <Grid container spacing={1}>
        {/* SELECCIÓN DE FOTO */}
        <Grid item xs={12}>
          <Typography
            fontSize={"0.9rem"}
            style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
          >
            Escoge tu foto de perfil
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mt={1}>
            {[linkPerfilHombre, linkPerfilMujer].map((link, index) => (
              <Box
                key={index}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  cursor: "pointer",
                  overflow: "hidden",
                  border: formState.foto === link ? "3px solid #4caf50" : "2px solid transparent",
                  boxShadow: formState.foto === link ? "0px 0px 10px rgba(76, 175, 80, 0.5)" : "none",
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={() => setFormState((prev) => ({ ...prev, foto: link }))}
              >
                <img src={link} alt="perfil" width="100%" height="100%" style={{ objectFit: "cover" }} />
              </Box>
            ))}
          </Box>
        </Grid>
        {inputs.map((input) => (
          <Grid item xs={12} key={input.name}>
            <Typography
              fontSize={'0.9rem'}
              style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
            >
              {input.label}
            </Typography>
            <TextFieldComponent
              error={errors[input.name]}
              formState={formState}
              helper={'Campo Obligatorio'}
              onInputChange={onInputChange}
              name={input.name}
              placeholder={input.placeholder}
              icon={input.icon}
              type={input.type}
              small={true}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography
            fontSize={'0.9rem'}
            style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
          >
            Contraseña
          </Typography>
          <TextField
            error={errors['password']}
            value={formState['password']}
            onChange={onInputChange}
            name="password"
            placeholder="Ingresa tu contraseña"
            type={showPassword ? "text" : "password"}
            size="small"
            fullWidth
            sx={styleTextField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EnhancedEncryptionIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            fontSize={'0.9rem'}
            style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
          >
            Rol
          </Typography>
          <FormControl fullWidth>
            <Select
              size="small"
              onChange={onInputChange}
              name="rol"
              value={formState["rol"]}
            >
              <MenuItem value={"admin"}>Administrador</MenuItem>
              <MenuItem value={"user"}>Empleado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Collapse in={formState['rol'] === 'user'}>
            <Typography
              fontSize={'0.9rem'}
              style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
            >
              Sucursal Asignada
            </Typography>
            <FormControl fullWidth>
              <Select
                size="small"
                onChange={onInputChange}
                name="almacen"
                value={formState["almacen"]}
              >
                <MenuItem disabled value={""}>Sucursal</MenuItem>
                {almacenes.map(alm => (
                  <MenuItem key={alm.id} value={alm.id}>{alm.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Collapse>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

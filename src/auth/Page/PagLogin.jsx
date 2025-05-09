import { useState } from "react";
import { Alert, Box, Button, CircularProgress, Grid, IconButton, InputAdornment, Link, TextField, Typography, } from "@mui/material";
import { useSelector } from "react-redux";
import { Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material";

import { useForm } from "../../hooks/useForm";
import { useAuthStore } from "../../hooks/useAuthStore";
const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f9fafc",
    "& fieldset": {
      borderColor: "#e0e3e7",
    },
    "&:hover fieldset": {
      borderColor: "#bfc9d9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6616cd",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    padding: "12px 14px",
  },
};

const PagLogin = () => {
  //?estados
  const { startLogin } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { load, errorMessage } = useSelector(state => state.auth);
  const { formState, onInputChange } = useForm({
    username: '',
    password: ''
  })

  //?funciones
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveform = (e) => {
    e.preventDefault();


    for (const key in formState) {
      if (formState[key] === '') {
        setErrors(prev => ({
          ...prev,
          [key]: true
        }))
      } else {
        setErrors(prev => ({
          ...prev,
          [key]: false
        }))
      }
    }

    for (const key in formState) {
      if (formState[key] === '') {
        return;
      }
    }


    startLogin(formState)

  }

  return (
    <Box p={0} m={0} sx={{ fontFamily: "'Roboto', sans-serif" }}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "block" },
            p: 2,
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box sx={{
            backgroundImage: "url('https://items.bo/wp-content/uploads/2022/12/web-design.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: '100%',
            height: '100%'
          }}>

          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ height: "100vh", p: 3 }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <a
              href="https://items.bo/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "black",
              }}
            >
              <img
                src="https://floristeria.items.bo/assets/img/icono-blanco.png"
                alt="Logo"
                height={"auto"}
                width={"25px"}
                style={{ marginRight: "8px" }}
              />
              ITEMS.BO
            </a>
          </Box>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                backgroundColor: "white",
                borderRadius: "12px",
                p: 4,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  mb={2}
                  fontFamily={"Playfair Display"}
                  sx={{ color: "#333" }}
                >
                  Bienvenido de Vuelta
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  fontFamily={"Roboto"}
                  mb={3}
                  sx={{ fontSize: "1rem", color: "#555" }}
                >
                  Ingresa tu usuario y contraseña para acceder
                </Typography>
              </Box>

              {/* Login Form */}
              <Box component="form" onSubmit={handleSaveform} display={"flex"} flexDirection={"column"} gap={2}>
                <Typography sx={{ fontWeight: "bold", color: "#333" }}>
                  Username
                </Typography>
                <TextField
                  error={errors['username']}
                  helperText={errors['username'] && 'Campo Obligatorio'}
                  value={formState['username']}
                  onChange={onInputChange}
                  name="username"
                  placeholder="Ingresa tu username"
                  fullWidth
                  sx={textFieldStyles}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />

                <Typography sx={{ fontWeight: "bold", color: "#333" }}>
                  Contraseña
                </Typography>

                <TextField
                  error={errors['password']}
                  helperText={errors['password'] && 'Campo Obligatorio'}
                  value={formState['password']}
                  onChange={onInputChange}
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  sx={textFieldStyles}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
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
                {errorMessage && (
                  <Alert severity="error" >
                    {errorMessage}
                  </Alert>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    py: 1.5,
                    mb: 2,
                    bgcolor: "black",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    ":hover": {
                      bgcolor: "#333",
                    },
                  }}
                >
                 {load ? <CircularProgress size="30px"/> : 'Ingresar' } 
                </Button>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"} sx={{ fontSize: "0.9rem", color: "#555" }}>
            ¿Necesitas ayuda? <Link href="https://tickets.items.bo/ticket/EQP24" sx={{ ml: 1, fontWeight: "bold", color: "#000" }}>Soporte aquí</Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PagLogin;
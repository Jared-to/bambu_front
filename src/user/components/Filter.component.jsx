import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MergeTypeIcon from '@mui/icons-material/MergeType';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export const Filter = ({ message, totalMessage, valueSearch = "", changeSearch, nameSearch = "", Icon = PersonOutlineOutlinedIcon, btn = false, textButton, handleFunctionButton, handleFunctionButton2, textButton2, btn2 = false }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ xs: "column", sm: "row" }} // Cambia la dirección en pantallas pequeñas
      gap={{ xs: 2, sm: 0 }} // Añade espaciado en pantallas pequeñas
    >
      {/* Sección de mensaje */}
      <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
        <Icon fontSize="small" sx={{ color: "#1976d2" }} />
        <Typography
          fontSize="0.9rem"
          fontWeight={700}
          color="#333"
          textAlign={{ xs: "center", sm: "left" }} // Centra el texto en pantallas pequeñas
        >
          {message}
        </Typography>
        <Box
          display="inline-flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="#d32f2f"
          color="white"
          paddingX={1}
          paddingY={0.5}
          borderRadius={1}
          fontSize="0.8rem"
          fontWeight={600}
        >
          {totalMessage}
        </Box>
        {btn &&
          <Button
            onClick={handleFunctionButton}
            variant="contained"
            startIcon={<MergeTypeIcon />}
            sx={{
              fontFamily: "Nunito, sans-serif",
              textTransform: "none",
              boxShadow: "none",
              fontSize: "0.85rem",
              borderRadius: 2,
              padding: "6px 16px",
              backgroundColor: "#2621ba",
              color: "white",
              transition: "0.5s",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "black",
              },
            }}
          >
            {textButton}
          </Button>
        }
        {
          btn2 &&
          <Button
            onClick={handleFunctionButton2}
            variant="contained"
            startIcon={<CancelOutlinedIcon />}
            sx={{
              fontFamily: "Nunito, sans-serif",
              textTransform: "none",
              boxShadow: "none",
              fontSize: "0.85rem",
              borderRadius: 2,
              padding: "6px 16px",
              backgroundColor: "#c74843",
              color: "white",
              transition: "0.5s",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "black",
              },
            }}
          >
            {textButton2}
          </Button>
        }
      </Box>

      {/* Campo de búsqueda */}
      <TextField
        onChange={(e) => changeSearch(e.target.value)}
        value={valueSearch}
        placeholder={`Buscar por ${nameSearch}`}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon fontSize="small" sx={{ color: "#666" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputBase-root": {
            fontSize: "0.85rem",
            borderRadius: 3,
          },
          width: { xs: "100%", sm: "200px" }, // Ajusta el ancho según el tamaño de la pantalla
          backgroundColor: "white",
          borderRadius: 6,
          "&:hover": { backgroundColor: "#eaeaea" },
        }}
      />
    </Box>
  );
};

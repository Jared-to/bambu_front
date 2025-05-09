import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import pdf from "../../../public/icons/pdf.svg";
import excel from "../../../public/icons/excel.svg";

export const Head = ({ title, subtitle, handleFuctionPDF, handleFunctionExcel, textButton, handleFunctionButton, whitCaja = true }) => {
  return (
    <Box sx={{ padding: 1 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }} // Cambia a columna en pantallas pequeñas
        gap={{ xs: 2, sm: 0 }} // Espaciado entre elementos en pantallas pequeñas
      >
        {/* Title Section */}
        <Box textAlign={{ xs: "center", sm: "left" }}> {/* Centra en pantallas pequeñas */}
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              fontFamily: "Nunito, sans-serif",
              color: "#333",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.9rem",
              color: "#666",
              marginTop: "4px",
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Actions Section */}
        <Box
          display="flex"
          flexWrap="wrap" // Permite que los elementos se envuelvan en pantallas pequeñas
          gap={1}
          justifyContent={{ xs: "center", sm: "flex-end" }} // Centra en pantallas pequeñas
          alignItems="center"
        >
          <Tooltip title="PDF" placement="top">
            <IconButton
              onClick={handleFuctionPDF}
              sx={{
                backgroundColor: "#f1f1f1",
                borderRadius: 1,
                padding: 1,
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <img src={pdf} alt="PDF" style={{ width: 20, height: 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excel" placement="top">
            <IconButton
              onClick={handleFunctionExcel}
              sx={{
                backgroundColor: "#f1f1f1",
                borderRadius: 1,
                padding: 1,
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <img src={excel} alt="Excel" style={{ width: 20, height: 20 }} />
            </IconButton>
          </Tooltip>
          {whitCaja ? (
            <Button
              onClick={handleFunctionButton}
              variant="contained"
              startIcon={<AddCircleOutlineOutlinedIcon />}
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
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
};

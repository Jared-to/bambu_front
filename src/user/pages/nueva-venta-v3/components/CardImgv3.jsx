import { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box, Collapse } from "@mui/material";

export const CardImgv3 = ({ image, title, description, variants = [], handleFunction, id,value}) => {
  const [showVariants, setShowVariants] = useState(false);

  const truncatedText = description.length > 40 ? `${description.slice(0, 40)}...` : description;

  useEffect(() => {
    setShowVariants(false);
  }, [value])
  
  return (
    <Card
      onClick={() => setShowVariants((prev) => !prev)}
      sx={{
        minHeight: 250,
        maxHeight: 250,
        borderRadius: "16px",
        boxShadow: "1px 1px 4px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      {/* Ocultar la imagen cuando se muestren las variantes */}
      <Collapse in={!showVariants} timeout={300}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          sx={{ borderRadius: "16px 16px 0 0", objectFit: "cover" }}
        />
      </Collapse>

      <CardContent sx={{ textAlign: "center", p: 1.5 }}>
        {/* Información del producto */}
        <Collapse in={!showVariants} timeout={300}>
          <Box>
            <Typography fontFamily={"Nunito"} fontSize={"17px"} fontWeight={700}>
              {title}
            </Typography>
            <Typography
              fontFamily={"Nunito"}
              fontSize={"14px"}
              fontWeight={400}
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              {truncatedText}
            </Typography>
          </Box>
        </Collapse>

        {/* Botones de variantes */}
        <Collapse in={showVariants} timeout={300}>
          <Box sx={{ display: "block", textAlign: "center" }}>
            {variants.length > 0 ? (
              variants.map((variant, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  color="primary"
                  sx={{
                    m: 0.5,
                    fontSize: "11px",
                    fontWeight: 'bold',
                    textTransform: 'none'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFunction(id, variant.nombre)
                  }}
                >
                  {variant.nombre} - {variant.precio} Bs.
                </Button>
              ))
            ) : (
              <Typography fontSize={"14px"} color="error">
                No hay variantes disponibles
              </Typography>
            )}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

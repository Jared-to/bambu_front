import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography, Paper, Box, Button, IconButton, Tooltip } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

export const TablaSelectProductsV3 = ({ productsSelect = [], handleRemoveProduct, handleDecrementQuantity, handleIncrementQuantity }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "8px",
        marginTop: 2,
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#1976d2", fontSize: "14px", paddingLeft: 2 }}>Producto</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#1976d2", fontSize: "14px", textAlign: 'center' }}>Cantidad</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#1976d2", fontSize: "14px", textAlign: 'center' }}>Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsSelect.map((item, index) => (
            <TableRow
              key={index}
              sx={{
                verticalAlign: "top",
                padding: 1,
                borderBottom: "1px solid #ddd",
                '&:hover': { backgroundColor: '#f5f5f5' } // Efecto hover
              }}
            >
              {/* Imagen y Descripción */}
              <TableCell sx={{ padding: "12px 8px" }}>
                <Box display={'flex'} alignItems={'center'} gap={2}>
                  <Box
                    component="img"
                    src={item.imagen}
                    alt={item.descripcion}
                    sx={{ width: 80, height: 80, borderRadius: 2, objectFit: 'cover' }}
                  />
                  <Box>

                    <Typography variant="body2" fontWeight="bold" sx={{ fontSize: "15px" }} fontFamily={'Nunito'}>
                      {item.alias || ""}
                    </Typography>
                    <Typography color="#0070c0" fontSize={'0.9rem'} fontWeight="bold" fontFamily={'Nunito'}>
                      Variante: {item.variante || ""}
                    </Typography>
                    <Button
                      onClick={() => handleRemoveProduct(item)}
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontSize: '10px'
                      }}
                      startIcon={<RemoveShoppingCartIcon sx={{ fontSize: '14px' }} />}
                    >
                      Quitar
                    </Button>
                  </Box>
                </Box>
              </TableCell>

              {/* Cantidad Editable */}
              <TableCell sx={{ padding: "12px 8px" }} align="center">
                <Box display="flex" justifyContent={'center'} alignItems="center" gap={1}>
                  <Button
                    onClick={() => handleDecrementQuantity(item)}
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: '30px', height: '30px' }}
                    disabled={item.cantidad >= item.stock} // Deshabilitar si alcanza el stock máximo
                  >
                    -
                  </Button>
                  <TextField
                    type="text"
                    size="small"
                    value={item.cantidad || 0}
                    inputProps={{ min: 0, max: item.stock }}
                    sx={{
                      width: 40,
                      '& input': {
                        textAlign: "center", fontSize: "14px",
                        padding: 1
                      },
                    }}
                  />
                  <Button
                    onClick={() => handleIncrementQuantity(item)}
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: '30px', height: '30px' }}
                    disabled={item.cantidad <= 0} // Deshabilitar si la cantidad es 0
                  >
                    +
                  </Button>
                </Box>
              </TableCell>

              {/* Subtotal */}
              <TableCell sx={{ padding: "12px 8px" }} align="center">
                <Typography variant="body2" fontWeight="bold" sx={{ fontSize: "14px" }}>
                  {item.subTotal || 0} Bs
                </Typography>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
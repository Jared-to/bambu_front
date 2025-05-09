import { useEffect, useState } from "react";
import { Box, ButtonBase, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material"

import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from "@mui/icons-material/Search";

import { SearchTextComponent } from "../../../components/SearchTextComponent";
import { useAddTable } from "../hooks/useAddTable";

const styleTextField = {
  borderRadius: 5,
  width: '100%',
  '& .MuiInputLabel-outlined': {
    color: 'black',
  },
  '& .MuiOutlinedInput-root': {
    color: 'black',
    borderRadius: 2,
    '& fieldset': {
      borderColor: '#e2e7f1',
    },
    '&:hover fieldset': {
      borderColor: '#e2e7f1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#e2e7f1',
      boxShadow: `0 0 5px #e2e7f1`,
    },
  },
};
export const TablaProductos = ({ typografy, products, selectedProducts = [], setSelectedProducts }) => {

  //Estados
  const [totalQuantity, setTotalQuantity] = useState(0)
  const {
    handleAddProduct,
    handleSearch,
    searchTerm, filteredProducts,
    handleChangeCantidad,
    handleRemoveProductInv
  } = useAddTable(products, selectedProducts, setSelectedProducts)

  //efecto para calcular totales segun los productos seleccionados
  useEffect(() => {
    const total = selectedProducts.reduce((acc, product) => acc + product.cantidad, 0);
    setTotalQuantity(total);
  }, [selectedProducts]);

  return (
    <Paper sx={{ p: 2, borderRadius: 2, border: "1px solid #dbe0e6", mt: 2 }} elevation={0}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="body1" fontFamily={typografy} fontWeight={600}>Productos</Typography>
        <SearchTextComponent
          handleAddProduct={handleAddProduct}
          changeSearch={handleSearch}
          valueSearch={searchTerm}
          filteredProducts={filteredProducts}
          nameSearch={'el nombre'}
          Icon={SearchIcon}
        />
      </Box>
      {selectedProducts.length === 0 ?
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Typography
            fontSize="1.5rem"
            fontWeight="700"
            fontFamily="'Poppins', sans-serif"
            textAlign="center"
          >
            🛒  Lista de Productos
          </Typography>
          <Typography
            fontSize="1rem"
            fontWeight="400"
            fontFamily="'Poppins', sans-serif"
            textAlign="center"
          >
            Seleccione productos o busquelos por el buscador.
          </Typography>
        </Box>

        :
        selectedProducts.map((producto, index) => (
          <Box key={index} mb={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={1} xl={1}>
                <TextField
                  label="Código"
                  size="small"
                  sx={styleTextField}
                  type='text'
                  value={producto.codigo || ''}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={3} xl={3}>
                <TextField
                  label="Producto"
                  value={producto.alias}
                  size="small"
                  type='text'
                  sx={styleTextField}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={1} xl={1}>
                <TextField
                  label="SKU"
                  value={producto.sku}
                  size="small"
                  type='text'
                  sx={styleTextField}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={1} xl={1}>
                <TextField
                  label="Unidad de Medida"
                  value={producto.unidad_medida}
                  size="small"
                  type='text'
                  sx={styleTextField}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={2} xl={2}>
                <TextField
                  label="Cantidad"
                  size="small"
                  sx={styleTextField}
                  type='number'
                  onChange={(e) => handleChangeCantidad(e.target.value, producto)}
                  value={producto.cantidad || ''}
                />
              </Grid>
              <Grid item xs={12} md={2} xl={2}>
                <TextField
                  label="Stock"
                  value={producto.stock}
                  size="small"
                  type='text'
                  sx={styleTextField}
                />

              </Grid>
              <Grid item xs={12} md={2} xl={2}>
                <TextField
                  label="Categoria"
                  size="small"
                  sx={styleTextField}
                  value={producto.categoria.nombre || 0}
                />
              </Grid>
            </Grid>
            <Box mt={1} mr={2} display="flex" justifyContent="flex-end" gap={2}>
              <ButtonBase onClick={() => handleRemoveProductInv(producto)} sx={{ color: 'error.main', fontSize: '0.9rem' }}>
                <DeleteIcon color="error" fontSize="small" />
                Quitar
              </ButtonBase>
            </Box>
          </Box>
        ))}
    </Paper>
  )
}

import { Box, ButtonBase, InputAdornment, TextField, Typography } from '@mui/material'

export const SearchTextComponent = ({ Icon, changeSearch, valueSearch, nameSearch, filteredProducts = [], handleAddProduct }) => {
  return (
    <Box>
      <TextField
        autoComplete='off'
        fullWidth
        onChange={(e) => changeSearch(e.target.value)}
        value={valueSearch}
        placeholder={`Buscar por ${nameSearch}`}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon fontSize="small" sx={{ color: "#666" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputBase-root": {
            fontSize: "0.85rem",
            borderRadius: 2
          },
          backgroundColor: "white",
          borderRadius: 5,
        }}
      />
      <Box sx={{ position: 'absolute', zIndex: 9999, right: '2%', gap: 1, bgcolor: 'white', display: 'flex', flexDirection: 'column', boxShadow: 2, borderRadius: 2, mt: 1, maxHeight: '200px', overflow: 'auto', width: '220px' }}>
        {filteredProducts.map((prod, index) => (
          <Box key={index} display="flex" >
            <ButtonBase onClick={() => handleAddProduct(prod)} sx={{ display: 'flex', alignItems: 'center', width: '100%', }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '100%', '&:hover': { background: 'rgba(255,255,255,0.2)' } }} p={1} gap={1}>
                <Typography fontFamily={'Nunito'} fontSize={'0.9rem'} fontWeight={600} gutterBottom>
                  {prod.codigo}
                </Typography>
                <Typography fontFamily={'Nunito'} fontSize={'0.9rem'} gutterBottom>
                  {prod.alias}
                </Typography>
              </Box>
            </ButtonBase>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

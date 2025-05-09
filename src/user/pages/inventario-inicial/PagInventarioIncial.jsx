import { useEffect, useState } from "react";
import { Box, Button, FormControl, Grid, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

import { useForm } from "../../../hooks/useForm";
import { useAddTableProduct } from "../../../hooks/useAddTableProduct";
import { ButtonIcon } from "../../components/ButtonIcon.component";
import { TableHeadComponent } from "../../components/TableHead.component";
import { SearchTextComponent } from "../../components/SearchTextComponent";
import { useProductosStore } from "../../../hooks/useProductosStore";
import { useAlmacenesStore } from "../../../hooks/useAlmacenesStore";
import Barcode from "react-barcode";
import { useInventarioStore } from "../../../hooks/useInventarioStore";
import toast from "react-hot-toast";


const styleTableBody = {
  fontFamily: "Nunito, sans-serif",
  fontSize: "0.95rem",
  color: "#555",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "10px",
};
const styleTextField = {
  borderRadius: 2,
  width: '80px',
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


export const PagInventarioIncial = () => {
  //?estados
  const { getProductos } = useProductosStore()
  const { getAlmacenes } = useAlmacenesStore()
  const { inventarioInicial } = useInventarioStore()

  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [productoSelect, setProductoSelect] = useState([]);
  const [totales, setTotales] = useState({ subTotales: 0, cantidad: 0 })
  const [tempCode, setTempCode] = useState({}); // Estado temporal para el código acumulado

  const { formState, onInputChange } = useForm({
    almacen: ""
  });
  //hook para controlar productos seleccionados
  const {
    filteredProducts,
    handleAddProductInv,
    handleRemoveProductInv,
    handleSearch,
    searchTerm,
    handleChangePrecio,
    handleChangeCantidadInv,
    handleChangeCode,
  } = useAddTableProduct(productos, productoSelect, setProductoSelect);

  //?funciones
  //datos productos async
  const handleGetProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  }
  //datos almacen async
  const handleGetAlmacenes = async () => {
    const data = await getAlmacenes();
    setAlmacenes(data);
  }
  //guardaar codigo de barra detectado
  const handleDetected = (code, product) => {

    // Actualiza el código del producto en el estado de productos seleccionados
    handleChangeCode(code, product);

    // Limpia el código temporal para ese producto
    setTempCode((prev) => ({
      ...prev,
      [product.sku]: "", // Resetea solo el código de este producto
    }));
  };
  //procesar el codigo
  const handleBarcodeInput = (e, product) => {
    const value = e.target.value;

    setTempCode((prev) => ({
      ...prev,
      [product.sku]: value, // Asociar el valor al producto específico
    }));

    if (e.key === "Enter") {
      handleDetected(value, product);
    }
  };
  //volver 
  const handleGetBack = () => {
    navigate("/user/inventario-total");
  };
  //cacular totales
  const calcularTotales = () => {
    const { subTotales, cantidad } = productoSelect.reduce(
      (totales, producto) => {
        const subTotal = parseFloat(producto.subTotal) || 0;
        const cantidad = parseInt(producto.cantidad) || 0;

        return {
          subTotales: totales.subTotales + subTotal,
          cantidad: totales.cantidad + cantidad,
        };
      },
      { subTotales: 0, cantidad: 0 } // Valores iniciales
    );

    setTotales({ subTotales, cantidad });
  };

  //*Enviar Form
  const handleSaveform = async (e) => {
    e.preventDefault();

    const datos = {
      ...formState,
      productoSelect
    };

    toast.promise(
      inventarioInicial(datos),
      {
        loading: "Cargando Petición",
        success: () => {
          handleGetBack();
          return "Inventario inicial registrado con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }

  //efecto
  useEffect(() => {
    if (productos.length === 0) {
      handleGetProductos()
    }
    if (almacenes.length === 0) {
      handleGetAlmacenes()
    }
  }, [])

  useEffect(() => {

    calcularTotales()
  }, [productoSelect])


  return (
    <Box>
      <form onSubmit={handleSaveform}>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent={{ xs: "center", md: "space-between" }} alignItems="center" mb={2}>
          <Box textAlign={{ xs: 'center', md: 'left' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "Nunito, sans-serif", color: "#333" }}>
              Inventario Inicial
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Gestiona el Inventario inicial del Sistema
            </Typography>
          </Box>
          <Box display={'flex'} gap={2}>
            <Button
              onClick={handleGetBack}
              variant="contained"
              startIcon={<ArrowBackOutlinedIcon />}
              sx={{
                textTransform: "none",
                fontSize: "0.85rem",
                borderRadius: 2,
                padding: "6px 16px",
                backgroundColor: "#2621ba",
                color: "white",
                transition: "0.5s",
                "&:hover": { backgroundColor: "black" },
              }}
            >
              Volver
            </Button>
            <Button
              type="submit"
              startIcon={<SaveOutlinedIcon />}
              sx={{
                bgcolor: '#6616cd',
                fontSize: "0.85rem",
                borderRadius: 2,
                color: 'white',
                textTransform: "none",
                transition: "0.5s",
                "&:hover": { backgroundColor: "black" },
              }}
            >
              Guardar
            </Button>
          </Box>
        </Box>

        <Box>

          <Grid container spacing={2}>
            {/* Proveedor */}
            <Grid item xs={12} md={6}>
              <Typography fontWeight={600} fontFamily={"Nunito"} sx={{ marginBottom: "8px", color: "#555" }}>
                Sucursal
              </Typography>
              <Box display={'flex'} gap={2} alignItems={'center'}>
                <FormControl fullWidth variant="outlined" size="small" sx={{ backgroundColor: "#fff" }}>
                  <Select
                    value={formState.almacen}
                    name="almacen"
                    onChange={onInputChange}
                    required
                    displayEmpty
                    sx={{ "& .MuiSelect-outlined": { padding: "7px", fontFamily: "Nunito" } }}
                  >
                    <MenuItem value="">Seleccione una Sucursal</MenuItem>
                    {almacenes.map(almacen => (
                      <MenuItem value={almacen.id} key={almacen.id}>{almacen.nombre}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography fontWeight={600} fontFamily={"Nunito"} sx={{ marginBottom: "8px", color: "#555" }}>
                Fecha y Hora actual
              </Typography>
              <Box display={'flex'} gap={2}>
                <DateRangeOutlinedIcon />
                <Typography fontWeight={600} fontFamily={"Nunito"} sx={{ marginBottom: "8px", color: "#555" }}>
                  {new Intl.DateTimeFormat('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  }).format(new Date())}
                </Typography>
              </Box>
            </Grid>
            {/* Campo de búsqueda */}
            <Grid item xs={12}>
              <SearchTextComponent
                Icon={SearchIcon}
                changeSearch={handleSearch}
                valueSearch={searchTerm}
                nameSearch={"el nombre"}
                handleAddProduct={handleAddProductInv}
                filteredProducts={filteredProducts}
              />
            </Grid>

            {/* Tabla de productos seleccionados */}
            <Grid item xs={12}>
              <Box sx={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                <TableContainer component={Paper} elevation={0}
                  sx={{
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      width: "4px",
                      height: '7px'
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#007bff", // Color del scroll
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#f1f1f1", // Color del track del scroll
                    },
                  }}>
                  <Table >
                    <TableHeadComponent columns={["Producto", "SKU", "Cantidad", "Precio Compra", "Saldo", ""]} />
                    <TableBody>
                      {productoSelect.map((produc, index) => (
                        <TableRow key={index}>
                          <TableCell sx={styleTableBody} align="center">
                            {produc.alias}
                          </TableCell>
                          <TableCell sx={styleTableBody} align="center">
                            {produc.sku}
                          </TableCell>
                          <TableCell sx={styleTableBody} align="center">
                            <TextField
                              type="number"
                              value={produc.cantidad}
                              size="small"
                              onChange={(e) => handleChangeCantidadInv(e.target.value, produc)}
                              sx={styleTextField}
                            />
                          </TableCell>
                          <TableCell sx={styleTableBody} align="center">
                            <TextField
                              type="number"
                              value={produc.precio}
                              size="small"
                              onChange={(e) => handleChangePrecio(e.target.value, produc)}
                              sx={styleTextField}
                            />
                          </TableCell>
                          <TableCell sx={styleTableBody} align="center">
                            {parseFloat(produc.subTotal).toFixed(2)} Bs.
                          </TableCell>
                          <TableCell sx={styleTableBody} align="center">
                            <ButtonIcon
                              handleFunctionButton={() => handleRemoveProductInv(produc)}
                              Icon={DeleteOutlineOutlinedIcon}
                              colorText={"red"}
                              hoverBg={"red"}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} display="flex" justifyContent="right">
              <Box
                width={300}
                bgcolor="white"
                p={2}
                mr={2}
                display="flex"
                flexDirection="column"
                borderRadius={2}
                boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography fontSize={'0.9rem'} fontFamily="Nunito" fontWeight={600} color="#555">
                    Saldo:
                  </Typography>
                  <Typography fontSize={'0.9rem'} fontFamily="Nunito" fontWeight={700} color="#333">
                    {totales.subTotales.toFixed(2)} Bs.
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography fontSize={'0.9rem'} fontFamily="Nunito" fontWeight={600} color="#555">
                    Total Productos:
                  </Typography>
                  <Typography fontSize={'0.9rem'} fontFamily="Nunito" fontWeight={700} color="#333">
                    {totales.cantidad} Prod.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

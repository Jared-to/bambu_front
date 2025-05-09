import { useEffect, useState } from "react";
import { Box, Collapse, FormControl, Grid, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { ModalComponent } from "../../../components/Modal.component";
import { SearchTextComponent } from "../../../components/SearchTextComponent";
import { useForm } from "../../../../hooks/useForm";
import { TableHeadComponent } from "../../../components/TableHead.component";
import { useAddTableProduct } from "../../../../hooks/useAddTableProduct";
import { TextFieldComponent } from "../../../components/TextFieldComponent";
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { useInventarioStore } from "../../../../hooks/useInventarioStore";
import { useAlmacenesStore } from "../../../../hooks/useAlmacenesStore";
import { formatDateToInput } from "../../../helpers/ObtenerFechaHoraLocal";

const styleTableBody = {
  fontFamily: "Nunito, sans-serif",
  fontSize: "0.95rem",
  color: "#555",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "10px",
};


export const ModalAjuste = ({ open, handleClose, handleGetData, ajuste }) => {
  //?estados

  const { ajusteInventario, updateAjusteInventario } = useInventarioStore()
  const { getAlmacenes, getProductoAlmacen } = useAlmacenesStore()

  const [productos, setProductos] = useState([])
  const [almacenes, setAlmacenes] = useState([])
  const [productoSelect, setProductoSelect] = useState([]);
  const [almacenDisabled, setAlmacenDisabled] = useState(false);
  //hook
  const {
    filteredProducts,
    handleAddProductAjuste,
    handleDecrementQuantity,
    handleIncrementQuantity,
    handleRemoveProduct,
    handleSearch,
    searchTerm,
    handleChangeType,
  } = useAddTableProduct(productos, productoSelect, setProductoSelect);

  const { formState, onInputChange, resetForm, setFormState } = useForm({
    almacen: "",
    fecha: formatDateToInput(new Date()),
    glosa: ''
  });
  //?funciones

  //traer almacenes async
  const handleGetAlmacenes = async () => {
    const data = await getAlmacenes();
    
    setAlmacenes(data);
  }
  //traer productos por almacen
  const handleGetProductosAlmacen = async (id) => {
    const data = await getProductoAlmacen(id);
    
    setProductos(data.inventario);
  }
  //controlar almacen
  const handleChangeAlmacen = async (value) => {

    onInputChange({ target: { name: 'almacen', value: value } })

    if (value !== '') {
      await handleGetProductosAlmacen(value);
      setAlmacenDisabled(true);
    } else {
      setAlmacenDisabled(false);
    }
  }

  //volver a elegir un almacen
  const handleBackalmacen = () => {
    setAlmacenDisabled(false);
    setProductoSelect([]);
    setProductos([]);
  }
  
  //enviar form
  const handleSaveForm = async (e) => {

    e.preventDefault()
    if (productoSelect.length == 0) {
      toast.error('Debes Seleccionar productos');
      return;
    }

    const formulario = {
      ...formState,
      productoSelect
    }


    if (ajuste !== undefined) {
      toast.promise(
        updateAjusteInventario(formulario, ajuste.id),
        {
          loading: "Cargando Petición",
          success: () => {
            handleClose();
            resetForm();
            handleBackalmacen();
            handleGetData();
            return "Ajuste editado con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    } else {
      toast.promise(
        ajusteInventario(formulario),
        {
          loading: "Cargando Petición",
          success: () => {
            handleClose();
            resetForm();
            handleBackalmacen();
            handleGetData();
            return "Ajuste realizado con éxito!";
          },
          error: (err) => `Error: ${err.message}`,
        }
      );
    }


  }

  //efectos

  useEffect(() => {
    if (ajuste !== undefined) {
      setFormState({
        almacen: ajuste.almacen.id,
        fecha: ajuste.fecha,
        glosa: ajuste.glosa
      })
      handleGetProductosAlmacen(ajuste.almacen.id);
      setAlmacenDisabled(true);
      setProductoSelect(ajuste.detalles)
    }else{
      resetForm();
      setAlmacenDisabled(false);
      setProductoSelect([])
    }
  }, [ajuste])


  useEffect(() => {
    if (almacenes.length === 0) {
      handleGetAlmacenes()
    }
  }, [])

  useEffect(() => {

    if (!open) {
      if (ajuste !== undefined) {
        resetForm();
        setProductoSelect([]);
        handleBackalmacen()
      }
    }
  }, [open])



  return (
    <ModalComponent
      handleClose={handleClose}
      handleSaveform={handleSaveForm}
      open={open}
      title="Gestión de Ajuste"
      big={true}
    >
      <Box
        mt={2}
        px={3}
        py={2}
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Grid container spacing={3}>
          {/* Almacén Dropdown */}
          <Grid item xs={12} md={12}>
            <Typography
              fontWeight={600}
              fontFamily={"Nunito"}
              sx={{ marginBottom: "8px", color: "#555" }}
            >
              Surcursal
            </Typography>
            <Box display={'flex'}>
              <FormControl fullWidth variant="outlined" size="small" sx={{ backgroundColor: "#fff" }}>
                <Select
                  disabled={almacenDisabled}
                  value={formState.almacen}
                  name="almacen"
                  onChange={(e) => handleChangeAlmacen(e.target.value)}
                  displayEmpty
                  sx={{
                    "& .MuiSelect-outlined": {
                      padding: "10px",
                    },
                  }}
                >
                  <MenuItem value="">Selecciona la sucursal</MenuItem>
                  {almacenes.map(almacen => (
                    <MenuItem value={almacen.id} key={almacen.id}>{almacen.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {almacenDisabled &&
                <IconButton onClick={handleBackalmacen}>
                  <AutorenewIcon />
                </IconButton>
              }
            </Box>
          </Grid>

          {/* Search Field */}
          <Grid item xs={12}>
            <SearchTextComponent
              Icon={SearchIcon}
              changeSearch={handleSearch}
              valueSearch={searchTerm}
              nameSearch={"el nombre"}
              handleAddProduct={handleAddProductAjuste}
              filteredProducts={filteredProducts}
            />
          </Grid>

          {/* Tabla de productos seleccionados */}
          <Grid item xs={12}>
            <Box sx={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHeadComponent columns={["Producto", "SKU", "STOCK", "Cantidad", "Tipo", ""]} />
                  <TableBody>
                    {productoSelect.map((produc, index) => (
                      <TableRow key={index} >
                        <TableCell sx={styleTableBody}>{produc.alias}</TableCell>
                        <TableCell sx={styleTableBody} align="center">
                          {produc.sku}
                        </TableCell>
                        <TableCell sx={styleTableBody} align="center">
                          {produc.stock}
                        </TableCell>
                        <TableCell sx={styleTableBody} align="center">
                          <Box display="flex" alignItems="center" justifyContent={'center'}>
                            <IconButton onClick={() => handleIncrementQuantity(produc)} >
                              <AddCircleOutlineOutlinedIcon sx={{ fontSize: '1rem' }} />
                            </IconButton>
                            <Typography>{produc.cantidad}</Typography>
                            <IconButton onClick={() => handleDecrementQuantity(produc)} >
                              <RemoveCircleOutlineOutlinedIcon sx={{ fontSize: '1rem' }} />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell sx={styleTableBody} align="center">
                          <FormControl variant="outlined" size="small" sx={{ backgroundColor: "#fff" }}>
                            <Select
                              value={produc.tipo}
                              onChange={(e) => handleChangeType(e.target.value, produc)}
                              displayEmpty
                              sx={{
                                "& .MuiSelect-outlined": {
                                  fontSize: "0.9rem",
                                  padding: "5px",
                                },
                              }}
                            >
                              <MenuItem value="incrementar">Incrementar</MenuItem>
                              <MenuItem value="decrementar">Decrementar</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell sx={styleTableBody} align="center">
                          <ButtonIcon
                            handleFunctionButton={() => handleRemoveProduct(produc)}
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

          {/* Glosa/Nota */}
          <Grid item xs={12} md={6}>
            <Typography fontWeight={600} fontFamily={"Nunito"} sx={{ marginBottom: "8px", color: "#555" }}>
              Glosa/Nota
            </Typography>
            <TextFieldComponent
              small={true}
              formState={formState}
              onInputChange={onInputChange}
              name={"glosa"}
              type={"text"}
              placeholder={"Glosa/Nota"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography fontWeight={600} fontFamily={"Nunito"} sx={{ marginBottom: "8px", color: "#555" }}>
              Fecha y Hora
            </Typography>
            <TextFieldComponent
              requerid={true}
              small={true}
              formState={formState}
              onInputChange={onInputChange}
              name={"fecha"}
              type={"datetime-local"}
            />
          </Grid>
        </Grid>
      </Box>
    </ModalComponent >
  );
};

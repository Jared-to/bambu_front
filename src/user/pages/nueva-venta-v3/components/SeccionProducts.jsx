import { useEffect, useState } from "react";
import { Box, Grid, Pagination, Paper, Tab, Tabs } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { CardImgv3 } from "./CardImgv3";
import { usePagination } from "../../../../hooks/usePagination";
import { SearchTextComponent } from "../../../components/SearchTextComponent";

export const SeccionProducts = ({ categorias = [], setProducts, products = [], handleAddProduct }) => {
  //?estados
  const [sectionProducts, setSectionProducts] = useState([])
  const [value, setValue] = useState(0);

  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(sectionProducts, 'descripcion', 8)

  //?Funciones
  useEffect(() => {
    if (categorias.length > 0 && value === 0) {
      if (products.length !== 0) {

        setValue(categorias[0].id); // Seleccionar la primera categoría cuando los datos lleguen
        handleGetProductosCategoria(categorias[0].id)
      }
    }
  }, [categorias, products]);
  //controlar tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleGetProductosCategoria(newValue)
  };
  //traer products segun categoria
  const handleGetProductosCategoria = async (id_categoria) => {

    //filtrar productos por la categoria
    const filterProduct = products.filter(state => state?.categoria?.id === id_categoria);

    setSectionProducts(filterProduct)
  }

  //efecto para lista productos si se cambio de almacen
  useEffect(() => {
    if (value !== 0) {
      handleGetProductosCategoria(value);
    }
  }, [products])

  return (
    <Paper
      sx={{
        p: 1,
        borderRadius: 2,
        boxShadow: 0,
        backgroundColor: "#f8f9fa",
      }}
      elevation={0}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
        indicatorColor="primary"
        textColor="primary"
        sx={{
          minHeight: "40px",
          "& .MuiTab-root": {
            minHeight: "40px",
            textTransform: "uppercase",
            fontFamily: 'Nunito',
            fontWeight: 700,
            fontSize: "0.75rem",
            borderRadius: "8px",
            px: 1.5,
            mx: 0.5,
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "#e3f2fd",
            },
          },
          "& .Mui-selected": {
            backgroundColor: "#1976d2",
            color: "white !important",
          },
        }}
      >
        {categorias.map((categoria) => (
          <Tab key={categoria.id} label={categoria.nombre} value={categoria.id} />
        ))}
      </Tabs>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12}>
          <Box display={'flex'} justifyContent={'right'}>
            <SearchTextComponent
              Icon={SearchIcon}
              changeSearch={setSearchName}
              valueSearch={searchName}
              nameSearch="descripción"
            />
          </Box>
        </Grid>
        {paginatedData.map((product, index) => (
          <Grid item xs={12} md={3} key={index}>
            <CardImgv3
              handleFunction={handleAddProduct}
              image={product.imagen}
              title={product.alias}
              description={product.descripcion}
              variants={product.variantes}
              id={product.id_producto}
              value={value}
            />
          </Grid>
        ))}
      </Grid>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Paper>
  );
};

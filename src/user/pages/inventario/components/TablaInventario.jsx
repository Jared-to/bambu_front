import { useMemo, useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Paper, Avatar, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MultipleStopOutlinedIcon from '@mui/icons-material/MultipleStopOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';

import { TableHeadComponent } from "../../../components/TableHead.component";
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { ModalProducAlmacen } from "./ModalProducAlmacen";
import { ModalInfoProductInv } from "../../../ui/modals/ModalInfoProductInv";
import { ModalInfoProduct } from "../../../elements/ModalInfoProduct";
const styleTableBody = {
  fontFamily: "Nunito, sans-serif",
  fontSize: "0.95rem",
  color: "#555",
  maxWidth: 150,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "10px",
};


const styleTableHead = {
  background: "linear-gradient(90deg, #1976d2, #42a5f5)",
  color: "#fff",
  fontFamily: "Nunito, sans-serif",
  fontWeight: "bold",
  fontSize: "1rem",
};

const styleTableRowHover = {
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
};

const styleButtonIcon = {
  borderRadius: "8px",
  padding: "6px",
  color: "#f2ca5e",
  backgroundColor: "#fff",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#d6ab35",
  },
};

export const TablaInventario = ({ paginated, getAlmacenProducto, getInfoProduct, getMovimientos }) => {
  // ?Estados
  const [modalInfoProduct, setModalInfoProduct] = useState({ on: false, data: undefined });
  const [modalProduct, setModalProduct] = useState(false)
  const [orderDirection, setOrderDirection] = useState("desc");
  const [stockProduct, setStockProduct] = useState([]);
  const navigate = useNavigate()
  // ?Funciones
  const handleSort = () => {
    setOrderDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const sortedUsers = useMemo(() => {
    return [...paginated].sort((a, b) => {
      if (orderDirection === "asc") {
        return a?.alias.localeCompare(b?.alias);
      } else {
        return b?.alias.localeCompare(a?.alias);
      }
    });
  }, [paginated, orderDirection]);

  //modal producto almacen
  const handleOpenModalProductAlmacen = async (id) => {
    const data = await getAlmacenProducto(id);
    setStockProduct(data);
    setModalProduct(true);
  }
  const handleCloseModalProductAlmacen = () => {
    setModalProduct(false);
    setStockProduct(undefined);
  }

  //modal info producto
  const handleOpenModalInfo = async (id) => {
    const data = await getInfoProduct(id);

    setModalInfoProduct({ data: data, on: true });
  }
  const handleCloseModalInfo = () => {
    setModalInfoProduct({ data: undefined, on: false })
  }

  return (
    <TableContainer >
      <Table>
        <TableHeadComponent
          columns={["#",
            "",
            <TableSortLabel
              active={true}
              direction={orderDirection}
              onClick={handleSort}
            >
              NOMBRE
            </TableSortLabel>,
            'DESCRIPCION',
            "STOCK",
            "UNIDAD DE MEDIDA",
            "ACCIONES",
          ]}
          sx={styleTableHead}
        />
        <TableBody>
          {sortedUsers.map((producto, index) => (
            <TableRow key={index} sx={styleTableRowHover}>
              <TableCell sx={styleTableBody} align="center">
                {producto?.codigo}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Avatar
                  src={producto?.imagen}
                  alt={producto.alias}
                  sx={{ width: 50, height: 50, margin: '0 auto', borderRadius: 2 }}
                />
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {producto?.alias}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {producto?.descripcion}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <IconButton onClick={()=>handleOpenModalProductAlmacen(producto.id_producto)}>
                  <WarehouseOutlinedIcon />
                </IconButton>
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                {producto?.unidad_medida}
              </TableCell>
              <TableCell sx={styleTableBody} align="center">
                <Box display={"flex"} justifyContent={"center"} gap={1}>
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalInfo(producto.id_producto)}
                    Icon={InfoOutlinedIcon}
                    colorText="#f2ca5e"
                    hoverBg="#d6ab35"
                  />
                  <ButtonIcon
                    handleFunctionButton={() => navigate('/user/historial/' + producto.id_producto)}
                    Icon={MultipleStopOutlinedIcon}
                    sx={styleButtonIcon}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalProducAlmacen open={modalProduct} handleClose={handleCloseModalProductAlmacen} data={stockProduct} />
      <ModalInfoProduct open={modalInfoProduct.on} handleClose={handleCloseModalInfo} product={modalInfoProduct.data} />
    </TableContainer>
  );
};

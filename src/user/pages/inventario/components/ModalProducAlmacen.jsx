import { Box, Table, TableContainer, TableBody, TableCell, TableRow, Paper } from "@mui/material";
import { ModalInfo } from "../../../components/ModalInfo.component";
import { TableHeadComponent } from "../../../components/TableHead.component";

const styleTableContainer = {
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
};

const styleTableHead = {
  background: "linear-gradient(90deg, #1565c0, #42a5f5)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  textAlign: "center",
};

const styleTableBody = {
  fontFamily: "Nunito, sans-serif",
  fontSize: "0.95rem",
  color: "#555",
};


export const ModalProducAlmacen = ({ open, handleClose, data = [] }) => {
  
  return (
    <ModalInfo open={open} handleClose={handleClose} title={"Producto por Sucursal"} >
      <Box>
        <TableContainer component={Paper} sx={styleTableContainer}>
          <Table>
            <TableHeadComponent
              columns={["Sucursal", "STOCK",]}
              sx={styleTableHead}
            />
            <TableBody>
              {data.map((almacen, index) => (
                <TableRow key={index} sx={styleTableBody}>
                  <TableCell align="center">{almacen.almacen_nombre}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "inline-block",
                        padding: "6px 10px",
                        backgroundColor: almacen.stock > 30 ? "#c8e6c9" : "#fff9c4", 
                        color: almacen.stock > 30 ? "#388e3c" : "#f57f17",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        minWidth: "50px",
                        textAlign: "center",
                      }}
                    >
                      {almacen.stock}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ModalInfo>
  );
};

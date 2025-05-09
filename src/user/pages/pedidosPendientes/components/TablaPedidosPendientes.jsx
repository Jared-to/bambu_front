import { useMemo, useState } from "react";
import { Box, Card, CardContent, CircularProgress, IconButton, Tooltip, Typography } from "@mui/material";
import toast from "react-hot-toast";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReplayIcon from '@mui/icons-material/Replay';

import { TableSortLabel } from "@mui/material";
import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { ModalInfoPedido } from "./ModalInfoPedido";
import { useSelector } from "react-redux";

export const TablaPedidosPendientes = ({ paginated = [], getPedidosInfo, aceptarPedido, rechazarPedido, handleGetData }) => {
  //?Estados
  const { load } = useSelector(state => state.functions)
  const [orderDirection, setOrderDirection] = useState("desc");
  const [modalInfoPedido, setModalInfoPedido] = useState({ on: false, data: undefined })
  //?Funciones
  const handleSort = () => {
    setOrderDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const sortedOrders = useMemo(() => {
    return [...paginated].sort((a, b) => {
      if (orderDirection === "asc") {
        return a.fechaPedido.localeCompare(b.fechaPedido);
      } else {
        return b.fechaPedido.localeCompare(a.fechaPedido);
      }
    });
  }, [paginated, orderDirection]);
  //modal info
  const handleOpenModalInfo = async (id) => {
    const data = await getPedidosInfo(id);

    setModalInfoPedido({ on: true, data: data });
  }
  const handleCloseModalInfo = async () => setModalInfoPedido({ on: false, data: undefined });

  //rechazar pedido
  const declibeOrder = async (id) => {
    toast.promise(
      rechazarPedido(id),
      {
        loading: "Cargando Petición",
        success: () => {
          handleGetData();
          return "Pedido rechazado con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }
  //aceptar el pedido
  const acceptOrder = async (id) => {
    toast.promise(
      aceptarPedido(id),
      {
        loading: "Cargando Petición",
        success: () => {
          handleGetData();
          return "Pedido aceptado con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }

  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
      {/* Contenedor del ordenamiento y botón de recarga */}
      <Box display="flex" alignItems="center" justifyContent="center" width="100%" >
        <TableSortLabel
          active={true}
          direction={orderDirection}
          onClick={handleSort}
          sx={{ marginLeft: 2 }}
        >
          Ordenar por Fecha
        </TableSortLabel>
        <Tooltip title="Recargar" placement="top">
          <IconButton
            onClick={handleGetData}
            color="primary"
            sx={{ borderRadius: 2 }}
          >
            <ReplayIcon sx={{ fontSize: '1rem', }} />
          </IconButton>
        </Tooltip>
      </Box>

      {sortedOrders.length === 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh" gap={2}>
          {load ? (
            <CircularProgress size="3rem" />
          ) : (
            <Typography fontFamily="Nunito" fontWeight="bold" fontSize="1.2rem" color="text.primary">
              No hay pedidos pendientes
            </Typography>
          )}
        </Box>
      ) : (
        load ? (
          <CircularProgress size="3rem" />
        ) : (
          sortedOrders.map((pedido, index) => (
            <Card key={index} sx={{ width: 300, padding: 2, boxShadow: 1, borderRadius: 4 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" fontFamily={'Nunito'} color="#c74843">
                  Sucursal: {pedido?.almacen?.nombre}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" fontFamily={'Nunito'} color="#3d78d9">
                  Código: {pedido?.codigo}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" fontFamily={'Nunito'}>
                  {pedido.nombreSolicitante} {pedido.apellidoSolicitante}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily={'Nunito'}>
                  Método de Pago: {pedido.metodoPago}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily={'Nunito'}>
                  Tipo de Entrega: {pedido.formaEntrega}
                </Typography>
                <Typography
                  fontFamily={'Nunito'}
                  variant="h6"
                  sx={{
                    backgroundColor: "#e3f2fd",
                    color: "#1976d2",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginTop: 1,
                  }}
                >
                  {pedido.total + (pedido.formaEntrega === "DELIVERY" ? pedido.delivery : 0)} Bs.
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily={'Nunito'} sx={{ marginTop: 1 }}>
                  {new Date(pedido.fechaPedido).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Box display="flex" justifyContent="right" marginTop={2} gap={1}>
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalInfo(pedido.id)}
                    Icon={InfoOutlinedIcon}
                    colorText={'#0d6efd'}
                    hoverBg={'#0d6efd'}
                  />
                  <ButtonIcon
                    handleFunctionButton={() => acceptOrder(pedido.id)}
                    Icon={DoneIcon}
                    colorText={'#00aa53'}
                    hoverBg={'#00aa53'}
                  />
                  <ButtonIcon
                    handleFunctionButton={() => declibeOrder(pedido.id)}
                    Icon={CloseIcon}
                    colorText={'#c74843'}
                    hoverBg={'#c74843'}
                  />
                </Box>
              </CardContent>
            </Card>
          )
          ))
      )}

      <ModalInfoPedido open={modalInfoPedido.on} data={modalInfoPedido.data} handleClose={handleCloseModalInfo} />
    </Box>

  );
};

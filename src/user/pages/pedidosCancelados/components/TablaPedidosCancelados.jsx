import { useMemo, useState } from "react";
import { Box, Card, CardContent, TableSortLabel, Typography } from "@mui/material";
import toast from "react-hot-toast";

import AutoModeOutlinedIcon from '@mui/icons-material/AutoModeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { ModalInfoPedido } from "../../pedidosPendientes/components/ModalInfoPedido";

export const TablaPedidosCancelados = ({ paginated = [], getPedidosInfo, eliminarPedido, restaurarPedido, handleGetData }) => {
  //?Estados
  const [orderDirection, setOrderDirection] = useState('desc');
  const [modalInfoPedido, setModalInfoPedido] = useState({ on: false, data: undefined })

  //?funciones
  const handleSort = () => {
    setOrderDirection(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };
  const sortedOrders = useMemo(() => {
    return [...paginated].sort((a, b) => {
      if (orderDirection === 'asc') {
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

  //cancelar el pedido
  const deleteOrder = async (id) => {
    toast.promise(
      eliminarPedido(id),
      {
        loading: "Cargando Petición",
        success: () => {
          handleGetData();
          return "Pedido eliminado con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }
  //restaurar orden
  const restauarOrder = async (id) => {
    toast.promise(
      restaurarPedido(id),
      {
        loading: "Cargando Petición",
        success: () => {
          handleGetData();
          return "Pedido restaurado con éxito!";
        },
        error: (err) => `Error: ${err.message}`,
      }
    );
  }

  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
      <Box display="flex" alignItems="center" justifyContent="center" width="100%">
        <TableSortLabel
          active={true}
          direction={orderDirection}
          onClick={handleSort}
          sx={{ marginLeft: 2 }}
        >
          Ordenar por Fecha
        </TableSortLabel>
      </Box>
      {sortedOrders.map((pedido, index) => (
        <Card key={index} sx={{ width: 300, padding: 2, boxShadow: 1, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold" fontFamily={'Nunito'} color="#c74843">
              Sucursal:  {pedido?.almacen?.nombre}
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" fontFamily={'Nunito'} color="#3d78d9">
              Código:  {pedido?.codigo}
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
              variant="body2"
              fontFamily={'Nunito'}
              fontWeight={600}
              sx={{
                color: pedido?.estado === 'Aceptado' ? '#00aa53' : '#ff9900'
              }}
            >
              Estado: {pedido.estado}
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
              {pedido.total} Bs.
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
                title="información"
              />
              <ButtonIcon
                handleFunctionButton={() => restauarOrder(pedido.id)}
                Icon={AutoModeOutlinedIcon}
                colorText={'#00aa53'}
                hoverBg={'#00aa53'}
                title="Restaurar Pedido"
              />
              <ButtonIcon
                handleFunctionButton={() => deleteOrder(pedido.id)}
                Icon={DeleteOutlineOutlinedIcon}
                colorText={'#c74843'}
                hoverBg={'#c74843'}
                title="Eliminar"
              />
            </Box>
          </CardContent>
        </Card>
      ))}
      <ModalInfoPedido open={modalInfoPedido.on} data={modalInfoPedido.data} handleClose={handleCloseModalInfo} />
    </Box>
  )
}

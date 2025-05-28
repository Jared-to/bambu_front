import { useMemo, useState } from "react";
import { Box, Card, CardContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TableSortLabel, Typography } from "@mui/material";
import toast from "react-hot-toast";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone';

import { ButtonIcon } from "../../../components/ButtonIcon.component";
import { ModalInfoPedido } from "../../pedidosPendientes/components/ModalInfoPedido";
import { TableHeadComponent } from "../../../components/TableHead.component";


export const TablaPedidosEntregados = ({ paginated = [], getPedidosInfo, handleGetData, eliminarPedido, user, orderDirection, handleSort,handleDischargePDF }) => {
  //?Estados
  const [modalInfoPedido, setModalInfoPedido] = useState({ on: false, data: undefined })
  const [tipo, setTipo] = useState(true)
  //?funciones

  //modal info
  const handleOpenModalInfo = async (id) => {

    const data = await getPedidosInfo(id);

    setModalInfoPedido({ on: true, data: data });
  }
  const handleCloseModalInfo = async () => setModalInfoPedido({ on: false, data: undefined });

  //eliminar pedido
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

  const sendMenssageWhatsap = (numeroSolicitante) => {
    const mensaje = "¡Tu Pedido está en camino!¡Gracias por tu preferencia!.";
    const url = `https://wa.me/591${numeroSolicitante}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };



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
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1">Mostrar por:</Typography>
          <IconButton onClick={() => setTipo(!tipo)}>
            {tipo ? <GridViewIcon /> : <TableRowsIcon />}
          </IconButton>
        </Box>
      </Box>
      {
        !tipo ?
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHeadComponent
                columns={[
                  'Sucursal',
                  'Código',
                  'Solicitante',
                  'Método de Pago',
                  'Tipo de Entrega',
                  'Estado',
                  'Total',
                  'Fecha',
                  ''
                ]}
              />
              <TableBody>
                {paginated.map((pedido, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" sx={{ fontFamily: 'Nunito' }}>{pedido?.almacen?.nombre}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'Nunito' }}>{pedido?.codigo}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'Nunito' }}>{pedido.nombreSolicitante} {pedido.apellidoSolicitante}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'Nunito' }}>{pedido.metodoPago}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'Nunito' }}>{pedido.formaEntrega}</TableCell>
                    <TableCell align="center" sx={{ color: pedido?.estado === 'Aceptado' ? '#00aa53' : '#0d6efd' }}>{pedido.estado}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'Nunito' }}>{pedido.total} Bs.</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'Nunito' }}>{new Date(pedido.fechaPedido).toLocaleString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</TableCell>
                    <TableCell align="center">
                      <ButtonIcon handleFunctionButton={() => handleDischargePDF(pedido.id)} Icon={PictureAsPdfTwoToneIcon} colorText={'#f40950'} hoverBg={'#f40950'} title="PDF" />
                      <ButtonIcon handleFunctionButton={() => sendMenssageWhatsap(pedido.numeroSolicitante)} Icon={WhatsAppIcon} colorText={'#118d60'} hoverBg={'#118d60'} title="WhatsApp" />
                      <ButtonIcon handleFunctionButton={() => handleOpenModalInfo(pedido.id)} Icon={InfoOutlinedIcon} colorText={'#0d6efd'} hoverBg={'#0d6efd'} title="información" />
                      {(pedido?.vendido && user.rol === 'admin') &&
                        <ButtonIcon handleFunctionButton={() => deleteOrder(pedido.id)} Icon={DeleteOutlineOutlinedIcon} colorText={'#c74843'} hoverBg={'#c74843'} title="Eliminar" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          :
          paginated.map((pedido, index) => (
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
                    color: pedido?.estado === 'Aceptado' ? '#00aa53' : '#0d6efd'
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
                    handleFunctionButton={() => handleDischargePDF(pedido.id)}
                    Icon={PictureAsPdfTwoToneIcon}
                    colorText={'#f40950'}
                    hoverBg={'#f40950'}
                    title="PDF"
                  />

                  <ButtonIcon
                    handleFunctionButton={() => sendMenssageWhatsap(pedido.numeroSolicitante)}
                    Icon={WhatsAppIcon}
                    colorText={'#118d60'}
                    hoverBg={'#118d60'}
                    title="WhatsApp"
                  />
                  <ButtonIcon
                    handleFunctionButton={() => handleOpenModalInfo(pedido.id)}
                    Icon={InfoOutlinedIcon}
                    colorText={'#0d6efd'}
                    hoverBg={'#0d6efd'}
                    title="información"
                  />
                  {
                    (pedido?.vendido && user.rol === 'admin') &&
                    <ButtonIcon
                      handleFunctionButton={() => deleteOrder(pedido.id)}
                      Icon={DeleteOutlineOutlinedIcon}
                      colorText={'#c74843'}
                      hoverBg={'#c74843'}
                      title="Eliminar"
                    />
                  }

                </Box>
              </CardContent>
            </Card>
          ))}
      <ModalInfoPedido open={modalInfoPedido.on} data={modalInfoPedido.data} handleClose={handleCloseModalInfo} />
    </Box>
  )
}

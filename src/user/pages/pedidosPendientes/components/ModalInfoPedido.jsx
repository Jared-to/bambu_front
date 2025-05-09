import { useEffect, useState } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow,
  Paper, Grid, IconButton, Tooltip, Collapse, Card, CardMedia, Dialog
} from "@mui/material";
import axios from "axios";

import RoomIcon from '@mui/icons-material/Room'; // Icono de ubicación
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { ModalInfo } from "../../../components/ModalInfo.component";
import { TableHeadComponent } from "../../../components/TableHead.component";
import { MapComponent } from "../../../components/MapComponent";

const UBICACION_INICIAL = { lat:  -17.389299145167936, lng: -66.1847006902106 }

const tarifaPorKm = 8; // Precio por km en dólares
const API_KEY = "5b3ce3597851110001cf6248251c801afb1949ca966e8772cb0eee51"; // Reemplaza con tu clave de OpenRouteService

export const ModalInfoPedido = ({ open, handleClose, data = {} }) => {
  const [precio, setPrecio] = useState(null);
  const [openImage, setOpenImage] = useState(false); // Estado para abrir el modal de imagen
  const [ruta, setRuta] = useState([]);

  const sendMenssageWhatsap = () => {
    window.open(`https://wa.me/591${data.numeroSolicitante}?text=Hola....
¡Pedido recibido! 
 Estamos preparando tu orden con mucho cariño.  ¡Te avisaremos cuando esté listo para enviar!`, "_blank");
  };
  const sendMenssageWhatsap2 = () => {
    window.open(`https://wa.me/591${data.numeroSolicitante}?text=¡Tu Pedido está en camino!¡Gracias por tu preferencia!.`, "_blank");
  };
  const handleChangeMessage = () => {
    if (data.estado === 'Vendido') {
      sendMenssageWhatsap2()
    } else {
      sendMenssageWhatsap()
    }
  }

  const openGoogleMaps = () => {
    const ubi = data.dir_gps || {};

    window.open(`https://www.google.com/maps/search/?api=1&query=${ubi[0]},${ubi[1]}`, "_blank");

  };


  const calcularDistancia = async (ubicaciones) => {
    if (ubicaciones.length < 2) return;
  
    const coords = ubicaciones.map((loc) => [loc.lng, loc.lat]);
    const url = `https://api.openrouteservice.org/v2/directions/driving-car/geojson`;
  
    try {
      const response = await axios.post(
        url,
        { coordinates: coords },
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );
  
      const distanciaKm = response.data.features[0].properties.segments[0].distance / 1000;
  
      // Función para obtener el precio según la distancia
      const calcularPrecio = (distancia) => {
        if (distancia <= 1.5) return 8;
        if (distancia <= 3) return 10;
        if (distancia <= 4) return 13;
        if (distancia <= 5) return 15;
        if (distancia <= 6) return 17;
        if (distancia <= 7) return 19;
        if (distancia <= 8) return 21;
        if (distancia <= 9) return 23;
        if (distancia <= 10) return 25;
        if (distancia <= 12) return 27;
        if (distancia <= 13) return 29;
        if (distancia <= 14) return 30;
  
        // Si supera los 14 km, puedes aplicar una lógica extra si quieres
        return 30 + Math.ceil(distancia - 14) * 2; // Por ejemplo, 2 Bs por km extra
      };
  
      const precio = calcularPrecio(distanciaKm);
  
      setPrecio(precio);
      setPrecioDelivery(precio);
  
      // Extraer la ruta en coordenadas
      const coordenadasRuta = response.data.features[0].geometry.coordinates.map(([lng, lat]) => ({
        lat,
        lng,
      }));
      setRuta(coordenadasRuta);
    } catch (error) {
      console.error("Error calculando la distancia:", error);
    }
  };

  useEffect(() => {
    if (data.dir_gps && data.dir_gps.length === 2) {
      calcularDistancia([UBICACION_INICIAL, { lat: data.dir_gps[0], lng: data.dir_gps[1] }]);
    }
  }, [data.dir_gps]);

  return (
    <ModalInfo open={open} handleClose={handleClose} title={`Información del Pedido - ${data.codigo}`} big>
      <Box
        display="flex"
        flexDirection="column"
        gap={3}

      >
        {/* Información General */}
        <Grid container spacing={2} sx={{ padding: 2, borderRadius: 2 }}>
          {data?.usuario &&
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight={600} color="primary">Usuario :</Typography>
              <Typography fontSize="1rem">{data?.usuario?.fullName}</Typography>
            </Grid>
          }
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight={600} color="primary">Sucursal:</Typography>
            <Typography fontSize="1rem">{data?.almacen?.nombre}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight={600} color="primary">Fecha:</Typography>
            <Typography fontSize="1rem">
              {new Date(data.fechaPedido).toLocaleString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight={600} color="primary">Solicitante:</Typography>
            <Typography fontSize="1rem">{data.nombreSolicitante} {data.apellidoSolicitante}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight={600} color="primary">Número de Contacto:</Typography>
            <Box display="flex" alignItems="center">
              <Typography fontSize="1rem">{data.numeroSolicitante}</Typography>
              <Tooltip placement="top" title="Enviar mensaje por WhatsApp">
                <IconButton onClick={handleChangeMessage} sx={{ marginLeft: 1 }}>
                  <WhatsAppIcon color="success" />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight={600} color="primary">Forma de Entrega:</Typography>
            <Typography fontSize="1rem">{data.formaEntrega}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight={600} color="primary">Método de Pago:</Typography>
            <Typography fontSize="1rem">{data.metodoPago}</Typography>
          </Grid>
          {data?.nombreFactura &&
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight={600} color="primary">Nombre de la Factura:</Typography>
              <Typography fontSize="1rem">{data?.nombreFactura || "N/A"}</Typography>
            </Grid>
          }
          {data?.nitCi &&
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight={600} color="primary">NIT / CI:</Typography>
              <Typography fontSize="1rem">{data?.nitCi || "N/A"}</Typography>
            </Grid>
          }
          {data?.tipoDocumento &&
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight={600} color="primary">Tipo de Documento:</Typography>
              <Typography fontSize="1rem">{data?.tipoDocumento || "N/A"}</Typography>
            </Grid>
          }
          {data?.venta &&
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight={600} color="primary">Código Venta :</Typography>
              <Typography fontSize="1rem">{data?.venta?.codigo || "N/A"}</Typography>
            </Grid>
          }
          {data.formaEntrega === 'RECOJO' &&
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight={600} color="primary">Fecha y hora de Recojo:</Typography>
              <Typography fontSize="1rem">
                {new Date(data.fechaHoraRecojo).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Grid>
          }
          {data?.glosa &&
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight={600} color="primary">Nota :</Typography>
              <Typography fontSize="1rem">{data?.glosa || "N/A"}</Typography>
            </Grid>
          }
          <Grid item xs={6}>
            <Typography variant="body1" fontWeight={600} color="primary">Total Pedido:</Typography>
            <Typography fontSize="1rem">{(data?.total + (data.formaEntrega === "DELIVERY" ? data.delivery : 0)).toFixed(2)} Bs.</Typography>
          </Grid>
        </Grid>

        {/* Mapa y Recibo */}
        <Grid container spacing={2}>
          {/* Mapa GPS con icono para abrir Google Maps */}
          {data.formaEntrega === "DELIVERY" && (
            <Grid item xs={12} sm={6}>
              <Collapse in={true}>
                <Box
                  sx={{ backgroundColor: "#e3f2fd", padding: 2, borderRadius: 2, boxShadow: 1, position: "relative" }}
                >
                  <Typography textAlign="center" fontWeight={600} color="primary">Ubicación en el Mapa</Typography>
                  <MapComponent center={data.dir_gps} />
                  <Tooltip title="Abrir en Google Maps">
                    <IconButton
                      onClick={openGoogleMaps}
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                      }}
                    >
                      <RoomIcon color="error" />
                    </IconButton>
                  </Tooltip>
                  <Typography textAlign="center" fontWeight={600} color="primary">
                    Precio Delivery: {precio ? `${precio} Bs.` : "Calculando..."}
                  </Typography>
                </Box>
              </Collapse>
            </Grid>
          )}

          {/* Recibo QR - Click para ampliar */}
          {data.metodoPago === "QR" && (
            <Grid item xs={12} sm={6}>
              <Collapse in={true}>
                <Card sx={{ borderRadius: 2, boxShadow: 1, overflow: "hidden", cursor: "pointer" }} onClick={() => setOpenImage(true)}>
                  <Typography textAlign="center" fontWeight={600} color="primary" sx={{ padding: 1, backgroundColor: "#f1f8e9" }}>
                    Recibo de Pago (Click para ampliar)
                  </Typography>
                  <CardMedia
                    component="img"
                    image={data.fotoRecibo}
                    alt="Recibo de pago"
                    sx={{ height: 250, objectFit: "cover" }}
                  />
                </Card>
              </Collapse>
            </Grid>
          )}
        </Grid>

        {/* Tabla de Detalles del Pedido */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
          <Table>
            <TableHeadComponent columns={['PRODUCTO', 'VARIANTE', 'CANTIDAD', 'PRECIO', 'SUBTOTAL']} />
            <TableBody>
              {data.detalles?.map((producto, index) => (
                <TableRow key={index} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" } }}>
                  <TableCell align="center">{producto?.producto?.alias}</TableCell>
                  <TableCell align="center">{producto?.variante}</TableCell>
                  <TableCell align="center">{producto.cantidad}</TableCell>
                  <TableCell align="center">{producto.precio.toFixed(2)} Bs.</TableCell>
                  <TableCell align="center">{producto.subtotal.toFixed(2)} Bs.</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>

      {/* Modal para Ampliar Imagen */}
      <Dialog open={openImage} onClose={() => setOpenImage(false)} maxWidth="md">
        <CardMedia
          component="img"
          image={data.fotoRecibo}
          alt="Recibo Ampliado"
          sx={{ maxHeight: "90vh", objectFit: "contain", backgroundColor: "#000" }}
        />
      </Dialog>
    </ModalInfo>
  );
};

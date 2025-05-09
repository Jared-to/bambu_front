import { useEffect, useState } from "react";
import { Typography, IconButton, Tooltip } from "@mui/material";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import RoomIcon from "@mui/icons-material/Room";
import L from "leaflet";

// Definir ícono del marcador
const icon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const UBICACION_INICIAL = { lat: -17.75605582825855, lng: -63.173580871685715 };
const API_KEY = "5b3ce3597851110001cf6248251c801afb1949ca966e8772cb0eee51";
const tarifaPorKm = 5; // Precio por km en dólares

export const MapWithRoute = ({ destino }) => {
  const [ruta, setRuta] = useState([]);
  const [precio, setPrecio] = useState(null);

  useEffect(() => {
    if (!destino || !destino[0] || !destino[1]) return;

    const obtenerRuta = async () => {
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${UBICACION_INICIAL.lng},${UBICACION_INICIAL.lat}&end=${destino[1]},${destino[0]}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.routes && data.routes.length > 0) {
          const coordenadas = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]); // Invertir lat/lng
          setRuta(coordenadas);

          const distanciaKm = data.routes[0].summary.distance / 1000;
          setPrecio(distanciaKm * tarifaPorKm);

          console.log("Ruta obtenida:", coordenadas); // Depuración
        } else {
          console.error("No se encontraron rutas en la API.");
        }
      } catch (error) {
        console.error("Error obteniendo ruta:", error);
      }
    };

    obtenerRuta();
  }, [destino]);

  return (
    <div>
      <Typography textAlign="center">Busque y seleccione su ubicación para calcular el precio.</Typography>
      <MapContainer center={[UBICACION_INICIAL.lat, UBICACION_INICIAL.lng]} zoom={12} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marcadores */}
        <Marker position={[UBICACION_INICIAL.lat, UBICACION_INICIAL.lng]} icon={icon} />
        {destino && <Marker position={[destino[0], destino[1]]} icon={icon} />}

        {/* Ruta en Polyline */}
        {ruta.length > 0 && <Polyline positions={ruta} color="blue" weight={4} />}
      </MapContainer>

      {/* Precio */}
      {precio !== null && (
        <Typography textAlign="center" fontWeight="bold" marginTop={1}>
          Precio estimado: {precio.toFixed(2)} Bs.
        </Typography>
      )}
    </div>
  );
};

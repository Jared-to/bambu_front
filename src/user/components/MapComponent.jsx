import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ setAddress, positionn, editable }) => {
  const [position, setPosition] = useState(positionn);

  useMapEvents({
    click(e) {
      {
        if (editable) {

          setPosition(e.latlng);
          const addressData = {
            address: `Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`,
            latlng: e.latlng
          };
          setAddress(addressData);
        }
      }
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Esta aqui</Popup>
    </Marker>
  );
};

export const MapComponent = ({ onAddressSelect, center = [-17.386327, -66.158528], editable = false, allArrays = false, height = '300px' }) => {
  ;

  const handleAddressChange = (addressData) => {
    onAddressSelect([addressData.latlng.lat, addressData.latlng.lng]);
  };

  return (
    <div>
      <MapContainer center={center} zoom={13} style={{ height: height, width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {allArrays ? allArrays.map(location => (
          <LocationMarker setAddress={handleAddressChange} positionn={location.center} editable={editable} />
        ))
          :
          <LocationMarker setAddress={handleAddressChange} positionn={center} editable={editable} />

        }
      </MapContainer>
    </div>
  );
};



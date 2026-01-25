import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

function LocationPicker({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function FreeMapPicker({ center, onSelect }) {
  const [pos, setPos] = useState(center);

  return (
    <MapContainer center={pos} zoom={13} style={{ height: 400 }}>
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={pos} />
      <LocationPicker
        onSelect={(lat, lng) => {
          setPos({ lat, lng });
          onSelect(lat, lng); // FREE lat/lng
        }}
      />
    </MapContainer>
  );
}

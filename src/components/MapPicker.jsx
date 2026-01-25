import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ClickHandler({ onMove }) {
  useMapEvents({
    click(e) {
      onMove(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapPicker({ center, onConfirm, onClose }) {
  const [draftPosition, setDraftPosition] = useState(center);

  return (
    <div className="map-overlay" onClick={onClose}>
      <div className="map-container" onClick={(e) => e.stopPropagation()}>
        <MapContainer
          center={draftPosition}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          {/* FREE street map */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          <Marker
            position={draftPosition}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const { lat, lng } = e.target.getLatLng();
                setDraftPosition({ lat, lng });
              },
            }}
          />

          <ClickHandler
            onMove={(lat, lng) => {
              setDraftPosition({ lat, lng });
            }}
          />
        </MapContainer>

        {/* ✅ CONFIRM ACTIONS */}
        <div className="map-actions">
          <button onClick={onClose}>Cancel</button>
          <button
            className="confirm-btn"
            onClick={() =>
              onConfirm(draftPosition.lat, draftPosition.lng)
            }
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}

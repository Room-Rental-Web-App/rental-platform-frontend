import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../CSS/map-picker.css";

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

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 13);
  }, [position, map]);
  return null;
}

export default function MapPicker({ center, onConfirm, onClose }) {
  const [draftPosition, setDraftPosition] = useState(center);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // 🔍 SEARCH API (Nominatim)
  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch(() => { });

    return () => controller.abort();
  }, [query]);

  const selectLocation = (lat, lon, displayName) => {
    const pos = { lat: Number(lat), lng: Number(lon) };
    setDraftPosition(pos);
    setQuery(displayName);
    setSuggestions([]);
  };

  return (
    <div className="map-overlay" onClick={onClose}>
      <div className="map-container" onClick={(e) => e.stopPropagation()}>

        {/* 🔍 SEARCH INPUT */}
        <div className="map-search">
          <input type="text" placeholder="Search location (city, area, landmark)" value={query} onChange={(e) => setQuery(e.target.value)} />

          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((s) => (
                <li key={s.place_id} onClick={() => selectLocation(s.lat, s.lon, s.display_name)}> {s.display_name}</li>
              ))}
            </ul>
          )}
        </div>

        <MapContainer center={draftPosition} zoom={13}>
          <RecenterMap position={draftPosition} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
          <Marker position={draftPosition} draggable eventHandlers={{ dragend: (e) => { const { lat, lng } = e.target.getLatLng(); setDraftPosition({ lat, lng }); }, }} />
          <ClickHandler onMove={(lat, lng) => setDraftPosition({ lat, lng })} />
        </MapContainer>

        {/* ✅ ACTIONS */}
        <div className="map-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="confirm-btn" onClick={() => onConfirm(draftPosition.lat, draftPosition.lng)}>
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}

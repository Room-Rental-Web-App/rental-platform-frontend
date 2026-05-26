// MapPicker.js - Google Maps (Async Loading version)
// index.html mein ye script lagao (head ke andar):
//
// <script>
//   (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[a-zA-Z].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
//   ({key: "YOUR_API_KEY", libraries: ["places"]});
// </script>

import { useEffect, useRef, useState } from "react";
import "../CSS/map-picker.css";

export default function MapPicker({ center, onConfirm, onClose }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const inputRef = useRef(null);

  const [draftPosition, setDraftPosition] = useState(center);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📍 Reverse Geocoding - lat/lng se address nikalo
  const reverseGeocode = async (pos) => {
    try {
      const { Geocoder } = await window.google.maps.importLibrary("geocoding");
      const geocoder = new Geocoder();
      geocoder.geocode({ location: pos }, (results, status) => {
        if (status === "OK" && results[0]) {
          const formattedAddress = results[0].formatted_address;
          setAddress(formattedAddress);
          if (inputRef.current) {
            inputRef.current.value = formattedAddress;
          }
        }
      });
    } catch (err) {
      console.error("Reverse geocoding error:", err);
    }
  };

  // ✅ Google Maps async initialize
  useEffect(() => {
    async function initMap() {
      try {
        const { Map } = await window.google.maps.importLibrary("maps");
        const { Marker } = await window.google.maps.importLibrary("marker");
        const { Autocomplete } =
          await window.google.maps.importLibrary("places");

        // Map banao
        const map = new Map(mapRef.current, {
          center: draftPosition,
          zoom: 15,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_CENTER,
          },
        });

        // Draggable Marker
        const marker = new Marker({
          position: draftPosition,
          map,
          draggable: true,
          title: "Drag karke exact location set karo",
          animation: window.google.maps.Animation.DROP,
        });

        // Marker drag hone par update karo
        marker.addListener("dragend", () => {
          const pos = marker.getPosition();
          const newPos = { lat: pos.lat(), lng: pos.lng() };
          setDraftPosition(newPos);
          reverseGeocode(newPos);
        });

        // Map click par marker move karo
        map.addListener("click", (e) => {
          const newPos = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          };
          marker.setPosition(newPos);
          setDraftPosition(newPos);
          reverseGeocode(newPos);
        });

        markerRef.current = marker;

        // Places Autocomplete
        const autocomplete = new Autocomplete(inputRef.current, {
          componentRestrictions: { country: "in" }, // Sirf India
          fields: ["geometry", "formatted_address"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) return;

          const newPos = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };

          map.setCenter(newPos);
          map.setZoom(16);
          marker.setPosition(newPos);
          setDraftPosition(newPos);
          setAddress(place.formatted_address || "");

          if (inputRef.current) {
            inputRef.current.value = place.formatted_address || "";
          }
        });

        // Initial reverse geocode
        reverseGeocode(draftPosition);
        setLoading(false);
      } catch (err) {
        console.error("Google Maps load error:", err);
        setError("Map load nahi ho saka. Please refresh karo.");
        setLoading(false);
      }
    }

    initMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="map-overlay" onClick={onClose}>
      <div className="map-container" onClick={(e) => e.stopPropagation()}>
        {/* 🔍 Search Input - Google Places Autocomplete */}
        <div className="map-search">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search location (city, area, landmark...)"
            defaultValue={address}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "400px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            🗺️ Map load ho raha hai...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "400px",
              fontSize: "14px",
              color: "red",
            }}
          >
            {error}
          </div>
        )}

        {/* 🗺️ Google Map */}
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "8px",
            display: loading || error ? "none" : "block",
          }}
        />

        {/* 📌 Current Coordinates */}
        {!loading && !error && (
          <div
            style={{
              padding: "8px 4px",
              fontSize: "12px",
              color: "#555",
              background: "#f9f9f9",
              borderRadius: "4px",
              marginTop: "6px",
            }}
          >
            📍 <strong>Lat:</strong> {draftPosition.lat.toFixed(6)}{" "}
            &nbsp;|&nbsp;
            <strong>Lng:</strong> {draftPosition.lng.toFixed(6)}
          </div>
        )}

        {/* ✅ Action Buttons */}
        <div className="map-actions">
          <button onClick={onClose}>Cancel</button>
          <button
            className="confirm-btn"
            onClick={() => onConfirm(draftPosition.lat, draftPosition.lng)}
            disabled={loading}
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}

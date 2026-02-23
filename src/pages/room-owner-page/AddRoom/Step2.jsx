import React, { useEffect, useState } from "react";
import { MapPin as PinIcon } from "lucide-react";
import MapPicker from "../../../components/MapPicker";

const DEFAULT_LOCATION = {
  lat: 23.2599,
  lng: 77.4126,
};

const Step2 = ({ formData, setFormData, setStep }) => {
  const [openMap, setOpenMap] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(true);

  const handleConfirmLocation = (lat, lng) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
    setOpenMap(false);
  };

  useEffect(() => {
    const userAccepted = window.confirm(
      "We need your location to pin your room accurately on the map. Allow location access?"
    );

    if (!userAccepted) {
      // User clicked cancel → use fallback
      setFormData((prev) => ({
        ...prev,
        latitude: DEFAULT_LOCATION.lat,
        longitude: DEFAULT_LOCATION.lng,
      }));
      setLoadingLocation(false);
      setOpenMap(true);
      return;
    }

    if (!("geolocation" in navigator)) {
      alert("Geolocation is not supported in your browser.");
      setFormData((prev) => ({
        ...prev,
        latitude: DEFAULT_LOCATION.lat,
        longitude: DEFAULT_LOCATION.lng,
      }));
      setLoadingLocation(false);
      setOpenMap(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));

        setLoadingLocation(false);
        setOpenMap(true);
      },
      (err) => {
        alert("Location permission denied. Using default location.");

        setFormData((prev) => ({
          ...prev,
          latitude: DEFAULT_LOCATION.lat,
          longitude: DEFAULT_LOCATION.lng,
        }));

        setLoadingLocation(false);
        setOpenMap(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div className="fade-in">
      <h3>
        <PinIcon size={20} /> Location & Contact
      </h3>

      <p className="hint-text">
        Choose your exact room location.
      </p>

      {loadingLocation && (
        <p style={{ marginBottom: "15px" }}>
          Detecting your location...
        </p>
      )}

      {!loadingLocation && (
        <div className="map-preview-box">
          <div className="coordinates">
            <strong>Latitude:</strong> {formData.latitude}
            <br />
            <strong>Longitude:</strong> {formData.longitude}
          </div>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setOpenMap(true)}
          >
            Select / Change Location
          </button>
        </div>
      )}

      {openMap && formData.latitude && formData.longitude && (
        <MapPicker
          center={{
            lat: formData.latitude,
            lng: formData.longitude,
          }}
          onConfirm={handleConfirmLocation}
          onClose={() => setOpenMap(false)}
        />
      )}
      {/* ADDRESS */}
      <div className="input-box">
        <label>Full Address</label>
        <textarea
          required
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Building name, Street..."
        />
      </div>

      <div className="row">
        <div className="input-box">
          <label>City</label>
          <input
            type="text"
            required
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
          />
        </div>

        <div className="input-box">
          <label>Pincode</label>
          <input
            type="number"
            required
            value={formData.pincode}
            onChange={(e) =>
              setFormData({ ...formData, pincode: e.target.value })
            }
          />
        </div>
      </div>

      <div className="input-box">
        <label>Contact Number</label>
        <input
          type="number"
          required
          value={formData.contactNumber}
          onChange={(e) =>
            setFormData({ ...formData, contactNumber: e.target.value })
          }
        />
      </div>

      <div className="btn-row">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="btn-prev"
        >
          Back
        </button>

        <button
          type="button"
          onClick={() => setStep(3)}
          className="btn-next"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Step2;
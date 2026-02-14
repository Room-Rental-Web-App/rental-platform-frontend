import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import { MapPin as PinIcon, Navigation } from "lucide-react";

const Step2 = ({ formData, setFormData, setStep }) => {
  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        setFormData({
          ...formData,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      },
    });
    return <Marker position={[formData.latitude, formData.longitude]} />;
  };

  return (
    <div className="fade-in">
      <h3>
        <PinIcon size={20} /> Location & Contact
      </h3>
      <p className="hint-text">
        Click on the map to pin your exact room location.
      </p>

      <div
        className="map-container"
        style={{ height: "250px", marginBottom: "15px" }}
      >
        <MapContainer
          center={[formData.latitude, formData.longitude]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationPicker />
        </MapContainer>
      </div>

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
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
        <button type="button" onClick={() => setStep(1)} className="btn-prev">
          Back
        </button>
        <button type="button" onClick={() => setStep(3)} className="btn-next">
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Step2;

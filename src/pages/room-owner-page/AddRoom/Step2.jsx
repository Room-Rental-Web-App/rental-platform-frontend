// Step2.js - Google Maps compatible version
// Kya badla: kuch nahi! Step2.js same rehta hai.
// MapPicker.js ko replace karne se automatically Google Maps kaam karega.
// Ye file as-is rakho. ✅

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
  const [errors, setErrors] = useState({});

  const handleConfirmLocation = (lat, lng) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
    setOpenMap(false);
  };

  // Detect location on mount
  useEffect(() => {
    if (!("geolocation" in navigator)) {
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
      () => {
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
        timeout: 8000,
        maximumAge: 0,
      },
    );
  }, [setFormData]);

  const validate = () => {
    const newErrors = {};

    if (!formData.address?.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city?.trim()) {
      newErrors.city = "City is required";
    }

    if (!/^[0-9]{6}$/.test(formData.pincode || "")) {
      newErrors.pincode = "Enter valid 6-digit pincode";
    }

    if (!/^[0-9]{10}$/.test(formData.contactNumber || "")) {
      newErrors.contactNumber = "Enter valid 10-digit phone number";
    }

    if (!formData.latitude || !formData.longitude) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setStep(3);
    }
  };

  return (
    <div className="fade-in">
      <h3>
        <PinIcon size={20} /> Location & Contact
      </h3>

      <p className="hint-text">Choose your exact room location.</p>

      {loadingLocation && (
        <p style={{ marginBottom: "15px" }}>Detecting your location...</p>
      )}

      {!loadingLocation && (
        <div className="map-preview-box">
          <div className="coordinates">
            <strong>Latitude:</strong> {formData.latitude}
            <br />
            <strong>Longitude:</strong> {formData.longitude}
          </div>

          {errors.location && (
            <small className="error-text">{errors.location}</small>
          )}

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
          value={formData.address || ""}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Building name, Street..."
          className={errors.address ? "input-error" : ""}
        />
        {errors.address && (
          <small className="error-text">{errors.address}</small>
        )}
      </div>

      <div className="row">
        <div className="input-box">
          <label>City</label>
          <input
            type="text"
            value={formData.city || ""}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={errors.city ? "input-error" : ""}
          />
          {errors.city && <small className="error-text">{errors.city}</small>}
        </div>

        <div className="input-box">
          <label>Pincode</label>
          <input
            type="text"
            maxLength="6"
            value={formData.pincode || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                pincode: e.target.value.replace(/\D/g, ""),
              })
            }
            className={errors.pincode ? "input-error" : ""}
          />
          {errors.pincode && (
            <small className="error-text">{errors.pincode}</small>
          )}
        </div>
      </div>

      <div className="input-box">
        <label>Contact Number</label>
        <input
          type="text"
          maxLength="10"
          value={formData.contactNumber || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              contactNumber: e.target.value.replace(/\D/g, ""),
            })
          }
          className={errors.contactNumber ? "input-error" : ""}
        />
        {errors.contactNumber && (
          <small className="error-text">{errors.contactNumber}</small>
        )}
      </div>

      <div className="btn-row">
        <button type="button" onClick={() => setStep(1)} className="btn-prev">
          Back
        </button>

        <button type="button" onClick={handleNext} className="btn-next">
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Step2;

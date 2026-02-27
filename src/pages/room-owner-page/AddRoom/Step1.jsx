import React, { useState } from "react";
import { Home, ChevronRight, Wifi, Wind, Car, Utensils } from "lucide-react";

const amenitiesList = [
  { id: "wifi", label: "WiFi", icon: <Wifi size={16} /> },
  { id: "ac", label: "AC", icon: <Wind size={16} /> },
  { id: "parking", label: "Parking", icon: <Car size={16} /> },
  { id: "kitchen", label: "Kitchen", icon: <Utensils size={16} /> },
];

const Step1 = ({ formData, setFormData, setStep }) => {
  const [errors, setErrors] = useState({});

  const handleAmenityChange = (id) => {
    const currentAmenities = formData.amenities || [];

    const updated = currentAmenities.includes(id)
      ? currentAmenities.filter((a) => a !== id)
      : [...currentAmenities, id];

    setFormData({ ...formData, amenities: updated });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description?.trim() || formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters long";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Enter valid rent amount";
    }

    if (!formData.area || Number(formData.area) <= 0) {
      newErrors.area = "Enter valid area";
    }

    if (!formData.roomType) {
      newErrors.roomType = "Please select room type";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setStep(2);
    }
  };

  return (
    <div className="fade-in">
      <h3>
        <Home size={20} /> Basic Details
      </h3>

      {/* Title */}
      <div className="input-box">
        <label>Property Title</label>
        <input
          type="text"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter catchy title"
          className={errors.title ? "input-error" : ""}
        />
        {errors.title && <small className="error-text">{errors.title}</small>}
      </div>

      {/* Description */}
      <div className="input-box">
        <label>Description</label>
        <textarea
          className="custom-desc"
          rows="5" // Isko 5-6 rakho taaki lamba placeholder dikhe
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder={
            "Mention things like:\n" +
            "• Is it near a Metro or Bus stand?\n" +
            "• Does it have AC, WiFi or Geyser?\n" +
            "• Any specific rules (e.g. No pets)?"
          }
          style={{
            padding: "12px",
            lineHeight: "1.5",
            borderRadius: "10px",
            width: "100%",
            border: "1px solid var(--border-primary)",
            outline: "none",
            fontSize: "0.95rem",
          }}
        />
          {errors.description && <small className="error-text">{errors.description}</small>}
      </div>

      {/* Price + Area */}
      <div className="row">
        <div className="input-box">
          <label>Rent (₹/Month)</label>
          <input
            type="number"
            min="1"
            value={formData.price || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: Number(e.target.value),
              })
            }
            className={errors.price ? "input-error" : ""}
          />
          {errors.price && <small className="error-text">{errors.price}</small>}
        </div>

        <div className="input-box">
          <label>Area (Sq. Ft)</label>
          <input
            type="number"
            min="1"
            value={formData.area || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                area: Number(e.target.value),
              })
            }
            className={errors.area ? "input-error" : ""}
          />
          {errors.area && <small className="error-text">{errors.area}</small>}
        </div>
      </div>

      {/* Room Type + Available For */}
      <div className="row">
        <div className="input-box">
          <label>Room Type</label>
          <select
            value={formData.roomType || ""}
            onChange={(e) =>
              setFormData({ ...formData, roomType: e.target.value })
            }
            className={errors.roomType ? "input-error" : ""}
          >
            <option value="">Select Room Type</option>
            <option value="Single Room">Single Room</option>
            <option value="Double Room">Double Room</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="Boys Hostel">Boys Hostel</option>
            <option value="Girls Hostel">Girls Hostel</option>
            <option value="PG">Boys PG</option>
            <option value="Girls PG">Girls PG</option>
          </select>
          {errors.roomType && (
            <small className="error-text">{errors.roomType}</small>
          )}
        </div>

        <div className="input-box">
          <label>Available For</label>
          <select
            value={formData.availableFor || "Anyone"}
            onChange={(e) =>
              setFormData({ ...formData, availableFor: e.target.value })
            }
          >
            <option value="Anyone">Anyone</option>
            <option value="Family Only">Family Only</option>
            <option value="Boys Only">Boys Only</option>
            <option value="Girls Only">Girls Only</option>
          </select>
        </div>
      </div>

      {/* Amenities */}
      <div className="input-box">
        <label>Amenities</label>
        <div className="amenities-grid">
          {amenitiesList.map((item) => {
            const isSelected = (formData.amenities || []).includes(item.id);

            return (
              <div
                key={item.id}
                className={`amenity-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleAmenityChange(item.id)}
              >
                {item.icon} <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      <div className="btn-row" style={{ justifyContent: "flex-end" }}>
        <button type="button" onClick={handleNext} className="btn-next">
          Next Step <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Step1;
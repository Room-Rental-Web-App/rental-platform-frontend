import React from "react";
import { Home, ChevronRight, Wifi, Wind, Car, Utensils } from "lucide-react";

const Step1 = ({ formData, setFormData, setStep }) => {
  const allAmenities = [
    { id: "wifi", label: "WiFi", icon: <Wifi size={16} /> },
    { id: "ac", label: "AC", icon: <Wind size={16} /> },
    { id: "parking", label: "Parking", icon: <Car size={16} /> },
    { id: "kitchen", label: "Kitchen", icon: <Utensils size={16} /> },
  ];

  const handleAmenityChange = (id) => {
    const updated = formData.amenities.includes(id)
      ? formData.amenities.filter((a) => a !== id)
      : [...formData.amenities, id];
    setFormData({ ...formData, amenities: updated });
  };

  return (
    <div className="fade-in">
      <h3>
        <Home size={20} /> Basic Details
      </h3>

      <div className="input-box">
        <label>Property Title</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter catchy title"
        />
      </div>

      <div className="input-box">
        <label>Description</label>
        <textarea
          rows="3"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe your room..."
        />
      </div>

      <div className="row">
        <div className="input-box">
          <label>Rent (₹/Month)</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <div className="input-box">
          <label>Area (Sq. Ft)</label>
          <input
            type="number"
            required
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          />
        </div>
      </div>
      <div className="row">
        <div className="input-box">
          <label>Room Type</label>
          <select
            value={formData.roomType}
            onChange={(e) =>
              setFormData({ ...formData, roomType: e.target.value })
            }
            required
          >
            <option value="" disabled>
              Select Room Type
            </option>
            <option value="Single Room">Single Room</option>
            <option value="Double Room">Double Room</option>
            {/* <option value="Flat / Apartment">Flat / Apartment</option>
             */}
             <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>  
              <option value="Boys Hostel">Boys Hostel</option>
            <option value=" Girls Hostel">Girls Hostel</option>


            {/* <option value="PG / Hostel">PG / Hostel</option> */}
            {/* <option value="Studio Apartment">Studio Apartment</option> */}
            {/* <option value="Office Space">Office Space</option> */}
          </select>
        </div>
        <div className="input-box">
          <label>Available For</label>
          <select
            value={formData.availableFor}
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

      <div className="input-box">
        <label>Amenities</label>
        <div className="amenities-grid">
          {allAmenities.map((item) => (
            <div
              key={item.id}
              className={`amenity-card ${formData.amenities.includes(item.id) ? "selected" : ""}`}
              onClick={() => handleAmenityChange(item.id)}
            >
              {item.icon} <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="btn-row" style={{ justifyContent: "flex-end" }}>
        <button type="button" onClick={() => setStep(2)} className="btn-next">
          Next Step <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Step1;

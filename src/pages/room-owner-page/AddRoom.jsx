import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import { Home, MapPin, Camera, ChevronRight, CheckCircle, Wifi, Wind, Car, Utensils, Navigation, Video, X, Upload, Lock, Info, } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../CSS/AddRoom.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import { useNavigate } from "react-router-dom";
import MapPicker from "../../components/MapPicker";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const AddRoom = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Get smart status from our custom hook
  const { canAddMoreRooms, roomLimit, currentRoomCount, loading, planCode } =
    usePremiumStatus();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    roomType: "Single Room",
    address: "",
    city: "",
    pincode: "",
    contactNumber: "",
    availableFor: "Anyone",
    area: "",
    latitude: 20.5937,
    longitude: 78.9629,
    amenities: [],
  });



  const [openMap, setOpenMap] = useState(false);
  const [mapCenter, setMapCenter] = useState(null);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [previews, setPreviews] = useState([]);

  const allAmenities = [
    { id: "wifi", label: "WiFi", icon: <Wifi size={16} /> },
    { id: "ac", label: "AC", icon: <Wind size={16} /> },
    { id: "parking", label: "Parking", icon: <Car size={16} /> },
    { id: "kitchen", label: "Kitchen", icon: <Utensils size={16} /> },
  ];

  const handleUseLocation = () => {

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMapCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setOpenMap(true);
      },
      () => alert("Enable location access"),
    );
  };

  useEffect(() => handleUseLocation(), [])

  // --- 1. PRE-CHECK LOGIC ---
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Checking your room limits...</p>
      </div>
    );
  }

  // If the hook explicitly says they can't add more rooms, show the Overlay
  if (canAddMoreRooms === false) {
    return (
      <div className="limit-reached-overlay">
        <div className="limit-card fade-in">
          <div className="icon-badge">
            <Lock size={40} color="#ffffff" />
          </div>
          <h2>Limit Reached!</h2>
          <p>
            You have used <b>{currentRoomCount}</b> out of your{" "}
            <b>{roomLimit}</b> free slots. Upgrade to list more properties.
          </p>
          <div className="plan-info-pill">
            <Info size={14} /> Current Plan: {planCode}
          </div>
          <div className="action-btns">
            <button
              onClick={() => navigate("/premium")}
              className="upgrade-btn-main"
            >
              View Premium Plans
            </button>
            <button
              onClick={() => navigate("/my-listings")}
              className="secondary-btn"
            >
              Manage My Rooms
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. FORM HELPERS ---


  const handleAmenityChange = (id) => {
    const updated = formData.amenities.includes(id)
      ? formData.amenities.filter((a) => a !== id)
      : [...formData.amenities, id];
    setFormData({ ...formData, amenities: updated });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    const roomData = { ...formData, ownerEmail: localStorage.getItem("email") };
    data.append("roomData", JSON.stringify(roomData));
    images.forEach((img) => data.append("images", img));
    if (video) data.append("video", video);

    try {
      await axios.post(API_ENDPOINTS.ADD_ROOM, data, {
        headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
      });
      setStep(4);
    } catch (err) {
      // Catch the 403 Forbidden Error from Backend
      if (err.response && err.response.status === 403) {
        alert(
          err.response.data.message ||
          "Limit exceeded! Redirecting to Premium.",
        );
        if(confirm("Will you want to permium member"))navigate("/premium")
        
      } else {
        alert("Upload failed. Please check your internet or file size.");
      }
    }
  };

  return (
    <div className="add-room-wrapper">
      {/* STEPPER UI */}
      <div className="stepper">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`step-item ${step >= s ? "active" : ""} ${step > s ? "completed" : ""}`}
          >
            {step > s ? <CheckCircle size={20} /> : s}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="modern-form">
        {/* STEP 1: PROPERTY DETAILS */}
        {step === 1 && (
          <div className="fade-in">
            <h3 className="step-title">
              <Home /> Basic Details
            </h3>
            <div className="input-box">
              <label>Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Luxury PG in Bhopal"
              />
            </div>
            <div className="input-box">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Tell us about your room..."
              />
            </div>
            <div className="row">
              <div className="input-box">
                <label>Price (₹/Month)</label>
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
                <label>Room Type</label>
                <select
                  value={formData.roomType}
                  onChange={(e) =>
                    setFormData({ ...formData, roomType: e.target.value })
                  }
                >
                  <option>Single Room</option>
                  <option>Double Room</option>
                  <option>Flat / Apartment</option>
                  <option>Studio</option>
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
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-next"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2: LOCATION */}
        {step === 2 && (
          <div className="fade-in">

            <button onClick={handleUseLocation}>location</button>
            {openMap && mapCenter && (
              <MapPicker
                center={mapCenter}
                onClose={() => setOpenMap(false)}
                onConfirm={(lat, lng) => {
                  setFormData({ ...formData, latitude: lat, longitude: lng })
                  setOpenMap(false);
                }}
              />
            )}


            <div className="input-box">
              <label>Address</label>
              <textarea required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="btn-row">
              <button type="button" onClick={() => setStep(1)} className="btn-prev"> Back</button>
              <button type="button" onClick={() => setStep(3)} className="btn-next" > Next <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {/* STEP 3: MEDIA */}
        {step === 3 && (
          <div className="fade-in">
            <h3 className="step-title"> <Camera /> Media </h3>
            <div className="upload-section">
              <label className="upload-card">
                <Upload />
                <span>Upload Photos</span>
                <input type="file" multiple hidden accept="image/*" onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setImages([...images, ...files]);
                  setPreviews([...previews, ...files.map((f) => URL.createObjectURL(f)),]);
                }}
                />
              </label>
            </div>
            <div className="previews">
              {previews.map((p, i) => (
                <div key={i} className="preview-item">
                  <img src={p} alt="preview" />
                  <X className="remove-icon" size={14} onClick={() => {
                    setImages(images.filter((_, idx) => idx !== i));
                    setPreviews(previews.filter((_, idx) => idx !== i));
                  }}
                  />
                </div>
              ))}
            </div>
            <div className="btn-row">
              <button type="button" onClick={() => setStep(2)} className="btn-prev" >Back</button>
              <button type="submit" className="btn-publish"> Publish </button>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 4 && (
          <div className="success-msg fade-in">
            <CheckCircle size={80} color="#10b981" />
            <h2>Published Successfully!</h2>
            <p>Your listing is waiting for admin approval.</p>
            <button type="button" onClick={() => navigate("/my-listings")} className="btn-next"> View Listings </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddRoom;

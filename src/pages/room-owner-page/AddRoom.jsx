import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import {
  Home,
  MapPin,
  Camera,
  ChevronRight,
  CheckCircle,
  Wifi,
  Wind,
  Car,
  Utensils,
  Video,
  X,
  Upload,
  Lock,
  Info,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../CSS/AddRoom.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import { useNavigate } from "react-router-dom";

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
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [previews, setPreviews] = useState([]);

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

 const handleSubmit = async (e) => {
   e.preventDefault();
   if (images.length === 0) {
     alert("Please upload at least one image.");
     return;
   }

   setUploading(true);
   setProgress(0);
   const data = new FormData();

   // 1. DATA CLEANING: Empty strings ko null ya default number mein convert karna zaroori hai
   const roomData = {
     ...formData,
     ownerEmail: localStorage.getItem("email"),
     price: formData.price ? parseFloat(formData.price) : 0,
     area: formData.area ? parseInt(formData.area) : 0,
     latitude: parseFloat(formData.latitude),
     longitude: parseFloat(formData.longitude),
     pincode: String(formData.pincode), // Backend String expect kar raha hai toh String bhejo
   };

   // 2. BLOB FIX: Backend ko batana padta hai ki ye JSON hai
   data.append(
     "roomData",
     new Blob([JSON.stringify(roomData)], {
       type: "application/json",
     }),
   );

   // 3. IMAGES & VIDEO
   images.forEach((img) => data.append("images", img));
   if (video) data.append("video", video);

   try {
     console.log("Sending Data to Backend:", roomData);

     const response = await axios.post(API_ENDPOINTS.ADD_ROOM, data, {
       headers: {
         ...getAuthHeaders(),
         // Content-Type yahan set mat karna, Axios boundary khud handle karega
       },
       timeout: 0,
       onUploadProgress: (progressEvent) => {
         const percent = Math.round(
           (progressEvent.loaded * 100) / progressEvent.total,
         );
         setProgress(percent);
       },
     });

     console.log("Success:", response.data);
     setStep(4);
   } catch (err) {
     console.error("400 ERROR ANALYSIS:", err.response?.data);

     if (err.response) {
       const serverMsg = err.response.data.message || err.response.data;
       if (err.response.status === 400) {
         alert(
           `400 Bad Request: Backend rejected the data. Reason: ${JSON.stringify(serverMsg)}`,
         );
       } else if (err.response.status === 403) {
         alert("Limit Reached! Please upgrade.");
         navigate("/premium");
       } else {
         alert("Server Error! Check logs.");
       }
     } else {
       alert("Network Error! Server unreachable.");
     }
   } finally {
     setUploading(false);
   }
 };
  if (loading)
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Verifying limit...</p>
      </div>
    );

  if (canAddMoreRooms === false) {
    return (
      <div className="limit-reached-overlay">
        <div className="limit-card">
          <Lock size={40} />
          <h2>Limit Reached!</h2>
          <p>
            Used {currentRoomCount} of {roomLimit} slots.
          </p>
          <button
            onClick={() => navigate("/premium")}
            className="upgrade-btn-main"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-room-wrapper">
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
        {/* STEP 1: BASIC INFO */}
        {step === 1 && (
          <div className="fade-in">
            <h3 className="step-title">
              <Home /> Basic Details
            </h3>
            <div className="input-box">
              <label>Property Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="input-box">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe features..."
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
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
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
                >
                  <option>Single Room</option>
                  <option>Double Room</option>
                  <option>Flat / Apartment</option>
                  <option>Studio</option>
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
                  <option value="Boys Only">Boys Only</option>
                  <option value="Girls Only">Girls Only</option>
                  <option value="Family">Family</option>
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

        {/* STEP 2: LOCATION & CONTACT */}
        {step === 2 && (
          <div className="fade-in">
            <h3 className="step-title">
              <MapPin /> Location & Contact
            </h3>
            <div
              className="map-container"
              style={{ height: "230px", marginBottom: "15px" }}
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
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: MEDIA */}
        {step === 3 && (
          <div className="fade-in">
            <h3 className="step-title">
              <Camera /> Photos & Video
            </h3>
            <div className="upload-section">
              <label className="upload-card">
                <Upload /> <span>Upload Photos</span>
                <input
                  type="file"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setImages([...images, ...files]);
                    setPreviews([
                      ...previews,
                      ...files.map((f) => URL.createObjectURL(f)),
                    ]);
                  }}
                />
              </label>
            </div>
            <div className="previews">
              {previews.map((p, i) => (
                <div key={i} className="preview-item">
                  <img src={p} alt="preview" />
                  <X
                    className="remove-icon"
                    onClick={() => {
                      setImages(images.filter((_, idx) => idx !== i));
                      setPreviews(previews.filter((_, idx) => idx !== i));
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="input-box" style={{ marginTop: "20px" }}>
              <label>
                <Video size={18} /> Tour Video (Optional)
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </div>
            {uploading && (
              <div className="progress-container">
                <p>Uploading: {progress}%</p>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            <div className="btn-row">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-prev"
                disabled={uploading}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn-publish"
                disabled={uploading}
              >
                {uploading ? "Publishing..." : "Publish Listing"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="success-msg text-center">
            <CheckCircle size={80} color="#10b981" />
            <h2>Listing Published!</h2>
            <button
              type="button"
              onClick={() => navigate("/my-listings")}
              className="btn-next"
            >
              View My Rooms
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddRoom;

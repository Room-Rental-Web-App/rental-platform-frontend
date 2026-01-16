import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import {
  Home,
  MapPin,
  Camera,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Wifi,
  Wind,
  Car,
  Utensils,
  Navigation,
  Video,
  X,
  Upload,
} from "lucide-react";


import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../CSS/AddRoom.css";

// Leaflet Icon Fix (Standard icons don't load sometimes in React)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Api from "../../api/Api";
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
  const navTo = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    roomType: "Single Room",
    address: "",
    city: "",
    pincode: "",
    contactNumber: "",
    availableFor: "",
    area: "",
    latitude: 20.5937, // Default India Center
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
   
  const email = localStorage.getItem("email");
  const { isPremiumUser, loading  } = usePremiumStatus();

  useEffect(() => {
    if (loading) return; 
    Api.get(`/rooms/roomCount/${email}`).then((res) => {
      console.log("Fetched rooms:", res.data);
      console.log("Is Premium:", isPremiumUser);
      if (res.data >= 2 && !isPremiumUser) {
        alert("You have reached the limit of adding 2 rooms as a free user. Please upgrade to premium to add more rooms.");
        navTo("/premium");
      }
    });
  }, [loading, isPremiumUser]);

  // Helper for Map Clicks
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

  const handleAmenityChange = (id) => {
    const updated = formData.amenities.includes(id)
      ? formData.amenities.filter((a) => a !== id)
      : [...formData.amenities, id];
    setFormData({ ...formData, amenities: updated });
  };

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData({
            ...formData,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        () => alert("Enable GPS to fetch location.")
      );
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    const roomData = { ...formData, ownerEmail: localStorage.getItem("email") };
    data.append("roomData", JSON.stringify(roomData));
    images.forEach((img) => data.append("images", img));
    if (video) data.append("video", video);
    console.log("Submitting:", roomData, images, video);

    try {
      await axios.post(API_ENDPOINTS.ADD_ROOM, data, {
        headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
      });
      setStep(4);
    } catch (err) {
      alert("Upload failed. Check file size or connection.");
    }
  };

  return (
    <div className="add-room-wrapper">
      <div className="stepper">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`step-item ${step >= s ? "active" : ""}`}>
            {step > s ? <CheckCircle size={20} /> : s}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="modern-form">
        {/* STEP 1: BASIC INFO */}
        {step === 1 && (
          <div className="fade-in">
            <h3>
              <Home /> Basic Information
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
                placeholder="e.g. Luxury PG near Main Road"
              />
            </div>
            <div className="input-box">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your property..."
              />
            </div>
            <div className="row">
              <div className="input-box">
                <label>Monthly Rent (₹)</label>
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
              <div className="input-box">
                <label>Available For</label>
                <select
                  value={formData.availableFor}
                  onChange={(e) =>
                    setFormData({ ...formData, availableFor: e.target.value })
                  }
                >
                  <option> Tenant Preference</option>
                  <option> Anyone </option>
                  <option> Boys  Only</option>
                  <option> Girls  Only</option>
                  <option> Family </option>
                  <option> Couple </option>
                  <option> Students </option>
                  <option> Working  Professionals</option>
                </select>
              </div>
            </div>
            <div className="input-box">
              <label>Area In Squar ft.</label>
              <input type="number" required value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} />
            </div>
            <div className="input-box">
              <label>Amenities</label>
              <div className="amenities-grid">
                {allAmenities.map((item) => (
                  <div key={item.id} className={`amenity-card ${formData.amenities.includes(item.id) ? "selected" : ""}`}
                    onClick={() => handleAmenityChange(item.id)} >
                    {item.icon} <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <button type="button" onClick={nextStep} className="btn-next">
              Next <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2: LOCATION & MAP */}
        {step === 2 && (
          <div className="fade-in">
            <h3>
              <MapPin /> Location Details
            </h3>

            <button type="button" className="geo-btn" onClick={getGeoLocation}>
              <Navigation size={16} /> Fetch Current Location
            </button>

            {/* MAP SECTION */}
            <div
              className="map-container"
              style={{ height: "250px", margin: "15px 0" }}
            >
              <MapContainer
                center={[formData.latitude, formData.longitude]}
                zoom={13}
                style={{ height: "100%", width: "100%", borderRadius: "12px" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker />
              </MapContainer>
            </div>
            <p className="hint-text">Click on the map to set exact marker 📍</p>

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
                  type="text"
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
                type="text"
                required
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
              />
            </div>
            <div className="btn-row">
              <button type="button" onClick={prevStep} className="btn-prev">
                Back
              </button>
              <button type="button" onClick={nextStep} className="btn-next">
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: MEDIA */}
        {step === 3 && (
          <div className="fade-in">
            <h3>
              <Camera /> Photos & Video
            </h3>
            <div className="upload-section">
              <label className="upload-card">
                <Upload />
                <span>Upload Photos</span>
                <input
                  type="file"
                  placeholder="select image"
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
                  <img src={p} alt="preview" className="thumb" />
                  <X className="remove-icon" size={14}
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
                <Video size={18} /> Tour Video
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </div>
            <div className="btn-row">
              <button type="button" onClick={prevStep} className="btn-prev">
                Back
              </button>
              <button type="submit" className="btn-publish">
                Publish Listing
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {step === 4 && (
          <div className="success-msg">
            <CheckCircle size={60} color="#10b981" />
            <h2>Listing Published!</h2>
            <button type="button" onClick={() => window.location.reload()} className="btn-next">Add Another</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddRoom;

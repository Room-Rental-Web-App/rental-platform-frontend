import React, { useState } from "react";
import {
  MapPin,
  IndianRupee,
  Home,
  Camera,
  Video,
  Navigation,
  Upload,
  X,
} from "lucide-react";
import axios from "axios";
import "../../css/AddRoom.css";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    roomType: "Single Room",
    address: "",
    city: "",
    pincode: "",
    contactNumber: "",
    latitude: null,
    longitude: null,
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [previews, setPreviews] = useState([]);

  // --- Functions ---

  // 1. Get Current Location
  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        alert("Current location fetched successfully!");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // 2. Handle Multiple Image Previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

  
    const roomData = {
      ...formData,
      ownerEmail: localStorage.getItem("email"), // Email include 
    };

  
    data.append("roomData", JSON.stringify(roomData));

    
    images.forEach((img) => {
      data.append("images", img);
    });

  
    if (video) {
      data.append("video", video);
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8080/api/rooms/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Room Added Successfully!");
      // Reset form or redirect
    } catch (err) {
      console.error("Upload Error:", err);
      alert(
        "Network Error: Make sure file size is okay and server is running."
      );
    }
  };

  
  return (
    <div className="add-room-container">
      <form onSubmit={handleSubmit} className="add-room-form">
        <h2>Post New Property Listing</h2>

        {/* --- SECTION 1: BASIC INFO --- */}
        <div className="form-section">
          <h3>
            <Home size={20} /> Basic Information
          </h3>
          <div className="input-group">
            <label>Property Title</label>
            <input
              type="text"
              placeholder="e.g. Modern Studio near Metro"
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="row">
            <div className="input-group">
              <label>Room Type</label>
              <select
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
            <div className="input-group">
              <label>Monthly Rent (₹)</label>
              <div className="icon-input">
                <IndianRupee size={16} />
                <input
                  type="number"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: LOCATION & CONTACT --- */}
        <div className="form-section">
          <h3>
            <MapPin size={20} /> Location & Contact
          </h3>
          <button type="button" className="geo-btn" onClick={getGeoLocation}>
            <Navigation size={16} /> Use Current Location
          </button>

          <div className="input-group">
            <label>Full Address</label>
            <textarea
              placeholder="Society name, Street, Landmark"
              required
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="row">
            <div className="input-group">
              <label>City</label>
              <input
                type="text"
                required
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
            <div className="input-group">
              <label>Pincode</label>
              <input
                type="text"
                required
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
              />
            </div>
          </div>

          <div className="input-group">
            <label>Contact Number (Visible to Premium Users)</label>
            <input
              type="text"
              required
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
            />
          </div>
        </div>

        {/* --- SECTION 3: MEDIA UPLOAD --- */}
        <div className="form-section">
          <h3>
            <Camera size={20} /> Property Photos & Video
          </h3>
          <div className="upload-box">
            <label htmlFor="image-upload" className="upload-label">
              <Upload /> Click to upload multiple photos
            </label>
            <input
              id="image-upload"
              type="file"
              multiple
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Image Previews */}
          <div className="preview-container">
            {previews.map((src, index) => (
              <div key={index} className="preview-card">
                <img src={src} alt="Preview" />
                <button
                  type="button"
                  onClick={() => {
                    const newImgs = images.filter((_, i) => i !== index);
                    const newPrevs = previews.filter((_, i) => i !== index);
                    setImages(newImgs);
                    setPreviews(newPrevs);
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>

          <div className="input-group">
            <label>
              <Video size={18} /> Room Tour Video (Optional)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Publish Listing
        </button>
      </form>
    </div>
  );
};

export default AddRoom;

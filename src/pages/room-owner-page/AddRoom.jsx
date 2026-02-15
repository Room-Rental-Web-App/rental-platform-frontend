import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import { CheckCircle, Lock, Loader2 } from "lucide-react"; // Loader2 add kiya
import "../../CSS/AddRoom.css";

// Custom Hook and Components
import usePremiumStatus from "../../customHook/usePremiumStatus";
import { useNavigate } from "react-router-dom";
import Step1 from "../room-owner-page/AddRoom/Step1";
import Step2 from "../room-owner-page/AddRoom/Step2";
import Step3 from "../room-owner-page/AddRoom/Step3";

const AddRoom = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { canAddMoreRooms, roomLimit, currentRoomCount, loading } =
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setUploading(true);
    setProgress(0);
    const data = new FormData();

    const roomData = {
      ...formData,
      ownerEmail: localStorage.getItem("email"),
      price: formData.price ? parseFloat(formData.price) : 0,
      area: formData.area ? parseInt(formData.area) : 0,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      pincode: String(formData.pincode),
    };

    data.append(
      "roomData",
      new Blob([JSON.stringify(roomData)], { type: "application/json" }),
    );
    images.forEach((img) => data.append("images", img));
    if (video) data.append("video", video);

    try {
      await axios.post(API_ENDPOINTS.ADD_ROOM, data, {
        headers: { ...getAuthHeaders() },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setProgress(percent);
        },
      });
      setStep(4);
    } catch (err) {
      console.error("Error publishing room:", err);
      if (err.response?.status === 403) {
        alert("Limit Reached! Please upgrade.");
        navigate("/premium");
      } else {
        alert("Server Error! Check logs.");
      }
    } finally {
      setUploading(false);
    }
  };

  // Modern Loading View
  if (loading)
    return (
      <div className="loading-screen-full">
        <Loader2 className="spinner-icon" size={48} />
        <p>Verifying Listing Limit...</p>
      </div>
    );

  // Limit Check View
  if (canAddMoreRooms === false)
    return (
      <div className="limit-reached-overlay fade-in">
        <div className="limit-card">
          <Lock size={50} color="var(--primary)" />
          <h2>Limit Reached!</h2>
          <p>
            You have used <b>{currentRoomCount}</b> out of <b>{roomLimit}</b>{" "}
            slots.
          </p>
          <button
            onClick={() => navigate("/premium")}
            className="upgrade-btn-main"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    );

  return (
    <div className="add-room-wrapper fade-in">
      <div className="stepper">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`step-item ${step >= s ? "active" : ""} ${step > s ? "completed" : ""}`}
          >
            {step > s ? <CheckCircle size={22} /> : s}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="modern-form">
        {step === 1 && (
          <Step1
            formData={formData}
            setFormData={setFormData}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <Step2
            formData={formData}
            setFormData={setFormData}
            setStep={setStep}
          />
        )}
        {step === 3 && (
          <Step3
            images={images}
            setImages={setImages}
            previews={previews}
            setPreviews={setPreviews}
            setVideo={setVideo}
            uploading={uploading}
            progress={progress}
            setStep={setStep}
          />
        )}

        {step === 4 && (
          <div className="success-msg text-center fade-in">
            <CheckCircle size={100} color="var(--success)" />
            <h2>Listing Published Successfully!</h2>
            <p>Your room is now visible to everyone.</p>
            <button
              type="button"
              onClick={() => navigate("/my-listings")}
              className="btn-next"
            >
              View My Listings
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddRoom;

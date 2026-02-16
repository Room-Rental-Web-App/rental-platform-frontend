import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import {
  CheckCircle,
  Lock,
  Loader2,
  Crown,
  ArrowRight,
  Home,
  AlertTriangle,
} from "lucide-react";
import "../../CSS/AddRoom.css";
import MyLoader from "../../components/MyLoader"

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
        alert("Limit Reached! Please upgrade to add more rooms.");
        navigate("/premium");
      } else {
        alert("Failed to publish listing. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  };

  // Get step labels
  const getStepLabel = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return "Basic Details";
      case 2:
        return "Location & Amenities";
      case 3:
        return "Photos & Video";
      default:
        return "";
    }
  };

  // Modern Loading View
     if (loading) return <MyLoader data={"Verifying Your Listing Limit... Please wait..."} />

  // Limit Check View
  if (canAddMoreRooms === false) {
    return (
      <div className="limit-reached-overlay fade-in">
        <div className="limit-card">
          <div className="limit-icon-wrapper">
            <Lock size={56} />
          </div>

          <h2>Listing Limit Reached!</h2>

          <div className="limit-info">
            <div className="limit-stat">
              <span className="stat-label">Current Listings</span>
              <span className="stat-value">{currentRoomCount}</span>
            </div>
            <div className="limit-divider">/</div>
            <div className="limit-stat">
              <span className="stat-label">Maximum Allowed</span>
              <span className="stat-value">{roomLimit}</span>
            </div>
          </div>

          <p className="limit-description">
            You've used all your available slots. Upgrade to Premium to add more
            listings and get exclusive benefits!
          </p>

          <div className="limit-benefits">
            <div className="benefit-item">
              <CheckCircle size={18} />
              <span>Add up to 40 listings</span>
            </div>
            <div className="benefit-item">
              <CheckCircle size={18} />
              <span>Top search results</span>
            </div>
            <div className="benefit-item">
              <CheckCircle size={18} />
              <span>Featured badge</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/premium")}
            className="upgrade-btn-main"
          >
            <Crown size={20} />
            Upgrade to Premium
            <ArrowRight size={20} />
          </button>

          <button
            onClick={() => navigate("/my-listings")}
            className="btn-secondary"
          >
            View My Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-room-wrapper fade-in">
      {/* Header Section */}
      <div className="add-room-header">
        <div className="header-content">
          <Home size={32} className="header-icon" />
          <div>
            <h1>Add New Listing</h1>
            <p className="header-subtitle">
              Fill in the details to publish your property
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="listing-progress">
          <span className="progress-text">
            {currentRoomCount} / {roomLimit} Listings
          </span>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${(currentRoomCount / roomLimit) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="stepper-wrapper">
        <div className="stepper">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className="step-container">
                <div
                  className={`step-item ${step >= s ? "active" : ""} ${step > s ? "completed" : ""}`}
                >
                  {step > s ? (
                    <CheckCircle size={24} />
                  ) : (
                    <span className="step-number">{s}</span>
                  )}
                </div>
                <span className="step-label">{getStepLabel(s)}</span>
              </div>
              {s < 3 && (
                <div className={`step-line ${step > s ? "completed" : ""}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form */}
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

        {/* Success Screen */}
        {step === 4 && (
          <div className="success-screen fade-in">
            <div className="success-icon-wrapper">
              <CheckCircle size={80} />
            </div>

            <h2 className="success-title">Listing Published Successfully!</h2>

            <p className="success-description">
              Your property is now live and visible to potential tenants. You'll
              start receiving inquiries soon!
            </p>

            <div className="success-stats">
              <div className="success-stat-item">
                <span className="stat-icon">📍</span>
                <span className="stat-text">Searchable Location</span>
              </div>
              <div className="success-stat-item">
                <span className="stat-icon">✅</span>
                <span className="stat-text">Under Review</span>
              </div>
              <div className="success-stat-item">
                <span className="stat-icon">🔔</span>
                <span className="stat-text">Notifications Active</span>
              </div>
            </div>

            <div className="success-actions">
              <button
                type="button"
                onClick={() => navigate("/my-listings")}
                className="btn-primary-success"
              >
                <Home size={20} />
                View My Listings
              </button>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-secondary-success"
              >
                Add Another Listing
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddRoom;

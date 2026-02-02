import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../api/Api";
import "../../css/room-detail.css";
import Reviews from "../../components/Reviews";
import CreateReport from "../../components/CreateReport";

function RoomDetailPage() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [roomOwner, setRoomOwner] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId") || null;
  const [reportType, setReportType] = useState("ROOM_OWNER");

  useEffect(() => {
    // 1. Fetch Room Details
    Api.get(`/rooms/roomDetails/${roomId}`)
      .then((res) => {
        const roomData = res.data;
        setRoom(roomData);
        // Set first image as the default main image
        if (roomData.imageUrls && roomData.imageUrls.length > 0) {
          setMainImage(roomData.imageUrls[0]);
        }
        setLoading(false);

        // 2. Fetch Owner Details (Backend path fix included)
        if (roomData.ownerEmail) {
          Api.get(`/users/roomOwner/${roomId}/${roomData.ownerEmail}`)
            .then((ownerRes) => setRoomOwner(ownerRes.data))
            .catch((err) => {
              console.error("Owner API error:", err);
              setRoomOwner(null);
            });
        }
      })
      .catch((err) => {
        console.error("Room API error:", err);
        setLoading(false);
      });
  }, [roomId]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="room-loader"></div>
        <p>Fetching property data... Please wait.</p>
      </div>
    );
  }
  const handleCallOwner = () => {
    Api.patch(`/rooms/${roomId}/increment-contact`)
      .then(() => console.log("Interest recorded"))
      .catch((err) => console.error("Error recording interest", err));
  };

  return (
    <div className="room-detail-container">
      {/* TOP SECTION: IMAGE GALLERY & MAIN INFO */}
      <div className="room-main-content">
        {/* LEFT SIDE: IMAGE GALLERY */}
        <div className="room-left-side">
          <div className="image-container">
            {/* Main Featured Image */}
            <div className="main-image-wrapper">
              <img
                src={mainImage || "https://via.placeholder.com/400"}
                alt="Selected View"
                className="main-room-img"
              />
            </div>
            {/* Scrollable Thumbnail Grid */}
            <div className="thumbnail-grid">
              {room.imageUrls?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i}`}
                  className={`thumbnail-img ${mainImage === img ? "active-thumb" : ""}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: PROPERTY DETAILS */}
        <div className="room-right-side">
          <div className="sticky-info">
            <h1 className="room-title">{room.title}</h1>
            <p className="room-location">
              📍 {room.city}, {room.pincode}
            </p>
            <h2 className="room-price-tag">
              ₹ {room.price} <span>/ month</span>
            </h2>

            <div className="info-grid">
              <div className="info-item">
                <strong>Type:</strong> {room.roomType}
              </div>
              <div className="info-item">
                <strong>Status:</strong>{" "}
                {room.isAvailable ? "✅ Available" : "❌ Booked"}
              </div>
              <div className="info-item">
                <strong>Area:</strong> {room.area} sqft
              </div>
              <div className="info-item">
                <strong>Preference:</strong>{" "}
                {room.availableFor || "Open to all"}
              </div>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <p>{room.description}</p>
            </div>

            <div className="amenities-section">
              <h3>Amenities</h3>
              <div className="amenities-list">
                {room.amenities?.map((a, i) => (
                  <span key={i} className="amenity-badge">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* OWNER CARD */}
            {roomOwner ? (
              <div className="owner-side-card">
                <div className="owner-header">
                  <div className="owner-avatar-small">
                    {roomOwner.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="owner-label">Property Owner</p>
                    <p className="owner-name">
                      {roomOwner.fullName || "Verified Owner"}
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${roomOwner.phone}`}
                  className="call-now-btn"
                  onClick={handleCallOwner}
                >
                  📞 Contact Owner
                </a>
              </div>
            ) : (
              <div className="owner-error-box">
                Owner information is currently being verified.
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* BOTTOM SECTION: REVIEWS & REPORT (SPLIT LAYOUT) */}
      <div className="room-bottom-split">
        {/* BOTTOM LEFT: REVIEWS */}
        <div className="bottom-left">
          <Reviews roomId={roomId} />
        </div>

        {/* BOTTOM RIGHT: REPORT BOX */}
        <div className="bottom-right">
          <div className="report-box">
            <h3>🚩 Report Property</h3>
            <p className="report-subtext">
              Is there something wrong with this listing? Please let us know.
            </p>

            <div className="report-controls">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="ROOM">Report Inaccurate Details</option>
                <option value="ROOM_OWNER">Report Suspicious Owner</option>
              </select>

              {reportType === "ROOM" ? (
                <CreateReport
                  reporterId={userId}
                  reportType="ROOM"
                  targetId={room.id}
                />
              ) : roomOwner ? (
                <CreateReport
                  reporterId={userId}
                  reportType="ROOM_OWNER"
                  targetId={roomOwner.id}
                />
              ) : (
                <p className="error-text">
                  Reporting unavailable: Owner details not verified.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetailPage;

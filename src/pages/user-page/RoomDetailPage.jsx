import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../api/Api";
import "../../CSS/room-detail.css";
import Reviews from "../../components/Reviews";
import CreateReport from "../../components/CreateReport";
import NotifiedWhenAvailable from "../../components/NotifiedWhenAvailable";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import MyLoader from "../../components/MyLoader";

function RoomDetailPage() {
  const { roomId } = useParams();
  const { isPremiumUser } = usePremiumStatus();
  const [room, setRoom] = useState(null);
  const [roomOwner, setRoomOwner] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState("ROOM_OWNER");
  const [imgLoaded, setImgLoaded] = useState(false);

  const userId = localStorage.getItem("userId") || null;
  const role = localStorage.getItem("role") || null;

  useEffect(() => {
    Api.get(`/rooms/roomDetails/${roomId}`)
      .then((res) => {
        const roomData = res.data;
        setRoom(roomData);
        if (roomData.imageUrls?.length > 0) setMainImage(roomData.imageUrls[0]);
        setLoading(false);

        if (roomData.ownerEmail) {
          Api.get(`/users/roomOwner/${roomId}/${roomData.ownerEmail}`)
            .then((ownerRes) => setRoomOwner(ownerRes.data))
            .catch((err) => { console.error("Owner API error:", err); setRoomOwner(null); });
        }
      })
      .catch((err) => { console.error("Room API error:", err); setLoading(false); });
  }, [roomId]);

  const handleCallOwner = () => {
    Api.patch(`/rooms/${roomId}/increment-contact`)
      .then(() => console.log("Interest recorded"))
      .catch((err) => console.error("Error recording interest", err));
  };

  const handleThumbClick = (img) => {
    setImgLoaded(false);
    setMainImage(img);
  };

  if (loading) return <MyLoader data={"Fetching property data... Please wait..."} />;

  return (
    <div className="rd-page">

      {/* ── HERO GALLERY ─────────────────────────────────── */}
      <div className="rd-gallery-bar">
        <div className="rd-gallery-inner">
          <div className={`rd-main-img-wrap ${imgLoaded ? "img-ready" : ""}`}>
            <img
              src={mainImage || "https://via.placeholder.com/800x500"}
              alt="Selected View"
              className="rd-main-img"
              onLoad={() => setImgLoaded(true)}
            />
            <div className="rd-img-overlay" />
            <div className="rd-img-badge">
              {room.isAvailable
                ? <span className="badge-available">✦ Available</span>
                : <span className="badge-booked">✦ Booked</span>}
            </div>
          </div>

          <div className="rd-thumb-strip">
            {room.imageUrls?.map((img, i) => (
              <button
                key={i}
                className={`rd-thumb ${mainImage === img ? "rd-thumb--active" : ""}`}
                onClick={() => handleThumbClick(img)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt={`View ${i + 1}`} />
                {mainImage === img && <div className="rd-thumb-shine" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <div className="rd-content-grid">

        {/* LEFT COLUMN */}
        <div className="rd-left">

          {/* Property Header */}
          <div className="rd-card rd-header-card">
            <div className="rd-header-top">
              <div>
                <h1 className="rd-title">{room.title}</h1>
                <p className="rd-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {room.city}, {room.pincode}
                </p>
              </div>
              <div className="rd-price-block">
                <span className="rd-price">₹{room.price?.toLocaleString()}</span>
                <span className="rd-price-unit">/month</span>
              </div>
            </div>

            <div className="rd-pills">
              <div className="rd-pill">
                <span className="rd-pill-label">Type</span>
                <span className="rd-pill-val">{room.roomType}</span>
              </div>
              <div className="rd-pill">
                <span className="rd-pill-label">Area</span>
                <span className="rd-pill-val">{room.area} sqft</span>
              </div>
              <div className="rd-pill">
                <span className="rd-pill-label">For</span>
                <span className="rd-pill-val">{room.availableFor || "Anyone"}</span>
              </div>
              <div className="rd-pill">
                <span className="rd-pill-label">Status</span>
                <span className={`rd-pill-val ${room.isAvailable ? "text-success" : "text-error"}`}>
                  {room.isAvailable ? "Available" : "Booked"}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="rd-card">
            <h2 className="rd-section-title">About this property</h2>
            <p className="rd-description">{room.description}</p>
          </div>

          {/* Amenities */}
          <div className="rd-card">
            <h2 className="rd-section-title">Amenities</h2>
            <div className="rd-amenities">
              {room.amenities?.map((a, i) => (
                <span key={i} className="rd-amenity">{a}</span>
              ))}
            </div>
          </div>

          {/* Notify when available */}
          {roomId && userId && !room.isAvailable && (
            <div className="rd-card">
              <NotifiedWhenAvailable userId={userId} roomId={roomId} />
            </div>
          )}

          {/* Reviews */}
          <div className="rd-card">
            <h2 className="rd-section-title">Reviews</h2>
            <Reviews roomId={roomId} />
          </div>
        </div>

        {/* RIGHT COLUMN — Sticky Panel */}
        <div className="rd-right">
          <div className="rd-sticky-panel">

            {/* Address */}
            <div className="rd-panel-section">
              <p className="rd-panel-label">Address</p>
              {isPremiumUser ? (
                <p className="rd-panel-address">{room.address}</p>
              ) : (
                <p className="rd-panel-address rd-address-blur">
                  {room.address.split(" ")[0]}…
                  <span className="rd-upgrade-chip">🔓 Upgrade to reveal</span>
                </p>
              )}
            </div>

            <div className="rd-panel-divider" />

            {/* Owner Section */}
            {!isPremiumUser ? (
              <div className="rd-locked-card">
                <div className="rd-lock-circle">🔒</div>
                <p className="rd-locked-title">Contact locked</p>
                <p className="rd-locked-desc">Upgrade to Premium to view owner details and get in touch directly.</p>
                <button className="rd-upgrade-btn">
                  <span>Upgrade to Premium</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            ) : (
              <div className="rd-owner-card">
                <p className="rd-panel-label">Property Owner</p>
                <div className="rd-owner-row">
                  <div className="rd-owner-avatar">
                    {roomOwner?.email?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="rd-owner-name">{roomOwner?.fullName || "Verified Owner"}</p>
                    <p className="rd-owner-email">{roomOwner?.email || ""}</p>
                  </div>
                </div>
                <a
                  href={`tel:${roomOwner?.phone}`}
                  className="rd-contact-btn"
                  onClick={handleCallOwner}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Contact Owner
                </a>
                <p className="rd-contact-note">Usually responds within 2 hours</p>
              </div>
            )}

            {/* Report Section */}
            {role !== "ROLE_ADMIN" && (
              <>
                <div className="rd-panel-divider" />
                <div className="rd-report-section">
                  <p className="rd-panel-label">🚩 Report this listing</p>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="rd-select"
                  >
                    <option value="ROOM">Inaccurate Details</option>
                    <option value="ROOM_OWNER">Suspicious Owner</option>
                  </select>

                  {reportType === "ROOM" ? (
                    <CreateReport reporterId={userId} reportType="ROOM" targetId={room.id} />
                  ) : roomOwner ? (
                    <CreateReport reporterId={userId} reportType="ROOM_OWNER" targetId={roomOwner.id} />
                  ) : (
                    <p className="rd-error-text">Reporting unavailable: Owner details not verified.</p>
                  )}
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default RoomDetailPage;
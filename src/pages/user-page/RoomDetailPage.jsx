import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../api/Api";
import "../../CSS/room-detail.css";
import Reviews from "../../components/Reviews";
import CreateReport from "../../components/CreateReport";
import NotifiedWhenAvailable from "../../components/NotifiedWhenAvailable";
import usePremiumStatus from "../../customHook/usePremiumStatus";
import MyLoader from "../../components/MyLoader";

function RoomDetailPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { isPremiumUser } = usePremiumStatus();

  const [room, setRoom] = useState(null);
  const [roomOwner, setRoomOwner] = useState({});
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [reportType, setReportType] = useState("ROOM_OWNER");
  const [isActionLoading, setIsActionLoading] = useState(false); // To prevent multiple clicks

  const [activeMedia, setActiveMedia] = useState({ type: "image", url: "" });

  const userId = localStorage.getItem("userId") || null;
  const role = localStorage.getItem("role") || null;

  const targetId = reportType === "ROOM_OWNER" ? roomOwner?.id : roomId;

  useEffect(() => {
    Api.get(`/rooms/roomDetails/${roomId}`)
      .then((res) => {
        const roomData = res.data;
        setRoom(roomData);
        console.log("Room Data Loaded:", roomData); // Debugging ke liye

        if (roomData.imageUrls?.length > 0) {
          setActiveMedia({ type: "image", url: roomData.imageUrls[0] });
        }

        if (roomData.ownerEmail) {
          Api.get(`/users/roomOwner/${roomId}/${roomData.ownerEmail}`)
            .then((ownerRes) => setRoomOwner(ownerRes.data))
            .catch((err) => {
              console.error("Owner API error:", err);
              setRoomOwner(null);
            });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Room API error:", err);
        setLoading(false);
      });
  }, [roomId]);

  // Unified function to record interest and handle action
  const handleContactAction = (type) => {
    if (isActionLoading) return;
    setIsActionLoading(true);

    Api.patch(`/rooms/${roomId}/increment-contact`)
      .then(() => {
        console.log(`Interest recorded for ${type}`);
        setIsActionLoading(false);
      })
      .catch((err) => {
        console.error("Error recording interest", err);
        setIsActionLoading(false);
      });
  };

  const handleImageClick = (img) => {
    setImgLoaded(false);
    setActiveMedia({ type: "image", url: img });
  };

  const handleVideoClick = () => {
    setImgLoaded(true);
    setActiveMedia({ type: "video", url: room.videoUrl });
  };

  if (loading)
    return <MyLoader data={"Fetching property data... Please wait..."} />;

  // Get the best available number
  const finalContact = room?.contactNumber || roomOwner?.contactNumber;

  return (
    <div className="rd-page">
      {/* ───── GALLERY ───── */}
      <div className="rd-gallery-bar">
        <div className="rd-gallery-inner">
          <div className={`rd-main-img-wrap ${imgLoaded ? "img-ready" : ""}`}>
            {activeMedia.type === "video" ? (
              <video
                className="rd-main-img"
                controls
                autoPlay
                key={activeMedia.url}
              >
                <source src={activeMedia.url} type="video/mp4" />
              </video>
            ) : (
              <img
                src={activeMedia.url || "https://via.placeholder.com/800x500"}
                alt="Selected View"
                className="rd-main-img"
                onLoad={() => setImgLoaded(true)}
              />
            )}
            <div className="rd-img-overlay" />
            <div className="rd-img-badge">
              {room.isAvailable ? (
                <span className="badge-available">✦ Available</span>
              ) : (
                <span className="badge-booked">✦ Booked</span>
              )}
            </div>
          </div>

          <div className="rd-thumb-strip">
            {room.imageUrls?.map((img, i) => (
              <button
                key={i}
                className={`rd-thumb ${
                  activeMedia.url === img && activeMedia.type === "image"
                    ? "rd-thumb--active"
                    : ""
                }`}
                onClick={() => handleImageClick(img)}
              >
                <img src={img} alt={`View ${i + 1}`} />
              </button>
            ))}

            {room.videoUrl && (
              <button
                className={`rd-thumb ${activeMedia.type === "video" ? "rd-thumb--active" : ""}`}
                onClick={handleVideoClick}
              >
                <video src={room.videoUrl} muted preload="metadata" />
                <span className="rd-thumb-play">▶</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ───── CONTENT ───── */}
      <div className="rd-content-grid">
        <div className="rd-left">
          <div className="rd-card rd-header-card">
            <h1 className="rd-title">{room.title}</h1>
            <p className="rd-location">
              📍 {room.city}, {room.pincode}
            </p>
            <div className="rd-price-block">
              ₹{room.price?.toLocaleString()}{" "}
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "var(--text-tertiary)",
                }}
              >
                /month
              </span>
            </div>
          </div>

          <div className="rd-card">
            <h2>About this property</h2>
            <p
              style={{
                fontSize: "0.925rem",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
              }}
            >
              {room.description}
            </p>
          </div>

          <div className="rd-card">
            <h2>Amenities</h2>
            <div className="rd-amenities">
              {room.amenities?.map((a, i) => (
                <span key={i} className="rd-amenity">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {roomId && userId && !room.isAvailable && (
            <div className="rd-card">
              <NotifiedWhenAvailable userId={userId} roomId={roomId} />
            </div>
          )}

          <div className="rd-card">
            <h2>Reviews</h2>
            <Reviews roomId={roomId} />
          </div>
        </div>

        <div className="rd-right">
          <div className="rd-sticky-panel">
            <div className="rd-panel-section">
              <p className="rd-panel-label">Address</p>
              {isPremiumUser ? (
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.55,
                  }}
                >
                  {room.address}
                </p>
              ) : (
                <p className="rd-address-blur">
                  {room.address?.split(" ")[0]}…
                  <span
                    className="rd-upgrade-chip"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/premium")}
                  >
                    🔓 Upgrade to reveal
                  </span>
                </p>
              )}
            </div>

            <div className="rd-panel-divider" />

            {!isPremiumUser ? (
              <div className="rd-locked-card">
                <div className="rd-lock-circle">🔒</div>
                <p className="rd-locked-title">Contact locked</p>
                <p className="rd-locked-desc">
                  Upgrade to Premium to view owner details and get in touch
                  directly.
                </p>
                <button
                  className="rd-upgrade-btn"
                  onClick={() => navigate("/premium")}
                >
                  ⚡ Upgrade to Premium
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
                    <p className="rd-owner-name">
                      {roomOwner?.fullName || "Verified Owner"}
                    </p>
                    <p className="rd-owner-email">{roomOwner?.email || ""}</p>
                  </div>
                </div>

                <div className="rd-owner-meta">
                  <span className="rd-owner-badge">✔ Verified Owner</span>
                </div>

                {/* --- ACTIONS SECTION --- */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  {/* CALL BUTTON */}
                  <a
                    href={finalContact ? `tel:+91${finalContact}` : "#"}
                    className="rd-contact-btn"
                    onClick={() => handleContactAction("Call")}
                    style={{ textDecoration: "none", textAlign: "center" }}
                  >
                    📞 Call Owner
                  </a>

                  {/* WHATSAPP BUTTON */}
                  <a
                    href={
                      finalContact
                        ? `https://wa.me/91${finalContact}?text=Hi, I am interested in your property: ${room?.title}`
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rd-contact-btn"
                    onClick={() => handleContactAction("WhatsApp")}
                    style={{
                      textDecoration: "none",
                      textAlign: "center",
                      backgroundColor: "#25D366",
                      borderColor: "#25D366",
                    }}
                  >
                    💬 WhatsApp
                  </a>
                </div>

                <p className="rd-contact-note">
                  Usually responds within 2 hours
                </p>
              </div>
            )}

            {role !== "ROLE_ADMIN" && (
              <>
                <div className="rd-panel-divider" />
                <div className="rd-report-section">
                  <p className="rd-panel-label">🚩 Report this listing</p>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <option value="ROOM">Inaccurate Details</option>
                    <option value="ROOM_OWNER">Suspicious Owner</option>
                  </select>
                  <CreateReport
                    reporterId={userId}
                    reportType={reportType}
                    targetId={targetId}
                  />
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

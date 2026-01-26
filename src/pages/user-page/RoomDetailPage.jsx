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
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId") || null;
  const [reportType, setReportType] = useState("ROOM_OWNER");

  useEffect(() => {
    Api.get(`/rooms/roomDetails/${roomId}`)
      .then(res => {
        setRoom(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    Api.get(`/users/roomOwner/${roomId}/${localStorage.getItem("email")}`)
      .then(res => {
        setRoomOwner(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [roomId]);

  if (loading) return <div className="room-loading">Loading...</div>;
  if (!room) return <div className="room-error">Room not found</div>;

  return (
    <div className="room-detail-container">

      <div className="room-images">
        {room.imageUrls.map((img, i) => (
          <img key={i} src={img} alt="room" />
        ))}
      </div>

      <div className="room-info">
        <h1>{room.title}</h1>
        <p className="room-city">{room.city}, {room.pincode}</p>

        <h2>₹ {room.price}</h2>

        <p>{room.description}</p>

        <div className="room-meta">
          <span>Type: {room.roomType}</span>
          <span>Available: {room.available ? "Yes" : "No"}</span>
          <span>Contact: {room.contactNumber}</span>
        </div>

        <h3>Amenities</h3>
        <ul className="amenities">
          {room.amenities.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </div>
      {/* OWNER INFO */}
      {roomOwner && (
        <div className="owner-card">
          <h3>Property Owner</h3>

          <div className="owner-info">
            <div className="owner-avatar">
              {roomOwner.email?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="owner-email">{roomOwner.email}</p>
              <a href={`tel:${roomOwner.phone}`} className="call-btn">
                📞 Call Owner: {roomOwner.phone}
              </a>

            </div>
          </div>
        </div>
      )}

      <Reviews roomId={roomId} />
      <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
        <option value="ROOM">Report Room</option>
        <option value="ROOM_OWNER">Report Room Owner</option>
      </select>

      {reportType === "ROOM" && (
        <CreateReport reporterId={userId} reportType="ROOM" targetId={room.id} />
      )}
      {reportType === "ROOM_OWNER" && (
        <CreateReport reporterId={userId} reportType="ROOM_OWNER" targetId={roomOwner.id} />
      )}

    </div>
  );
}

export default RoomDetailPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../api/Api";
import "../../css/room-detail.css";
import Reviews from "../../components/Reviews";

function RoomDetailPage() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

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
       <Reviews roomId={roomId} />
    </div>
  );
}

export default RoomDetailPage;

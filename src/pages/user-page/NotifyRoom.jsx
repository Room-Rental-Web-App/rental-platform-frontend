import React, { useEffect, useState } from 'react';
import Api from '../../api/Api';
import "../../css/notifyRoom.css"
import { useNavigate } from 'react-router-dom';

function NotifyRoom() {
  const userId = localStorage.getItem("userId");
  const [notifyRooms, setNotifyRooms] = useState([]);
  const navTo = useNavigate();

  useEffect(() => {
    Api.get(`/room_availability/find_by_userId/${userId}`)
      .then(res => {
        setNotifyRooms(res.data);
        console.log(res.data)
      })
      .catch(err => {
        console.error(err);
      });
  }, [userId]);

  function updatenotify(notifyId, status) {
    const confirmAction = window.confirm(status ? "Do you want to enable notification?" : "Do you want to cancel notification?");

    if (!confirmAction) return;
    Api.put(`/room_availability/updateNotify?notifyId=${notifyId}&status=${status}`)
      .then(res => {
        const updated = res.data;
        setNotifyRooms(prev => prev.map(nr => nr.id === updated.id ? { ...nr, notified: updated.notified } : nr));
      })
      .catch(err => {
        console.error(err);
      });
  }

function deleteRequest(notifyId) {
  const confirmDelete = window.confirm("Are you sure you want to remove this notification?");

  if (!confirmDelete) return;

  Api.delete(`/room_availability?notifyId=${notifyId}`)
    .then(() => {
      setNotifyRooms(prev =>
        prev.filter(nr => nr.id !== notifyId)
      );
      alert("Notify room successfully removed");
    })
    .catch(err => {
      console.error(err);
      alert("Failed to remove notification");
    });
}



  if (notifyRooms.length === 0) {
    return <p>No notified rooms found</p>;           
  }

  return (
    <div className="notify-container">
      {notifyRooms.map(nr => (
        <div className="notifyRoom" key={nr.id} >
            <button onClick={()=>deleteRequest(nr.id)}>Remove</button>
          {nr.room?.imageUrls?.[0] && (
            <img src={nr.room.imageUrls[0]} alt="room"  onClick={() => navTo(`/room/${nr.room.id}`)}/>
          )}

          <div className="notifyRoom-content">
            <div>
              <p><strong>{nr.room?.title}</strong></p>
              <p>₹{nr.room?.price}</p>
              <p className={`notify-status ${nr.room?.isAvailable ? "available" : "not-available"}`}>
                {nr.room?.isAvailable ? "Available" : "Not Available"}
              </p>
            </div>

            {nr.room?.isAvailable ? (
              <button className="book-btn"  onClick={() => navTo(`/room/${nr.room.id}`)}>
                Contact Owner
              </button>
            ) : (
              <button
                className={nr.notified ? "notify-off" : "notify-on"}
                onClick={() => updatenotify(nr.id, !nr.notified)}
              >
                {nr.notified ? "Cancel Notify" : "Notify Me"}
              </button>
            )}



          </div>

        </div>
      ))}
    </div>

  );
}

export default NotifyRoom;

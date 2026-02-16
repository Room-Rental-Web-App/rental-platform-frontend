import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import { API_ENDPOINTS } from "../../api/apiConfig";
import { AlertTriangle, CheckCircle, Phone, Mail, Home } from "lucide-react";
import "../../CSS/HighInterestRooms.css";
import MyLoader from "../../components/MyLoader";

const HighInterestRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const adminEmail = localStorage.getItem("email");

  useEffect(() => {
    fetchHighInterestRooms();
  }, []);

  const fetchHighInterestRooms = async () => {
    try {
      const res = await Api.get(API_ENDPOINTS.ADMIN_HIGH_INTEREST);
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching high interest rooms", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsBooked = async (roomId) => {
    if (
      !window.confirm(
        "Bhai, kya aapne owner se confirm kar liya hai ki ye room book ho gaya hai?",
      )
    )
      return;

    try {
      // Admin email bhej rahe hain audit log ke liye
      await Api.patch(
        `${API_ENDPOINTS.ADMIN_MARK_BOOKED(roomId)}?adminEmail=${adminEmail}`,
      );
      alert("Room successfully marked as BOOKED!");
      fetchHighInterestRooms(); // List refresh karne ke liye
    } catch (err) {
       console.log(err)
      alert("Error updating status. Please try again.");
    }
  };


  if (loading) return <MyLoader data={"Loading Highest Interested Rooms... Please wait..."} />

  return (
    <div className="admin-container">
      <div className="admin-header-box">
        <h2>
          <AlertTriangle color="#ef4444" /> High Interest Listings
        </h2>
        <p>
          Ye wo rooms hain jinhe 5+ logo ne contact kiya hai. Inka status check
          karein.
        </p>
      </div>

      {rooms.length === 0 ? (
        <div className="no-data">
          Bhai, abhi koi flagged room nahi hai. Sab set hai! ✅
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Room Details</th>
              <th>Interest Level</th>
              <th>Owner Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="flagged-row">
                <td>
                  <div className="room-cell">
                    <strong>{room.title}</strong>
                    <span>
                      {room.city}, {room.pincode}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="view-count-badge">
                    {room.contactViewCount} Premium Views
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <p>
                      <Mail size={14} /> {room.ownerEmail}
                    </p>
                    <p>
                      <Phone size={14} /> {room.contactNumber}
                    </p>
                  </div>
                </td>
                <td>
                  <button
                    className="btn-mark-booked"
                    onClick={() => handleMarkAsBooked(room.id)}
                  >
                    <CheckCircle size={16} /> Mark as Booked
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HighInterestRooms;

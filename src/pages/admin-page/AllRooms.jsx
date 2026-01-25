import { Home, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useRoomSearch from "../../customHook/useRoomSearch";
import RoomFilterBar from "../../components/RoomFilterBar";
import Api from "../../api/Api";
import "../../css/adminRoom.css";

export default function AdminAllRooms() {
  const navigate = useNavigate();

  const {
    rooms,
    draftFilters,
    setDraftFilters,
    applyFilters,
    loading,
  } = useRoomSearch({ mode: "ADMIN" });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setDraftFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm("Delete this room permanently?")) return;

    try {
      await Api.delete(`/admin/rooms/${roomId}`);
      alert("Room deleted successfully");
      applyFilters(); // reload list
    } catch (err) {
      console.error(err);
      alert("Failed to delete room");
    }
  };

  return (
    <div className="admin-layout">
      <div className="admin-main-content">
        <h2 className="admin-title">
          <Home size={20} /> All Rooms
        </h2>

        {/* Admin Filters */}
        <RoomFilterBar
          filters={draftFilters}
          onChange={handleFilterChange}
          onApply={applyFilters}
          isPremiumUser={false} // admin doesn’t need this
        />

        {loading ? (
          <div className="admin-loader">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="admin-rooms-grid">
            {rooms.length === 0 && <p>No rooms found</p>}

            {rooms.map((room) => (
              <div key={room.id} className="admin-room-card">
                <img
                  src={room.imageUrls?.[0] || "/placeholder.jpg"}
                  alt="room"
                  onClick={() => navigate(`/room/${room.id}`)}
                />

                <div className="details">
                  <h4>{room.title}</h4>
                  <p>City: {room.city}</p>
                  <p>Owner: {room.ownerEmail}</p>

                  <span className={`status ${room.isApprovedByAdmin ? "approved" : "pending"}`}>
                    {room.isApprovedByAdmin ? "Approved" : "Pending"}
                  </span>
                </div>

                <button
                  className="del-btn"
                  onClick={() => handleDelete(room.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

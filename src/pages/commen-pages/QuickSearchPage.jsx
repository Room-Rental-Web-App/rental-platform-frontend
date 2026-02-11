import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuickSearchInput from "../../components/QuickSearchInput";
import RoomGrid from "../../components/RoomGrid";
import Api from "../../api/Api";

function QuickSearchPage() {
  const { searchInput } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  function loadRoomByQuickSearch() {
    setLoading(true);

    Api.get("/rooms/filter", {
      params: {
        search: searchInput || null,
        page: null,
        size: 15,
      },
    })
      .then((res) => {
        setRooms(res.data.content || []);
      })
      .catch((err) => {
        console.error("Quick search failed", err);
        setRooms([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadRoomByQuickSearch();
  }, [searchInput]);

  return (
    <div>
      <QuickSearchInput />

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", fontWeight: 600 }}>
          Loading rooms...
        </div>
      ) : (
        <RoomGrid rooms={rooms} />
      )}
    </div>
  );
}

export default QuickSearchPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import QuickSearchInput from "../../components/QuickSearchInput";
import RoomGrid from "../../components/RoomGrid";
import Api from "../../api/Api";
import MyLoader from "../../components/MyLoader";

function QuickSearchPage() {
  const { searchInput } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  function loadRoomByQuickSearch() {
    setLoading(true);

    Api.get("/rooms/filter", {
      params: {
        search: searchInput || null,
        approved:true,
        page: null,
        size: 15,
      },
    })
      .then((res) => {
        setRooms(res.data.content || []);
        console.log(res)
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
      {/* <QuickSearchInput /> */}

      {loading ? (
        <MyLoader data={"Quick searching... Please wait..."} />
      ) : (
        <RoomGrid rooms={rooms} />
      )}
    </div>
  );
}

export default QuickSearchPage;

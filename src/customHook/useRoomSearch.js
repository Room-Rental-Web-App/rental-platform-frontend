import { useEffect, useState } from "react";
import Api from "../api/Api";
import { useLocation } from "react-router-dom";

export default function useRoomSearch({ mode = "PUBLIC", approved = true } = {}) {
    const [rooms, setRooms] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [userLocation, setUserLocation] = useState(null);


    const [draftFilters, setDraftFilters] = useState({
        city: "",
        pincode: "",
        roomType: "",
        minPrice: "",
        maxPrice: "",
        radiusKm: null,
    });

    const [appliedFilters, setAppliedFilters] = useState(draftFilters);
const loadRooms = async (pageNo, append) => {
    if (initialLoading || loadingMore) return;

    if (append) {
        setLoadingMore(true);
    } else {
        setInitialLoading(true);
    }

    try {
        const res = await Api.get("/rooms/filter", {
            params: {
                approved,
                city: appliedFilters.city || null,
                pincode: appliedFilters.pincode || null,
                roomType: appliedFilters.roomType || null,
                minPrice: appliedFilters.minPrice || null,
                maxPrice: appliedFilters.maxPrice || null,
                radiusKm: mode === "PUBLIC" ? appliedFilters.radiusKm : null,
                userLat: mode === "PUBLIC" ? userLocation?.lat : null,
                userLng: mode === "PUBLIC" ? userLocation?.lng : null,
                page: pageNo,
                size: 12,
            },
        });

        setRooms(prev =>
            append ? [...prev, ...res.data.content] : res.data.content
        );

        setHasMore(!res.data.last);
        setPage(pageNo);
    } finally {
        setInitialLoading(false);
        setLoadingMore(false);
    }
};

    const applyFilters = (filters) => {
        setRooms([]);
        setPage(0);
        setHasMore(true);
        setAppliedFilters({ ...filters });
    };

    useEffect(() => {
        loadRooms(0, false);
    }, [appliedFilters, userLocation]);

return {
    rooms,
    draftFilters,
    setDraftFilters,
    applyFilters,
    loadRooms,
    hasMore,
    initialLoading,
    loadingMore,
    page,
    setLocation: (lat, lng) => setUserLocation({ lat, lng })
};
}

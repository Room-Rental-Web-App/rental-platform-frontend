import { useEffect, useState } from "react";
import Api from "../api/Api";

export default function useRoomSearch() {
    const [rooms, setRooms] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState(null);

    // what user is typing
    const [draftFilters, setDraftFilters] = useState({
        city: "",
        pincode: "",
        roomType: "",
        minPrice: "",
        maxPrice: "",
        radiusKm: 2,
    });

    // what API actually uses
    const [appliedFilters, setAppliedFilters] = useState({
        city: "",
        pincode: "",
        roomType: "",
        minPrice: "",
        maxPrice: "",
        radiusKm: 2,
    });

    const loadRooms = async (pageNo, append) => {
        if (loading) return;

        setLoading(true);
        try {
            const res = await Api.get("/rooms/filter", {
                params: {
                    city: appliedFilters.city || null,
                    pincode: appliedFilters.pincode || null,
                    roomType: appliedFilters.roomType || null,
                    minPrice: appliedFilters.minPrice || null,
                    maxPrice: appliedFilters.maxPrice || null,
                    radiusKm: appliedFilters.radiusKm || null,
                    page: pageNo,
                    size: 15,
                    userLat: userLocation?.lat,
                    userLng: userLocation?.lng,
                },
            });

            setRooms(prev =>
                append ? [...prev, ...res.data.content] : res.data.content
            );
            setHasMore(!res.data.last);
            setPage(pageNo);
        } finally {
            setLoading(false);
        }
    };

    // 🔑 Apply button logic (NO race condition)
    const applyFilters = () => {
        setRooms([]);
        setPage(0);
        setHasMore(true);
        setAppliedFilters({ ...draftFilters });
    };

    // 🔥 react to appliedFilters change
    useEffect(() => {
        loadRooms(0, false);
    }, [appliedFilters, userLocation]);

    const setLocation = (lat, lng) => {
        setUserLocation({ lat, lng });
    };

    return {
        rooms,
        draftFilters,
        setDraftFilters,
        applyFilters,
        loadRooms,
        hasMore,
        loading,
        page,
        setLocation,
    };
}

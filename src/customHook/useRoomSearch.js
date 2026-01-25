import { useEffect, useState } from "react";
import Api from "../api/Api";

export default function useRoomSearch({ mode = "PUBLIC" } = {}) {
    const [rooms, setRooms] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
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

    const endpoint = "/rooms/filter";

    const loadRooms = async (pageNo, append) => {


        if (loading) return;

        setLoading(true);
        try {
            const res = await Api.get(endpoint, {
                params: {
                    city: appliedFilters.city || null,
                    pincode: appliedFilters.pincode || null,
                    roomType: appliedFilters.roomType || null,
                    minPrice: appliedFilters.minPrice || null,
                    maxPrice: appliedFilters.maxPrice || null,

                    radiusKm: mode === "PUBLIC" ? appliedFilters.radiusKm : null,
                    userLat: mode === "PUBLIC" ? userLocation?.lat : null,
                    userLng: mode === "PUBLIC" ? userLocation?.lng : null,

                    page: pageNo,
                    size: 15,
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

    const applyFilters = () => {
        setRooms([]);
        setPage(0);
        setHasMore(true);
        setAppliedFilters({ ...draftFilters });
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
        loading,
        page,
        setLocation: (lat, lng) => setUserLocation({ lat, lng })
    };
}

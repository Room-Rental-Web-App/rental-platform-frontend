import { useEffect, useState, useRef } from "react";
import Api from "../api/Api";

export default function useRoomSearch({
  mode = "PUBLIC",
  approved = true,
} = {}) {
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

  // ✅ Fix 1: Ref use karo taaki loadRooms ko hamesha latest values milein
  const appliedFiltersRef = useRef(appliedFilters);
  const userLocationRef = useRef(userLocation);

  useEffect(() => {
    appliedFiltersRef.current = appliedFilters;
  }, [appliedFilters]);

  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);

  const loadRooms = async (pageNo, append) => {
    if (initialLoading || loadingMore) return;

    if (append) {
      setLoadingMore(true);
    } else {
      setInitialLoading(true);
    }

    // ✅ Fix 1: Ref se latest values lo — closure problem khatam
    const filters = appliedFiltersRef.current;
    const location = userLocationRef.current;

    try {
      const res = await Api.get("/rooms/filter", {
        params: {
          approved,
          city: filters.city || null,
          pincode: filters.pincode || null,
          roomType: filters.roomType || null,
          minPrice: filters.minPrice || null,
          maxPrice: filters.maxPrice || null,
          radiusKm: mode === "PUBLIC" ? filters.radiusKm || null : null,
          userLat: mode === "PUBLIC" ? location?.lat || null : null,
          userLng: mode === "PUBLIC" ? location?.lng || null : null,
          page: pageNo,
          size: 12,
        },
      });

      console.log("API Params →", {
        city: filters.city,
        pincode: filters.pincode,
        userLat: location?.lat,
        userLng: location?.lng,
        radiusKm: filters.radiusKm,
      });

      setRooms((prev) =>
        append ? [...prev, ...res.data.content] : res.data.content,
      );

      setHasMore(!res.data.last);
      setPage(pageNo);
    } catch (err) {
      console.error("Room fetch error:", err);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  // ✅ Fix 2: applyFilters mein userLocation bhi update karo agar diya ho
  const applyFilters = (filters, location = null) => {
    setRooms([]);
    setPage(0);
    setHasMore(true);

    const newFilters = { ...draftFilters, ...filters };
    appliedFiltersRef.current = newFilters;
    setAppliedFilters(newFilters);

    // Agar location diya hai toh update karo
   if (location) {
     userLocationRef.current = location;
     setUserLocation(location);
   } else {
     userLocationRef.current = null; // ✅ Ye line missing thi!
     setUserLocation(null); // ✅ Ye bhi
   }
  };

  // Jab bhi appliedFilters ya userLocation change ho — rooms reload karo
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
    loading: initialLoading || loadingMore,
    initialLoading,
    loadingMore,
    page,
    setLocation: (lat, lng) => {
      const loc = { lat, lng };
      userLocationRef.current = loc;
      setUserLocation(loc);
    },
  };
}

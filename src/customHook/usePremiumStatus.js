import { useEffect, useState, useCallback } from "react";
import Api from "../api/Api";

export default function usePremiumStatus() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const [status, setStatus] = useState({
    isPremiumUser: false,
    planCode: "FREE",
    endDate: null,
    roomLimit: 2, // New: Matches Backend
    currentRoomCount: 0, // New: Matches Backend
    canAddMoreRooms: true, // Default true until API says otherwise
  });

  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const checkStatus = useCallback(() => {
    if (!email || !role) {
      setLoading(false);
      return;
    }

    // Calling the "Detailed" API we built in Java
    Api.get("/subscription/check", { params: { email, role } })
      .then((res) => {
        const data = res.data;
        setStatus({
          isPremiumUser: data.isPremium,
          planCode: data.planCode,
          endDate: data.endDate,
          roomLimit: data.roomLimit,
          currentRoomCount: data.currentRooms, // Check: matches Java response key
          canAddMoreRooms: data.canAddRoom, // Check: matches Java response key
        });
      })
      .catch((err) => {
        console.error("Error fetching subscription status:", err);
        // Defaulting to safe values on error
        setStatus((prev) => ({ ...prev, canAddMoreRooms: false }));
      })
      .finally(() => setLoading(false));
  }, [email, role]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus, refreshTrigger]);

  const refresh = () => setRefreshTrigger((prev) => prev + 1);

  return { ...status, loading, refresh };
}

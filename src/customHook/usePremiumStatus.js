import { useEffect, useState, useCallback } from "react";
import Api from "../api/Api";

export default function usePremiumStatus() {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const isAdmin = role === "ROLE_ADMIN";

  const [status, setStatus] = useState({
    isPremiumUser: false,
    planCode: "FREE",
    endDate: null,
    roomLimit: 2,
    currentRoomCount: 0,
    canAddMoreRooms: true,
  });

  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const checkStatus = useCallback(() => {
    // ✅ ADMIN: skip API completely
    if (isAdmin) {
      setStatus({
        isPremiumUser: true,
        planCode: "ADMIN",
        endDate: null,
        roomLimit: Infinity,
        currentRoomCount: 0,
        canAddMoreRooms: true,
      });
      setLoading(false);
      return;
    }

    if (!email || !role) {
      setLoading(false);
      return;
    }

    Api.get("/subscription/check", { params: { email, role } })
      .then((res) => {
        const data = res.data;
        setStatus({
          isPremiumUser: data.isPremium,
          planCode: data.planCode,
          endDate: data.endDate,
          roomLimit: data.roomLimit,
          currentRoomCount: data.currentRooms,
          canAddMoreRooms: data.canAddRoom,
        });
      })
      .catch((err) => {
        console.error("Error fetching subscription status:", err);
        setStatus((prev) => ({ ...prev, canAddMoreRooms: false }));
      })
      .finally(() => setLoading(false));
  }, [email, role, isAdmin]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus, refreshTrigger]);

  const refresh = () => setRefreshTrigger((prev) => prev + 1);

  return { ...status, loading, refresh };
}

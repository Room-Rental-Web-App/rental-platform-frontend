import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import {
  Users,
  Building2,
  UserCheck,
  Clock,
  Home,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import MyLoader from "../../components/MyLoader";

import "../../css/adminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    owners: 0,
    rooms: 0,
    pendingOwners: 0,
    pendingRooms: 0,
    pendingUsers: 0,
    roomCities: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDashboardStats = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const headers = { headers: getAuthHeaders() };

      const responses = await Promise.allSettled([
        axios.get(API_ENDPOINTS.ADMIN_ALL_USERS, headers),
        axios.get(API_ENDPOINTS.ADMIN_ALL_OWNERS, headers),
        axios.get(API_ENDPOINTS.ADMIN_ALL_ROOMS, headers),
        axios.get(API_ENDPOINTS.ADMIN_PENDING_OWNERS, headers),
        axios.get(API_ENDPOINTS.ADMIN_PENDING_ROOMS, headers),
        axios.get(API_ENDPOINTS.ADMIN_PENDING_USERS, headers),
        axios.get(API_ENDPOINTS.CITIES_COVERED, headers),
      ]);

      const getCount = (res) =>
        res.status === "fulfilled" ? res.value.data.length : 0;

      setStats({
        users: getCount(responses[0]),
        owners: getCount(responses[1]),
        rooms: getCount(responses[2]),
        pendingOwners: getCount(responses[3]),
        pendingRooms: getCount(responses[4]),
        pendingUsers: getCount(responses[5]),
        roomCities: getCount(responses[6]),
      });

    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  if (loading) return <MyLoader data="Loading Dashboard Details..." />;

  if (error) {
    return (
      <div className="dashboard-error">
        Failed to load dashboard.
        <button className="btn btn-outline btn-sm" onClick={fetchDashboardStats}>Retry</button>
      </div>
    );
  }

  const cards = [
    { label: "Total Users", value: stats.users, icon: Users },
    { label: "Total Owners", value: stats.owners, icon: UserCheck },
    { label: "Total Rooms", value: stats.rooms, icon: Home },
    { label: "Pending Owners", value: stats.pendingOwners, icon: Clock, pending: true },
    { label: "Pending Rooms", value: stats.pendingRooms, icon: Building2, pending: true },
    { label: "Pending Users", value: stats.pendingUsers, icon: AlertCircle, pending: true },
    { label: "Cities Covered", value: stats.roomCities, icon: Building2 },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Overview</h2>
        <button
  className="btn btn-ghost btn-sm"
  onClick={fetchDashboardStats}
>
  <RefreshCw size={16} />
</button>

      </div>

      <div className="dashboard-grid">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`dash-card ${card.pending ? "pending" : ""}`}
            >
              <div className="card-top">
                <Icon size={24} />
                <span>{card.label}</span>
              </div>
              <div className="card-value">{card.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;

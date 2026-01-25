import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import {
  Users,
  Building2,
  UserCheck,
  Clock,
  Home,
  AlertCircle
} from "lucide-react";
import RevenueReport from "./RevenueReport"

import "../../css/adminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    owners: 0,
    rooms: 0,
    pendingOwners: 0,
    pendingRooms: 0,
    pendingUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const headers = { headers: getAuthHeaders() };

      const [
        usersRes,
        ownersRes,
        roomsRes,
        pendingOwnersRes,
        pendingRoomsRes,
        pendingUsersRes,
      ] = await Promise.all([
        axios.get(API_ENDPOINTS.ADMIN_ALL_USERS, headers),
        axios.get(API_ENDPOINTS.ADMIN_ALL_OWNERS, headers),
        axios.get(API_ENDPOINTS.ADMIN_ALL_ROOMS, headers),
        axios.get(API_ENDPOINTS.ADMIN_PENDING_OWNERS, headers),
        axios.get(API_ENDPOINTS.ADMIN_PENDING_ROOMS, headers),
        axios.get("/admin/pending-users", headers),
      ]);

      setStats({
        users: usersRes.data.length,
        owners: ownersRes.data.length,
        rooms: roomsRes.data.length,
        pendingOwners: pendingOwnersRes.data.length,
        pendingRooms: pendingRoomsRes.data.length,
        pendingUsers: pendingUsersRes.data.length,
      });

      setLoading(false);
    } catch (error) {
      console.error("Dashboard data error:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Overview</h2>

      <div className="dashboard-grid">
        <div className="dash-card">
          <Users size={26} />
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="dash-card">
          <UserCheck size={26} />
          <h3>Total Owners</h3>
          <p>{stats.owners}</p>
        </div>

        <div className="dash-card">
          <Home size={26} />
          <h3>Total Rooms</h3>
          <p>{stats.rooms}</p>
        </div>

        <div className="dash-card pending">
          <Clock size={26} />
          <h3>Pending Owners</h3>
          <p>{stats.pendingOwners}</p>
        </div>

        <div className="dash-card pending">
          <Building2 size={26} />
          <h3>Pending Rooms</h3>
          <p>{stats.pendingRooms}</p>
        </div>

        <div className="dash-card pending">
          <AlertCircle size={26} />
          <h3>Pending Users</h3>
          <p>{stats.pendingUsers}</p>
        </div>
      </div>

      <div className="dashboard-note">
        All numbers are fetched live from your backend system.
      </div>
      <RevenueReport />
    </div>
  );
};

export default AdminDashboard;

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
import Api from "../../api/Api";

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

  useEffect(() => {
    fetchDashboardStats();
  }, []);

 const fetchDashboardStats = async () => {
  setLoading(true);
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
  } finally {
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

        <div className="dash-card">
          <Building2 size={26} />
          <h3>Cities Covered</h3>
          <p>{stats.roomCities}</p>
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

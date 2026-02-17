import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { getPriceFromPlan } from "../../data/roomsDekhoData";
import {
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";
import {
  Users,
  Building2,
  UserCheck,
  Home,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import MyLoader from "../../components/MyLoader";
import "../../css/adminDashboard.css";
import Api from "../../api/Api";

const COLORS = ["#FF6B35", "#4CAF50", "#29B6F6", "#FFB74D", "#8E44AD"];

const AdminDashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [ownersData, setOwnersData] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingOwners, setPendingOwners] = useState([]);
  const [pendingRooms, setPendingRooms] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDashboardStats = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const headers = { headers: getAuthHeaders() };

      const responses = await Promise.all([
        axios.get(API_ENDPOINTS.ADMIN_ALL_USERS, headers),
        axios.get(API_ENDPOINTS.ADMIN_ALL_OWNERS, headers),
        axios.get(API_ENDPOINTS.ADMIN_ALL_ROOMS, headers),
        axios.get(API_ENDPOINTS.ADMIN_PENDING_USERS, headers),
        axios.get(API_ENDPOINTS.ADMIN_PENDING_OWNERS, headers),
        axios.get(API_ENDPOINTS.ADMIN_PENDING_ROOMS, headers),
        axios.get(API_ENDPOINTS.CITIES_COVERED, headers),
      ]);
      const revenueRes = await Api.get("/subscription/revenue");
      setSubscriptionData(revenueRes.data || []);


      setUsersData(responses[0].data || []);
      setOwnersData(responses[1].data || []);
      setRoomsData(responses[2].data || []);
      setPendingUsers(responses[3].data || []);
      setPendingOwners(responses[4].data || []);
      setPendingRooms(responses[5].data || []);
      setCitiesData(responses[6].data || []);
      console.log(responses[3], responses[4])

    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);
  const revenueByPlan = useMemo(() => {
    const map = {};

    subscriptionData.forEach((sub) => {
      const plan = sub.planCode || "UNKNOWN";
      const price = getPriceFromPlan(sub.planCode);

      if (!map[plan]) {
        map[plan] = {
          revenue: 0,
          count: 0,
        };
      }

      map[plan].revenue += price;
      map[plan].count += 1;
    });

    return Object.keys(map).map((plan) => ({
      name: plan,
      revenue: map[plan].revenue,
      count: map[plan].count,
    }));
  }, [subscriptionData]);

  const monthlyRevenueTrend = useMemo(() => {
  const map = {};

  subscriptionData.forEach((sub) => {
    const date = new Date(sub.startDate);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0–11
    const key = `${year}-${month}`;

    const price = getPriceFromPlan(sub.planCode);

    map[key] = (map[key] || 0) + price;
  });

  // Convert to sorted array
  return Object.keys(map)
    .map((key) => {
      const [year, month] = key.split("-");
      const date = new Date(year, month);

      return {
        name: date.toLocaleString("default", {
          month: "short",
          year: "2-digit",
        }),
        revenue: map[key],
        sortDate: date,
      };
    })
    .sort((a, b) => a.sortDate - b.sortDate);
}, [subscriptionData]);

  /* =============================
     BAR CHART DATA
  ============================== */

  const overviewData = useMemo(() => [
    { name: "Users", value: usersData.length },
    { name: "Owners", value: ownersData.length },
    { name: "Rooms", value: roomsData.length },
    { name: "Cities", value: citiesData.length },
  ], [usersData, ownersData, roomsData, citiesData]);

  /* =============================
     PENDING PIE DATA
  ============================== */

  const pendingData = useMemo(() => [
    { name: "Pending Users", value: pendingUsers.length },
    { name: "Pending Owners", value: pendingOwners.length },
    { name: "Pending Rooms", value: pendingRooms.length },
  ], [pendingUsers, pendingOwners, pendingRooms]);

  /* =============================
     ROOM TYPE DISTRIBUTION
  ============================== */

  const roomTypeData = useMemo(() => {
    const counts = {};

    roomsData.forEach(room => {
      const type = room.roomType || "Unknown";
      counts[type] = (counts[type] || 0) + 1;
    });

    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
    }));
  }, [roomsData]);

  /* =============================
     ROLE DISTRIBUTION
  ============================== */
  const totalRevenue = useMemo(() => {
    return subscriptionData.reduce(
      (sum, sub) => sum + getPriceFromPlan(sub.planCode),
      0
    );
  }, [subscriptionData]);
  const revenueByRole = useMemo(() => {
    const counts = {};

    subscriptionData.forEach(sub => {
      const role = sub.role?.replace("ROLE_", "") || "UNKNOWN";
      counts[role] = (counts[role] || 0) + getPriceFromPlan(sub.planCode);
    });

    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
    }));
  }, [subscriptionData]);
  const monthlyRevenue = useMemo(() => {
    const map = {};

    subscriptionData.forEach(sub => {
      const date = new Date(sub.startDate);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

      map[key] =
        (map[key] || 0) + getPriceFromPlan(sub.planCode);
    });

    return Object.keys(map).map(key => ({
      name: key,
      revenue: map[key],
    }));
  }, [subscriptionData]);

  const roleDistribution = useMemo(() => {
    const counts = {};

    usersData.forEach(user => {
      const role = user.role?.replace("ROLE_", "") || "UNKNOWN";
      counts[role] = (counts[role] || 0) + 1;
    });

    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
    }));
  }, [usersData]);
  const monthlyRevenueMap = useMemo(() => {
    const map = {};

    subscriptionData.forEach((sub) => {
      const date = new Date(sub.startDate);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const price = getPriceFromPlan(sub.planCode);

      map[key] = (map[key] || 0) + price;
    });

    return map;
  }, [subscriptionData]);
  const revenueGrowth = useMemo(() => {
    const now = new Date();
    const currentKey = `${now.getFullYear()}-${now.getMonth() + 1}`;

    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    const prevKey = `${prevMonth.getFullYear()}-${prevMonth.getMonth() + 1}`;

    const currentRevenue = monthlyRevenueMap[currentKey] || 0;
    const previousRevenue = monthlyRevenueMap[prevKey] || 0;

    if (previousRevenue === 0) return 0;

    return (
      ((currentRevenue - previousRevenue) / previousRevenue) * 100
    );
  }, [monthlyRevenueMap]);
  const formattedGrowth = useMemo(() => {
    return revenueGrowth.toFixed(1);
  }, [revenueGrowth]);

  if (loading) return <MyLoader data="Loading Dashboard..." />;
  if (error) return <div>Failed to load dashboard.</div>;

  return (
    <div className="admin-dashboard">

      <div className="dashboard-header">
        <h2>Admin Overview</h2>
        <button className="btn btn-ghost btn-sm" onClick={fetchDashboardStats}>
          <RefreshCw size={16} />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-grid">
        {[
          { label: "Users", value: usersData.length, icon: Users },
          { label: "Owners", value: ownersData.length, icon: UserCheck },
          { label: "Rooms", value: roomsData.length, icon: Home },
          { label: "Cities", value: citiesData.length, icon: Building2 },
          {
            label: "Total Revenue",
            value: new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(totalRevenue),
            icon: BarChart3,
          }

        ].map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="dash-card">
              <div className="card-top">
                <Icon size={18} />
                <span>{card.label}</span>
              </div>
              <div className="card-value">{card.value}</div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="charts-grid">

        <div className="chart-card">
          <h3>System Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overviewData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FF6B35" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Pending Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pendingData} dataKey="value" outerRadius={100} label>
                {pendingData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Room Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={roomTypeData} dataKey="value" outerRadius={100} label>
                {roomTypeData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Revenue by Role</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueByRole}
                dataKey="value"
                outerRadius={100}
                label
              >
                {revenueByRole.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>User Role Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={roleDistribution} dataKey="value" outerRadius={100} label>
                {roleDistribution.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Revenue by Plan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueByPlan}
                dataKey="revenue"
                outerRadius={100}
                label
              >
                {revenueByPlan.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(value)
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Plan Sales Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByPlan}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#29B6F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="dash-card revenue-card">
          <div className="card-top">
            <BarChart3 size={18} />
            <span>Total Revenue</span>
          </div>

          <div className="card-value">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(totalRevenue)}
          </div>

          <div
            className={`growth ${revenueGrowth >= 0 ? "positive" : "negative"
              }`}
          >
            {revenueGrowth >= 0 ? "▲" : "▼"} {formattedGrowth}% vs last month
          </div>
        </div>
<div className="chart-card">
  <h3>Revenue Trend</h3>
  <ResponsiveContainer width="100%" height={320}>
    <LineChart data={monthlyRevenueTrend}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip
        formatter={(value) =>
          new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(value)
        }
      />
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#FF6B35"
        strokeWidth={3}
        dot={{ r: 5 }}
        activeDot={{ r: 7 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../../api/apiConfig";

import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Loader2,
} from "lucide-react";

import "../../css/revenueReport.css";

const RevenueReport = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    totalProfit: 0,
    totalLoss: 0,
    totalRooms: 0,
    totalBookings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const headers = { headers: getAuthHeaders() };

      // You will need this endpoint in backend:
      const res = await axios.get(API_ENDPOINTS.ADMIN_REVENUE_REPORT, headers);

      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Revenue data error:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loader">
        <Loader2 className="animate-spin" /> Loading Financial Data...
      </div>
    );
  }

  return (
    <div className="revenue-page">
      <h2>
        <BarChart3 /> Profit & Revenue Report
      </h2>

      <div className="revenue-grid">
        <div className="rev-card revenue">
          <IndianRupee size={26} />
          <h3>Total Revenue</h3>
          <p>₹ {data.totalRevenue}</p>
        </div>

        <div className="rev-card profit">
          <TrendingUp size={26} />
          <h3>Total Profit</h3>
          <p>₹ {data.totalProfit}</p>
        </div>

        <div className="rev-card loss">
          <TrendingDown size={26} />
          <h3>Total Loss</h3>
          <p>₹ {data.totalLoss}</p>
        </div>
     </div>

      <div className="summary-box">
        <h3>Summary</h3>
        <p>
          Platform has generated <b>₹{data.totalRevenue}</b> in revenue with
          overall profit of <b>₹{data.totalProfit}</b>.
        </p>
      </div>
    </div>
  );
};

export default RevenueReport;

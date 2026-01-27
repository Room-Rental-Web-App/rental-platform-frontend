import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import "../../css/revenueReport.css";

const getPriceFromPlan = (planCode) => {
  if (!planCode) return 0;
  if (planCode.includes("7D")) return 199;
  if (planCode.includes("30D")) return 499;
  if (planCode.includes("180D")) return 2499;
  if (planCode.includes("365D")) return 4499;
  return 0;
};

function RevenueReport() {
  const [filters, setFilters] = useState({
    role: "",
    days: "",
    from: "",
    to: ""
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    setLoading(true);
    try {
      const res = await Api.get("/subscription/revenue", {
        params: {
          role: filters.role || null,
          days: filters.days || null,
          from: filters.from || null,
          to: filters.to || null
        }
      });
      setData(res.data);
    } catch (e) {
      console.error(e);
      alert("Failed to load revenue");
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = data.reduce(
    (sum, s) => sum + getPriceFromPlan(s.planCode),
    0
  );

  return (
    <div className="revenue-container">
      <h2>Subscription Revenue</h2>

      <div className="filters">
        <select
          value={filters.role}
          onChange={e => setFilters({ ...filters, role: e.target.value })}
        >
          <option value="">All Roles</option>
          <option value="ROLE_OWNER">Owner</option>
          <option value="ROLE_USER">User</option>
        </select>

        <select
          value={filters.days}
          onChange={e => setFilters({ ...filters, days: e.target.value })}
        >
          <option value="">All Plans</option>
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
          <option value="180">180 Days</option>
          <option value="365">365 Days</option>
        </select>

        <input
          type="datetime-local"
          onChange={e => setFilters({ ...filters, from: e.target.value })}
        />

        <input
          type="datetime-local"
          onChange={e => setFilters({ ...filters, to: e.target.value })}
        />

        <button onClick={fetchRevenue}>Apply</button>
      </div>

      {loading && <p>Loading...</p>}

      <h3>Total Revenue: ₹{totalRevenue}</h3>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Plan</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.map(sub => (
            <tr key={sub.id}>
              <td>{sub.email}</td>
              <td>{sub.role}</td>
              <td>{sub.planCode}</td>
              <td>{new Date(sub.startDate).toLocaleString()}</td>
              <td>{new Date(sub.endDate).toLocaleString()}</td>
              <td>{getPriceFromPlan(sub.planCode)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RevenueReport;

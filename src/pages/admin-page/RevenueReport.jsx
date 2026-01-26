import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import "../../css/revenueReport.css";

function RevenueReport() {
  const [filters, setFilters] = useState({
    role: null,
    days: null,
    from: null,
    to: null
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
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.error(e);
      alert("Failed to load revenue");
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = data.reduce(
    (sum, d) => sum + d.totalAmount,
    0
  );

  return (
    <div className="revenue-container">
      <h2>Revenue Report</h2>

      <div className="filters">
        <select
          value={filters.role}
          onChange={e =>
            setFilters({ ...filters, role: e.target.value })
          }
        >
          <option value="">All Roles</option>
          <option value="ROLE_OWNER">Owner</option>
          <option value="ROLE_USER">User</option>
        </select>

        <select
          value={filters.days}
          onChange={e =>
            setFilters({ ...filters, days: e.target.value })
          }
        >
          <option value="">All Plans</option>
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
          <option value="180">180 Days</option>
          <option value="365">365 Days</option>
        </select>

        <input
          type="datetime-local"
          onChange={e =>
            setFilters({ ...filters, from: e.target.value })
          }
        />

        <input
          type="datetime-local"
          onChange={e =>
            setFilters({ ...filters, to: e.target.value })
          }
        />

        <button onClick={fetchRevenue}>Apply</button>
      </div>

      {loading && <p>Loading...</p>}

      <h3>Total Revenue: ₹{totalRevenue}</h3>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Subscriptions</th>
            <th>Revenue (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td>{r.date}</td>
              <td>{r.count}</td>
              <td>{r.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RevenueReport;

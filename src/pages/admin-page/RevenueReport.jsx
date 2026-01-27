import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import "../../css/revenueReport.css";

/**
 * TEMPORARY FRONTEND PRICING LOGIC
 * ❗ Real revenue must come from backend
 */
const getPriceFromPlan = (planCode) => {
  if (!planCode) return 0;
  if (planCode.includes("7D")) return 199;
  if (planCode.includes("30D")) return 499;
  if (planCode.includes("180D")) return 2499;
  if (planCode.includes("365D")) return 4499;
  return 0;
};

/**
 * REAL calendar-based month difference
 */
const getMonthDayDiff = (startDate, endDate) => {
  let start = new Date(startDate);
  const end = new Date(endDate);

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  // Adjust if last month not fully completed
  if (
    end.getDate() < start.getDate() ||
    (end.getDate() === start.getDate() &&
      end.getTime() < start.getTime())
  ) {
    months -= 1;
  }

  // Move start forward by completed months
  start = new Date(start);
  start.setMonth(start.getMonth() + months);

  // Remaining days (calendar-accurate)
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const days = Math.floor((end - start) / MS_PER_DAY);

  return {
    months: Math.max(months, 0),
    days: Math.max(days, 0)
  };
};




function RevenueReport() {
  const [filters, setFilters] = useState({
    role: "",
    planDuration: "",
    from: "",
    to: ""
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRevenue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRevenue = async () => {
    setLoading(true);
    try {
      const res = await Api.get("/subscription/revenue", {
        params: {
          role: filters.role || null,
          days: filters.planDuration || null, // backend param name kept
          from: filters.from || null,
          to: filters.to || null
        }
      });

      setData(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load revenue data");
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = data.reduce(
    (sum, sub) => sum + getPriceFromPlan(sub.planCode),
    0
  );

  return (
    <div className="revenue-container">
      <h2>Subscription Revenue</h2>

      <div className="filters">
        <select
          value={filters.role}
          onChange={(e) =>
            setFilters({ ...filters, role: e.target.value })
          }
        >
          <option value="">All Roles</option>
          <option value="ROLE_OWNER">Owner</option>
          <option value="ROLE_USER">User</option>
        </select>

        <select
          value={filters.planDuration}
          onChange={(e) =>
            setFilters({ ...filters, planDuration: e.target.value })
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
          onChange={(e) =>
            setFilters({ ...filters, from: e.target.value })
          }
        />

        <input
          type="datetime-local"
          onChange={(e) =>
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
            <th>Email</th>
            <th>Role</th>
            <th>Plan</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Months</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && !loading && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No data found
              </td>
            </tr>
          )}

          {data.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.email}</td>
              <td>{sub.role}</td>
              <td>{sub.planCode}</td>
              <td>{new Date(sub.startDate).toLocaleString()}</td>
              <td>{new Date(sub.endDate).toLocaleString()}</td>
             <td>
  {(() => {
    const diff = getMonthDayDiff(sub.startDate, sub.endDate);
    return `${diff.months}m ${diff.days}d`;
  })()}
</td>

              <td>{getPriceFromPlan(sub.planCode)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RevenueReport;

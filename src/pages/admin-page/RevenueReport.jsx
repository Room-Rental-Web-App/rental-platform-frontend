import React, { useEffect, useState, useCallback } from "react";
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

const getMonthDayDiff = (startDate, endDate) => {
  let start = new Date(startDate);
  const end = new Date(endDate);

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (
    end.getDate() < start.getDate() ||
    (end.getDate() === start.getDate() &&
      end.getTime() < start.getTime())
  ) {
    months -= 1;
  }

  start = new Date(start);
  start.setMonth(start.getMonth() + months);

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

  const fetchRevenue = useCallback(async () => {
    setLoading(true);
    try {
      const res = await Api.get("/subscription/revenue", {
        params: {
          role: filters.role || null,
          days: filters.planDuration || null,
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
  }, [filters]);

  useEffect(() => {
    fetchRevenue();
  }, [fetchRevenue]);

  const resetFilters = () => {
    setFilters({
      role: "",
      planDuration: "",
      from: "",
      to: ""
    });
  };

  const totalRevenue = data.reduce(
    (sum, sub) => sum + getPriceFromPlan(sub.planCode),
    0
  );

  return (
    <div className="revenue-container">
      <h2>Subscription Revenue</h2>

      {/* FILTERS */}
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
          value={filters.from}
          onChange={(e) =>
            setFilters({ ...filters, from: e.target.value })
          }
        />

        <input
          type="datetime-local"
          value={filters.to}
          onChange={(e) =>
            setFilters({ ...filters, to: e.target.value })
          }
        />

        <button className="apply-btn" onClick={fetchRevenue}>
          Apply
        </button>

        <button className="reset-btn" onClick={resetFilters}>
          Reset
        </button>
      </div>

      {/* SUMMARY */}
      <div className="revenue-summary">
        <h3>Total Revenue</h3>
        <p>₹ {totalRevenue}</p>
      </div>

      {/* DATA */}
      {loading ? (
        <div className="loading-box">Loading revenue data...</div>
      ) : data.length === 0 ? (
        <div className="empty-box">No revenue data found</div>
      ) : (
        <div className="revenue-grid">
          {data.map((sub) => {
            const diff = getMonthDayDiff(sub.startDate, sub.endDate);
            return (
              <div className="revenue-card" key={sub.id}>
                <div className="card-header">
                  <span className="plan-badge">{sub.planCode}</span>
                  <span className="amount">
                    ₹ {getPriceFromPlan(sub.planCode)}
                  </span>
                </div>

                <div className="card-body">
                  <p><strong>Email:</strong> {sub.email}</p>
                  <p><strong>Role:</strong> {sub.role}</p>
                  <p>
                    <strong>Duration:</strong> {diff.months}m {diff.days}d
                  </p>
                  <p>
                    <strong>Start:</strong>{" "}
                    {new Date(sub.startDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>End:</strong>{" "}
                    {new Date(sub.endDate).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RevenueReport;

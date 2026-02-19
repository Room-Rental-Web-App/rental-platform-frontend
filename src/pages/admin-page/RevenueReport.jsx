import React, { useEffect, useState, useCallback, useMemo } from "react";
import Api from "../../api/Api";
import "../../CSS/revenueReport.css";
import MyLoader from "../../components/MyLoader";
import { getMonthDayDiff } from "../../customHook/getMonthDifferent";

function RevenueReport() {
  const [filters, setFilters] = useState({
    role: "",
    planDuration: "",
    from: "",
    to: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    });
  }, []);

  const fetchRevenue = useCallback(async () => {
    setLoading(true);
    try {
      const res = await Api.get("/subscription/revenue", {
        params: {
          role: filters.role || null,
          days: filters.planDuration || null,
          from: filters.from || null,
          to: filters.to || null,
        },
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
  }, []);

  const resetFilters = () => {
    setFilters({
      role: "",
      planDuration: "",
      from: "",
      to: "",
    });
  };

  const totalRevenue = useMemo(() => {
    return data.reduce(
      (sum, sub) => sum + (sub.amountPaid || 0),
      0
    );
  }, [data]);

  const formattedRevenue = useMemo(() => {
    return currencyFormatter.format(totalRevenue);
  }, [totalRevenue, currencyFormatter]);

  return (
    <div className="rev-container">
      <h2 className="rev-title">Subscription Revenue</h2>

      <div className="rev-filters">
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

        <button
          className="rev-btn rev-btn-primary"
          onClick={fetchRevenue}
        >
          Apply
        </button>

        <button
          className="rev-btn rev-btn-outline"
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>

      <div className="rev-summary">
        <span>Total Revenue</span>
        <h2>{formattedRevenue}</h2>
      </div>

      {loading ? (
        <MyLoader data={"Loading revenue data..."} />
      ) : data.length === 0 ? (
        <div className="rev-empty">No revenue data found</div>
      ) : (
        <div className="rev-grid">
          {data.map((sub) => {
            const diff = getMonthDayDiff(
              sub.startDate,
              sub.endDate
            );

            return (
              <div className="rev-card" key={sub.id}>
                <div className="rev-card-header">
                  <span className="rev-plan-badge">
                    {sub.planCode}
                  </span>
                  <span className="rev-amount">
                    {currencyFormatter.format(
                      sub.amountPaid || 0
                    )}
                  </span>
                </div>

                <div className="rev-card-body">
                  <div className="rev-meta">
                    <span>{sub.email}</span>
                    <span>{sub.role}</span>
                  </div>

                  <p>
                    <strong>Duration:</strong>{" "}
                    {diff.months}m {diff.days}d
                  </p>

                  <p>
                    <strong>Start:</strong>{" "}
                    {new Date(
                      sub.startDate
                    ).toLocaleString()}
                  </p>

                  <p>
                    <strong>End:</strong>{" "}
                    {new Date(
                      sub.endDate
                    ).toLocaleString()}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {sub.active ? "Active" : "Expired"}
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

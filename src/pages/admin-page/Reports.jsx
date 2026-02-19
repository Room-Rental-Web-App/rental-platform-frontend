import { useEffect, useState, useCallback } from "react";
import Api from "../../api/Api";
import "../../CSS/adminReports.css";
import MyLoader from "../../components/MyLoader";

export default function AdminReportsPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const resetFilters = () => {
        setTypeFilter("");
        setStatusFilter("");

        setLoading(true);
        Api.get("/admin/reports")
            .then(res => {
                setReports(res.data || []);
            })
            .catch(err => console.error("Failed to reset filters:", err))
            .finally(() => setLoading(false));
    };

    const fetchReports = useCallback(() => {
        setLoading(true);

        Api.get("/admin/reports", {
            params: {
                type: typeFilter || undefined,
                status: statusFilter || undefined
            }
        })
            .then(res => {
                setReports(res.data || []);
            })
            .catch(err => console.error("Failed to fetch reports:", err))
            .finally(() => setLoading(false));
    }, [typeFilter, statusFilter]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const updateStatus = (reportType, reportId, newStatus) => {
        // Optimistic UI update
        setReports(prev =>
            prev.map(r =>
                r.reportType === reportType && r.reportId === reportId
                    ? { ...r, status: newStatus }
                    : r
            )
        );

        Api.patch(`/admin/reports/${reportType}/${reportId}/status`, null, {
            params: { status: newStatus }
        }).catch(err => {
            console.error("Failed to update status:", err);
            // Optional: rollback logic if needed
            fetchReports();
        });
    };

    if (loading) {
        return <MyLoader data="Loading reports... Please wait..." />;
    }

    return (
        <div className="admin-reports">
            <h2>Admin Reports</h2>

            {/* Filters */}
            <div className="filter-bar">
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="ROOM">Room</option>
                    <option value="ROOM_OWNER">Room Owner</option>
                    <option value="USER">User</option>
                </select>

                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="REVIEWING">Reviewing</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="REJECTED">Rejected</option>
                </select>

                <button onClick={fetchReports}>Apply Filters</button>
                <button onClick={resetFilters}>Reset Filters</button>
            </div>

            {/* Report Cards */}
            <div className="reports-container">
                {reports.length === 0 ? (
                    <div className="empty-state">
                        No reports found.
                    </div>
                ) : (
                    reports.map(r => (
                        <div
                            key={`${r.reportType}-${r.reportId}`}
                            className="report-card"
                        >
                            <div className="report-header">
                                <span className="report-type">
                                    {r.reportType}
                                </span>

                                <span className={`status ${r.status.toLowerCase()}`}>
                                    {r.status}
                                </span>
                            </div>

                            <div className="report-body">
                                <div>
                                    <label>Reporter</label>
                                    <p>{r.reporterEmail}</p>
                                </div>

                                <div>
                                    <label>Target</label>
                                    <p>{r.targetInfo}</p>
                                </div>

                                <div>
                                    <label>Reason</label>
                                    <p className="reason-text">{r.reason}</p>
                                </div>
                            </div>

                            <div className="report-footer">
                                <select
                                    value={r.status}
                                    onChange={e =>
                                        updateStatus(
                                            r.reportType,
                                            r.reportId,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="PENDING">PENDING</option>
                                    <option value="REVIEWING">REVIEWING</option>
                                    <option value="RESOLVED">RESOLVED</option>
                                    <option value="REJECTED">REJECTED</option>
                                </select>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

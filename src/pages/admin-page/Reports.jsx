import { useEffect, useState } from "react";
import Api from "../../api/Api";
import "../../css/adminReports.css";
import MyLoader from "../../components/MyLoader";

export default function AdminReportsPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const fetchReports = () => {
        setLoading(true);

        Api.get("/admin/reports", {
            params: {
                type: typeFilter || undefined,
                status: statusFilter || undefined
            }
        })
            .then(res => setReports(res.data || []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchReports(); // initial load
    }, []);

    const updateStatus = (reportType, reportId, status) => {
        Api.patch(`/admin/reports/${reportType}/${reportId}/status`, null, {
            params: { status }
        })
            .then(() => {
                fetchReports(); // 🔥 re-fetch from backend
            })
            .catch(err => console.error(err));
    };

    if (loading) return <MyLoader data={"Loading reports... Please wait..."} />
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
            </div>

            {loading && <p>Loading...</p>}

            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Reporter</th>
                        <th>Target</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {reports.map(r => (
                        <tr key={`${r.reportType}-${r.reportId}`}>
                            <td>{r.reportType}</td>
                            <td>{r.reporterEmail}</td>
                            <td>{r.targetInfo}</td>
                            <td>{r.reason}</td>
                            <td>{r.status}</td>
                            <td>
                                <select
                                    value={r.status}
                                    onChange={e =>
                                        updateStatus(r.reportType, r.reportId, e.target.value)
                                    }
                                >
                                    <option>PENDING</option>
                                    <option>REVIEWING</option>
                                    <option>RESOLVED</option>
                                    <option>REJECTED</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

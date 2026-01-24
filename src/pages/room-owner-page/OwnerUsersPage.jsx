import { useEffect, useState } from "react";
import CreateReport from "../../components/CreateReport";
import "../../css/ownerUsersPage.css";
import Api from "../../api/Api";

export default function OwnerUsersPage() {
    const [users, setUsers] = useState([]);
    const [reportUserId, setReportUserId] = useState(null);
    const [emailFilter, setEmailFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const currentUser = {
        id: Number(localStorage.getItem("userId")),
        email: localStorage.getItem("email"),
    };

    // fetch users ONLY when explicitly called
    const fetchUsers = (email = "") => {
        setLoading(true);
        setError("");

        Api.get("/users/allUsers", { params: { email: email || undefined, role: "ROLE_USER" } })
            .then(res => {
                setUsers(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load users");
            })
            .finally(() => setLoading(false));
    };

    // initial load (no filter)
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleFilter = () => {
        fetchUsers(emailFilter);
    };

    const handleClear = () => {
        setEmailFilter("");
        fetchUsers();
    };

    return (
        <div className="owner-users-page">
            <h2>Users</h2>

            {/* Filter controls */}
            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Search by email"
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                    className="email-filter"
                />
                <button className="filter-btn" onClick={handleFilter}>
                    Filter
                </button>
                <button className="clear-btn" onClick={handleClear}>
                    Clear
                </button>
            </div>

            {loading && <p>Loading users...</p>}
            {error && <p className="error-text">{error}</p>}

            {!loading && users.length === 0 && <p>No users found</p>}

            {!loading && users.map(user => {
                if (user.id === currentUser.id) return null;

                return (
                    <div key={user.id} className="user-card">
                        <div>
                            <strong>{user.email}</strong>
                            <p>Phone: {user.phone || "N/A"}</p>
                        </div>

                        {reportUserId !== user.id ? (
                            <button
                                className="report-btn"
                                onClick={() => setReportUserId(user.id)}
                            >
                                Report User
                            </button>
                        ) : (
                            <>
                                <CreateReport
                                    reporterId={currentUser.id}
                                    reportType="USER"
                                    targetId={user.id}
                                />
                                <button
                                    className="cancel-btn"
                                    onClick={() => setReportUserId(null)}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

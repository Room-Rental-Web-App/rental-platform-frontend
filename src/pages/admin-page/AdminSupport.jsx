import React, { useEffect, useState } from "react";
import Api from "../../api/Api";
import "../../css/adminSupport.css";

import { ISSUE_LABELS } from "../../data/roomsDekhoData"
import MyLoader from "../../components/MyLoader";


function AdminSupport() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [status, setStatus] = useState("");
  const [urgency, setUrgency] = useState("");
  const [issueType, setIssueType] = useState("");

  /* FETCH TICKETS WITH FILTERS */
  const fetchTickets = async (
    statusParam = status,
    urgencyParam = urgency,
    issueTypeParam = issueType
  ) => {
    setLoading(true);
    try {
      const params = {};
      if (statusParam) params.status = statusParam;
      if (urgencyParam) params.urgency = urgencyParam;
      if (issueTypeParam) params.issueType = issueTypeParam;

      const res = await Api.get("/support/all", { params });
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch support tickets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line
  }, []);

  /* UPDATE STATUS */
  const updateStatus = async (id, newStatus) => {
    try {
      await Api.put(`/support/${id}/status`, null, {
        params: { status: newStatus },
      });
      fetchTickets();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

    if (loading) return <MyLoader data={"Loading Support Requests... Please wait..."} />

  return (
    <div className="admin-support-page">
      <h1>Support Requests (Admin)</h1>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            fetchTickets(e.target.value, urgency, issueType);
          }}
        >
          <option value="">All Status</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>

        <select
          value={urgency}
          onChange={(e) => {
            setUrgency(e.target.value);
            fetchTickets(status, e.target.value, issueType);
          }}
        >
          <option value="">All Urgency</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <select
          value={issueType}
          onChange={(e) => {
            setIssueType(e.target.value);
            fetchTickets(status, urgency, e.target.value);
          }}
        >
          <option value="">All Issue Types</option>
          {Object.entries(ISSUE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <button
          className="clear-btn"
          onClick={() => {
            setStatus("");
            setUrgency("");
            setIssueType("");
            fetchTickets("", "", "");
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <p>Loading support tickets...</p>
      ) : tickets.length === 0 ? (
        <p>No support tickets found.</p>
      ) : (
        <div className="admin-ticket-list">
          {tickets.map((t) => (
            <div key={t.id} className="admin-ticket-card">
              <div className="card-header">
                <strong>{t.name}</strong>
                <span className={`status ${t.status}`}>
                  {t.status}
                </span>
              </div>

              <p><b>Email:</b> {t.email}</p>
              <p><b>Phone:</b> {t.phone}</p>
              <p><b>Issue:</b> {ISSUE_LABELS[t.issueType]}</p>

              <p className={`urgency ${t.urgency}`}>
                Urgency: {t.urgency}
              </p>

              <div className="message-box">
                {t.message}
              </div>

              <div className="actions">
                <select
                  value={t.status}
                  onChange={(e) =>
                    updateStatus(t.id, e.target.value)
                  }
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminSupport;

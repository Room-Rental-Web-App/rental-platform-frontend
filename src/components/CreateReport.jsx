import { useState } from "react";
import "../CSS/createReport.css";
import Api from "../api/Api";

export default function CreateReport({ reporterId, reportType: initialReportType, targetId: initialTargetId }) {
  const [reportType, setReportType] = useState(initialReportType || "ROOM");
  const [targetId, setTargetId] = useState(initialTargetId || "");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const isLocked = initialReportType && initialTargetId;
  const charCount = reason.trim().length;
  const charRaw = reason.length;
  const isUnder = charCount < 20;
  const isOver = charRaw > 500;
  const fillPct = Math.min((charRaw / 500) * 100, 100);

  const submitReport = async () => {
    setStatus("idle");
    setErrorMsg("");

    if (!targetId || !reason.trim()) {
      setStatus("error");
      setErrorMsg("All fields are required.");
      return;
    }
    if (charCount < 20) {
      setStatus("error");
      setErrorMsg("Reason must be at least 20 characters.");
      return;
    }
    if (charRaw > 500) {
      setStatus("error");
      setErrorMsg("Reason must not exceed 500 characters.");
      return;
    }

    try {
      setLoading(true);
      await Api.post(`/reports?reporterId=${reporterId}`, {
        reportType,
        targetId: Number(targetId),
        reason: reason.trim(),
      });
      setStatus("success");
      setReason("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.response?.data || "Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="cr-success">
        <div className="cr-success-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <p className="cr-success-title">Report submitted</p>
        <p className="cr-success-msg">Thank you. Our team will review this shortly.</p>
        <button className="cr-reset-btn" onClick={() => setStatus("idle")}>Submit another</button>
      </div>
    );
  }

  return (
    <div className="cr-form">

      {/* Locked context chip */}
      {isLocked && (
        <div className="cr-context-chip">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Reporting {reportType.replace("_", " ")} · ID {targetId}
        </div>
      )}

      {/* Unlocked: type selector */}
      {!isLocked && (
        <div className="cr-field">
          <label className="cr-label">Report Type</label>
          <div className="cr-select-wrap">
            <select
              className="cr-select"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="ROOM">Room</option>
              <option value="ROOM_OWNER">Room Owner</option>
              <option value="USER">User</option>
            </select>
            <svg className="cr-select-icon" width="12" height="12" viewBox="0 0 12 12">
              <path fill="currentColor" d="M6 8L1 3h10z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Unlocked: target ID */}
      {!isLocked && (
        <div className="cr-field">
          <label className="cr-label">
            {reportType === "ROOM" && "Room ID"}
            {reportType === "ROOM_OWNER" && "Owner ID"}
            {reportType === "USER" && "User ID"}
          </label>
          <input
            className="cr-input"
            type="number"
            placeholder="Enter ID"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          />
        </div>
      )}

      {/* Reason */}
      <div className="cr-field">
        <label className="cr-label">Reason</label>
        <textarea
          className={`cr-textarea ${isOver ? "cr-textarea--over" : ""}`}
          placeholder="Describe the issue clearly (min. 20 characters)…"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
        />

        {/* Character bar */}
        <div className="cr-char-row">
          <span className={`cr-char-count ${isOver ? "cr-char--over" : isUnder && reason.length > 0 ? "cr-char--under" : ""}`}>
            {charRaw} / 500
          </span>
          <div className="cr-char-bar-track">
            <div
              className={`cr-char-bar-fill ${isOver ? "cr-bar--over" : charRaw >= 400 ? "cr-bar--warn" : ""}`}
              style={{ width: `${fillPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="cr-error">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        className={`cr-submit-btn ${loading ? "cr-submit-btn--loading" : ""}`}
        onClick={submitReport}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="cr-spinner" />
            Submitting…
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Submit Report
          </>
        )}
      </button>
    </div>
  );
}
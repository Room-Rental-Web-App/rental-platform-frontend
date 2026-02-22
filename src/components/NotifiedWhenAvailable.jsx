import { useState } from "react";
import Api from "../api/Api";
import "../css/notify-when-available.css";

function NotifiedWhenAvailable({ userId, roomId }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  function notifyMe() {
    setStatus("loading");
    Api.post("/room_availability/add", null, {
      params: { userId, roomId },
    })
      .then((res) => {
        setStatus("success");
        setMessage(res.data);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data || "Something went wrong. Please try again.");
      });
  }

  if (status === "success") {
    return (
      <div className="nwa-banner nwa-banner--success">
        <span className="nwa-banner-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </span>
        <div>
          <p className="nwa-banner-title">You're on the list!</p>
          <p className="nwa-banner-msg">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="nwa-wrap">
      <div className="nwa-info">
        <span className="nwa-pulse-dot" />
        <p className="nwa-info-text">
          This property is currently booked. Get notified the moment it becomes available.
        </p>
      </div>

      {status === "error" && (
        <p className="nwa-error">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {message}
        </p>
      )}

      <button
        className={`nwa-btn ${status === "loading" ? "nwa-btn--loading" : ""}`}
        onClick={notifyMe}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <span className="nwa-spinner" />
            Setting up alert…
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Notify me when available
          </>
        )}
      </button>
    </div>
  );
}

export default NotifiedWhenAvailable;
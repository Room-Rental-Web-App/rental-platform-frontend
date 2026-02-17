import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import {
  MessageSquare,
  Send,
  AlertCircle,
  Loader2,
  Ticket,
  Clock,
  ChevronDown,
  ChevronUp,
  InboxIcon,
} from "lucide-react";
import Api from "../../api/Api";
import "../../CSS/utils/theme.css";
import "../../CSS/ContactUs.css";
import { ISSUE_LABELS } from "../../data/roomsDekhoData";
import { useNavigate } from "react-router-dom";
import MyLoader from "../../components/MyLoader";

const URGENCY_CONFIG = {
  HIGH: { label: "High", color: "var(--error)" },
  MEDIUM: { label: "Medium", color: "var(--warning)" },
  LOW: { label: "Low", color: "var(--success)" },
};

const STATUS_CONFIG = {
  open: { label: "Open", bg: "rgba(23,162,184,0.12)", color: "var(--info)" },
  pending: {
    label: "Pending",
    bg: "rgba(255,183,77,0.12)",
    color: "var(--warning)",
  },
  resolved: {
    label: "Resolved",
    bg: "rgba(76,175,80,0.12)",
    color: "var(--success)",
  },
  closed: {
    label: "Closed",
    bg: "rgba(108,117,125,0.12)",
    color: "var(--text-tertiary)",
  },
};

function ContactForm() {
  const email = localStorage.getItem("email");
  const navTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const [expandedTicket, setExpandedTicket] = useState(null);

  const [formData, setFormData] = useState({
    name: localStorage.getItem("fullName") || "",
    email: email || "",
    phone: localStorage.getItem("phone") || "",
    issueType: "",
    urgency: "",
    message: "",
  });

  const [supportRequests, setSupportRequests] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const getMySupportRequests = async () => {
    try {
      setLoading(true);
      const res = await Api.get(`/support/my`, { params: { email } });
      setSupportRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) getMySupportRequests();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (
      confirm("You need to be logged in to contact support. Go to login page?")
    ) {
      navTo("/login");
    } else {
      e.preventDefault();
      setError("You need to be logged in to contact support.");
      return;
    }

    e.preventDefault();
    setError("");
    setStatus("");
    setLoading(true);

    try {
      await Api.post("/support/create", formData);
      await emailjs.send(
        "service_aub721b",
        "template_qerjj4y",
        formData,
        "D8EKQaaZrMYkyP71k",
      );

      setStatus("Support request submitted successfully.");
      setFormData((prev) => ({
        ...prev,
        issueType: "",
        urgency: "",
        message: "",
      }));
      getMySupportRequests();
    } catch (err) {
      console.error(err);
      setError("Failed to submit request. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <MyLoader data={"My Support Request loading... Please wait..."} />;

  return (
    <div className="contact-page">
      {/* ===== HERO ===== */}
      <section className="contact-hero">
        <div className="contact-hero-badge">
          <MessageSquare size={13} /> Support Center
        </div>
        <h1>
          Contact <span className="contact-highlight">Support</span>
        </h1>
        <p>We actually read these. Most issues resolved within 24–48 hours.</p>
      </section>

      <div className="contact-body">
        {/* ===== MY TICKETS ===== */}
        <div className="contact-section">
          <div className="section-heading">
            <Ticket size={18} />
            <h2>My Support Requests</h2>
            <span className="section-badge">{supportRequests.length}</span>
          </div>

          {supportRequests.length === 0 ? (
            <div className="no-requests">
              <InboxIcon size={36} />
              <p>No support requests yet.</p>
            </div>
          ) : (
            <div className="ticket-list">
              {supportRequests.map((ticket) => {
                const isOpen = expandedTicket === ticket.id;
                const urgConf = URGENCY_CONFIG[ticket.urgency] || {};
                const statConf = STATUS_CONFIG[ticket.status] || {};

                return (
                  <div className="ticket-card" key={ticket.id}>
                    <div
                      className="ticket-card-header"
                      onClick={() =>
                        setExpandedTicket(isOpen ? null : ticket.id)
                      }
                    >
                      <div className="ticket-card-left">
                        <span className="ticket-issue-tag">
                          {ISSUE_LABELS[ticket.issueType] || ticket.issueType}
                        </span>
                        <span
                          className="ticket-status-badge"
                          style={{
                            background: statConf.bg,
                            color: statConf.color,
                          }}
                        >
                          {statConf.label || ticket.status}
                        </span>
                      </div>
                      <div className="ticket-card-right">
                        <span className="ticket-date">
                          <Clock size={12} />
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                        {isOpen ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </div>
                    </div>

                    {isOpen && (
                      <div className="ticket-card-body">
                        <p className="ticket-message">{ticket.message}</p>
                        <div
                          className="ticket-urgency-chip"
                          style={{
                            color: urgConf.color,
                            borderColor: urgConf.color,
                          }}
                        >
                          Urgency: {urgConf.label || ticket.urgency}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ===== FORM ===== */}
        <div className="contact-section">
          <div className="section-heading">
            <Send size={18} />
            <h2>New Support Request</h2>
          </div>

          {error && (
            <div className="contact-alert error">
              <AlertCircle size={17} /> {error}
            </div>
          )}
          {status && <div className="contact-alert success">✓ {status}</div>}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  readOnly
                  className="readonly"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input value={formData.email} readOnly className="readonly" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="form-group">
                <label>Issue Type *</label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select issue type</option>
                  {Object.keys(ISSUE_LABELS).map((key) => (
                    <option key={key} value={key}>
                      {ISSUE_LABELS[key]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Urgency *</label>
              <div className="urgency-options">
                {["HIGH", "MEDIUM", "LOW"].map((level) => (
                  <label
                    key={level}
                    className={`urgency-chip ${formData.urgency === level ? "selected" : ""}`}
                    style={
                      formData.urgency === level
                        ? {
                            borderColor: URGENCY_CONFIG[level].color,
                            color: URGENCY_CONFIG[level].color,
                            background: `${URGENCY_CONFIG[level].color}18`,
                          }
                        : {}
                    }
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={level}
                      checked={formData.urgency === level}
                      onChange={handleChange}
                      required
                    />
                    {URGENCY_CONFIG[level].label}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Describe Your Issue *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your issue in detail..."
                rows={5}
                required
              />
            </div>

            <button className="submit-btn" disabled={loading}>
              {loading ? (
                <Loader2 size={17} className="spin" />
              ) : (
                <Send size={17} />
              )}
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;

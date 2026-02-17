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
  ShieldCheck,
} from "lucide-react";
import Api from "../../api/Api";
import "../../css/contact.css";
import { ISSUE_LABELS } from "../../data/roomsDekhoData";
import { useNavigate } from "react-router-dom";
import MyLoader from "../../components/MyLoader";

const URGENCY_CONFIG = {
  HIGH: { label: "High", class: "high" },
  MEDIUM: { label: "Medium", class: "medium" },
  LOW: { label: "Low", class: "low" },
};

const STATUS_CONFIG = {
  OPEN: { label: "Open", class: "OPEN" },
  IN_PROGRESS: { label: "In Progress", class: "IN_PROGRESS" },
  RESOLVED: { label: "Resolved", class: "RESOLVED" },
};

function ContactForm() {
  const email = localStorage.getItem("email");
  const navTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ticketsOpen, setTicketsOpen] = useState(true);

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
    if (!email) {
      if (
        confirm(
          "You need to be logged in to contact support. Go to login page?",
        )
      ) {
        navTo("/login");
      } else {
        e.preventDefault();
        setError("You need to be logged in to contact support.");
      }
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

  if (loading) return <MyLoader data={"Loading support requests..."} />;

  return (
    <div className="contact-page">
      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="hero-eyebrow">
          <span className="hero-dot" />
          Help Center
        </div>
        <h1>
          Contact <span className="highlight">Support</span>
        </h1>
        <p className="contact-subtitle">
          We actually read these — and respond within 24–48 hours.
        </p>
        <div className="hero-meta">
          <span>24–48 hr response</span>
          <span className="meta-divider" />
          <span>Track your tickets</span>
          <span className="meta-divider" />
          <span>Real humans reply</span>
        </div>
      </section>

      <div className="contact-body">
        {/* ── Status / Error ── */}
        {error && (
          <div className="contact-error">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        {status && (
          <div className="contact-success">
            <ShieldCheck size={16} /> {status}
          </div>
        )}

        {/* ── My Tickets ── */}
        {supportRequests.length > 0 && (
          <div className="tickets-section">
            <button
              className="tickets-toggle"
              onClick={() => setTicketsOpen((o) => !o)}
            >
              <div className="tickets-toggle-left">
                <div className="tickets-icon">
                  <Ticket size={16} />
                </div>
                <span>My Support Requests</span>
                <span className="tickets-count">{supportRequests.length}</span>
              </div>
              <ChevronDown
                size={18}
                className={`tickets-chevron${ticketsOpen ? " open" : ""}`}
              />
            </button>

            {ticketsOpen && (
              <div className="ticket-list">
                {supportRequests.map((ticket) => (
                  <div className="ticket-item" key={ticket.id}>
                    <div className="ticket-top">
                      <span className="ticket-issue">
                        {ISSUE_LABELS[ticket.issueType]}
                      </span>
                      <span className={`ticket-status ${ticket.status}`}>
                        {STATUS_CONFIG[ticket.status]?.label ?? ticket.status}
                      </span>
                    </div>
                    <p className="ticket-message">{ticket.message}</p>
                    <div className="ticket-footer">
                      <span className="ticket-meta">
                        <Clock size={12} />
                        {new Date(ticket.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                      <span
                        className={`ticket-urgency ${URGENCY_CONFIG[ticket.urgency]?.class}`}
                      >
                        {URGENCY_CONFIG[ticket.urgency]?.label ??
                          ticket.urgency}{" "}
                        priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Form ── */}
        <div className="contact-form-card">
          <div className="form-card-header">
            <div className="form-card-icon">
              <MessageSquare size={20} />
            </div>
            <div>
              <h2>New Support Request</h2>
              <p>Fill in the details below and we'll get back to you soon.</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" value={formData.name} readOnly />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input value={formData.email} readOnly />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
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
                {["HIGH", "MEDIUM", "LOW"].map((u) => (
                  <label
                    key={u}
                    className={`urgency-pill ${u.toLowerCase()}${formData.urgency === u ? " selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={u}
                      checked={formData.urgency === u}
                      onChange={handleChange}
                      required
                    />
                    {URGENCY_CONFIG[u].label}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Describe your issue *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describe your issue in detail..."
                required
              />
            </div>

            <button className="submit-button" disabled={loading}>
              {loading ? (
                <Loader2 size={18} className="spin" />
              ) : (
                <Send size={18} />
              )}
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="legal-footer">
        <p>
          © 2026 RoomsDekho · For urgent issues email us at{" "}
          <strong>support@roomsdekho.com</strong>
        </p>
      </footer>
    </div>
  );
}

export default ContactForm;

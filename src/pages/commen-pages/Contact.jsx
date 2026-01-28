import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { MessageSquare, Send, AlertCircle, Loader2 } from "lucide-react";
import Api from "../../api/Api";
import "../../css/contact.css";
import { ISSUE_LABELS } from "../../data/roomsDekhoData"


function ContactForm() {
  const email = localStorage.getItem("email");

  const [formData, setFormData] = useState({
    name: localStorage.getItem("fullName") || "",
    email: email || "",
    phone: localStorage.getItem("phone") || "",
    issueType: "",
    urgency: "",
    message: "",
  });

  const [supportRequests, setSupportRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  /* ✅ FETCH MY SUPPORT REQUESTS */
  const getMySupportRequests = async () => {
    try {
      const res = await Api.get(`/support/my`, {
        params: { email },
      });
      setSupportRequests(res.data);
    } catch (err) {
      console.error(err);
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
    e.preventDefault();
    setError("");
    setStatus("");
    setLoading(true);

    try {
      /* 1️⃣ SAVE TO BACKEND */
      await Api.post("/support/create", formData);

      /* 2️⃣ EMAIL NOTIFICATION */
      await emailjs.send(
        "service_aub721b",
        "template_qerjj4y",
        formData,
        "D8EKQaaZrMYkyP71k"
      );

      setStatus("Support request submitted successfully.");

      /* 3️⃣ RESET FORM (CORRECTLY) */
      setFormData((prev) => ({
        ...prev,
        issueType: "",
        urgency: "",
        message: "",
      }));

      /* 4️⃣ REFRESH LIST */
      getMySupportRequests();
    } catch (err) {
      console.error(err);
      setError("Failed to submit request. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <div className="form-header">
        <MessageSquare size={32} />
        <h2>Contact Support</h2>
        <p>We actually read these.</p>
      </div>

      {/* MY SUPPORT REQUESTS */}
      <div className="my-support-page">
        <h2>My Support Requests</h2>

        {supportRequests.length === 0 ? (
          <p className="no-requests">No support requests yet.</p>
        ) : (
          <div className="ticket-list">
            {supportRequests.map((ticket) => (
              <div className="ticket-item" key={ticket.id}>
                <div className="ticket-top">
                  <span className="ticket-issue">
                    {ISSUE_LABELS[ticket.issueType]}
                  </span>
                  <span className={`ticket-status ${ticket.status}`}>
                    {ticket.status}
                  </span>
                </div>

                <div className="ticket-meta">
                  Submitted on{" "}
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </div>

                <div className="ticket-message">
                  {ticket.message}
                </div>

                <div className={`ticket-urgency ${ticket.urgency}`}>
                  Urgency: {ticket.urgency}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="contact-error">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {status && <div className="contact-success">{status}</div>}

      {/* SUPPORT FORM */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name *</label>
            <input name="name" value={formData.name} readOnly />
          </div>

          <div className="form-group">
            <label>Email *</label>
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
              <option value="">Select</option>
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
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label>Describe Issue *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button className="submit-button" disabled={loading}>
          {loading ? <Loader2 className="spin" /> : <Send />} Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;

import React, { useState } from "react";
import emailjs from "emailjs-com";
import { MessageSquare, Send, AlertCircle } from "lucide-react";
import "../css/contact.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: localStorage.getItem("email") || "",
    phone: "",
    issueType: "",
    urgency: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    emailjs
      .send(
        "service_aub721b",
        "template_qerjj4y",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          issueType: formData.issueType,
          urgency: formData.urgency,
          message: formData.message,
        },
        "D8EKQaaZrMYkyP71k"
      )
      .then(() => {
        setStatus("Message sent successfully! Our team will contact you soon.");

        setFormData({
          name: "",
          email: localStorage.getItem("email") || "",
          phone: "",
          issueType: "",
          urgency: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to send message. Try again later.");
      });
  };

  return (
    <div className="contact-form-wrapper" >
      <div className="form-header" >
        <MessageSquare size={32} />
        <h2>Contact Support</h2>
        <p>Tell us your problem and we’ll help you out.</p>
      </div>

      {error && (
        <div className="contact-error">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {status && <div className="contact-success">{status}</div>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group" >
            <label>Full Name *</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group" >
            <label>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group" >
            <label>Phone *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group" >
            <label>Issue Type *</label>
            <select name="issueType" value={formData.issueType} onChange={handleChange} required>
              <option value="">Select Issue</option>
              <option value="payment">Payment Problem</option>
              <option value="room-listing">Room Listing Issue</option>
              <option value="fake-listing">Report Fake Listing</option>
              <option value="owner-problem">Owner Problem</option>
              <option value="account">Account Issue</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group" >
          <label>Urgency *</label>
          <select name="urgency" value={formData.urgency} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="high">High (Immediate)</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="form-group" >
          <label>Describe Your Issue *</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">
          <Send size={20} /> Submit Request
        </button>
      </form>

      <p className="privacy-note" >
        🔒 All messages are confidential and secure
      </p>
    </div>
  );
}

export default ContactForm;

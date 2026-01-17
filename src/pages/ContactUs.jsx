import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import "../css/ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent:", formData);
    alert("Thank you! Your message has been sent.");
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <h1>
          Get in <span className="highlight">Touch</span>
        </h1>
        <p>Have questions? We're here to help you find your perfect home.</p>
      </section>

      <div className="contact-wrapper">
        {/* Contact Info Cards */}
        <div className="contact-info">
          <div className="info-item">
            <div className="icon-box">
              <Phone size={24} />
            </div>
            <div>
              <h4>Call Us</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>
          <div className="info-item">
            <div className="icon-box">
              <Mail size={24} />
            </div>
            <div>
              <h4>Email Us</h4>
              <p>support@roomsdekho.com</p>
            </div>
          </div>
          <div className="info-item">
            <div className="icon-box">
              <MapPin size={24} />
            </div>
            <div>
              <h4>Our Location</h4>
              <p>Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send us a Message</h3>
          <div className="input-group">
            <input
              type="text"
              placeholder="Your Name"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Your Email"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <textarea
              placeholder="How can we help you?"
              rows="5"
              required
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

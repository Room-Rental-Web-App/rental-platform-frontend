import React from "react";
import { Link } from "react-router-dom"; // React Router Link import kiya
import "../CSS/footer.css";
import {
  Facebook,
  Home,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo">
            <Home size={32} color="var(--primary)" />
            <span>
              Rooms<span className="orange-text">Dekho</span>
            </span>
          </div>
          <p className="footer-text">
            Your trusted partner in finding the perfect rental home across
            India. We make renting simple, safe, and brokerage-free.
          </p>
          <div className="social-icons">
            <a href="https://facebook.com" className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" className="social-icon">
              <Twitter size={20} />
            </a>
            <a href="https://www.instagram.com/?next=" className="social-icon">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/feed/" className="social-icon">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <div className="footer-links">
            <Link to="/about" className="footer-link">
              About Us
            </Link>
            <Link to="/search" className="footer-link">
              Properties
            </Link>
            <Link to="/blogs" className="footer-link">
              Blog
            </Link>
            <Link to="/career" className="footer-link">
              Career
            </Link>
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Support</h3>
          <div className="footer-links">
            <Link to="/contact" className="footer-link">
              Help Center
            </Link>
            <Link to="/faq" className="footer-link">
              FAQs
            </Link>
            <Link to="/terms" className="footer-link">
              Terms and Service
            </Link>
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link to="/refund" className="footer-link">
              Refund Policy
            </Link>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <div className="footer-links">
            <span className="contact-item">
              <Phone size={16} /> +91 9301460346
            </span>
            <span className="contact-item">
              <Mail size={16} /> roomdekhobharat@gmail.com
            </span>
            <span className="contact-item">
              <MapPin size={16} /> Bhopal , Madhya Pradesh, India
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2026 RoomsDekho. All rights reserved. | Designed with ❤️ for
          India
        </p>
      </div>
    </footer>
  );
}

export default Footer;

import React from "react";
import "../../CSS/Auth.css";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="auth-card-wrapper">
      <div className="auth-container-card">

        <div className="auth-image-side">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <div className="form-side">
          {children}
        </div>

      </div>
    </div>
  );
}
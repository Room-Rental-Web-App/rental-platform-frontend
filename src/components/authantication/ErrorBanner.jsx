import React from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <div className="error-banner">
      <AlertCircle size={18} />
      <span>{message}</span>
    </div>
  );
}
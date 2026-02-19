import { X, Eye, EyeOff, AlertTriangle } from "lucide-react";
import "../CSS/aadhar-model.css";
import { useEffect, useState } from "react";

const AadhaarModal = ({ url, onClose }) => {
  const [revealed, setRevealed] = useState(false);

  // Close on ESC + Lock Body Scroll
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Aadhaar Document Preview"
    >
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Warning */}
        {!revealed && (
          <div className="aadhaar-warning">
            <AlertTriangle size={16} />
            <span>
              Sensitive document. Reveal only if absolutely necessary.
            </span>
          </div>
        )}

        {/* Image */}
        <div className="aadhaar-wrapper">
          <img
            src={url}
            alt="Aadhaar Card Document"
            draggable={false}
            className={`aadhaar-img ${revealed ? "" : "blurred"}`}
          />
        </div>

        {/* Reveal Button */}
        <button
          className={`btn ${revealed ? "btn-danger" : "btn-primary"} btn-sm`}
          onClick={() => setRevealed((prev) => !prev)}
        >
          {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
          {revealed ? "Hide Aadhaar" : "Reveal Aadhaar"}
        </button>
      </div>
    </div>
  );
};

export default AadhaarModal;

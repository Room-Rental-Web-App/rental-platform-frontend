import { X, Eye, EyeOff, AlertTriangle } from "lucide-react";
import "../css/aadhar-model.css";
import { useEffect, useState } from "react";

const AadhaarModal = ({ url, onClose }) => {
  const [revealed, setRevealed] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={18} />
        </button>

        {/* Warning */}
        {!revealed && (
          <div className="aadhaar-warning">
            <AlertTriangle size={16} />
            Sensitive document. Reveal only if necessary.
          </div>
        )}

        <div className="aadhaar-wrapper">
          <img
            src={url}
            alt="Aadhaar Card"
            draggable={false}
            className={`aadhaar-img ${revealed ? "" : "blurred"}`}
          />
        </div>

        <button
          className={`reveal-btn ${revealed ? "danger" : ""}`}
          onClick={() => setRevealed((p) => !p)}
        >
          {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
          {revealed ? "Hide Aadhaar" : "Reveal Aadhaar"}
        </button>
      </div>
    </div>
  );
};

export default AadhaarModal;

import React from "react";

export function calculateStrength(password) {
  return (
    (password.length >= 8 ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0)
  );
}

export default function StrengthMeter({ password }) {
  const strength = calculateStrength(password);

  return (
    <div className="strength-meter">
      <div className={`strength-bar strength-${strength}`} />
    </div>
  );
}
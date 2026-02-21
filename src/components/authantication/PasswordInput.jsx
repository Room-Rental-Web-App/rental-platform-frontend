import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  name,
  value,
  onChange,
  placeholder,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="input-group password-group">
      <Lock size={18} className="field-icon" />

      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />

      <span
        className="password-toggle"
        onClick={() => setShow(!show)}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </span>
    </div>
  );
}
import React from "react";

export default function InputWithIcon({
  icon: Icon,
  ...props
}) {

  return (
    <div className="input-group">
      <Icon size={18} className="field-icon" />
      <input {...props} required />
    </div>
  );
}
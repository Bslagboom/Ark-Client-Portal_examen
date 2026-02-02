import React from "react";

export default function Input({ label, ...props }) {
  return (
    <label className="field">
      {label && <div className="fieldLabel">{label}</div>}
      <input className="input" {...props} />
    </label>
  );
}

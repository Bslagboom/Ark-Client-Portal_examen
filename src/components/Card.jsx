import React from "react";

export default function Card({ title, right, children }) {
  return (
    <div className="card">
      {(title || right) && (
        <div className="cardHeader">
          <div className="cardTitle">{title}</div>
          <div>{right}</div>
        </div>
      )}
      <div className="cardBody">{children}</div>
    </div>
  );
}

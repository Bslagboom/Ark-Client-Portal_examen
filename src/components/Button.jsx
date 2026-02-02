import React from "react";

export default function Button({ variant = "primary", size = "md", ...props }) {
  const cls = [
    "btn",
    variant === "primary" ? "btnPrimary" : "btnGhost",
    size === "sm" ? "btnSmall" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={cls} {...props} />;
}

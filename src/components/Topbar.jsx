import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser, logout } from "../auth/authService.js";

export default function Topbar() {
  const user = getUser();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="brand">
        <div className="logoTri" />
        <div className="brandText">ARK DESIGN</div>
      </div>

      <nav className="nav">
        {user?.role === "client" && (
          <NavLink className="navLink" to="/client">
            Dashboard
          </NavLink>
        )}

        {(user?.role === "pm" || user?.role === "admin") && (
          <NavLink className="navLink" to="/pm">
            Dashboard
          </NavLink>
        )}

        {user?.role === "admin" && (
          <NavLink className="navLink" to="/admin/users">
            Projecten
          </NavLink>
        )}

        <span className="navSpacer" />

        <button className="btn btnSmall" onClick={onLogout}>
          Uitloggen
        </button>
      </nav>
    </header>
  );
}

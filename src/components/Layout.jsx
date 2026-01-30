import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "./Topbar.jsx";

export default function Layout() {
  const loc = useLocation();
  const showTopbar = loc.pathname !== "/login";

  return (
    <div className="appShell">
      {showTopbar && <Topbar />}
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

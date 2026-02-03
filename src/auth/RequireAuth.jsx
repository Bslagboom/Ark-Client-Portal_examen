import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "./authService.js";

export default function RequireAuth() {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

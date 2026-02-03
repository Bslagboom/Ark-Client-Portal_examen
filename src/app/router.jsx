import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "../components/Layout.jsx";
import RequireAuth from "../auth/RequireAuth.jsx";
import RequireRole from "../auth/RequireRole.jsx";
import { getUser } from "../auth/authService.js";

import LoginPage from "../pages/LoginPage.jsx";
import DashboardClient from "../pages/DashboardClient.jsx";
import DashboardPM from "../pages/DashboardPM.jsx";
import ProjectClient from "../pages/ProjectClient.jsx";
import ProjectPM from "../pages/ProjectPM.jsx";
import AdminUsers from "../pages/AdminUsers.jsx";


function ProjectGate() {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  return user.role === "client" ? <ProjectClient /> : <ProjectPM />;
}


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/login", element: <LoginPage /> },

      {
        element: <RequireAuth />,
        children: [
          {
            path: "/client",
            element: (
              <RequireRole roles={["client"]}>
                <DashboardClient />
              </RequireRole>
            ),
          },
          {
            path: "/pm",
            element: (
              <RequireRole roles={["pm", "admin"]}>
                <DashboardPM />
              </RequireRole>
            ),
          },
          {
            path: "/projects/:id",
            element: <ProjectGate />,
          },
          {
            path: "/admin/users",
            element: (
              <RequireRole roles={["admin"]}>
                <AdminUsers />
              </RequireRole>
            ),
          },
        ],
      },

      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
]);

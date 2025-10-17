import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout.jsx";
import AppLayout from "../layouts/AppLayout.jsx";

import AuthGuard from "./guards/AuthGuard.jsx";
import RoleGuard from "./guards/RoleGuard.jsx";

import Home from "../pages/public/Home.jsx";
import Courses from "../pages/public/Courses.jsx";
import CourseInfo from "../pages/public/CourseInfo.jsx";
import Auth from "../pages/public/Auth.jsx";
import SignUp from "../auth/SignUp.jsx"; // ✅ NEW

import CalendarHome from "../pages/calendar/CalendarHome.jsx";
import StudentDashboard from "../pages/student/Dashboard.jsx";
import TutorDashboard from "../pages/tutor/Dashboard.jsx";
import AdminDashboard from "../pages/admin/Dashboard.jsx";
import NotFound from "../pages/NotFound.jsx";
import SignOut from "../pages/SignOut.jsx";

/**
 * Optional: prevent signed-in users from visiting /auth or /auth/register.
 * Uses the same localStorage key we set after successful login/session check.
 * (Auth.jsx also checks the server session and will redirect, but this makes it route-level.)
 */
function PublicOnly({ children }) {
  let authed = false;
  try {
    const s = JSON.parse(localStorage.getItem("cl_auth") || "null");
    authed = !!s?.user;
  } catch {}
  return authed ? <Navigate to="/app/calendar" replace /> : children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public area */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseInfo />} />
        {/* ✅ Wrap auth routes so logged-in users bounce to /app/calendar */}
        <Route path="/auth" element={<PublicOnly><Auth /></PublicOnly>} />
        <Route path="/auth/register" element={<PublicOnly><SignUp /></PublicOnly>} />
      </Route>

      {/* Private area lives under /app/* so it doesn't hijack "/" */}
      <Route
        path="/app"
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        {/* Default private landing => /app/calendar */}
        <Route index element={<Navigate to="calendar" replace />} />
        <Route path="calendar" element={<CalendarHome />} />

        <Route element={<RoleGuard allow={["student"]} />}>
          <Route path="student" element={<StudentDashboard />} />
        </Route>

        <Route element={<RoleGuard allow={["tutor"]} />}>
          <Route path="tutor" element={<TutorDashboard />} />
        </Route>

        <Route element={<RoleGuard allow={["admin"]} />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        <Route path="signout" element={<SignOut />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

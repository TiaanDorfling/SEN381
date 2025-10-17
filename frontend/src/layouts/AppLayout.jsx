// frontend/src/layouts/AppLayout.jsx
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../logo.svg"; // ⬅️ import the logo URL

export default function AppLayout() {
  const nav = useNavigate();

  // Route to /app/signout so the page can call the backend logout and clear cookie
  function goSignOut() {
    nav("signout", { replace: true }); // relative -> /app/signout
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] bg-cream">
      <header className="bg-white border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Brand + Logo */}
          <button
            onClick={() => nav("/app")}
            className="flex items-center gap-3"
            aria-label="CampusLearn Home"
          >
            <img
              src={logo}
              alt="CampusLearn logo"
              className="h-8 w-8"
              loading="eager"
              decoding="async"
            />
            <span className="text-xl font-heading text-primary">CampusLearn</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm font-sans text-primary-900">Signed in</span>
            <button
              onClick={goSignOut}
              className="px-3 py-1 rounded font-button border border-primary-800 text-primary-800 hover:bg-cream"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[240px,1fr] gap-0">
        <aside className="bg-white border-r border-primary/10">
          <nav className="p-4 flex flex-col gap-2">
            {/* use relative targets under /app */}
            <AppLink to="calendar">Calendar</AppLink>
            <AppLink to="student">Student Dashboard</AppLink>
            <AppLink to="tutor">Tutor Dashboard</AppLink>
            <AppLink to="admin">Admin Dashboard</AppLink>
          </nav>
        </aside>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AppLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded font-sans ${
          isActive ? "bg-lavender text-primary-900" : "text-primary-900 hover:bg-cream"
        }`
      }
      end
    >
      {children}
    </NavLink>
  );
}

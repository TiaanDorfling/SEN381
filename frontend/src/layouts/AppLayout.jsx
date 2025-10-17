import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const nav = useNavigate();
  function signOut() {
    try { localStorage.removeItem("cl_auth"); } catch {}
    nav("/auth", { replace: true });
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] bg-cream">
      <header className="bg-white border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-heading text-primary">CampusLearn</div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-sans text-primary-900">Signed in</span>
            <button
              onClick={signOut}
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
            <AppLink to="/calendar">Calendar</AppLink>
            <AppLink to="/student">Student Dashboard</AppLink>
            <AppLink to="/tutor">Tutor Dashboard</AppLink>
            <AppLink to="/admin">Admin Dashboard</AppLink>
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
    >
      {children}
    </NavLink>
  );
}

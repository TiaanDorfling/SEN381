import { Navigate, Outlet } from "react-router-dom";

function getAuth() {
  try {
    const raw = localStorage.getItem("cl_auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function RoleGuard({ allow = [] }) {
  const auth = getAuth();
  const role = auth?.user?.role;

  if (!role || (allow.length && !allow.includes(role))) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
}

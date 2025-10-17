import { Navigate, Outlet, useLocation } from "react-router-dom";

function getAuth() {
  try {
    const raw = localStorage.getItem("cl_auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function AuthGuard({ children }) {
  const location = useLocation();
  const auth = getAuth();

  if (!auth || !auth.token) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  return children ? children : <Outlet />;
}

import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function SignOut() {
  useEffect(() => {
    (async () => {
      try { await logout(); } catch {}
      try { localStorage.removeItem("cl_auth"); } catch {}
    })();
  }, []);
  return <Navigate to="/auth" replace />;
}

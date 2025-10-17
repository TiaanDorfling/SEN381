import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function SignOut() {
  useEffect(() => {
    try {
      localStorage.removeItem("cl_auth");
    } catch {}
  }, []);
  return <Navigate to="/auth" replace />;
}

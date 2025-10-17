import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSession } from "../../api/auth";

function getLocal() {
  try { return JSON.parse(localStorage.getItem("cl_auth") || "null"); } catch { return null; }
}

export default function AuthGuard({ children }) {
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const local = getLocal();
        if (local?.user) {
          if (alive) { setActive(true); setChecked(true); }
          return;
        }
        const s = await getSession();
        if (!alive) return;
        if (s?.active && s?.user) {
          localStorage.setItem("cl_auth", JSON.stringify({ user: s.user, token: "cookie" }));
          setActive(true);
        } else {
          setActive(false);
        }
      } catch {
        setActive(false);
      } finally {
        if (alive) setChecked(true);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (!checked) {
    return (
      <div style={{display:"grid",placeItems:"center",height:"100vh"}}>
        <div>Loading…</div>
      </div>
    );
  }

  if (!active) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  return children ? children : <Outlet />;
}

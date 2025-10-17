import api from "./axios";

/** POST /api/auth/login */
export async function login({ email, password }) {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { message, user }
}

/** POST /api/auth/register */
export async function register({ name, email, password, role = "student" }) {
  const res = await api.post("/auth/register", { name, email, password, role });
  return res.data; // { message, user }
}

/** GET /api/auth/session */
export async function getSession() {
  const res = await api.get("/auth/session");
  return res.data; // { active, user, exp }
}

/** POST /api/auth/logout */
export async function logout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

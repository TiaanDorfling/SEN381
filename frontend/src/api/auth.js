import api from "./axios";

export async function login({ email, password }) {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

export async function register({ name, email, password, role = "student" }) {
  const res = await api.post("/auth/register", { name, email, password, role });
  return res.data;
}

export async function getSession() {
  const res = await api.get("/auth/session");
  return res.data;
}

export async function logout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

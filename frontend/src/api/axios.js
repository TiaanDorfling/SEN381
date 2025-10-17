import axios from "axios";

const api = axios.create({
  baseURL: "/api",            // IMPORTANT: use the proxy path (not env) in dev
  withCredentials: true,      // needed for the auth cookie
  headers: { "Content-Type": "application/json" },
});

// (Optional) log low-level request/network issues to the console
api.interceptors.response.use(
  r => r,
  err => {
    console.error("[API ERROR]", {
      url: err?.config?.baseURL + err?.config?.url,
      message: err?.message,
      status: err?.response?.status,
      data: err?.response?.data,
    });
    throw err;
  }
);

export default api;

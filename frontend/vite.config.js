import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Anything starting with /api goes to your backend on port 5000
      "/api": { target: "http://localhost:5000", changeOrigin: true },
    },
  },
});

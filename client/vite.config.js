import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   "/api": {
    //     target: "https://192.168.0.196:8080/",
    //     changeOrigin: true,
    //     secure: true,
    //   },
    //   "/auth": {
    //     target: "https://192.168.0.196:8080/",
    //     changeOrigin: true,
    //     secure: true,
    //   }
    // },
  },
});
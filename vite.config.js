import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/graficos_backup/", // <---- ESTA LÍNEA ES LA CLAVE
  plugins: [react()],
});

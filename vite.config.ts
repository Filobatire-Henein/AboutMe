import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://filobatire-henein.github.io/AboutMe/
export default defineConfig({
  base: "/AboutMe/",
  plugins: [react()],
});

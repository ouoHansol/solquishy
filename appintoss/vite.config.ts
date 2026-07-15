import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  publicDir: "../public",
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  css: {
    postcss: { plugins: [] },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    fs: { allow: [".."] },
  },
  build: {
    target: "es2017",
    outDir: "dist",
    emptyOutDir: true,
  },
});

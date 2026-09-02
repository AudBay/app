import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
      "@assets": path.resolve(root, "src/assets"),
    },
  },
  build: {
    outDir: path.resolve(root, "dist"),
    emptyOutDir: true,
  },
});

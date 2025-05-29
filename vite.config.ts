import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./",
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["c8e19ca8-d8c5-4d33-b6db-7383122e17a7.lovableproject.com"],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: mode === "development",
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));

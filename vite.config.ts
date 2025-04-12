import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    sourcemap: true,
  },
  server: {
    port: 3000, // Default port
    strictPort: false, // Allow Vite to try other ports if 3000 is taken
    host: true, // Allow external access
    open: true // Open browser on server start
  }
})

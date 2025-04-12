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
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
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
    open: true, // Open browser on server start
    proxy: {
      '/api/figma': {
        target: 'https://api.figma.com/v1',
        changeOrigin: true,
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to:', req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from:', req.url, 'Status:', proxyRes.statusCode);
          });
        }
      }
    }
  },
})

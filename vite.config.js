import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     proxy: {
//       "/api": {
//         target: "http://216.250.11.9:5005",
//         changeOrigin: true,
//       },
//     },
//   },
// });
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://192.168.11.2:8000",
        changeOrigin: true,
      },
    },
  },
});

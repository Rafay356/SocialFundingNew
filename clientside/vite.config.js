import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "/src/index.jsx", // Make sure Vite looks for index.jsx
    },
  },
  server: {
    port: 3000,
  },
});

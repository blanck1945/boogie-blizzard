import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "remote-blizzard",
      filename: "remoteEntry.js",
      exposes: {
        "./routes": "./src/routes.tsx",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,
  },
});

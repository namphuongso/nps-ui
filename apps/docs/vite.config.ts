import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "nps-ui/style.css",
        replacement: path.resolve(
          __dirname,
          "../../packages/ui/src/styles/index.css",
        ),
      },
      {
        find: "nps-ui",
        replacement: path.resolve(__dirname, "../../packages/ui/src/index.ts"),
      },
    ],
  },
  server: {
    port: 3000,
  },
});

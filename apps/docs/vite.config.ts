import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/nps-ui/",
  plugins: [react()],
  resolve: {
    alias: {
      "nps-ui/style.css": new URL(
        "../../packages/ui/src/styles/index.css",
        import.meta.url,
      ).pathname,
      "nps-ui": new URL("../../packages/ui/src/index.ts", import.meta.url)
        .pathname,
    },
  },
  server: {
    port: 3000,
  },
});

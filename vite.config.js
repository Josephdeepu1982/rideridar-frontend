import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), jsconfigPaths()],
    server: {
        // HMR is enabled by default
        hmr: true,
        watch: { usePolling: true },
    },
});

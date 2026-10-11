import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/gerenciador-tarefas-react/" : "/",
  test: {
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    globals: true,
    exclude: ["node_modules", "e2e/**"],
  },
}));

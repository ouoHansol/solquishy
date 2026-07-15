import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "solquishy",
  brand: {
    displayName: "난 무슨 슬랑이일까?",
    primaryColor: "#FF765F",
    icon: "https://static.toss.im/appsintoss/58641/58ba40e2-2d26-43cc-8805-d8df0ef64372.png",
  },
  web: {
    host: "localhost",
    port: 5173,
    commands: {
      dev: "vite --host 0.0.0.0",
      build: "vite build",
    },
  },
  permissions: [],
  outdir: "dist",
  webViewProps: {
    type: "partner",
  },
});

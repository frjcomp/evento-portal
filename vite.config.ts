// vite.config.js
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const commonPlugins = [
  VitePWA({
    disable: process.env.DISABLE_SERVICE_WORKER === "true",
    registerType: "autoUpdate",
    includeAssets: [
      "favicon.ico",
      "icon.svg",
      "icons/apple-touch-icon-180x180.png",
    ],
    workbox: {
      // Exclude all files in apps directory from beeing intercepted
      // by the service worker
      navigateFallbackDenylist: [/^\/apps/],

      // Define files to be pre-cached (all except the files in apps dir)
      globIgnores: ["apps/**/*"],
      globPatterns: ["**/*{js,css,html,ico,png,svg,woff}"],
    },
    manifest: {
      name: "Evento",
      short_name: "EVT",
      description: "Schulverwaltungsapplikation des Kantons Bern",
      theme_color: "#EA161F",
      icons: [
        {
          src: "icons/pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "icons/maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  }),
];

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: process.env.SSL ? [...commonPlugins, basicSsl()] : commonPlugins,
});

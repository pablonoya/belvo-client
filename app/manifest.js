export default function manifest() {
  return {
    name: "Belvo client",
    short_name: "Belvo client",
    description: "Belvo client",
    id: "BelvoClient",
    start_url: "/",
    display: "standalone",
    background_color: "#3B82F6",
    theme_color: "#3B82F6",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/desktop.webp",
        type: "image/webp",
        sizes: "1920x1080",
        form_factor: "wide",
      },
      {
        src: "/web-app-manifest-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  }
}

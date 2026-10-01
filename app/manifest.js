import { site } from "@/lib/content";

export default function manifest() {
  return {
    name: site.name,
    short_name: site.initials,
    description: site.tagline,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#F7F2E9",
    theme_color: "#F7F2E9",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

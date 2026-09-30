import { site } from "@/lib/content";

export default function manifest() {
  return {
    name: site.name,
    short_name: site.initials,
    description: site.tagline,
    start_url: "/",
    display: "browser",
    background_color: "#F8F3E8",
    theme_color: "#F8F3E8",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

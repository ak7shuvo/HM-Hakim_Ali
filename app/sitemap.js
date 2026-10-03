import { navLinks } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

export default function sitemap() {
  const paths = Array.from(
    new Set(["/", ...navLinks.map((l) => l.href), "/contact"])
  );

  return paths.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
  }));
}

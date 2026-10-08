import type {MetadataRoute} from "next";
import {getPathname} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";
import {getSiteUrl} from "@/lib/config/public";

const routes = ["/", "/services", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  const lastModified = new Date();

  return routes.flatMap((href) =>
    routing.locales.map((locale) => {
      const pathname = getPathname({locale, href});
      const languages = Object.fromEntries(
        routing.locales.map((alternateLocale) => [
          alternateLocale,
          new URL(getPathname({locale: alternateLocale, href}), origin).toString()
        ])
      );

      return {
        url: new URL(pathname, origin).toString(),
        lastModified,
        changeFrequency: href === "/" ? "weekly" as const : "monthly" as const,
        priority: href === "/" ? 1 : 0.8,
        alternates: {languages: {...languages, "x-default": new URL(getPathname({locale: "fr", href}), origin).toString()}}
      };
    })
  );
}

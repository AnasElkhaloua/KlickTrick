import type {MetadataRoute} from "next";
import {getSiteUrl, isPublicIndexingEnabled} from "@/lib/config/public";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteUrl();
  const indexingEnabled = isPublicIndexingEnabled();

  return {
    rules: indexingEnabled
      ? {userAgent: "*", allow: "/"}
      : {userAgent: "*", disallow: "/"},
    ...(indexingEnabled ? {sitemap: new URL("/sitemap.xml", origin).toString()} : {}),
    host: origin.origin
  };
}

import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/about": {
      fr: "/a-propos",
      en: "/about"
    },
    "/contact": "/contact"
  }
});

export type AppLocale = (typeof routing.locales)[number];

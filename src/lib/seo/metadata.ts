import type {Metadata} from "next";
import {getPathname} from "@/i18n/navigation";
import type {AppLocale} from "@/i18n/routing";
import type {AppPathname} from "@/content/navigation";

type LocalizedMetadataInput = {
  locale: AppLocale;
  pathname: AppPathname;
  title: string;
  description: string;
};

export function createLocalizedMetadata({
  locale,
  pathname,
  title,
  description
}: LocalizedMetadataInput): Metadata {
  const canonical = getPathname({locale, href: pathname});

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        fr: getPathname({locale: "fr", href: pathname}),
        en: getPathname({locale: "en", href: pathname}),
        "x-default": getPathname({locale: "fr", href: pathname})
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: locale === "fr" ? "fr_MA" : "en_MA",
      type: "website"
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}

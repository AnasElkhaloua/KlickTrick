import {hasLocale} from "next-intl";
import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";
import {AboutPageContent} from "@/components/about/about-page";
import {routing} from "@/i18n/routing";
import {createLocalizedMetadata} from "@/lib/seo/metadata";

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale, namespace: "Metadata"});
  return createLocalizedMetadata({locale, pathname: "/about", title: t("aboutTitle"), description: t("aboutDescription")});
}

export default async function AboutPage() {
  return <AboutPageContent />;
}

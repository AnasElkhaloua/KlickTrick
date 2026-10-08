import {getTranslations} from "next-intl/server";
import {hasLocale} from "next-intl";
import {notFound} from "next/navigation";
import {Homepage} from "@/components/home/homepage";
import {routing} from "@/i18n/routing";
import {createLocalizedMetadata} from "@/lib/seo/metadata";

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale, namespace: "Metadata"});
  return createLocalizedMetadata({locale, pathname: "/", title: t("homeTitle"), description: t("description")});
}

export default async function HomePage() {
  return <Homepage />;
}

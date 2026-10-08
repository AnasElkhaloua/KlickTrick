import {hasLocale} from "next-intl";
import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";
import {ContactPageContent} from "@/components/contact/contact-page";
import {routing} from "@/i18n/routing";
import {createLocalizedMetadata} from "@/lib/seo/metadata";

type Props = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale, namespace: "Metadata"});
  return createLocalizedMetadata({locale, pathname: "/contact", title: t("contactTitle"), description: t("contactDescription")});
}

export default async function ContactPage() {
  return <ContactPageContent />;
}

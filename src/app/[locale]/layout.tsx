import type {Metadata} from "next";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {Poppins} from "next/font/google";
import {routing} from "@/i18n/routing";
import {getSiteUrl, isPublicIndexingEnabled} from "@/lib/config/public";
import {SiteHeader} from "@/components/layout/site-header";
import {SiteFooter} from "@/components/layout/site-footer";
import {FloatingWhatsApp} from "@/components/layout/floating-whatsapp";
import {PageBackground} from "@/components/layout/page-background";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "optional"
});

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Pick<Props, "params">): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({locale, namespace: "Metadata"});

  return {
    metadataBase: getSiteUrl(),
    title: {
      default: t("title"),
      template: `%s | Klick Trick`
    },
    description: t("description"),
    applicationName: "Klick Trick",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        "x-default": "/fr"
      }
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_MA" : "en_MA",
      siteName: "Klick Trick",
      title: t("title"),
      description: t("description")
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description")
    },
    robots: isPublicIndexingEnabled()
      ? {index: true, follow: true}
      : {index: false, follow: false, noarchive: true}
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const accessibility = await getTranslations({locale, namespace: "Accessibility"});

  return (
    <html lang={locale} className={poppins.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={null}>
          <a href="#main-content" className="focus-skip">{accessibility("skipToContent")}</a>
          <PageBackground />
          <SiteHeader />
          <div id="main-content" tabIndex={-1} className="outline-none">{children}</div>
          <SiteFooter />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import {getLocale, getTranslations} from "next-intl/server";
import {buttonClassName} from "@/components/ui/button";
import {getWhatsAppNumber} from "@/lib/config/public";
import {createWhatsAppUrl} from "@/lib/whatsapp";

export async function WhatsAppCta() {
  const number = getWhatsAppNumber();
  if (!number) return null;

  const locale = await getLocale();
  const t = await getTranslations("WhatsApp");
  const href = createWhatsAppUrl(number, t("message"));

  return <a href={href} target="_blank" rel="noopener noreferrer" lang={locale} className={buttonClassName("secondary", "w-full sm:w-auto")}>{t("cta")}</a>;
}

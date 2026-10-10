import {getLocale, getTranslations} from "next-intl/server";
import {buttonClassName, RollText} from "@/components/ui/button";
import {getWhatsAppNumber} from "@/lib/config/public";
import {createWhatsAppUrl} from "@/lib/whatsapp";

export async function ContactWhatsApp() {
  const number = getWhatsAppNumber();
  if (!number) return null;
  const locale = await getLocale();
  const t = await getTranslations("WhatsApp");

  return <a data-magnetic href={createWhatsAppUrl(number, t("message"))} target="_blank" rel="noopener noreferrer" lang={locale} className={buttonClassName("secondary", "w-full")}><RollText>{t("cta")}</RollText></a>;
}

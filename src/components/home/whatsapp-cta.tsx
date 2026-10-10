import {getLocale, getTranslations} from "next-intl/server";
import {buttonClassName, RollText} from "@/components/ui/button";
import {getWhatsAppNumber} from "@/lib/config/public";
import {createWhatsAppUrl} from "@/lib/whatsapp";

export async function WhatsAppCta() {
  const number = getWhatsAppNumber();
  if (!number) return null;

  const locale = await getLocale();
  const t = await getTranslations("WhatsApp");
  const href = createWhatsAppUrl(number, t("message"));

  return <a data-magnetic href={href} target="_blank" rel="noopener noreferrer" lang={locale} className={buttonClassName("secondary", "w-full sm:w-auto")}><RollText>{t("cta")}</RollText></a>;
}

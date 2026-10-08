import {getLocale, getTranslations} from "next-intl/server";
import {getWhatsAppNumber} from "@/lib/config/public";
import {createWhatsAppUrl} from "@/lib/whatsapp";

export async function FloatingWhatsApp() {
  const number = getWhatsAppNumber();
  if (!number) return null;

  const locale = await getLocale();
  const t = await getTranslations("WhatsApp");
  const href = createWhatsAppUrl(number, t("message"));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      lang={locale}
      className="accent-gradient fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid size-14 place-items-center rounded-full text-black shadow-[0_14px_45px_rgba(86,166,216,0.3)] transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-reduce:transform-none sm:right-8"
    >
      <span aria-hidden="true" className="text-sm font-extrabold">WA</span>
      <span className="sr-only">{t("label")}</span>
    </a>
  );
}

import {getLocale, getTranslations} from "next-intl/server";
import {ContactForm} from "@/components/contact/contact-form";
import {ContactWhatsApp} from "@/components/contact/contact-whatsapp";
import {SplitWords} from "@/components/motion/split-words";
import {PageHero} from "@/components/pages/page-hero";
import {Container} from "@/components/ui/container";
import {contactSubjects} from "@/lib/contact/schema";

const expectationSteps = ["review", "context", "reply"] as const;
const cardClass = "rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)]";

export async function ContactPageContent() {
  const locale = await getLocale() as "fr" | "en";
  const t = await getTranslations("Contact");
  const subjects = contactSubjects.map((value) => ({value, label: t(`form.subjects.${value}`)}));

  return (
    <main className="overflow-hidden">
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} />

      <section className="pb-[var(--section-space)]">
        <Container>
          <div className="mx-auto grid max-w-5xl items-start gap-4 lg:grid-cols-[1.45fr_.75fr]">
            <div id="contact-form" data-reveal className={`${cardClass} spotlight scroll-mt-28 p-6 sm:p-9`}>
              <svg viewBox="0 0 24 24" className="size-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 5h16v11H8l-4 4V5Z" strokeLinejoin="round"/></svg>
              <h2 className="display mt-5 text-balance text-3xl text-white sm:text-4xl"><SplitWords text={t("form.title")} /></h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-muted)] sm:text-base">{t("form.description")}</p>
              <ContactForm locale={locale} subjects={subjects} copy={{
                firstName: t("form.fields.firstName"), phone: t("form.fields.phone"), email: t("form.fields.email"), emailOptional: t("form.fields.optional"), subject: t("form.fields.subject"), subjectPlaceholder: t("form.fields.subjectPlaceholder"), message: t("form.fields.message"), submit: t("form.submit"), submitting: t("form.submitting"), privacy: t("form.privacy")
              }}/>
            </div>

            <aside data-stagger className="grid gap-4 lg:sticky lg:top-24">
              <div className={`${cardClass} spotlight relative overflow-hidden p-6 sm:p-7`}>
                <div className="absolute -right-16 -top-16 size-48 rounded-full bg-[var(--color-blue)]/20 blur-[60px]" aria-hidden="true"/>
                <h2 className="relative text-xl tracking-[-0.03em] text-white">{t("expectations.title")}</h2>
                <ol className="relative mt-6 space-y-5">
                  {expectationSteps.map((step, index) => (
                    <li key={step} className="grid grid-cols-[28px_1fr] gap-3">
                      <span className="grid size-7 place-items-center rounded-full border border-[var(--color-line)] text-xs text-white">{index + 1}</span>
                      <div>
                        <h3 className="text-sm text-white">{t(`expectations.steps.${step}.title`)}</h3>
                        <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{t(`expectations.steps.${step}.description`)}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className={`${cardClass} spotlight p-6 sm:p-7`}>
                <h2 className="text-xl tracking-[-0.03em] text-white">{t("alternative.title")}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{t("alternative.description")}</p>
                <div className="mt-5"><ContactWhatsApp/></div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}

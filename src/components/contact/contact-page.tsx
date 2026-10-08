import {getLocale, getTranslations} from "next-intl/server";
import {ContactForm} from "@/components/contact/contact-form";
import {ContactWhatsApp} from "@/components/contact/contact-whatsapp";
import {Card} from "@/components/ui/card";
import {Container} from "@/components/ui/container";
import {contactSubjects} from "@/lib/contact/schema";

const expectationSteps = ["review", "context", "reply"] as const;

export async function ContactPageContent() {
  const locale = await getLocale() as "fr" | "en";
  const t = await getTranslations("Contact");
  const subjects = contactSubjects.map((value) => ({value, label: t(`form.subjects.${value}`)}));

  return (
    <main className="overflow-hidden">
      <section className="pb-16 pt-16 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
            <div><p className="eyebrow">{t("hero.eyebrow")}</p><h1 className="max-w-4xl text-balance text-[clamp(2.65rem,6vw,5.25rem)] font-semibold leading-[.99] tracking-[-.055em] text-white">{t("hero.title")}</h1></div>
            <p className="max-w-2xl text-pretty text-base leading-8 text-[var(--color-muted)] sm:text-lg">{t("hero.description")}</p>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28 lg:pb-32">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_.75fr] lg:gap-10">
            <Card id="contact-form" className="scroll-mt-28 border-white/10 bg-[var(--color-surface)] p-6 sm:p-9 lg:p-10">
              <p className="eyebrow">{t("form.eyebrow")}</p>
              <h2 className="text-balance text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">{t("form.title")}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">{t("form.description")}</p>
              <ContactForm locale={locale} subjects={subjects} copy={{
                firstName: t("form.fields.firstName"), phone: t("form.fields.phone"), email: t("form.fields.email"), emailOptional: t("form.fields.optional"), subject: t("form.fields.subject"), subjectPlaceholder: t("form.fields.subjectPlaceholder"), message: t("form.fields.message"), submit: t("form.submit"), submitting: t("form.submitting"), privacy: t("form.privacy")
              }}/>
            </Card>

            <aside className="grid gap-5 lg:sticky lg:top-8">
              <Card className="relative overflow-hidden bg-[var(--color-surface-soft)]">
                <div className="absolute -right-20 -top-20 size-56 rounded-full bg-[var(--color-blue)]/18 blur-[70px]" aria-hidden="true"/>
                <div className="relative"><p className="eyebrow">{t("expectations.eyebrow")}</p><h2 className="text-2xl font-semibold tracking-[-.035em] text-white">{t("expectations.title")}</h2><ol className="mt-7 space-y-6">{expectationSteps.map((step, index) => <li key={step} className="grid grid-cols-[40px_1fr] gap-4"><span className="grid size-10 place-items-center rounded-full border border-[var(--color-blue)]/25 bg-black/30 text-xs font-semibold text-[var(--color-mint)]">0{index + 1}</span><div><h3 className="text-sm font-semibold text-white sm:text-base">{t(`expectations.steps.${step}.title`)}</h3><p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{t(`expectations.steps.${step}.description`)}</p></div></li>)}</ol></div>
              </Card>
              <Card className="bg-black/35"><p className="eyebrow">{t("alternative.eyebrow")}</p><h2 className="text-2xl font-semibold tracking-[-.035em] text-white">{t("alternative.title")}</h2><p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{t("alternative.description")}</p><div className="mt-6"><ContactWhatsApp/></div></Card>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}

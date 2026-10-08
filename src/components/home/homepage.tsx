import {getTranslations} from "next-intl/server";
import {HeroVisual} from "@/components/home/hero-visual";
import {ServiceIcon} from "@/components/home/service-icon";
import {WhatsAppCta} from "@/components/home/whatsapp-cta";
import {ButtonLink} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Container} from "@/components/ui/container";
import {SectionHeading} from "@/components/ui/section-heading";
import {serviceCategories} from "@/content/services";
import {Link} from "@/i18n/navigation";

const differentiators = ["integrated", "tailored", "creative", "clear"] as const;
const processSteps = ["discovery", "strategy", "execution", "optimization"] as const;
const audiences = ["startups", "ecommerce", "professionals", "established"] as const;

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export async function Homepage() {
  const t = await getTranslations("Home");

  return (
    <main className="overflow-hidden">
      <section className="relative pb-20 pt-16 sm:pb-24 sm:pt-24 lg:pb-32 lg:pt-28">
        <Container>
          <div className="mx-auto max-w-[1040px] text-center">
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1 className="text-balance text-[clamp(2.65rem,6.6vw,5.75rem)] font-semibold leading-[.98] tracking-[-0.06em] text-white">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-7 max-w-[760px] text-pretty text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              {t("hero.description")}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href={{pathname: "/contact", hash: "contact-form"}} className="w-full sm:w-auto">{t("hero.primaryCta")}</ButtonLink>
              <ButtonLink href="/services" variant="secondary" className="w-full gap-2 sm:w-auto">{t("hero.secondaryCta")}<ArrowIcon /></ButtonLink>
            </div>
          </div>
          <HeroVisual label={t("hero.visualLabel")} />
        </Container>
      </section>

      <section id="services" className="section-space scroll-mt-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr] lg:items-end lg:gap-24">
            <div>
              <p className="eyebrow">{t("services.eyebrow")}</p>
              <h2 className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white">{t("services.title")}</h2>
            </div>
            <p className="max-w-2xl text-pretty text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">{t("services.description")}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-7">
            {serviceCategories.map((service, index) => (
              <Card key={service.id} className="group relative min-h-[292px] overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-[var(--color-blue)]/35 motion-reduce:transform-none">
                <div className="absolute -right-12 -top-12 size-36 rounded-full bg-[var(--color-blue)]/0 blur-3xl transition duration-500 group-hover:bg-[var(--color-blue)]/15" aria-hidden="true" />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4"><ServiceIcon name={service.icon} /><span className="text-xs font-semibold tracking-[.14em] text-white/65">0{index + 1}</span></div>
                  <h3 className="mt-8 text-xl font-semibold tracking-[-.025em] text-white sm:text-2xl">{t(`services.items.${service.id}.title`)}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] sm:text-base">{t(`services.items.${service.id}.description`)}</p>
                  <Link href="/services" className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-white transition hover:text-[var(--color-mint)] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint)]">
                    {t("services.cardCta")}<ArrowIcon />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-10 flex justify-center"><ButtonLink href="/services" variant="secondary" className="w-full sm:w-auto">{t("services.allCta")}</ButtonLink></div>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[.88fr_1.12fr] lg:gap-24">
            <div className="relative min-h-[430px] overflow-hidden rounded-[var(--radius-card)] border border-white/8 bg-[var(--color-surface-soft)] p-6 sm:min-h-[540px] sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_44%,rgba(86,166,216,.2),transparent_38%),linear-gradient(145deg,rgba(117,248,210,.04),transparent_65%)]" />
              <div className="absolute inset-[13%] rounded-full border border-white/10" aria-hidden="true" />
              <div className="absolute inset-[24%] rounded-full border border-[var(--color-blue)]/25" aria-hidden="true" />
              <div className="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--color-mint)]/30 bg-black/45 shadow-[0_0_80px_rgba(86,166,216,.25)] sm:size-40"><span className="accent-gradient bg-clip-text text-5xl font-semibold tracking-[-.08em] text-transparent sm:text-6xl">KT</span></div>
              <span className="absolute left-[13%] top-[28%] size-4 rounded-full bg-[var(--color-mint)] shadow-[0_0_24px_var(--color-mint)]" aria-hidden="true" />
              <span className="absolute bottom-[21%] right-[18%] size-5 rounded-full bg-[var(--color-blue)] shadow-[0_0_30px_var(--color-blue)]" aria-hidden="true" />
              <span className="absolute right-[12%] top-[18%] rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs text-white/65">{t("why.visualStrategy")}</span>
              <span className="absolute bottom-[12%] left-[10%] rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs text-white/65">{t("why.visualExecution")}</span>
            </div>
            <div>
              <SectionHeading eyebrow={t("why.eyebrow")} title={t("why.title")} description={t("why.description")} />
              <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
                {differentiators.map((item, index) => (
                  <div key={item} className="grid gap-3 py-6 sm:grid-cols-[52px_1fr] sm:gap-5">
                    <span className="text-sm font-semibold text-[var(--color-mint)]">0{index + 1}</span>
                    <div><h3 className="text-lg font-semibold text-white sm:text-xl">{t(`why.items.${item}.title`)}</h3><p className="mt-2 text-sm leading-7 text-[var(--color-muted)] sm:text-base">{t(`why.items.${item}.description`)}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <SectionHeading eyebrow={t("process.eyebrow")} title={t("process.title")} description={t("process.description")} align="center" />
          <ol className="relative mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-[var(--color-mint)]/20 via-[var(--color-blue)]/65 to-[var(--color-mint)]/20 lg:block" aria-hidden="true" />
            {processSteps.map((step, index) => (
              <li key={step} className="group relative rounded-[1.75rem] border border-white/8 bg-black/35 p-6 backdrop-blur-sm sm:p-7">
                <span className="relative z-10 grid size-16 place-items-center rounded-full border border-[var(--color-blue)]/30 bg-[var(--color-surface)] text-sm font-semibold text-[var(--color-mint)] transition duration-300 group-hover:border-[var(--color-mint)] group-hover:bg-[#20303a]">0{index + 1}</span>
                <h3 className="mt-7 text-xl font-semibold text-white">{t(`process.steps.${step}.title`)}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{t(`process.steps.${step}.description`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <SectionHeading eyebrow={t("audience.eyebrow")} title={t("audience.title")} description={t("audience.description")} />
            <div className="grid gap-5 sm:grid-cols-2">
              {audiences.map((audience, index) => (
                <Card key={audience} className="group min-h-56 bg-[var(--color-surface-soft)] transition duration-300 hover:border-[var(--color-mint)]/30 sm:odd:translate-y-8 sm:odd:motion-reduce:translate-y-0">
                  <div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-full border border-white/10 text-xs font-semibold text-[var(--color-mint)]">0{index + 1}</span><span className="text-2xl text-white/25 transition group-hover:text-[var(--color-mint)]" aria-hidden="true">↗</span></div>
                  <h3 className="mt-8 text-xl font-semibold text-white sm:text-2xl">{t(`audience.items.${audience}.title`)}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{t(`audience.items.${audience}.description`)}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 pt-20 sm:pb-28 lg:pb-32 lg:pt-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#18252e] px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-24 lg:py-24">
            <div className="absolute -left-32 -top-40 size-[430px] rounded-full bg-[var(--color-mint)]/15 blur-[100px]" aria-hidden="true" />
            <div className="absolute -bottom-52 -right-24 size-[500px] rounded-full bg-[var(--color-blue)]/25 blur-[110px]" aria-hidden="true" />
            <div className="relative mx-auto max-w-4xl">
              <p className="eyebrow">{t("finalCta.eyebrow")}</p>
              <h2 className="text-balance text-[clamp(2.3rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-.05em] text-white">{t("finalCta.title")}</h2>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-white/65 sm:text-lg sm:leading-8">{t("finalCta.description")}</p>
              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <ButtonLink href={{pathname: "/contact", hash: "contact-form"}} variant="inverted" className="w-full sm:w-auto">{t("finalCta.primaryCta")}</ButtonLink>
                <WhatsAppCta />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

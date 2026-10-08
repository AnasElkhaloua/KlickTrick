import {getTranslations} from "next-intl/server";
import {ClosingCta} from "@/components/pages/closing-cta";
import {PageHero} from "@/components/pages/page-hero";
import {ButtonLink} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Container} from "@/components/ui/container";
import {SectionHeading} from "@/components/ui/section-heading";

const philosophyItems = ["clarity", "connection", "craft"] as const;
const valueItems = ["curiosity", "relevance", "collaboration", "learning"] as const;
const collaborationSteps = ["listen", "align", "create", "improve"] as const;
const audiences = ["startups", "ecommerce", "professionals", "companies"] as const;

function AboutHeroVisual({label, center, outer, inner}: {label: string; center: string; outer: string; inner: string}) {
  return (
    <div className="relative mx-auto min-h-[400px] w-full max-w-[520px] overflow-hidden rounded-[var(--radius-card)] border border-white/8 bg-[var(--color-surface-soft)] sm:min-h-[520px]" role="img" aria-label={label}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_45%,rgba(117,248,210,.17),transparent_30%),radial-gradient(circle_at_70%_30%,rgba(86,166,216,.2),transparent_36%)]" />
      <div className="absolute inset-[10%] rounded-full border border-white/10" />
      <div className="absolute inset-[23%] rounded-full border border-[var(--color-blue)]/30" />
      <div className="absolute left-1/2 top-1/2 grid size-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--color-mint)]/30 bg-black/65 shadow-[0_0_80px_rgba(86,166,216,.28)] sm:size-44"><span className="accent-gradient bg-clip-text text-center text-xl font-semibold text-transparent sm:text-2xl">{center}</span></div>
      <span className="absolute left-[9%] top-[24%] rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs text-white/65">{outer}</span>
      <span className="absolute bottom-[15%] right-[8%] rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs text-white/65">{inner}</span>
      <span className="absolute right-[16%] top-[16%] size-4 rounded-full bg-[var(--color-mint)] shadow-[0_0_24px_var(--color-mint)]" />
      <span className="absolute bottom-[20%] left-[17%] size-5 rounded-full bg-[var(--color-blue)] shadow-[0_0_30px_var(--color-blue)]" />
    </div>
  );
}

export async function AboutPageContent() {
  const t = await getTranslations("About");

  return (
    <main className="overflow-hidden">
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} actions={<ButtonLink href={{pathname: "/contact", hash: "contact-form"}} className="w-full sm:w-auto">{t("hero.cta")}</ButtonLink>} visual={<AboutHeroVisual label={t("hero.visualLabel")} center={t("hero.visualCenter")} outer={t("hero.visualOuter")} inner={t("hero.visualInner")}/>} />

      <section className="section-space border-y border-white/[.07] bg-white/[.018]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
            <p className="eyebrow">{t("introduction.eyebrow")}</p>
            <div><h2 className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-.045em] text-white">{t("introduction.title")}</h2><p className="mt-7 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">{t("introduction.description")}</p></div>
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <SectionHeading eyebrow={t("mission.eyebrow")} title={t("mission.title")} description={t("mission.description")} />
            <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/8 bg-[var(--color-surface)] p-8 sm:p-12">
              <div className="absolute -right-24 -top-24 size-72 rounded-full bg-[var(--color-blue)]/15 blur-[80px]" aria-hidden="true" />
              <p className="relative text-balance text-2xl font-medium leading-snug tracking-[-.035em] text-white sm:text-3xl">{t("mission.statement")}</p>
              <div className="relative mt-10 h-px w-full bg-gradient-to-r from-[var(--color-mint)] via-[var(--color-blue)] to-transparent" />
              <p className="relative mt-6 text-sm leading-7 text-[var(--color-muted)] sm:text-base">{t("mission.note")}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <SectionHeading eyebrow={t("philosophy.eyebrow")} title={t("philosophy.title")} description={t("philosophy.description")} align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
            {philosophyItems.map((item, index) => <Card key={item} className="group min-h-72 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-blue)]/35 motion-reduce:transform-none"><span className="text-sm font-semibold text-[var(--color-mint)]">0{index + 1}</span><h3 className="mt-10 text-2xl font-semibold text-white">{t(`philosophy.items.${item}.title`)}</h3><p className="mt-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">{t(`philosophy.items.${item}.description`)}</p></Card>)}
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div className="relative min-h-[420px] overflow-hidden rounded-[var(--radius-card)] border border-white/8 bg-[var(--color-surface-soft)] p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(86,166,216,.22),transparent_42%)]" />
              <div className="relative grid h-full min-h-[356px] grid-cols-2 gap-4">
                {["strategy", "creative", "technology", "growth"].map((item, index) => <div key={item} className="grid place-items-center rounded-2xl border border-white/10 bg-black/30 p-5 text-center text-sm font-semibold text-white/75 backdrop-blur-sm" style={{transform: `translateY(${index % 2 ? 18 : -6}px)`}}>{t(`approach.pillars.${item}`)}</div>)}
              </div>
            </div>
            <div><SectionHeading eyebrow={t("approach.eyebrow")} title={t("approach.title")} description={t("approach.description")} /><p className="mt-6 text-base leading-8 text-white/75">{t("approach.detail")}</p><ButtonLink href="/services" variant="secondary" className="mt-9 w-full sm:w-auto">{t("approach.cta")}</ButtonLink></div>
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.68fr_1.32fr] lg:gap-20">
            <SectionHeading eyebrow={t("values.eyebrow")} title={t("values.title")} description={t("values.description")} />
            <div className="divide-y divide-white/10 border-y border-white/10">
              {valueItems.map((item, index) => <div key={item} className="grid gap-3 py-6 sm:grid-cols-[52px_1fr] sm:gap-5"><span className="text-sm font-semibold text-[var(--color-mint)]">0{index + 1}</span><div><h3 className="text-lg font-semibold text-white sm:text-xl">{t(`values.items.${item}.title`)}</h3><p className="mt-2 text-sm leading-7 text-[var(--color-muted)] sm:text-base">{t(`values.items.${item}.description`)}</p></div></div>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <SectionHeading eyebrow={t("collaboration.eyebrow")} title={t("collaboration.title")} description={t("collaboration.description")} align="center" />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {collaborationSteps.map((step, index) => <li key={step} className="rounded-[1.75rem] border border-white/8 bg-black/35 p-6"><span className="grid size-12 place-items-center rounded-full bg-[var(--color-surface)] text-xs font-semibold text-[var(--color-mint)]">0{index + 1}</span><h3 className="mt-6 text-xl font-semibold text-white">{t(`collaboration.steps.${step}.title`)}</h3><p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{t(`collaboration.steps.${step}.description`)}</p></li>)}
          </ol>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <div className="grid items-end gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <SectionHeading eyebrow={t("audience.eyebrow")} title={t("audience.title")} description={t("audience.description")} />
            <ul className="grid gap-3 sm:grid-cols-2">{audiences.map((audience) => <li key={audience} className="rounded-2xl border border-white/10 bg-[var(--color-surface-soft)] px-5 py-5 text-sm font-semibold text-white sm:text-base">{t(`audience.items.${audience}`)}</li>)}</ul>
          </div>
        </Container>
      </section>

      <ClosingCta eyebrow={t("closing.eyebrow")} title={t("closing.title")} description={t("closing.description")} buttonLabel={t("closing.cta")}/>
    </main>
  );
}

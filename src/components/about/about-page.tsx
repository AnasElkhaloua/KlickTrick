import {getTranslations} from "next-intl/server";
import {SplitWords} from "@/components/motion/split-words";
import {ClosingCta} from "@/components/pages/closing-cta";
import {PageHero} from "@/components/pages/page-hero";
import {ButtonLink} from "@/components/ui/button";
import {Container} from "@/components/ui/container";
import {SectionHeading} from "@/components/ui/section-heading";
import {cn} from "@/lib/utils/cn";

const philosophyItems = ["clarity", "connection", "craft"] as const;
const valueItems = ["curiosity", "relevance", "collaboration", "learning"] as const;
const collaborationSteps = ["listen", "align", "create", "improve"] as const;
const audiences = ["startups", "ecommerce", "professionals", "companies"] as const;
const pillars = ["strategy", "creative", "technology", "growth"] as const;

const cardClass = "rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)]";

export async function AboutPageContent() {
  const t = await getTranslations("About");

  return (
    <main className="overflow-hidden">
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} actions={<ButtonLink href={{pathname: "/contact", hash: "contact-form"}}>{t("hero.cta")}</ButtonLink>} />

      <section className="section-space">
        <Container>
          <SectionHeading title={t("introduction.title")} description={t("introduction.description")} align="center" className="max-w-4xl" />
        </Container>
      </section>

      {/* Mission statement lights up word by word as it scrolls through the viewport. */}
      <section className="section-space border-y border-[var(--color-line)] bg-[var(--color-surface)]">
        <Container>
          <SectionHeading title={t("mission.title")} description={t("mission.description")} align="center" />
          <p data-scrub-words className="display mx-auto mt-14 max-w-5xl text-balance text-center text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.12] text-white">
            <SplitWords text={t("mission.statement")} />
          </p>
          <p data-reveal className="mx-auto mt-10 max-w-xl text-center text-base leading-7 text-[var(--color-muted)]">{t("mission.note")}</p>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <SectionHeading title={t("philosophy.title")} description={t("philosophy.description")} />
          <div data-stagger className={`${cardClass} mt-12 grid divide-y divide-[var(--color-line)] lg:mt-16 lg:grid-cols-3 lg:divide-x lg:divide-y-0`}>
            {philosophyItems.map((item) => (
              <div key={item} className="spotlight p-8 sm:p-10">
                <h3 className="text-2xl tracking-[-0.03em] text-white">{t(`philosophy.items.${item}.title`)}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">{t(`philosophy.items.${item}.description`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading title={t("approach.title")} description={t("approach.description")} />
              <p data-reveal className="mt-5 max-w-2xl text-base leading-7 text-white/80">{t("approach.detail")}</p>
              <ButtonLink href="/services" variant="secondary" className="mt-9">{t("approach.cta")}</ButtonLink>
            </div>
            <div data-stagger className="grid grid-cols-2 gap-3">
              {pillars.map((item, index) => (
                <div key={item} className={cn(cardClass, "spotlight relative grid min-h-40 place-items-center overflow-hidden p-6 sm:min-h-52", index === 0 && "border-[var(--color-blue)]/40 bg-[radial-gradient(ellipse_at_50%_120%,rgba(86,166,216,.4),var(--color-surface)_70%)]", index === 3 && "bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:28px_28px]")}>
                  <span className="font-display text-xl tracking-[-0.03em] text-white sm:text-2xl">{t(`approach.pillars.${item}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Values timeline: the spine draws itself while items alternate sides. */}
      <section className="section-space">
        <Container>
          <SectionHeading title={t("values.title")} description={t("values.description")} align="center" />
          <ol className="relative mx-auto mt-14 max-w-4xl lg:mt-20">
            <span data-line aria-hidden="true" className="absolute bottom-0 left-3 top-0 w-px origin-top bg-gradient-to-b from-[var(--color-blue)] via-white/30 to-transparent md:left-1/2" />
            {valueItems.map((item, index) => (
              <li key={item} data-reveal className={cn("relative pb-12 pl-12 md:w-1/2 md:pl-0", index % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right")}>
                <span aria-hidden="true" className={cn("absolute top-2 size-2.5 rounded-full bg-[var(--color-blue)] shadow-[0_0_16px_var(--color-blue)]", "left-[7px]", index % 2 ? "md:-left-[5px]" : "md:left-auto md:-right-[5px]")} />
                <h3 className="text-2xl tracking-[-0.03em] text-white">{t(`values.items.${item}.title`)}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] sm:text-base">{t(`values.items.${item}.description`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <SectionHeading title={t("collaboration.title")} description={t("collaboration.description")} />
          <ol data-process className="relative mt-12 grid gap-3 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            <span data-process-line aria-hidden="true" className="absolute left-0 right-0 top-0 hidden h-px origin-left bg-gradient-to-r from-[var(--color-blue)] via-white/40 to-transparent lg:block" />
            {collaborationSteps.map((step) => (
              <li key={step} data-process-step className="border-t border-[var(--color-line)] pt-7 lg:border-t-0 lg:pr-6">
                <h3 className="text-xl tracking-[-0.03em] text-white">{t(`collaboration.steps.${step}.title`)}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{t(`collaboration.steps.${step}.description`)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <SectionHeading title={t("audience.title")} description={t("audience.description")} align="center" />
          <ul data-stagger className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {audiences.map((audience) => (
              <li key={audience} className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-6 py-3 font-display text-lg tracking-[-0.02em] text-white">{t(`audience.items.${audience}`)}</li>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingCta title={t("closing.title")} description={t("closing.description")} buttonLabel={t("closing.cta")}/>
    </main>
  );
}

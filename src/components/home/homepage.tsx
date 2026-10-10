import {getTranslations} from "next-intl/server";
import {HeroVisual} from "@/components/home/hero-visual";
import {ServiceIcon} from "@/components/home/service-icon";
import {WhatsAppCta} from "@/components/home/whatsapp-cta";
import {FluidBackground} from "@/components/motion/fluid-background";
import {ScrollScenes} from "@/components/motion/scroll-motion";
import {SplitWords} from "@/components/motion/split-words";
import {ClosingCta} from "@/components/pages/closing-cta";
import {ButtonLink} from "@/components/ui/button";
import {Container} from "@/components/ui/container";
import {SectionHeading} from "@/components/ui/section-heading";
import {serviceCategories} from "@/content/services";
import {Link} from "@/i18n/navigation";

const differentiators = ["integrated", "tailored", "creative", "clear"] as const;
const processSteps = ["discovery", "strategy", "execution", "optimization"] as const;
const audiences = ["startups", "ecommerce", "professionals", "established"] as const;

const cardClass = "rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)]";

export async function Homepage() {
  const t = await getTranslations("Home");
  const serviceTitles = serviceCategories.map((service) => t(`services.items.${service.id}.title`));

  return (
    <main className="overflow-hidden">
      <ScrollScenes />

      <section className="relative isolate pb-20 pt-36 sm:pt-44 lg:pb-28">
        <FluidBackground />
        <Container>
          <div className="hero-intro mx-auto max-w-4xl text-center">
            <p data-intro className="eyebrow">{t("hero.eyebrow")}</p>
            <h1 className="display text-balance text-[clamp(2.8rem,7vw,5.4rem)] leading-[1] text-white">
              <SplitWords text={t("hero.title")} />
            </h1>
            <p data-intro style={{"--i": 6} as React.CSSProperties} className="mx-auto mt-7 max-w-xl text-pretty text-base leading-7 text-[var(--color-muted)] sm:text-lg">
              {t("hero.description")}
            </p>
            <div data-intro style={{"--i": 8} as React.CSSProperties} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={{pathname: "/contact", hash: "contact-form"}}>{t("hero.primaryCta")}</ButtonLink>
              <ButtonLink href="/services" variant="secondary">{t("hero.secondaryCta")}</ButtonLink>
            </div>
          </div>
          <HeroVisual label={t("hero.visualLabel")} />
        </Container>
      </section>

      {/* One marquee on the page: the six capabilities, as the reference does with its service list. */}
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_18%,#000_82%,transparent)] border-y border-[var(--color-line)] bg-[var(--color-surface)] py-5" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {serviceTitles.map((title) => (
                <span key={title} className="flex items-center whitespace-nowrap font-display text-[clamp(1.25rem,2.4vw,1.9rem)] tracking-[-0.04em] text-white/85">
                  {title}<span className="px-8 text-[var(--color-blue)]">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="services" className="section-space scroll-mt-24">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading title={t("services.title")} description={t("services.description")} />
            <ButtonLink href="/services" variant="secondary" className="self-start lg:self-auto">{t("services.allCta")}</ButtonLink>
          </div>
          <div data-stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {serviceCategories.map((service) => (
              <Link key={service.id} href={{pathname: "/services", hash: service.id}} className={`${cardClass} spotlight group relative flex min-h-[260px] flex-col overflow-hidden p-7 transition-colors duration-300 hover:border-[var(--color-blue)]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]`}>
                <div aria-hidden="true" className="absolute -right-16 -top-16 size-48 rounded-full bg-[var(--color-blue)]/0 blur-3xl transition duration-500 group-hover:bg-[var(--color-blue)]/20" />
                <ServiceIcon name={service.icon} />
                <h3 className="mt-auto pt-10 text-xl tracking-[-0.03em] text-white">{t(`services.items.${service.id}.title`)}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{t(`services.items.${service.id}.description`)}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-white/70 transition group-hover:text-white">{t("services.cardCta")} <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading title={t("why.title")} description={t("why.description")} />
              <div data-stagger className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {differentiators.map((item) => (
                  <div key={item} className="border-t border-[var(--color-line)] pt-5">
                    <h3 className="text-lg tracking-[-0.02em] text-white">{t(`why.items.${item}.title`)}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{t(`why.items.${item}.description`)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div data-orbit data-tilt="8" aria-hidden="true" className={`${cardClass} spotlight relative min-h-[440px] overflow-hidden sm:min-h-[540px]`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(86,166,216,.22),transparent_45%)]" />
              <div data-depth="10" className="absolute inset-[12%]"><div data-orbit-ring className="absolute inset-0 rounded-full border border-dashed border-white/15" /></div>
              <div data-depth="22" className="absolute inset-[24%]"><div data-orbit-ring className="absolute inset-0 rounded-full border border-[var(--color-blue)]/20 border-t-[var(--color-blue)]" /></div>
              <div data-orbit-core data-depth="36" className="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/60 shadow-[0_0_90px_rgba(86,166,216,.35)] sm:size-40">
                <span className="font-display text-5xl tracking-[-0.08em] text-white sm:text-6xl">KT</span>
              </div>
              <span data-orbit-float className="absolute left-[14%] top-[28%] size-3 rounded-full bg-[var(--color-blue)] shadow-[0_0_24px_var(--color-blue)]" />
              <span data-orbit-float className="absolute bottom-[22%] right-[18%] size-4 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,.6)]" />
              <span data-orbit-float className="eyebrow absolute right-[10%] top-[16%] !mb-0 bg-black/60">{t("why.visualStrategy")}</span>
              <span data-orbit-float className="eyebrow absolute bottom-[12%] left-[9%] !mb-0 bg-black/60">{t("why.visualExecution")}</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <SectionHeading title={t("process.title")} description={t("process.description")} />
          <ol data-stagger className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-16">
            {processSteps.map((step, index) => (
              <li key={step} className={`${cardClass} spotlight relative flex min-h-[340px] flex-col overflow-hidden p-8 sm:min-h-[400px] sm:p-10`}>
                <div aria-hidden="true" className={index % 3 === 0 ? "absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_80%_70%_at_70%_100%,rgba(86,166,216,.35),transparent_70%)]" : "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_top,#000,transparent_70%)]"} />
                <h3 className="relative text-2xl tracking-[-0.03em] text-white sm:text-3xl">{t(`process.steps.${step}.title`)}</h3>
                <p className="relative mt-3 max-w-md text-base leading-7 text-[var(--color-muted)]">{t(`process.steps.${step}.description`)}</p>
                <span data-parallax="-40" aria-hidden="true" className="accent relative mt-auto self-end text-[clamp(6rem,12vw,9rem)] leading-[0.9] text-white/[0.12]">0{index + 1}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <SectionHeading title={t("audience.title")} description={t("audience.description")} align="center" />
          <div data-stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {audiences.map((audience, index) => (
              <div key={audience} className={`${cardClass} spotlight group relative flex min-h-[260px] flex-col overflow-hidden p-7 ${index === 1 ? "border-[var(--color-blue)]/35 bg-[linear-gradient(180deg,rgba(86,166,216,.16),var(--color-surface)_70%)]" : ""}`}>
                <h3 className="text-xl tracking-[-0.03em] text-white">{t(`audience.items.${audience}.title`)}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{t(`audience.items.${audience}.description`)}</p>
                <span aria-hidden="true" className="mt-auto pt-8 text-xl text-white/30 transition group-hover:translate-x-1 group-hover:text-[var(--color-blue)]">→</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCta title={t("finalCta.title")} description={t("finalCta.description")} buttonLabel={t("finalCta.primaryCta")}>
        <WhatsAppCta />
      </ClosingCta>
    </main>
  );
}

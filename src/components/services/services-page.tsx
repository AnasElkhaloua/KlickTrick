import {getTranslations} from "next-intl/server";
import {ServiceIcon} from "@/components/home/service-icon";
import {ClosingCta} from "@/components/pages/closing-cta";
import {PageHero} from "@/components/pages/page-hero";
import {ServiceDetail} from "@/components/services/service-detail";
import {buttonClassName, ButtonLink, RollText} from "@/components/ui/button";
import {Container} from "@/components/ui/container";
import {serviceCategories} from "@/content/services";

export async function ServicesPageContent() {
  const t = await getTranslations("Services");

  return (
    <main className="overflow-hidden">
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} actions={<ButtonLink href={{pathname: "/contact", hash: "contact-form"}}>{t("hero.cta")}</ButtonLink>}>
        {/* Overview grid doubles as the in-page navigation to each detail card below. */}
        <nav aria-label={t("navigationLabel")} className="mt-16 sm:mt-20">
          <ul data-stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((service) => (
              <li key={service.id} className="spotlight group overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-surface)]/90 backdrop-blur-sm transition-colors hover:border-[var(--color-blue)]/45">
                <div aria-hidden="true" className="relative grid h-40 place-items-center overflow-hidden border-b border-[var(--color-line)] bg-[radial-gradient(ellipse_at_50%_120%,rgba(86,166,216,.45),rgba(86,166,216,.06)_60%,transparent)]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
                  <span className="relative grid size-16 place-items-center rounded-2xl border border-white/15 bg-black/50 shadow-[0_0_40px_rgba(86,166,216,.35)]"><ServiceIcon name={service.icon} /></span>
                </div>
                <div className="flex items-end justify-between gap-4 p-6">
                  <div>
                    <h2 className="text-lg tracking-[-0.03em] text-white">{t(`items.${service.id}.title`)}</h2>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-[var(--color-muted)]">{t(`items.${service.id}.description`)}</p>
                  </div>
                  <a data-magnetic href={`#${service.id}`} className={buttonClassName("secondary", "min-h-9 shrink-0 px-4 text-[13px]")}><RollText>{t("explore")}</RollText></a>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section className="pb-[var(--section-space)]">
        <Container>
          <div data-stack className="grid gap-6">
            {serviceCategories.map((service, index) => (
              <ServiceDetail key={service.id} id={service.id} icon={service.icon} index={index} title={t(`items.${service.id}.title`)} description={t(`items.${service.id}.description`)} help={t(`items.${service.id}.help`)} inclusions={t.raw(`items.${service.id}.includes`) as string[]} includesLabel={t("includesLabel")} ctaLabel={t("serviceCta")}/>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCta title={t("closing.title")} description={t("closing.description")} buttonLabel={t("closing.cta")}/>
    </main>
  );
}

import {getTranslations} from "next-intl/server";
import {ServiceIcon} from "@/components/home/service-icon";
import {ClosingCta} from "@/components/pages/closing-cta";
import {PageHero} from "@/components/pages/page-hero";
import {ServiceDetail} from "@/components/services/service-detail";
import {ButtonLink} from "@/components/ui/button";
import {Container} from "@/components/ui/container";
import {serviceCategories} from "@/content/services";

function ServicesHeroVisual({label}: {label: string}) {
  return (
    <div className="relative mx-auto min-h-[380px] w-full max-w-[520px] overflow-hidden rounded-[var(--radius-card)] border border-white/8 bg-[var(--color-surface-soft)] sm:min-h-[500px]" role="img" aria-label={label}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(86,166,216,.24),transparent_34%),linear-gradient(145deg,rgba(117,248,210,.04),transparent_65%)]" />
      <div className="absolute left-1/2 top-1/2 size-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 size-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-blue)]/25" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--color-mint)]/30 bg-black/60 shadow-[0_0_70px_rgba(86,166,216,.28)]"><span className="accent-gradient bg-clip-text text-3xl font-semibold tracking-[-.08em] text-transparent">KT</span></div>
      <div className="absolute inset-7 grid grid-cols-3 content-between justify-items-center sm:inset-10">
        {serviceCategories.map((service, index) => <div key={service.id} className={index === 3 ? "col-start-3" : ""}><ServiceIcon name={service.icon}/></div>)}
      </div>
    </div>
  );
}

export async function ServicesPageContent() {
  const t = await getTranslations("Services");

  return (
    <main className="overflow-hidden">
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} description={t("hero.description")} visual={<ServicesHeroVisual label={t("hero.visualLabel")}/>} actions={<ButtonLink href={{pathname: "/contact", hash: "contact-form"}} className="w-full sm:w-auto">{t("hero.cta")}</ButtonLink>} />

      <Container>
        <nav aria-label={t("navigationLabel")} className="border-y border-white/10 py-5">
          <ul className="flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {serviceCategories.map((service, index) => <li key={service.id} className="shrink-0 snap-start"><a href={`#${service.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[.03] px-4 text-sm text-white/70 transition hover:border-[var(--color-blue)]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint)]"><span className="text-[var(--color-mint)]">0{index + 1}</span>{t(`items.${service.id}.title`)}</a></li>)}
          </ul>
        </nav>

        <div className="pt-8">
          {serviceCategories.map((service, index) => (
            <ServiceDetail key={service.id} id={service.id} icon={service.icon} index={index} title={t(`items.${service.id}.title`)} description={t(`items.${service.id}.description`)} help={t(`items.${service.id}.help`)} inclusions={t.raw(`items.${service.id}.includes`) as string[]} includesLabel={t("includesLabel")} ctaLabel={t("serviceCta")}/>
          ))}
        </div>
      </Container>

      <ClosingCta eyebrow={t("closing.eyebrow")} title={t("closing.title")} description={t("closing.description")} buttonLabel={t("closing.cta")}/>
    </main>
  );
}

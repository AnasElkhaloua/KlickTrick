import {ServiceArtwork} from "@/components/services/service-artwork";
import {ButtonLink} from "@/components/ui/button";
import type {ServiceIconName} from "@/content/services";

type ServiceDetailProps = {
  id: string;
  icon: ServiceIconName;
  index: number;
  title: string;
  description: string;
  help: string;
  inclusions: string[];
  includesLabel: string;
  ctaLabel: string;
};

// Sticky on desktop so the cards stack as you scroll; ScrollScenes scales the one being covered.
export function ServiceDetail({id, icon, index, title, description, help, inclusions, includesLabel, ctaLabel}: ServiceDetailProps) {
  return (
    <article
      id={id}
      className="spotlight grid scroll-mt-28 items-center gap-10 rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-7 shadow-[0_-24px_60px_rgba(3,3,4,.7)] sm:p-10 lg:sticky lg:grid-cols-[1.1fr_.9fr] lg:gap-14 lg:p-12"
      style={{top: `calc(6rem + ${index * 14}px)`}}
    >
      <div>
        <h2 className="display text-balance text-[clamp(2rem,3.6vw,3rem)] text-white">{title}</h2>
        <p className="mt-5 text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">{description}</p>
        <p className="mt-5 border-l-2 border-[var(--color-blue)] pl-5 text-sm leading-7 text-white/80 sm:text-base">{help}</p>
        <h3 className="mt-8 text-sm text-[var(--color-muted)]">{includesLabel}</h3>
        <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {inclusions.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-white/85">
              <svg viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-[var(--color-blue)]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {item}
            </li>
          ))}
        </ul>
        <ButtonLink href={{pathname: "/contact", hash: "contact-form"}} className="mt-9">{ctaLabel}</ButtonLink>
      </div>
      <ServiceArtwork icon={icon} index={index}/>
    </article>
  );
}

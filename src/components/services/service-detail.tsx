import {ServiceArtwork} from "@/components/services/service-artwork";
import {ButtonLink} from "@/components/ui/button";
import type {ServiceIconName} from "@/content/services";
import {cn} from "@/lib/utils/cn";

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

export function ServiceDetail({id, icon, index, title, description, help, inclusions, includesLabel, ctaLabel}: ServiceDetailProps) {
  const reversed = index % 2 === 1;

  return (
    <article id={id} className="scroll-mt-28 border-t border-white/10 py-16 sm:py-20 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className={cn(reversed && "lg:order-2")}>
          <p className="text-sm font-semibold tracking-[.14em] text-[var(--color-mint)]">0{index + 1}</p>
          <h2 className="mt-5 text-balance text-[clamp(2.2rem,4.4vw,3.8rem)] font-semibold leading-[1.05] tracking-[-.045em] text-white">{title}</h2>
          <p className="mt-5 text-base leading-8 text-[var(--color-muted)] sm:text-lg">{description}</p>
          <p className="mt-5 border-l-2 border-[var(--color-blue)] pl-5 text-sm leading-7 text-white/75 sm:text-base">{help}</p>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[.13em] text-white">{includesLabel}</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {inclusions.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--color-muted)]"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-mint)]" aria-hidden="true"/>{item}</li>)}
          </ul>
          <ButtonLink href={{pathname: "/contact", hash: "contact-form"}} className="mt-9 w-full sm:w-auto">{ctaLabel}</ButtonLink>
        </div>
        <div className={cn(reversed && "lg:order-1")}><ServiceArtwork icon={icon} index={index}/></div>
      </div>
    </article>
  );
}

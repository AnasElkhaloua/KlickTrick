import type {ReactNode} from "react";
import {Container} from "@/components/ui/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  visual: ReactNode;
};

export function PageHero({eyebrow, title, description, actions, visual}: PageHeroProps) {
  return (
    <section className="relative pb-16 pt-16 sm:pb-24 sm:pt-24 lg:pb-32 lg:pt-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_.96fr] lg:gap-20">
          <div className="max-w-[720px]">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="text-balance text-[clamp(2.65rem,6vw,5.25rem)] font-semibold leading-[.99] tracking-[-.055em] text-white">{title}</h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">{description}</p>
            {actions ? <div className="mt-9 flex flex-col gap-4 sm:flex-row">{actions}</div> : null}
          </div>
          {visual}
        </div>
      </Container>
    </section>
  );
}

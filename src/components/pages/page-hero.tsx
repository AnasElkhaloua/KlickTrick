import type {ReactNode} from "react";
import {FluidBackground} from "@/components/motion/fluid-background";
import {ScrollScenes} from "@/components/motion/scroll-motion";
import {SplitWords} from "@/components/motion/split-words";
import {Container} from "@/components/ui/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children?: ReactNode;
};

// Centered inner-page hero: pill label, large headline with an accent word, short intro.
export function PageHero({eyebrow, title, description, actions, children}: PageHeroProps) {
  return (
    <section className="relative isolate pb-16 pt-36 sm:pb-24 sm:pt-44">
      <ScrollScenes />
      <FluidBackground />
      <Container>
        <div className="hero-intro mx-auto max-w-4xl text-center">
          <p data-intro className="eyebrow">{eyebrow}</p>
          <h1 className="display text-balance text-[clamp(2.6rem,6.4vw,5rem)] text-white"><SplitWords text={title} /></h1>
          <p data-intro style={{"--i": 6} as React.CSSProperties} className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">{description}</p>
          {actions ? <div data-intro style={{"--i": 8} as React.CSSProperties} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">{actions}</div> : null}
        </div>
        {children}
      </Container>
    </section>
  );
}

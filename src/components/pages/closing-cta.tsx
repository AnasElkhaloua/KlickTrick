import type {ReactNode} from "react";
import {FluidBackground} from "@/components/motion/fluid-background";
import {SplitWords} from "@/components/motion/split-words";
import {ButtonLink} from "@/components/ui/button";
import {Container} from "@/components/ui/container";

type ClosingCtaProps = {
  title: string;
  description: string;
  buttonLabel: string;
  children?: ReactNode;
};

export function ClosingCta({title, description, buttonLabel, children}: ClosingCtaProps) {
  return (
    <section className="relative isolate overflow-hidden pb-10 pt-[var(--section-space)]">
      <div data-cta className="absolute inset-0 -z-10"><FluidBackground /></div>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 data-split className="display text-balance text-[clamp(2.4rem,5.6vw,4.4rem)] text-white"><SplitWords text={title} /></h2>
          <p data-reveal className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">{description}</p>
          <div data-reveal className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={{pathname: "/contact", hash: "contact-form"}}>{buttonLabel}</ButtonLink>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

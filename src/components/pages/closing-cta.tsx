import {ButtonLink} from "@/components/ui/button";
import {Container} from "@/components/ui/container";

type ClosingCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
};

export function ClosingCta({eyebrow, title, description, buttonLabel}: ClosingCtaProps) {
  return (
    <section className="pb-20 pt-16 sm:pb-28 sm:pt-24 lg:pb-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#18252e] px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-24 lg:py-24">
          <div className="absolute -left-32 -top-40 size-[430px] rounded-full bg-[var(--color-mint)]/15 blur-[100px]" aria-hidden="true" />
          <div className="absolute -bottom-52 -right-24 size-[500px] rounded-full bg-[var(--color-blue)]/25 blur-[110px]" aria-hidden="true" />
          <div className="relative mx-auto max-w-4xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="text-balance text-[clamp(2.3rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-.05em] text-white">{title}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-white/65 sm:text-lg sm:leading-8">{description}</p>
            <ButtonLink href={{pathname: "/contact", hash: "contact-form"}} variant="inverted" className="mt-9 w-full sm:w-auto">{buttonLabel}</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

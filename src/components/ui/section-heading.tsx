import {cn} from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  level?: 1 | 2;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  level = 2
}: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading className="text-balance text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white">
        {title}
      </Heading>
      {description ? (
        <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}

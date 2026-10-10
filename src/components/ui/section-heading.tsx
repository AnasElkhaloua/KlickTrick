import {SplitWords} from "@/components/motion/split-words";
import {cn} from "@/lib/utils/cn";

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({title, description, align = "left", className}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <h2 data-split className="display text-balance text-[clamp(2.25rem,4.6vw,3.6rem)] text-white">
        <SplitWords text={title} />
      </h2>
      {description ? (
        <p data-reveal className={cn("mt-6 max-w-2xl text-pretty text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

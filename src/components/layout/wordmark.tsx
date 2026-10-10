import {cn} from "@/lib/utils/cn";

export function Wordmark({compact = false, className}: {compact?: boolean; className?: string}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden="true" className="grid size-8 place-items-center rounded-lg bg-[var(--color-foreground)] font-display text-[13px] font-medium tracking-[-0.04em] text-[#030304]">
        KT
      </span>
      {!compact ? <span className="font-display text-lg font-medium tracking-[-0.04em] text-white">Klick Trick</span> : null}
    </span>
  );
}

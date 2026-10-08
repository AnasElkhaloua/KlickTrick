import {cn} from "@/lib/utils/cn";

export function Wordmark({compact = false, className}: {compact?: boolean; className?: string}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="accent-gradient grid size-9 place-items-center rounded-xl text-sm font-extrabold text-black shadow-[0_0_32px_rgba(117,248,210,0.15)]"
      >
        KT
      </span>
      {!compact ? (
        <span className="text-lg font-semibold tracking-[-0.03em] text-white">Klick Trick</span>
      ) : null}
    </span>
  );
}

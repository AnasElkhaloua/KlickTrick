import {ServiceIcon} from "@/components/home/service-icon";
import type {ServiceIconName} from "@/content/services";

export function ServiceArtwork({icon, index}: {icon: ServiceIconName; index: number}) {
  const bars = [42, 67, 53, 78, 61];

  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-[var(--radius-card)] border border-white/8 bg-[var(--color-surface-soft)] p-7 sm:min-h-[390px] sm:p-9" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(86,166,216,.2),transparent_38%),linear-gradient(145deg,rgba(117,248,210,.035),transparent_65%)]" />
      <div className="absolute -right-20 -top-20 size-64 rounded-full border border-[var(--color-blue)]/20" />
      <div className="absolute -right-5 -top-5 size-36 rounded-full border border-white/10" />
      <div className="relative flex items-center justify-between"><ServiceIcon name={icon}/><span className="text-xs font-semibold tracking-[.16em] text-white/30">0{index + 1}</span></div>
      <div className="absolute inset-x-7 bottom-7 rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-sm sm:inset-x-9 sm:bottom-9 sm:p-6">
        <div className="flex h-32 items-end gap-3">
          {bars.map((height, barIndex) => (
            <span key={height} className="flex-1 rounded-t-md border border-white/5 bg-gradient-to-t from-[var(--color-blue)]/35 to-[var(--color-mint)]/80" style={{height: `${(height + index * 7 + barIndex * 3) % 72 + 28}%`}} />
          ))}
        </div>
        <div className="mt-5 h-1.5 w-full rounded-full bg-white/10"><div className="h-full rounded-full accent-gradient" style={{width: `${52 + index * 7}%`}} /></div>
      </div>
    </div>
  );
}

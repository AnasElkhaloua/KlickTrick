import {ServiceIcon} from "@/components/home/service-icon";
import type {ServiceIconName} from "@/content/services";

export function ServiceArtwork({icon, index}: {icon: ServiceIconName; index: number}) {
  const bars = [42, 67, 53, 78, 61];

  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-black p-7 sm:min-h-[380px]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(86,166,216,.35),transparent_55%)]" />
      <div className="absolute -right-20 -top-20 size-64 rounded-full border border-[var(--color-blue)]/25" />
      <div className="absolute -right-5 -top-5 size-36 rounded-full border border-white/10" />
      <div className="relative"><ServiceIcon name={icon}/></div>
      <div className="absolute inset-x-7 bottom-7 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
        <div className="flex h-32 items-end gap-3">
          {bars.map((height, barIndex) => (
            <span key={height} className="flex-1 rounded-t-md bg-gradient-to-t from-[var(--color-blue)]/15 to-[var(--color-blue)]/85" style={{height: `${(height + index * 7 + barIndex * 3) % 72 + 28}%`}} />
          ))}
        </div>
        <div className="mt-5 h-1.5 w-full rounded-full bg-white/10"><div className="h-full rounded-full bg-white/85" style={{width: `${52 + index * 7}%`}} /></div>
      </div>
    </div>
  );
}

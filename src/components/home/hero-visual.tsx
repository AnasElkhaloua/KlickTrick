export function HeroVisual({label}: {label: string}) {
  return (
    <figure className="hero-visual relative mx-auto mt-14 h-[330px] w-full max-w-[820px] sm:h-[430px] lg:mt-16 lg:h-[470px]" aria-label={label}>
      <div aria-hidden="true" className="absolute inset-x-[14%] bottom-3 h-24 rounded-full bg-[var(--color-blue)]/20 blur-[70px]" />

      <div aria-hidden="true" className="hero-panel hero-panel-left absolute bottom-8 left-[4%] z-10 h-[255px] w-[38%] max-w-[250px] -rotate-[7deg] overflow-hidden rounded-[24px] border border-white/15 bg-[#101a22] shadow-2xl sm:bottom-10 sm:h-[350px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(117,248,210,.42),transparent_38%),linear-gradient(145deg,#13212a_5%,#1d3341_52%,#0a1015)]" />
        <svg viewBox="0 0 250 375" className="absolute inset-0 size-full" fill="none">
          <path d="M-20 252C44 173 97 179 126 115c28-62 76-76 145-74" stroke="#75f8d2" strokeOpacity=".42" strokeWidth="2"/>
          <path d="M-20 286c78-53 113-29 156-86 41-55 78-47 135-43" stroke="#56a6d8" strokeOpacity=".34" strokeWidth="2"/>
          <circle cx="126" cy="115" r="7" fill="#75f8d2"/>
          <rect x="25" y="282" width="98" height="8" rx="4" fill="white" fillOpacity=".82"/>
          <rect x="25" y="300" width="142" height="5" rx="2.5" fill="white" fillOpacity=".3"/>
          <rect x="25" y="315" width="116" height="5" rx="2.5" fill="white" fillOpacity=".18"/>
        </svg>
      </div>

      <div aria-hidden="true" className="hero-panel hero-panel-center absolute bottom-5 left-1/2 z-20 h-[285px] w-[42%] max-w-[270px] -translate-x-1/2 overflow-hidden rounded-[24px] border border-white/20 bg-[#17232b] shadow-2xl sm:h-[375px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(86,166,216,.45),transparent_36%),linear-gradient(165deg,#22333e,#10171d_70%)]" />
        <div className="absolute left-[10%] right-[10%] top-[12%] overflow-hidden rounded-xl border border-white/15 bg-black/35 p-3 backdrop-blur-sm">
          <div className="flex gap-1.5"><i className="size-1.5 rounded-full bg-[var(--color-mint)]"/><i className="size-1.5 rounded-full bg-white/30"/><i className="size-1.5 rounded-full bg-white/30"/></div>
          <div className="mt-4 grid grid-cols-[1fr_.55fr] gap-2"><div className="h-16 rounded-md bg-gradient-to-br from-[var(--color-blue)] to-[#24516d]"/><div className="grid gap-2"><div className="rounded-md bg-white/10"/><div className="rounded-md bg-[var(--color-mint)]/20"/></div></div>
          <div className="mt-3 h-2 w-2/3 rounded-full bg-white/70"/><div className="mt-2 h-1.5 w-full rounded-full bg-white/15"/>
        </div>
        <div className="absolute inset-x-[12%] bottom-[12%] grid grid-cols-3 gap-2"><span className="h-14 rounded-lg border border-white/10 bg-white/5"/><span className="h-20 -translate-y-2 rounded-lg bg-[var(--color-mint)]/80"/><span className="h-11 self-end rounded-lg border border-white/10 bg-white/10"/></div>
      </div>

      <div aria-hidden="true" className="hero-panel hero-panel-right absolute bottom-8 right-[4%] z-10 h-[255px] w-[38%] max-w-[250px] rotate-[7deg] overflow-hidden rounded-[24px] border border-white/15 bg-[#101a22] shadow-2xl sm:bottom-10 sm:h-[350px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(117,248,210,.28),transparent_32%),linear-gradient(145deg,#0c1217,#1b2a34)]" />
        <div className="absolute inset-x-[10%] top-[10%] rounded-xl border border-white/10 bg-black/30 p-4">
          <span className="block h-2 w-1/2 rounded-full bg-white/70"/><span className="mt-2 block h-1.5 w-3/4 rounded-full bg-white/15"/>
          <svg viewBox="0 0 190 140" className="mt-4 w-full" fill="none"><path d="M5 122C34 111 39 75 69 86s36-52 65-41 30-28 52-34" stroke="#75f8d2" strokeWidth="4" strokeLinecap="round"/><path d="M5 132h180" stroke="white" strokeOpacity=".15"/><circle cx="134" cy="45" r="6" fill="#56a6d8"/></svg>
        </div>
        <div className="absolute bottom-[10%] left-[10%] right-[10%] flex items-end justify-between"><span className="text-3xl font-semibold text-white/90">↗</span><span className="h-8 w-20 rounded-full bg-[var(--color-blue)]/25"/></div>
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

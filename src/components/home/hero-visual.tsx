// Abstract stage under the hero: three panels in a framed window with a blue rim, fanned apart on scroll.
// ponytail: abstract art stands in for real project screenshots; swap the panels for images once case studies exist.
export function HeroVisual({label}: {label: string}) {
  return (
    <figure data-hero-panels className="relative mx-auto mt-16 w-full max-w-[1100px] lg:mt-20" aria-label={label}>
      <div aria-hidden="true" className="absolute -inset-x-6 -top-6 bottom-1/2 rounded-[2rem] bg-[var(--color-blue)]/25 blur-[60px]" />
      <div data-tilt="5" data-tilt-scope="section" aria-hidden="true" className="relative h-[340px] overflow-hidden rounded-[1.25rem] border border-[var(--color-blue)]/45 bg-[var(--color-surface)] shadow-[inset_0_1px_0_rgba(255,255,255,.08)] sm:h-[460px] lg:h-[540px]">
        <div data-depth="40" className="absolute -inset-[10%] bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(86,166,216,.22),transparent_70%)]" />
        <div data-depth="-24" className="absolute -inset-[10%] bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />

        <div data-panel="left" className="hero-panel hero-panel-left absolute bottom-10 left-[8%] z-10 h-[230px] w-[34%] max-w-[260px] -rotate-[7deg] overflow-hidden rounded-[18px] border border-white/12 bg-[#0d0f12] shadow-2xl sm:h-[330px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(86,166,216,.35),transparent_45%)]" />
          <svg viewBox="0 0 250 375" className="absolute inset-0 size-full" fill="none">
            <path d="M-20 252C44 173 97 179 126 115c28-62 76-76 145-74" stroke="#56a6d8" strokeOpacity=".55" strokeWidth="2"/>
            <path d="M-20 286c78-53 113-29 156-86 41-55 78-47 135-43" stroke="#fff" strokeOpacity=".18" strokeWidth="2"/>
            <circle cx="126" cy="115" r="6" fill="#56a6d8"/>
            <rect x="25" y="282" width="98" height="8" rx="4" fill="white" fillOpacity=".82"/>
            <rect x="25" y="300" width="142" height="5" rx="2.5" fill="white" fillOpacity=".3"/>
            <rect x="25" y="315" width="116" height="5" rx="2.5" fill="white" fillOpacity=".18"/>
          </svg>
        </div>

        <div data-panel="center" className="hero-panel hero-panel-center absolute inset-x-0 bottom-6 z-20 mx-auto h-[260px] w-[38%] max-w-[290px] overflow-hidden rounded-[18px] border border-white/18 bg-[#101318] shadow-2xl sm:h-[360px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(86,166,216,.45),transparent_40%)]" />
          <div className="absolute inset-x-[10%] top-[12%] rounded-xl border border-white/12 bg-black/40 p-3">
            <div className="grid grid-cols-[1fr_.55fr] gap-2"><div className="h-16 rounded-md bg-gradient-to-br from-[var(--color-blue)] to-[#1d4660]"/><div className="grid gap-2"><div className="rounded-md bg-white/10"/><div className="rounded-md bg-white/20"/></div></div>
            <div className="mt-3 h-2 w-2/3 rounded-full bg-white/70"/><div className="mt-2 h-1.5 w-full rounded-full bg-white/15"/>
          </div>
          <div className="absolute inset-x-[12%] bottom-[12%] grid grid-cols-3 gap-2"><span className="h-14 rounded-lg border border-white/10 bg-white/5"/><span className="h-20 -translate-y-2 rounded-lg bg-[var(--color-blue)]/85"/><span className="h-11 self-end rounded-lg border border-white/10 bg-white/10"/></div>
        </div>

        <div data-panel="right" className="hero-panel hero-panel-right absolute bottom-10 right-[8%] z-10 h-[230px] w-[34%] max-w-[260px] rotate-[7deg] overflow-hidden rounded-[18px] border border-white/12 bg-[#0d0f12] shadow-2xl sm:h-[330px]">
          <div className="absolute inset-x-[10%] top-[10%] rounded-xl border border-white/10 bg-black/30 p-4">
            <span className="block h-2 w-1/2 rounded-full bg-white/70"/><span className="mt-2 block h-1.5 w-3/4 rounded-full bg-white/15"/>
            <svg viewBox="0 0 190 140" className="mt-4 w-full" fill="none"><path d="M5 122C34 111 39 75 69 86s36-52 65-41 30-28 52-34" stroke="#56a6d8" strokeWidth="4" strokeLinecap="round"/><path d="M5 132h180" stroke="white" strokeOpacity=".15"/><circle cx="134" cy="45" r="6" fill="#fff"/></svg>
          </div>
          <div className="absolute bottom-[10%] left-[10%] right-[10%] flex items-end justify-between"><span className="h-8 w-20 rounded-full bg-white/90"/><span className="h-8 w-8 rounded-full border border-white/20"/></div>
        </div>
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

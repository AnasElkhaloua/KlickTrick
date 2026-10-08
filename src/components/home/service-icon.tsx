import type {ServiceIconName} from "@/content/services";

const paths: Record<ServiceIconName, React.ReactNode> = {
  growth: <><path d="M5 17 10 12l4 3 5-7"/><path d="M15 8h4v4"/></>,
  spark: <><path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z"/><path d="m18.5 15 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"/></>,
  code: <><path d="m9 8-4 4 4 4"/><path d="m15 8 4 4-4 4"/><path d="m13 5-2 14"/></>,
  community: <><circle cx="8" cy="9" r="3"/><circle cx="17" cy="8" r="2.5"/><path d="M3 20c.5-4 2.2-6 5-6s4.5 2 5 6"/><path d="M14 14c3 0 5 1.8 5.5 5"/></>,
  automation: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><circle cx="12" cy="12" r="4"/><path d="m5.6 5.6 2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></>,
  insight: <><path d="M5 19V9M12 19V5M19 19v-7"/><path d="M3 19h18"/></>
};

export function ServiceIcon({name}: {name: ServiceIconName}) {
  return (
    <span className="grid size-14 place-items-center rounded-xl bg-[var(--color-blue)] text-black transition duration-300 group-hover:scale-105 group-hover:bg-[var(--color-mint)] motion-reduce:transform-none" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </svg>
    </span>
  );
}

"use client";

import {useLocale} from "next-intl";
import type {AppLocale} from "@/i18n/routing";
import {Link, usePathname} from "@/i18n/navigation";
import type {AppPathname} from "@/content/navigation";
import {cn} from "@/lib/utils/cn";

export function LanguageSwitcher({label}: {label: string}) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname() as AppPathname;

  return (
    <div
      className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] p-1"
      aria-label={label}
    >
      {(["fr", "en"] as const).map((item) => (
        <Link
          key={item}
          href={pathname}
          locale={item}
          hrefLang={item}
          aria-current={locale === item ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]",
            locale === item
              ? "bg-white text-black"
              : "text-[var(--color-muted)] hover:text-white"
          )}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}

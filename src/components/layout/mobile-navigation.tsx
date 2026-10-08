"use client";

import {useEffect, useRef, useState} from "react";
import type {AppPathname} from "@/content/navigation";
import {Link} from "@/i18n/navigation";
import {buttonClassName} from "@/components/ui/button";
import {LanguageSwitcher} from "./language-switcher";

type MobileNavigationProps = {
  items: ReadonlyArray<{href: AppPathname; label: string}>;
  openLabel: string;
  closeLabel: string;
  quoteLabel: string;
  navigationLabel: string;
  languageLabel: string;
};

export function MobileNavigation({items, openLabel, closeLabel, quoteLabel, navigationLabel, languageLabel}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        className="grid size-11 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint)]"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </span>
      </button>

      {open ? (
        <div
          id="mobile-navigation"
          className="absolute inset-x-5 top-[calc(100%+0.75rem)] rounded-[28px] border border-white/10 bg-[#0b1115]/[0.98] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:inset-x-8"
        >
          <nav aria-label={navigationLabel}>
            <ul className="grid gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-white transition hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={{pathname: "/contact", hash: "contact-form"}}
              onClick={() => setOpen(false)}
              className={buttonClassName("primary", "mt-4 w-full")}
            >
              {quoteLabel}
            </Link>
            <div className="mt-4 flex justify-center sm:hidden">
              <LanguageSwitcher label={languageLabel} />
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

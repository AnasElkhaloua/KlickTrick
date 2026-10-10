"use client";

import type {ReactNode} from "react";
import type {AppPathname} from "@/content/navigation";
import {Link, usePathname} from "@/i18n/navigation";
import {cn} from "@/lib/utils/cn";

export function NavLink({href, children}: {href: AppPathname; children: ReactNode}) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-[15px] transition hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]",
        active ? "font-medium text-white" : "text-[var(--color-muted)]"
      )}
    >
      {children}
    </Link>
  );
}

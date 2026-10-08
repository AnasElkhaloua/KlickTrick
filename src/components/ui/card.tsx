import type {HTMLAttributes} from "react";
import {cn} from "@/lib/utils/cn";

export function Card({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-white/6 bg-[var(--color-surface)] p-6 sm:p-8",
        className
      )}
      {...props}
    />
  );
}

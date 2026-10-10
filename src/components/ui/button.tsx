import type {AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode} from "react";
import {Link} from "@/i18n/navigation";
import type {AppPathname} from "@/content/navigation";
import {cn} from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary";

const variants: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-[var(--color-foreground)] text-[#030304] hover:bg-white",
  secondary: "border-[var(--color-line)] bg-white/[0.06] text-white hover:border-white/25 hover:bg-white/10"
};

export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-5 text-sm font-medium transition-[color,background-color,border-color,scale] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] motion-reduce:transform-none",
    variants[variant],
    className
  );
}

// Letters roll up on hover; the visual copies are hidden from assistive tech, the sr-only text is read once.
export function RollText({children}: {children: string}) {
  const line = [...children].map((ch, i) => <span key={i} className="roll-ch" style={{"--i": i} as React.CSSProperties}>{ch}</span>);
  return (
    <span className="roll">
      <span className="sr-only">{children}</span>
      <span className="roll-line" aria-hidden="true">{line}</span>
      <span className="roll-line" aria-hidden="true">{line}</span>
    </span>
  );
}

const content = (children: ReactNode) => (typeof children === "string" ? <RollText>{children}</RollText> : children);

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  href: AppPathname | {pathname: AppPathname; hash?: string};
  variant?: ButtonVariant;
};

export function ButtonLink({children, className, href, variant = "primary", ...props}: ButtonLinkProps) {
  return (
    <Link href={href} data-magnetic className={buttonClassName(variant, className)} {...props}>
      {content(children)}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({className, variant = "primary", type = "button", children, ...props}: ButtonProps) {
  return <button type={type} data-magnetic className={buttonClassName(variant, className)} {...props}>{content(children)}</button>;
}

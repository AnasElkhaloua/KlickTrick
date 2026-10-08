import type {AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode} from "react";
import {Link} from "@/i18n/navigation";
import type {AppPathname} from "@/content/navigation";
import {cn} from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "inverted";

const variants: Record<ButtonVariant, string> = {
  primary:
    "accent-gradient border-transparent text-[#071014] shadow-[0_14px_40px_rgba(86,166,216,0.14)] hover:-translate-y-0.5 hover:saturate-125",
  secondary:
    "border-white/55 bg-transparent text-white hover:-translate-y-0.5 hover:border-white hover:bg-white/8",
  inverted: "border-white bg-white text-[#173c52] hover:-translate-y-0.5 hover:bg-white/90"
};

export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-12 items-center justify-center rounded-full border-2 px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint)] focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-reduce:transform-none motion-reduce:transition-none sm:text-base",
    variants[variant],
    className
  );
}

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  href: AppPathname | {pathname: AppPathname; hash?: string};
  variant?: ButtonVariant;
};

export function ButtonLink({children, className, href, variant = "primary", ...props}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClassName(variant, className)} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({className, variant = "primary", type = "button", ...props}: ButtonProps) {
  return <button type={type} className={buttonClassName(variant, className)} {...props} />;
}

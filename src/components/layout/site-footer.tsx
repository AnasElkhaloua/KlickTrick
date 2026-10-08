import {getTranslations} from "next-intl/server";
import {Container} from "@/components/ui/container";
import {ButtonLink} from "@/components/ui/button";
import {Link} from "@/i18n/navigation";
import {navigationItems} from "@/content/navigation";
import {Wordmark} from "./wordmark";
import {LanguageSwitcher} from "./language-switcher";

export async function SiteFooter() {
  const navigation = await getTranslations("Navigation");
  const footer = await getTranslations("Footer");

  return (
    <footer className="border-t border-white/10 bg-black">
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              {footer("tagline")}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-white/60">
              {footer("provisional")}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              {footer("navigation")}
            </h2>
            <ul className="mt-5 grid gap-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-muted)] transition hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint)]"
                  >
                    {navigation(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              {footer("contact")}
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--color-muted)]">
              {footer("contactText")}
            </p>
            <ButtonLink href={{pathname: "/contact", hash: "contact-form"}} className="mt-6">
              {navigation("quote")}
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/55">© {new Date().getFullYear()} Klick Trick. {footer("rights")}</p>
          <LanguageSwitcher label={navigation("language")} />
        </div>
      </Container>
    </footer>
  );
}

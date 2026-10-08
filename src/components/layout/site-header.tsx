import {getTranslations} from "next-intl/server";
import {Container} from "@/components/ui/container";
import {ButtonLink} from "@/components/ui/button";
import {Link} from "@/i18n/navigation";
import {navigationItems} from "@/content/navigation";
import {Wordmark} from "./wordmark";
import {LanguageSwitcher} from "./language-switcher";
import {MobileNavigation} from "./mobile-navigation";

export async function SiteHeader() {
  const t = await getTranslations("Navigation");
  const items = navigationItems.map((item) => ({href: item.href, label: t(item.key)}));

  return (
    <header className="relative z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
      <Container className="flex min-h-20 items-center justify-between gap-6 lg:min-h-[108px]">
        <Link href="/">
          <Wordmark />
        </Link>

        <nav aria-label={t("primaryNavigation")} className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-11">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-[var(--color-muted)] transition hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-mint)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher label={t("language")} />
          </div>
          <ButtonLink href={{pathname: "/contact", hash: "contact-form"}} variant="secondary" className="max-xl:!hidden">
            {t("quote")}
          </ButtonLink>
          <MobileNavigation
            items={items}
            openLabel={t("openMenu")}
            closeLabel={t("closeMenu")}
            quoteLabel={t("quote")}
            navigationLabel={t("mobileNavigation")}
            languageLabel={t("language")}
          />
        </div>
      </Container>
    </header>
  );
}

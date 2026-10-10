import {getTranslations} from "next-intl/server";
import {ButtonLink} from "@/components/ui/button";
import {Link} from "@/i18n/navigation";
import {navigationItems} from "@/content/navigation";
import {Wordmark} from "./wordmark";
import {LanguageSwitcher} from "./language-switcher";
import {MobileNavigation} from "./mobile-navigation";
import {NavLink} from "./nav-link";

export async function SiteHeader() {
  const t = await getTranslations("Navigation");
  const items = navigationItems.map((item) => ({href: item.href, label: t(item.key)}));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      <div className="site-header-inner relative mx-auto flex h-16 items-center justify-between gap-6 px-4 sm:px-6 lg:h-[68px]">
        <Link href="/" className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]">
          <Wordmark />
        </Link>

        <nav aria-label={t("primaryNavigation")} className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher label={t("language")} />
          </div>
          <ButtonLink href={{pathname: "/contact", hash: "contact-form"}} className="min-h-9 px-4 text-[13px] max-lg:!hidden">
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
      </div>
    </header>
  );
}

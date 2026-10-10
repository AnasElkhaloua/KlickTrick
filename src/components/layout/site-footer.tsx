import {getTranslations} from "next-intl/server";
import {Container} from "@/components/ui/container";
import {Link} from "@/i18n/navigation";
import {navigationItems} from "@/content/navigation";
import {serviceCategories} from "@/content/services";
import {SocialIcon} from "./social-icon";
import {LanguageSwitcher} from "./language-switcher";

const linkClass = "text-sm text-white/80 transition hover:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]";

export async function SiteFooter() {
  const navigation = await getTranslations("Navigation");
  const footer = await getTranslations("Footer");
  const services = await getTranslations("Services");

  return (
    <footer className="relative isolate overflow-hidden">
      {/* Oversized wordmark behind the frosted link panel: its lower half reads through the blur, as in the reference.
          ScrollScenes fades it up when the footer comes into view. */}
      <div data-footer-mark aria-hidden="true" className="spotlight-text absolute inset-x-0 top-8 -z-10 select-none whitespace-nowrap px-4 text-center font-display text-[clamp(4.5rem,19vw,17rem)] font-medium leading-[0.8] tracking-[-0.07em]">
        Klick Trick
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 top-[clamp(4rem,12vw,10rem)] -z-10 mx-auto h-48 max-w-4xl rounded-[50%] bg-[var(--color-blue)]/25 blur-[90px]" />

      <div className="mt-[clamp(4.5rem,calc(2rem+9.5vw),10.5rem)] border-t border-[var(--color-line)] bg-black/60 backdrop-blur-[20px]">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-[var(--color-line)] [&>*]:py-9 sm:[&>*]:px-6 lg:[&>*:not(:last-child)]:border-r [&>*]:max-sm:border-b">
            <div className="sm:pl-0">
              <p className="max-w-xs text-sm leading-6 text-[var(--color-muted)]">{footer("tagline")}</p>
              <p className="mt-2 text-xs text-white/40">{footer("provisional")}</p>
              <div className="mt-5 flex items-center gap-2">
                {(["Instagram", "TikTok", "X", "LinkedIn"] as const).map((name) => (
                  <a key={name} href={name === "Instagram" ? "https://www.instagram.com/klicktrickagency/" : "#"} aria-label={name} className="grid size-10 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-blue)]/50 hover:text-[var(--color-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue)]">
                    <SocialIcon name={name} />
                  </a>
                ))}
              </div>
              <div className="mt-6"><LanguageSwitcher label={navigation("language")} /></div>
            </div>

            <div>
              <h2 className="text-sm text-[var(--color-muted)]">{footer("navigation")}</h2>
              <ul className="mt-5 grid gap-3">
                {navigationItems.map((item) => (
                  <li key={item.href}><Link href={item.href} className={linkClass}>{navigation(item.key)}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm text-[var(--color-muted)]">{navigation("services")}</h2>
              <ul className="mt-5 grid gap-3">
                {serviceCategories.map((service) => (
                  <li key={service.id}><Link href={{pathname: "/services", hash: service.id}} className={linkClass}>{services(`items.${service.id}.title`)}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm text-[var(--color-muted)]">{footer("contact")}</h2>
              <p className="mt-5 max-w-xs text-sm leading-6 text-white/80">{footer("contactText")}</p>
              <Link href={{pathname: "/contact", hash: "contact-form"}} className={`${linkClass} mt-4 inline-flex items-center gap-2 font-medium text-white`}>
                {navigation("quote")} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>

        <div className="border-t border-[var(--color-line)] py-6 text-center text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} Klick Trick. {footer("rights")}
        </div>
      </div>
    </footer>
  );
}

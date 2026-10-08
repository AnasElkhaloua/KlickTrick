import {getTranslations} from "next-intl/server";
import {ButtonLink} from "@/components/ui/button";
import {Container} from "@/components/ui/container";

export default async function NotFound() {
  const t = await getTranslations("Errors");

  return (
    <main className="grid min-h-[65vh] place-items-center py-24">
      <Container className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">{t("notFoundTitle")}</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-[var(--color-muted)]">{t("notFoundDescription")}</p>
        <ButtonLink href="/" className="mt-8">{t("backHome")}</ButtonLink>
      </Container>
    </main>
  );
}

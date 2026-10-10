import {getTranslations} from "next-intl/server";
import {ButtonLink} from "@/components/ui/button";
import {Container} from "@/components/ui/container";

export default async function NotFound() {
  const t = await getTranslations("Errors");

  return (
    <main className="grid min-h-[70vh] place-items-center pb-24 pt-40">
      <Container className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="display text-5xl text-white sm:text-6xl">{t("notFoundTitle")}</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-[var(--color-muted)]">{t("notFoundDescription")}</p>
        <ButtonLink href="/" className="mt-8">{t("backHome")}</ButtonLink>
      </Container>
    </main>
  );
}

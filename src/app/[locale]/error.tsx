"use client";

import {useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";
import {Container} from "@/components/ui/container";

export default function ErrorPage({reset}: {error: Error & {digest?: string}; reset: () => void}) {
  const t = useTranslations("Errors");

  return (
    <main className="grid min-h-[65vh] place-items-center py-24">
      <Container className="text-center">
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white">{t("title")}</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-[var(--color-muted)]">{t("description")}</p>
        <Button className="mt-8" onClick={reset}>{t("retry")}</Button>
      </Container>
    </main>
  );
}

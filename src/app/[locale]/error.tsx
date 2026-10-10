"use client";

import {useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";
import {Container} from "@/components/ui/container";

export default function ErrorPage({reset}: {error: Error & {digest?: string}; reset: () => void}) {
  const t = useTranslations("Errors");

  return (
    <main className="grid min-h-[70vh] place-items-center pb-24 pt-40">
      <Container className="text-center">
        <h1 className="display text-5xl text-white">{t("title")}</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-[var(--color-muted)]">{t("description")}</p>
        <Button className="mt-8" onClick={reset}>{t("retry")}</Button>
      </Container>
    </main>
  );
}

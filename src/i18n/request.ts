import * as rootParams from "next/root-params";
import {hasLocale} from "next-intl";
import {notFound} from "next/navigation";
import {getRequestConfig} from "next-intl/server";
import {routing} from "./routing";

export default getRequestConfig(async ({locale}) => {
  if (!locale) {
    const requestedLocale = await rootParams.locale();
    if (!hasLocale(routing.locales, requestedLocale)) notFound();
    locale = requestedLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

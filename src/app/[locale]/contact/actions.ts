"use server";

import {createHash} from "node:crypto";
import {getTranslations} from "next-intl/server";
import {getContactEmailConfig, getContactRateLimitConfig} from "@/lib/config/server";
import {getTrustedClientIp} from "@/lib/contact/client-ip";
import type {ContactFormState} from "@/lib/contact/form-state";
import {createContactRateLimiter} from "@/lib/contact/rate-limit";
import {formDataToContactPayload} from "@/lib/contact/schema";
import {processContactSubmission, type ContactErrorCode} from "@/lib/contact/submission";

export async function submitContact(_previousState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const raw = formDataToContactPayload(formData);
  const locale = raw.locale === "en" ? "en" : "fr";
  const t = await getTranslations({locale, namespace: "Contact.form"});
  const environment = process.env.NODE_ENV;
  const rateConfig = getContactRateLimitConfig();
  const ip = getTrustedClientIp();

  const salt = rateConfig?.salt ?? "development-only-contact-salt";
  const identifier = createHash("sha256").update(`${salt}:${ip ?? "local-development"}`).digest("hex");
  const limiter = createContactRateLimiter(ip ? rateConfig : null, environment);
  const emailConfig = getContactEmailConfig();

  const result = await processContactSubmission(raw, {identifier, limiter, emailConfig});

  if (result.status === "accepted") return {status: "success", message: t("status.accepted"), fieldErrors: {}};
  if (result.status === "validation") {
    const fieldErrors = Object.fromEntries(Object.entries(result.fieldErrors).map(([field, codes]) => [field, codes?.map((code) => t(`errors.${code as ContactErrorCode}`)) ?? []]));
    return {status: "error", message: t("status.validation"), fieldErrors};
  }
  if (result.status === "rateLimited") return {status: "error", message: t("status.rateLimited"), fieldErrors: {}};
  if (result.status === "deliveryFailed") {
    console.error("[contact] Resend did not accept the contact request.");
    return {status: "error", message: t("status.deliveryFailed"), fieldErrors: {}};
  }
  if (result.status === "unavailable") {
    console.error("[contact] Submission service unavailable: provider configuration or rate limiting is unavailable.");
    return {status: "error", message: t("status.unavailable"), fieldErrors: {}};
  }
  return {status: "error", message: t("status.invalid"), fieldErrors: {}};
}

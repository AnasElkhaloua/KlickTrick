import {createHash} from "node:crypto";
import type {ContactEmailConfig} from "@/lib/config/server";
import type {ContactEmailSender} from "@/lib/contact/delivery";
import {deliverContactEmail} from "@/lib/contact/delivery";
import type {ContactRateLimiter} from "@/lib/contact/rate-limit";
import {CONTACT_MAX_FIELD_BYTES, contactInputSchema, type ContactField, type ContactInput} from "@/lib/contact/schema";

export type ContactErrorCode = "required" | "tooLong" | "invalidEmail" | "invalidPhone" | "invalidSubject";
export type ContactFieldErrors = Partial<Record<ContactField, ContactErrorCode[]>>;
export type ContactSubmissionResult =
  | {status: "accepted"}
  | {status: "validation"; fieldErrors: ContactFieldErrors}
  | {status: "invalid"}
  | {status: "tooLarge"}
  | {status: "rateLimited"}
  | {status: "unavailable"}
  | {status: "deliveryFailed"};

type RawSubmission = {
  fields: Record<string, unknown>;
  honeypot: string;
  unexpected: string[];
  byteSize: number;
};

type SubmissionDependencies = {
  identifier: string;
  limiter: ContactRateLimiter;
  emailConfig: ContactEmailConfig | null;
  sender?: ContactEmailSender;
  now?: () => number;
};

export function createContactIdempotencyKey(input: ContactInput, identifier: string, now: number): string {
  const timeBucket = Math.floor(now / (10 * 60 * 1000));
  const digest = createHash("sha256").update(JSON.stringify(input)).update(identifier).update(String(timeBucket)).digest("hex");
  return `contact/${digest}`;
}

export async function processContactSubmission(raw: RawSubmission, dependencies: SubmissionDependencies): Promise<ContactSubmissionResult> {
  if (raw.byteSize > CONTACT_MAX_FIELD_BYTES) return {status: "tooLarge"};
  if (raw.unexpected.length > 0 || raw.honeypot.trim()) return {status: "invalid"};

  const parsed = contactInputSchema.safeParse(raw.fields);
  if (!parsed.success) {
    const fieldErrors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField | undefined;
      if (!field || !(field in raw.fields)) continue;
      const code = issue.message as ContactErrorCode;
      fieldErrors[field] = [...(fieldErrors[field] ?? []), code];
    }
    return {status: "validation", fieldErrors};
  }

  const rateLimit = await dependencies.limiter.check(dependencies.identifier);
  if (rateLimit.status === "limited") return {status: "rateLimited"};
  if (rateLimit.status === "unavailable") return {status: "unavailable"};
  if (!dependencies.emailConfig) return {status: "unavailable"};

  const idempotencyKey = createContactIdempotencyKey(parsed.data, dependencies.identifier, (dependencies.now ?? Date.now)());
  const delivery = await deliverContactEmail(parsed.data, dependencies.emailConfig, idempotencyKey, dependencies.sender);
  return delivery.status === "accepted" ? {status: "accepted"} : {status: "deliveryFailed"};
}

import {z} from "zod";

export const contactSubjects = [
  "digital-marketing",
  "branding-creative",
  "web-technology",
  "social-media",
  "ai-automation",
  "strategy-analytics",
  "other"
] as const;

export type ContactSubject = (typeof contactSubjects)[number];

const requiredText = (maximum: number) => z.string().trim().min(1, {error: "required"}).max(maximum, {error: "tooLong"});

const phoneSchema = requiredText(32).refine((value) => /^[+\d][\d\s()./-]*$/.test(value), {error: "invalidPhone"}).refine((value) => {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}, {error: "invalidPhone"});

const optionalEmailSchema = z.preprocess(
  (value) => typeof value === "string" ? value.trim() : value,
  z.union([z.literal(""), z.email({error: "invalidEmail"}).max(254, {error: "tooLong"})])
).transform((value) => value === "" ? undefined : value);

export const contactInputSchema = z.strictObject({
  firstName: requiredText(80),
  phone: phoneSchema,
  email: optionalEmailSchema,
  subject: z.enum(contactSubjects, {error: "invalidSubject"}),
  message: requiredText(3000)
});

export type ContactInput = z.infer<typeof contactInputSchema>;
export type ContactField = keyof ContactInput;

export const CONTACT_ALLOWED_FIELDS = new Set(["firstName", "phone", "email", "subject", "message", "website", "locale"]);
export const CONTACT_MAX_FIELD_BYTES = 12_000;

export function formDataToContactPayload(formData: FormData) {
  const unexpected = [...formData.keys()].filter((key) => !key.startsWith("$ACTION_") && !CONTACT_ALLOWED_FIELDS.has(key));
  const value = (key: string) => {
    const entry = formData.get(key);
    return typeof entry === "string" ? entry : "";
  };
  const fields = {
    firstName: value("firstName"),
    phone: value("phone"),
    email: value("email"),
    subject: value("subject"),
    message: value("message")
  };
  const byteSize = Object.values(fields).reduce((total, field) => total + Buffer.byteLength(field, "utf8"), 0);
  return {fields, honeypot: value("website"), locale: value("locale"), unexpected, byteSize};
}

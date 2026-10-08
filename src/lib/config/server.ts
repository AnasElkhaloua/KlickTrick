import {z} from "zod";

const emailConfigSchema = z.strictObject({
  apiKey: z.string().trim().min(1),
  fromEmail: z.email().max(254),
  toEmail: z.email().max(254)
});

const rateLimitConfigSchema = z.strictObject({
  url: z.url().refine((value) => value.startsWith("https://")),
  token: z.string().trim().min(1),
  salt: z.string().min(16)
});

export type ContactEmailConfig = z.infer<typeof emailConfigSchema>;
export type ContactRateLimitConfig = z.infer<typeof rateLimitConfigSchema>;

export function getContactEmailConfig(env: NodeJS.ProcessEnv = process.env): ContactEmailConfig | null {
  const result = emailConfigSchema.safeParse({
    apiKey: env.RESEND_API_KEY,
    fromEmail: env.CONTACT_FROM_EMAIL,
    toEmail: env.CONTACT_TO_EMAIL
  });
  return result.success ? result.data : null;
}

export function getContactRateLimitConfig(env: NodeJS.ProcessEnv = process.env): ContactRateLimitConfig | null {
  const result = rateLimitConfigSchema.safeParse({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
    salt: env.CONTACT_RATE_LIMIT_SALT
  });
  return result.success ? result.data : null;
}

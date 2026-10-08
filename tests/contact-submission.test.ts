import {describe, expect, it, vi} from "vitest";
import type {ContactEmailSender} from "@/lib/contact/delivery";
import {MemoryContactRateLimiter, createContactRateLimiter, type ContactRateLimiter} from "@/lib/contact/rate-limit";
import {CONTACT_MAX_FIELD_BYTES} from "@/lib/contact/schema";
import {createContactIdempotencyKey, processContactSubmission} from "@/lib/contact/submission";

const fields = {firstName: "Yasmine", phone: "+212612345678", email: "", subject: "branding-creative", message: "I would like to discuss a new identity."};
const raw = {fields, honeypot: "", unexpected: [], byteSize: 200};
const allowedLimiter: ContactRateLimiter = {check: vi.fn().mockResolvedValue({status: "allowed"})};
const config = {apiKey: "re_test", fromEmail: "contact@example.com", toEmail: "leads@example.com"};

describe("contact submission boundary", () => {
  it("fails safely when Resend configuration is missing", async () => {
    const sender = vi.fn();
    await expect(processContactSubmission(raw, {identifier: "visitor", limiter: allowedLimiter, emailConfig: null, sender})).resolves.toEqual({status: "unavailable"});
    expect(sender).not.toHaveBeenCalled();
  });

  it("returns field validation before an unavailable production provider boundary", async () => {
    const unavailableLimiter: ContactRateLimiter = {check: vi.fn().mockResolvedValue({status: "unavailable"})};
    const invalid = {...raw, fields: {...fields, firstName: "", phone: "123", message: ""}};
    const result = await processContactSubmission(invalid, {
      identifier: "visitor",
      limiter: unavailableLimiter,
      emailConfig: null
    });

    expect(result.status).toBe("validation");
    if (result.status === "validation") {
      expect(result.fieldErrors.firstName).toContain("required");
      expect(result.fieldErrors.phone).toContain("invalidPhone");
      expect(result.fieldErrors.message).toContain("required");
    }
    expect(unavailableLimiter.check).not.toHaveBeenCalled();
  });

  it("rejects oversized, honeypot, and unexpected input before delivery", async () => {
    const deps = {identifier: "visitor", limiter: allowedLimiter, emailConfig: config};
    await expect(processContactSubmission({...raw, byteSize: CONTACT_MAX_FIELD_BYTES + 1}, deps)).resolves.toEqual({status: "tooLarge"});
    await expect(processContactSubmission({...raw, honeypot: "bot"}, deps)).resolves.toEqual({status: "invalid"});
    await expect(processContactSubmission({...raw, unexpected: ["role"]}, deps)).resolves.toEqual({status: "invalid"});
  });

  it("maps mocked Resend acceptance and failure without returning provider internals", async () => {
    const success: ContactEmailSender = vi.fn().mockResolvedValue({data: {id: "email_1"}, error: null});
    const failure: ContactEmailSender = vi.fn().mockResolvedValue({data: null, error: {name: "api_error"}});
    await expect(processContactSubmission(raw, {identifier: "visitor", limiter: allowedLimiter, emailConfig: config, sender: success})).resolves.toEqual({status: "accepted"});
    await expect(processContactSubmission(raw, {identifier: "visitor", limiter: allowedLimiter, emailConfig: config, sender: failure})).resolves.toEqual({status: "deliveryFailed"});
  });

  it("enforces the in-memory development limit and fails closed in production without durable configuration", async () => {
    let now = 1_000;
    const memory = new MemoryContactRateLimiter(2, 60_000, () => now);
    expect((await memory.check("visitor")).status).toBe("allowed");
    expect((await memory.check("visitor")).status).toBe("allowed");
    expect((await memory.check("visitor")).status).toBe("limited");
    now += 61_000;
    expect((await memory.check("visitor")).status).toBe("allowed");
    expect((await createContactRateLimiter(null, "production").check("visitor")).status).toBe("unavailable");
  });

  it("creates stable short-window idempotency keys for duplicate submissions", () => {
    const parsed = {...fields, email: undefined, subject: "branding-creative" as const};
    const first = createContactIdempotencyKey(parsed, "visitor", 600_001);
    const duplicate = createContactIdempotencyKey(parsed, "visitor", 600_500);
    const changed = createContactIdempotencyKey({...parsed, message: "Different"}, "visitor", 600_500);
    expect(duplicate).toBe(first);
    expect(changed).not.toBe(first);
  });
});

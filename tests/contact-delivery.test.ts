import {describe, expect, it, vi} from "vitest";
import {deliverContactEmail, type ContactEmailSender} from "@/lib/contact/delivery";
import {buildContactEmail, escapeHtml, getEmailSubject} from "@/lib/contact/email-template";
import type {ContactEmailConfig} from "@/lib/config/server";

const input = {firstName: "Amina", phone: "+212612345678", email: "amina@example.com", subject: "digital-marketing" as const, message: "Hello <script>alert('x')</script> & welcome"};
const config: ContactEmailConfig = {apiKey: "re_test", fromEmail: "Klick Trick <contact@example.com>".replace("Klick Trick <", "").replace(">", ""), toEmail: "leads@example.com"};

describe("contact email delivery", () => {
  it("escapes all user-controlled HTML and keeps subjects fixed", () => {
    const email = buildContactEmail(input);
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
    expect(email.html).toContain("&#39;x&#39;");
    expect(escapeHtml("<&\"'>")).toBe("&lt;&amp;&quot;&#39;&gt;");
    expect(getEmailSubject(input.subject)).toBe("[Klick Trick] New contact — Digital Marketing");
  });

  it("returns accepted only when Resend supplies an id", async () => {
    const sender: ContactEmailSender = vi.fn().mockResolvedValue({data: {id: "email_123"}, error: null});
    await expect(deliverContactEmail(input, config, "contact/key", sender)).resolves.toEqual({status: "accepted", id: "email_123"});
    expect(sender).toHaveBeenCalledWith(expect.objectContaining({from: config.fromEmail, to: [config.toEmail], replyTo: input.email, text: expect.any(String), html: expect.any(String)}), {idempotencyKey: "contact/key"});
  });

  it("fails explicitly on an API rejection or network failure", async () => {
    const rejected: ContactEmailSender = vi.fn().mockResolvedValue({data: null, error: {message: "rejected"}});
    const network: ContactEmailSender = vi.fn().mockRejectedValue(new Error("offline"));
    await expect(deliverContactEmail(input, config, "contact/a", rejected)).resolves.toEqual({status: "failed"});
    await expect(deliverContactEmail(input, config, "contact/b", network)).resolves.toEqual({status: "failed"});
  });
});

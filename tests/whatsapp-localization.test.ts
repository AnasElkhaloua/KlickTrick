import {describe, expect, it} from "vitest";
import en from "../messages/en.json";
import fr from "../messages/fr.json";
import {createWhatsAppUrl, normalizeWhatsAppNumber} from "@/lib/whatsapp";

describe("WhatsApp and localized form feedback", () => {
  it("normalizes valid numbers and rejects invalid values", () => {
    expect(normalizeWhatsAppNumber("+212 624-651-236")).toBe("212624651236");
    expect(normalizeWhatsAppNumber("123")).toBeNull();
    expect(normalizeWhatsAppNumber("1234567890123456")).toBeNull();
  });

  it("creates an encoded wa.me URL", () => {
    expect(createWhatsAppUrl("212624651236", "Bonjour & bienvenue")).toBe("https://wa.me/212624651236?text=Bonjour%20%26%20bienvenue");
  });

  it("provides distinct localized success and failure messages", () => {
    expect(fr.Contact.form.status.accepted).toBeTruthy();
    expect(en.Contact.form.status.accepted).toBeTruthy();
    expect(fr.Contact.form.status.accepted).not.toBe(en.Contact.form.status.accepted);
    for (const key of ["deliveryFailed", "unavailable", "rateLimited"] as const) {
      expect(fr.Contact.form.status[key]).toBeTruthy();
      expect(en.Contact.form.status[key]).toBeTruthy();
    }
  });
});

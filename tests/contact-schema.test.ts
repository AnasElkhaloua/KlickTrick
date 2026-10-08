import {describe, expect, it} from "vitest";
import {CONTACT_MAX_FIELD_BYTES, contactInputSchema, formDataToContactPayload} from "@/lib/contact/schema";

const valid = {
  firstName: "  Amine  ",
  phone: "+212 6 12 34 56 78",
  email: " amine@example.com ",
  subject: "web-technology",
  message: "  I need a new website.  "
};

describe("contact schema", () => {
  it("normalizes valid inputs and permits an empty optional email", () => {
    const parsed = contactInputSchema.parse(valid);
    expect(parsed.firstName).toBe("Amine");
    expect(parsed.email).toBe("amine@example.com");
    expect(contactInputSchema.parse({...valid, email: ""}).email).toBeUndefined();
  });

  it("rejects every required field when empty", () => {
    const result = contactInputSchema.safeParse({firstName: " ", phone: "", email: "", subject: "", message: ""});
    expect(result.success).toBe(false);
    if (!result.success) expect(new Set(result.error.issues.map((issue) => issue.path[0]))).toEqual(new Set(["firstName", "phone", "subject", "message"]));
  });

  it("rejects invalid optional email and implausible phone values", () => {
    expect(contactInputSchema.safeParse({...valid, email: "not-an-email"}).success).toBe(false);
    expect(contactInputSchema.safeParse({...valid, phone: "123"}).success).toBe(false);
    expect(contactInputSchema.safeParse({...valid, phone: "+212<script>"}).success).toBe(false);
  });

  it("accepts Moroccan and conservative international phone formats", () => {
    for (const phone of ["0612345678", "+212 6 12 34 56 78", "+33 (0)1 23 45 67 89"]) {
      expect(contactInputSchema.safeParse({...valid, phone}).success).toBe(true);
    }
  });

  it("enforces length boundaries and controlled subjects", () => {
    expect(contactInputSchema.safeParse({...valid, firstName: "a".repeat(80)}).success).toBe(true);
    expect(contactInputSchema.safeParse({...valid, firstName: "a".repeat(81)}).success).toBe(false);
    expect(contactInputSchema.safeParse({...valid, message: "a".repeat(3000)}).success).toBe(true);
    expect(contactInputSchema.safeParse({...valid, message: "a".repeat(3001)}).success).toBe(false);
    expect(contactInputSchema.safeParse({...valid, subject: "custom-header\r\nBcc:test@example.com"}).success).toBe(false);
  });

  it("rejects unexpected fields and measures bounded form content", () => {
    expect(contactInputSchema.safeParse({...valid, admin: true}).success).toBe(false);
    const data = new FormData();
    Object.entries(valid).forEach(([key, value]) => data.set(key, value));
    data.set("unexpected", "value");
    const payload = formDataToContactPayload(data);
    expect(payload.unexpected).toEqual(["unexpected"]);
    expect(payload.byteSize).toBeLessThan(CONTACT_MAX_FIELD_BYTES);
  });
});

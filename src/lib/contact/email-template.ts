import type {ContactInput, ContactSubject} from "@/lib/contact/schema";

const subjectLabels: Record<ContactSubject, string> = {
  "digital-marketing": "Digital Marketing",
  "branding-creative": "Branding & Creative",
  "web-technology": "Web & Technology",
  "social-media": "Social Media",
  "ai-automation": "AI & Automation",
  "strategy-analytics": "Strategy & Analytics",
  other: "Other request"
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"})[character] ?? character);
}

export function getEmailSubject(subject: ContactSubject): string {
  return `[Klick Trick] New contact — ${subjectLabels[subject]}`;
}

export function buildContactEmail(input: ContactInput) {
  const rows = [
    ["First name", input.firstName],
    ["Phone", input.phone],
    ["Email", input.email ?? "Not provided"],
    ["Subject", subjectLabels[input.subject]]
  ] as const;
  const htmlRows = rows.map(([label, value]) => `<tr><th style="padding:8px 12px;text-align:left;vertical-align:top;color:#667085">${label}</th><td style="padding:8px 12px;color:#101828">${escapeHtml(value)}</td></tr>`).join("");
  const safeMessage = escapeHtml(input.message).replace(/\r?\n/g, "<br>");

  return {
    subject: getEmailSubject(input.subject),
    html: `<!doctype html><html><body style="margin:0;background:#f4f6f8;font-family:Arial,sans-serif;color:#101828"><div style="max-width:640px;margin:0 auto;padding:32px 16px"><div style="background:#ffffff;border:1px solid #e4e7ec;border-radius:16px;overflow:hidden"><div style="padding:24px;background:#1a242c;color:#ffffff"><h1 style="margin:0;font-size:24px">New Klick Trick inquiry</h1></div><table role="presentation" style="width:100%;border-collapse:collapse;margin:16px 0">${htmlRows}</table><div style="padding:0 24px 24px"><h2 style="font-size:16px;margin:16px 0 8px">Message</h2><div style="padding:16px;border-radius:12px;background:#f2f4f7;line-height:1.6;white-space:normal">${safeMessage}</div></div></div></div></body></html>`,
    text: `New Klick Trick inquiry\n\nFirst name: ${input.firstName}\nPhone: ${input.phone}\nEmail: ${input.email ?? "Not provided"}\nSubject: ${subjectLabels[input.subject]}\n\nMessage:\n${input.message}`
  };
}

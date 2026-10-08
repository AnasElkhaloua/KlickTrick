export function normalizeWhatsAppNumber(value: string | undefined | null): string | null {
  const digits = value?.replace(/\D/g, "") ?? "";
  return /^\d{7,15}$/.test(digits) ? digits : null;
}

export function createWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message.trim())}`;
}

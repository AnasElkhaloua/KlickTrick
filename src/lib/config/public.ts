const LOCAL_ORIGIN = "http://localhost:3000";

function parseHttpUrl(value: string | undefined): URL | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function isLocalOrigin(url: URL): boolean {
  return url.hostname === "localhost" || url.hostname === "127.0.0.1";
}

function getNetlifyDeploymentUrl(env: Record<string, string | undefined>): URL | null {
  if (env.NETLIFY !== "true") return null;

  const value = env.CONTEXT === "production"
    ? env.URL
    : env.DEPLOY_PRIME_URL ?? env.DEPLOY_URL;
  return parseHttpUrl(value);
}

export function getSiteUrl(env: Record<string, string | undefined> = process.env): URL {
  const configuredUrl = parseHttpUrl(env.NEXT_PUBLIC_SITE_URL);
  const netlifyUrl = getNetlifyDeploymentUrl(env);

  if (netlifyUrl) {
    if (env.CONTEXT !== "production") return netlifyUrl;
    if (!configuredUrl || isLocalOrigin(configuredUrl)) return netlifyUrl;
  }

  return configuredUrl ?? netlifyUrl ?? new URL(LOCAL_ORIGIN);
}

export function isPublicIndexingEnabled(env: Record<string, string | undefined> = process.env): boolean {
  const siteUrl = parseHttpUrl(env.NEXT_PUBLIC_SITE_URL);
  if (!siteUrl || env.NEXT_PUBLIC_ALLOW_INDEXING !== "true") return false;

  return siteUrl.protocol === "https:" && !isLocalOrigin(siteUrl);
}

export function getWhatsAppNumber(): string | null {
  return normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
}
import {normalizeWhatsAppNumber} from "@/lib/whatsapp";

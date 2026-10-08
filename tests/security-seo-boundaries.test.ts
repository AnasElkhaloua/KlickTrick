import {describe, expect, it} from "vitest";
import {getTrustedClientIp} from "@/lib/contact/client-ip";
import {getSiteUrl, isPublicIndexingEnabled} from "@/lib/config/public";

describe("trusted client IP boundary", () => {
  it("uses the Netlify request context instead of forwarding headers", () => {
    expect(getTrustedClientIp(() => ({ip: "203.0.113.9"}))).toBe("203.0.113.9");
    expect(getTrustedClientIp(() => ({ip: "2001:db8::1"}))).toBe("2001:db8::1");
  });

  it("fails closed when Netlify context is unavailable", () => {
    expect(getTrustedClientIp(() => {
      throw new Error("No active Netlify request context");
    })).toBeNull();
  });

  it("rejects malformed context values", () => {
    expect(getTrustedClientIp(() => ({ip: "203.0.113.9, 198.51.100.7"}))).toBeNull();
    expect(getTrustedClientIp(() => ({ip: "not-an-ip"}))).toBeNull();
    expect(getTrustedClientIp(() => ({ip: ""}))).toBeNull();
  });
});

describe("public indexing boundary", () => {
  it("requires an explicit flag and a non-local HTTPS origin", () => {
    expect(isPublicIndexingEnabled({NEXT_PUBLIC_SITE_URL: "https://klicktrick.example", NEXT_PUBLIC_ALLOW_INDEXING: "true"})).toBe(true);
    expect(isPublicIndexingEnabled({NEXT_PUBLIC_SITE_URL: "https://klicktrick.example", NEXT_PUBLIC_ALLOW_INDEXING: "false"})).toBe(false);
    expect(isPublicIndexingEnabled({NEXT_PUBLIC_SITE_URL: "http://klicktrick.example", NEXT_PUBLIC_ALLOW_INDEXING: "true"})).toBe(false);
    expect(isPublicIndexingEnabled({NEXT_PUBLIC_SITE_URL: "http://localhost:3000", NEXT_PUBLIC_ALLOW_INDEXING: "true"})).toBe(false);
    expect(isPublicIndexingEnabled({NEXT_PUBLIC_ALLOW_INDEXING: "true"})).toBe(false);
  });

  it("uses Netlify's primary deploy URL for preview metadata", () => {
    const siteUrl = getSiteUrl({
      NETLIFY: "true",
      CONTEXT: "deploy-preview",
      DEPLOY_PRIME_URL: "https://deploy-preview.example.invalid",
      DEPLOY_URL: "https://unique-deploy.example.invalid",
      NEXT_PUBLIC_SITE_URL: "https://configured.example.invalid"
    });

    expect(siteUrl.toString()).toBe("https://deploy-preview.example.invalid/");
  });

  it("uses Netlify's production URL when no approved public origin is configured", () => {
    const siteUrl = getSiteUrl({
      NETLIFY: "true",
      CONTEXT: "production",
      URL: "https://production.example.invalid",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000"
    });

    expect(siteUrl.toString()).toBe("https://production.example.invalid/");
  });

  it("does not trust Netlify URL variables without the Netlify marker", () => {
    const siteUrl = getSiteUrl({DEPLOY_PRIME_URL: "https://untrusted.example.invalid"});
    expect(siteUrl.toString()).toBe("http://localhost:3000/");
  });
});

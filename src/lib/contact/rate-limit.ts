import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import type {ContactRateLimitConfig} from "@/lib/config/server";

export type RateLimitDecision =
  | {status: "allowed"}
  | {status: "limited"; retryAfterSeconds: number}
  | {status: "unavailable"};

export interface ContactRateLimiter {
  check(identifier: string): Promise<RateLimitDecision>;
}

export class MemoryContactRateLimiter implements ContactRateLimiter {
  private readonly entries = new Map<string, number[]>();

  constructor(private readonly limit = 5, private readonly windowMs = 15 * 60 * 1000, private readonly now = () => Date.now()) {}

  async check(identifier: string): Promise<RateLimitDecision> {
    const current = this.now();
    const active = (this.entries.get(identifier) ?? []).filter((timestamp) => timestamp > current - this.windowMs);
    if (active.length >= this.limit) {
      return {status: "limited", retryAfterSeconds: Math.max(1, Math.ceil((active[0] + this.windowMs - current) / 1000))};
    }
    active.push(current);
    this.entries.set(identifier, active);
    return {status: "allowed"};
  }
}

class UnavailableContactRateLimiter implements ContactRateLimiter {
  async check(): Promise<RateLimitDecision> {
    return {status: "unavailable"};
  }
}

class UpstashContactRateLimiter implements ContactRateLimiter {
  private readonly limiter: Ratelimit;

  constructor(config: ContactRateLimitConfig) {
    const redis = new Redis({url: config.url, token: config.token});
    this.limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      analytics: false,
      prefix: "klick-trick:contact"
    });
  }

  async check(identifier: string): Promise<RateLimitDecision> {
    try {
      const result = await this.limiter.limit(identifier);
      if (result.reason === "timeout") return {status: "unavailable"};
      if (!result.success) return {status: "limited", retryAfterSeconds: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000))};
      return {status: "allowed"};
    } catch {
      return {status: "unavailable"};
    }
  }
}

const developmentLimiter = new MemoryContactRateLimiter();

export function createContactRateLimiter(config: ContactRateLimitConfig | null, environment = process.env.NODE_ENV): ContactRateLimiter {
  if (config) return new UpstashContactRateLimiter(config);
  if (environment === "production") return new UnavailableContactRateLimiter();
  return developmentLimiter;
}

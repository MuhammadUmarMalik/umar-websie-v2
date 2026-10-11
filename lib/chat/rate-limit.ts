import { CHAT_CONFIG } from "./config";

const hits = new Map<string, number[]>();

// Clean old entries every 5 minutes
setInterval(() => {
  const cutoff = Date.now() - CHAT_CONFIG.rateLimitWindowMs * 2;
  hits.forEach((timestamps, key) => {
    const filtered = timestamps.filter((t) => t > cutoff);
    if (filtered.length === 0) hits.delete(key);
    else hits.set(key, filtered);
  });
}, 300_000).unref?.();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - CHAT_CONFIG.rateLimitWindowMs;
  const timestamps = (hits.get(ip) || []).filter((t) => t > windowStart);
  if (timestamps.length >= CHAT_CONFIG.rateLimitPerMinute) return false;
  timestamps.push(now);
  hits.set(ip, timestamps);
  return true;
}

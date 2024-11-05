import { cache, cacheStats } from "./cache";

export class TokenBlacklistService {
  addToBlacklist(token: string, ttl: number) {
    const addTokenToBlacklist = cache.set(token, "blacklisted", ttl); // Cache token until it expires
    console.log(addTokenToBlacklist, "add toekn to blaclkist");
  }

  isBlacklisted(token: string): boolean {
    const isBlacklisted = !!cache.get(token); // Check if token is blacklisted
    console.log(isBlacklisted, "is blacklisted");

    // Increment hit or miss count
    if (isBlacklisted) {
      cacheStats.hitCount++;
    } else {
      cacheStats.missCount++;
    }

    return isBlacklisted; // Return true if blacklisted, false otherwise
  }
}

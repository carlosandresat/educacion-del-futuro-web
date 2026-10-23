import { beforeEach, describe, expect, it, vi } from "vitest";

const jar = new Map<string, string>();
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name)! } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
  }),
}));

process.env.BETTER_AUTH_SECRET = "test-secret";
const { spinRoulette } = await import("@/actions/roulette");
const { ROULETTE_PRIZES } = await import("@/data/roulette-prizes");

beforeEach(() => jar.clear());

describe("spinRoulette", () => {
  it("draws a known prize and keeps returning it", async () => {
    const first = await spinRoulette();
    expect(ROULETTE_PRIZES.map((prize) => prize.id)).toContain(first);
    expect(jar.get("prize")).toMatch(new RegExp(`^${first}\\.`));

    for (let i = 0; i < 5; i++) await expect(spinRoulette()).resolves.toBe(first);
  });

  it("ignores a cookie whose signature does not match", async () => {
    jar.set("prize", "0.forged-signature");
    const prizeId = await spinRoulette();
    const [storedId, signature] = jar.get("prize")!.split(".");

    expect(storedId).toBe(String(prizeId));
    expect(signature).not.toBe("forged-signature");
  });

  it("ignores an unsigned cookie from the old client-side roulette", async () => {
    jar.set("prize", "Airpods");
    await spinRoulette();
    expect(jar.get("prize")).not.toBe("Airpods");
  });
});

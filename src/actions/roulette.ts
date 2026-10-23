"use server";

import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { ROULETTE_PRIZES } from "@/data/roulette-prizes";

const PRIZE_COOKIE = "prize";
const PRIZE_MAX_AGE = 60 * 24 * 60 * 60;

function sign(value: string) {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) throw new Error("BETTER_AUTH_SECRET is required to sign roulette prizes");
  return createHmac("sha256", secret).update(`roulette:${value}`).digest("base64url");
}

function isValidSignature(value: string, signature: string) {
  const expected = Buffer.from(sign(value));
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

function drawPrizeId() {
  const totalWeight = ROULETTE_PRIZES.reduce((sum, prize) => sum + prize.weight, 0);
  let ticket = randomInt(totalWeight);
  for (const prize of ROULETTE_PRIZES) {
    if (ticket < prize.weight) return prize.id;
    ticket -= prize.weight;
  }
  return ROULETTE_PRIZES[ROULETTE_PRIZES.length - 1].id;
}

/**
 * Returns the visitor's prize id. The prize is drawn on the server the first time and kept in a
 * signed, httpOnly cookie, so editing the cookie in the browser cannot change it.
 */
export async function spinRoulette(): Promise<number> {
  const cookieStore = await cookies();
  const saved = cookieStore.get(PRIZE_COOKIE)?.value;

  if (saved) {
    const [prizeId, signature] = saved.split(".");
    const known = ROULETTE_PRIZES.some((prize) => String(prize.id) === prizeId);
    if (known && signature && isValidSignature(prizeId, signature)) return Number(prizeId);
  }

  const prizeId = drawPrizeId();
  cookieStore.set(PRIZE_COOKIE, `${prizeId}.${sign(String(prizeId))}`, {
    maxAge: PRIZE_MAX_AGE,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return prizeId;
}

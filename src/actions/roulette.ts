"use server";

import { cookies } from "next/headers";

export async function createPrizeCookie(prize: string) {
  cookies().set("prize", prize, { maxAge: 60 * 24 * 60 * 60 });
}

export async function getPrizeCookie() {
  return cookies().get("prize");
}

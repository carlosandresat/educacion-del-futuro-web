"use server";

import { cookies } from "next/headers";

export async function createPrizeCookie(prize: string) {
  cookies().set("prize", prize);
}

export async function getPrizeCookie() {
  return cookies().get("prize");
}

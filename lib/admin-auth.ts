import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "snab_careers_admin";

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminPassword(value: string) {
  const expected = process.env.CAREERS_ADMIN_PASSWORD;
  return Boolean(expected && safeEqual(value, expected));
}

export function getAdminCookieValue() {
  const secret = process.env.INSFORGE_ADMIN_SECRET;
  if (!secret) throw new Error("Missing INSFORGE_ADMIN_SECRET.");
  return createHmac("sha256", secret).update("snab-careers-admin-v1").digest("hex");
}

export function isAdminCookie(value?: string) {
  return Boolean(value && safeEqual(value, getAdminCookieValue()));
}


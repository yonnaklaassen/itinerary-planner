import bcrypt from "bcrypt";
import { createHash, createHmac } from "crypto";
import { randomBytes } from "crypto";

export function generateSecureRandomString(): string {
  const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";
  const bytes = randomBytes(24);
  crypto.getRandomValues(bytes);

  let id = "";
  for (let i = 0; i < bytes.length; i++) {
    id += alphabet[bytes[i] % alphabet.length];
  }
  return id;
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function hashSecret(secret: string): string {
  const HMAC_KEY = process.env.SESSION_HMAC_KEY || "super-secret-key";
  return createHmac("sha256", HMAC_KEY).update(secret).digest("hex");
}
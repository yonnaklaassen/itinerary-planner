import bcrypt from "bcrypt";
import { createHash } from "crypto";

export function generateSecureRandomString(): string {
    const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";
    const bytes = new Uint8Array(24);
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

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function hashSecret(secret: string): Promise<Uint8Array> {
  return new Uint8Array(createHash("sha256").update(secret).digest());
}
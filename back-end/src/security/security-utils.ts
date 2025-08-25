import { Session } from "../models/session.js";

export function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.byteLength !== b.byteLength) return false;
  let c = 0;
  for (let i = 0; i < a.byteLength; i++) {
    c |= a[i] ^ b[i];
  }
  return c === 0;
}

export function encodeSessionPublicJSON(session: Session): string {
  return JSON.stringify({
    id: session.id,
    created_at: Math.floor(session.createdAt.getTime() / 1000)
  });
}
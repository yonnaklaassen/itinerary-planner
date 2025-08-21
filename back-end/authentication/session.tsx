import { Pool } from "pg";
import { Buffer } from "buffer";
import generateSecureRandomString from "./session-id-generation";

const sessionExpiresInSeconds = 60 * 60 * 24; // 24 hours

export interface Session {
  id: string;
  secretHash: Uint8Array;
  createdAt: Date;
}

export interface SessionWithToken extends Session {
  token: string;
}

export async function createSession(pool: Pool): Promise<SessionWithToken> {
  const now = new Date();

  const id = generateSecureRandomString();
  const secret = generateSecureRandomString();
  const secretHash = await hashSecret(secret);

  const token = id + "." + secret;

  const session: SessionWithToken = {
    id,
    secretHash,
    createdAt: now,
    token
  };

  await pool.query(
    "INSERT INTO session (id, secret_hash, created_at) VALUES ($1, $2, $3)",
    [session.id, Buffer.from(session.secretHash), Math.floor(session.createdAt.getTime() / 1000)]
  );

  return session;
}

export async function validateSessionToken(pool: Pool, token: string): Promise<Session | null> {
  const tokenParts = token.split(".");
  if (tokenParts.length !== 2) return null;

  const sessionId = tokenParts[0];
  const sessionSecret = tokenParts[1];

  const session = await getSession(pool, sessionId);
  if (!session) return null;

  const tokenSecretHash = await hashSecret(sessionSecret);
  const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
  if (!validSecret) return null;

  return session;
}

export async function getSession(pool: Pool, sessionId: string): Promise<Session | null> {
  const now = new Date();

  const res = await pool.query(
    "SELECT id, secret_hash, created_at FROM session WHERE id = $1",
    [sessionId]
  );

  if (res.rowCount === 0) return null;

  const row = res.rows[0];

  const session: Session = {
    id: row.id,
    secretHash: new Uint8Array(row.secret_hash),
    createdAt: new Date(Number(row.created_at) * 1000)
  };

  // Check expiration
  if (now.getTime() - session.createdAt.getTime() >= sessionExpiresInSeconds * 1000) {
    await deleteSession(pool, sessionId);
    return null;
  }

  return session;
}

export async function deleteSession(pool: Pool, sessionId: string): Promise<void> {
  await pool.query("DELETE FROM session WHERE id = $1", [sessionId]);
}

async function hashSecret(secret: string): Promise<Uint8Array> {
  const secretBytes = new TextEncoder().encode(secret);
  const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
  return new Uint8Array(secretHashBuffer);
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
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

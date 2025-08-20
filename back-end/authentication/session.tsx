import Database from "better-sqlite3/lib/database";
import { Buffer } from "buffer";
import { generateSecureRandomString } from "./session-id-generation";


const sessionExpiresInSeconds = 60 * 60 * 24; // 24 hours

export interface Session {
  id: string;
  secretHash: Uint8Array;
  createdAt: Date;
}

export interface SessionWithToken extends Session {
  token: string;
}

export async function createSession(db: Database): Promise<SessionWithToken> {
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

  const stmt = db.prepare(
    "INSERT INTO session (id, secret_hash, created_at) VALUES (?, ?, ?)"
  );
  stmt.run(
    session.id,
    Buffer.from(session.secretHash),
    Math.floor(session.createdAt.getTime() / 1000)
  );

  return session;
}

export async function validateSessionToken(db: Database, token: string): Promise<Session | null> {
  const tokenParts = token.split(".");
  if (tokenParts.length !== 2) return null;

  const sessionId = tokenParts[0];
  const sessionSecret = tokenParts[1];

  const session = getSession(db, sessionId);
  if (!session) return null;

  const tokenSecretHash = await hashSecret(sessionSecret);
  const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
  if (!validSecret) return null;

  return session;
}


export function getSession(db: Database, sessionId: string): Session | null {
  const now = new Date();

  const stmt = db.prepare("SELECT id, secret_hash, created_at FROM session WHERE id = ?");
  const row = stmt.get(sessionId);

  if (!row) return null;

  const session: Session = {
    id: row.id,
    secretHash: new Uint8Array(row.secret_hash),
    createdAt: new Date(row.created_at * 1000)
  };

  // Check expiration
  if (now.getTime() - session.createdAt.getTime() >= sessionExpiresInSeconds * 1000) {
    deleteSession(db, sessionId);
    return null;
  }

  return session;
}

export function deleteSession(db: Database, sessionId: string): void {
  const stmt = db.prepare("DELETE FROM session WHERE id = ?");
  stmt.run(sessionId);
}

export async function hashSecret(secret: string): Promise<Uint8Array> {
  const secretBytes = new TextEncoder().encode(secret);
  const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
  return new Uint8Array(secretHashBuffer);
}

export function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.byteLength !== b.byteLength) return false;
  let c = 0;
  for (let i = 0; i < a.byteLength; i++) {
    c |= a[i] ^ b[i];
  }
  return c === 0;
}
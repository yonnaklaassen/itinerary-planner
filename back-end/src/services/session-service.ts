import { Pool } from "pg";
import { Buffer } from "buffer";
import { generateSecureRandomString, hashSecret } from "../security/security.js";
import { Session, SessionWithToken } from "../models/session.js";
import { constantTimeEqual } from "../security/security-utils.js";
import { PublicUser } from "@shared/model/public-user.js";


const sessionExpiresInSeconds = 60 * 60 * 24; // 24 hours

export async function createSession(pool: Pool, userId: number): Promise<SessionWithToken> {
  const now = new Date();

  const id = generateSecureRandomString();
  const secret = generateSecureRandomString();
  const secretHash = await hashSecret(secret);

  const token = id + "." + secret;

  const session: SessionWithToken = {
    id,
    userId,
    secretHash,
    createdAt: now,
    token
  };

  await pool.query(
    "INSERT INTO sessions (id, user_id, secret_hash) VALUES ($1, $2, $3)",
    [
      session.id,
      userId,
      Buffer.from(session.secretHash)
    ]
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

  const tokenSecretHash = hashSecret(sessionSecret);
  const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
  if (!validSecret) return null;

  return session;
}

export async function getSession(pool: Pool, sessionId: string): Promise<Session | null> {
  const now = new Date();

  const res = await pool.query(
    "SELECT id, secret_hash, created_at FROM sessions WHERE id = $1",
    [sessionId]
  );

  if (res.rowCount === 0) return null;

  const row = res.rows[0];

  const session: Session = {
    id: row.id,
    userId: row.user_id,
    secretHash: row.secret_hash,
    createdAt: new Date()
  };

  // Check expiration
  if (now.getTime() - session.createdAt.getTime() >= sessionExpiresInSeconds * 1000) {
    await deleteSession(pool, sessionId);
    return null;
  }

  return session;
}

export async function deleteSession(pool: Pool, sessionId: string): Promise<void> {
  await pool.query("DELETE FROM sessions WHERE id = $1", [sessionId]);
}

export async function getUserBySession(db: Pool, token: string): Promise<PublicUser | null> {
  const res = await db.query(`
    SELECT u.id, u.name, u.email
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.id = $1
  `, [token]);

  return res.rows[0] as PublicUser ?? null;
}

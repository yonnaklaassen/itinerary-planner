import { Pool } from "pg";
import { generateSecureRandomString, hashSecret } from "../security/security.js";
import { Session, SessionWithToken } from "../models/session.js";
import { constantTimeEqual } from "../security/security-utils.js";
import { PublicUser } from "@shared/model/public-user.js";


const sessionExpiresInSeconds = 60 * 60 * 24; // 24 hours

export async function createSession(pool: Pool, userId: string): Promise<SessionWithToken> {
  const secret = generateSecureRandomString();
  const secretHash = hashSecret(secret);

  const result = await pool.query(
    `INSERT INTO sessions (user_id, secret_hash)
     VALUES ($1, $2)
     RETURNING id, created_at`,
    [userId, secretHash]
  );

  const sessionId: string = result.rows[0].id;
  const createdAt: Date = result.rows[0].created_at;
  const token = sessionId + "." + secret;

  const session: SessionWithToken = {
    id: sessionId,
    userId,
    secretHash,
    createdAt,
    token
  };

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
    "SELECT id, user_id, secret_hash, created_at FROM sessions WHERE id = $1",
    [sessionId]
  );

  if (res.rowCount === 0) return null;

  const row = res.rows[0];

  const session: Session = {
    id: row.id,
    userId: row.user_id,
    secretHash: row.secret_hash,
    createdAt: new Date(row.created_at)
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

export async function getUserBySession(db: Pool, session: Session): Promise<PublicUser | null> {
  const userRes = await db.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [session.userId]
  );

  if (userRes.rowCount === 0) {
    return null;
  }

  return userRes.rows[0] as PublicUser;
}

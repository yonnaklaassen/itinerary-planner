// src/services/auth-service.ts
import { Pool } from "pg";
import { User, PublicUser } from "../models/user.js";
import { hashPassword, verifyPassword } from "../security/security.js";

export async function registerUser(
  db: Pool,
  name: string,
  email: string,
  password: string
): Promise<PublicUser> {
  const passwordHash = await hashPassword(password);
  const createdAt = new Date();

  const res = await db.query(
    `INSERT INTO users (name, email, password_hash, created_at)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email`,
    [name, email, passwordHash, Math.floor(createdAt.getTime() / 1000)]
  );

  return res.rows[0] as PublicUser;
}

export async function loginUser(
  db: Pool,
  email: string,
  password: string
): Promise<PublicUser> {
  const res = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  if (res.rowCount === 0) throw new Error("User not found");

  const user: User = res.rows[0];
  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) throw new Error("Password is not valid");

  return res.rows[0] as PublicUser;
}

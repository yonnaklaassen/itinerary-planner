import { Pool } from "pg";
import { User} from "../models/user.js";
import { hashPassword, verifyPassword } from "../security/security.js";
import { PublicUser } from "@shared/model/public-user.js";

export async function registerUser(
  db: Pool,
  name: string,
  email: string,
  password: string
): Promise<PublicUser> {
  const whitelistCheck = await db.query(
    `SELECT email FROM email_whitelist WHERE email = $1`,
    [email]
  );

  if (whitelistCheck.rows.length === 0) {
    throw new Error("Email is not in the whitelist.");
  }

  const existingUser = await db.query(
    `SELECT id FROM users WHERE email = $1`,
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("User with this email already exists.");
  }

  const passwordHash = await hashPassword(password);

  const res = await db.query(
    `INSERT INTO users (name, email, hashed_password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, passwordHash]
  );

  console.log("User successfully inserted in database table users:", name);

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
  const valid = await verifyPassword(password, user.hashed_password);
  if (!valid) throw new Error("Password is not valid");

  return {
    id: user.id,
    name: user.name,
    email: user.email
  } as PublicUser;
}

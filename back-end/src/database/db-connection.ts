import { Pool } from "pg";
import 'dotenv/config';
import { hashPassword, verifyPassword } from "../security/security.js";
import { error } from "console";

let pool: Pool | null = null;

export function createDbConnection(): Pool {
  if (!pool) {
    pool = new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST || "db",
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: Number(process.env.PG_PORT) || 5432,
    });

    pool.query(`
      CREATE TABLE IF NOT EXISTS session (
        id TEXT PRIMARY KEY,
        secret_hash BYTEA NOT NULL,
        created_at BIGINT NOT NULL
      );
    `)
      .catch(err => console.error("Error creating session table:", err));

    pool.query(`
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash BYTEA NOT NULL,
    created_at BIGINT NOT NULL
  );
`).catch(err => console.error("Error creating users table:", err));

    pool.query(`
    CREATE TABLE IF NOT EXISTS email_whitelist (
    email VARCHAR(100) PRIMARY KEY
  );
`).catch(err => console.error("Error creating email_whitelist table:", err));

  }

  return pool;
}

export async function registerUser(pool: Pool, name: string, email: string, password: string) {
  const whitelistCheck = await pool.query(
    "SELECT email FROM email_whitelist WHERE email = $1",
    [email]
  );

  if (whitelistCheck.rowCount === 0) {
    throw new Error("This email is not allowed to register.");
  }
  const passwordHash = await hashPassword(password);
  const createdAt = Math.floor(Date.now() / 1000);

  try {
    const res = await pool.query(
      `INSERT INTO users (name, email, password_hash, created_at)
             VALUES ($1, $2, $3, $4)
             RETURNING id, name, email`,
      [name, email, Buffer.from(passwordHash), createdAt]
    );

    return res.rows[0];
  } catch (err: any) {
    if (err.code === '23505') {
      throw new Error('Email already registered.');
    }
    throw err;
  }
}

export async function loginUser(pool: Pool, email: string, password: string) {
  try {
    const res = await pool.query(
      `SELECT id, email, password_hash FROM users WHERE email = $1`,
      [email]
    );

    if (res.rowCount === 0) {
      throw new Error('User not found');
    }

    const user = res.rows[0];

    const storedHash = user.password_hash.toString('utf8');

    const valid = await verifyPassword(password, storedHash);
    if (!valid) {
      throw new Error('Password is not valid!');
    }
    return { id: user.id, email: user.email };
  } catch (err) {
    throw err;
  }

}


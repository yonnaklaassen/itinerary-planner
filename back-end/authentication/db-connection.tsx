import { Pool } from "pg";
import './dot_env'

let pool: Pool | null = null;

export function createDbConnection(): Pool {
  if (!pool) {
    pool = new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: Number(process.env.PG_PORT),
    });

    pool.query(`
      CREATE TABLE IF NOT EXISTS session (
        id TEXT PRIMARY KEY,
        secret_hash BYTEA NOT NULL,
        created_at BIGINT NOT NULL
      );
    `).catch(err => console.error("Error creating table:", err));
  }

  return pool;
}

import { Pool } from "pg";

let pool: Pool | null = null;

export async function createDbConnection(): Promise<Pool> {
  if (!pool) {
    pool = new Pool({
      user: process.env.PG_USER,
      host: process.env.PG_HOST || "db",
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: Number(process.env.PG_PORT) || 5432,
    });

    createTables(pool);
  }
  return pool;
}

async function createTables(pool: Pool) {

  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS email_whitelist (
    email VARCHAR(100) PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        hashed_password TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id),
        secret_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS trips (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        owner_id UUID NOT NULL REFERENCES users(id),
        trip_name VARCHAR(100) NOT NULL,
        trip_destination TEXT,
        trip_start_date DATE,
        trip_end_date DATE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS trip_participants(
      trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY(trip_id, user_id)
      )
    `);


    console.log("Tables initialized successfully");
  } catch (err) {
    console.error("Error initializing tables:", err);
    throw err;
  }

}

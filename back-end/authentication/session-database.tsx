import Database from "better-sqlite3/lib/database";

export function createDbConnection(): Database {
  const db = new Database("mydb.sqlite");

  db.exec(`
    CREATE TABLE IF NOT EXISTS session (
      id TEXT NOT NULL PRIMARY KEY,
      secret_hash BLOB NOT NULL,
      created_at INTEGER NOT NULL
    ) STRICT;
  `);

  return db;
}

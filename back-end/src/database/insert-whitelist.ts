import { createDbConnection } from "./db-connection.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

async function insertWhitelistEmails() {
  const db = createDbConnection();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, "whitelist.json");

  const emails: string[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

  try {
    for (const email of emails) {
      try {
        await db.query(
          "INSERT INTO email_whitelist (email) VALUES ($1) ON CONFLICT DO NOTHING",
          [email]
        );
        console.log(`Inserted or skipped: ${email}`);
      } catch (err) {
        console.error(`Error inserting ${email}:`, err);
      }
    }
    console.log("Whitelist insertion complete.");
  } finally {
    await db.end?.(); 
  }
}

insertWhitelistEmails();

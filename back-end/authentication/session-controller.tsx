import express from "express";
import cookieParser from "cookie-parser";
import { createSession, encodeSessionPublicJSON } from "./session";
import { createDbConnection } from "./db-connection";

const ENV = process.env.NODE_ENV;
const ORIGIN = "https://example.com";

const db = createDbConnection();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/login", async (req, res) => {
  const origin = req.get("origin") || req.get("referer") || "";

  if (!verifyRequestOrigin(req.method, origin)) {
    return res.status(403).json({ error: "Invalid request origin" });
  }

  try {
    const session = await createSession(db);

    res.cookie("session_token", session.token, {
      httpOnly: true,
      secure: ENV === "production",
      maxAge: 86400 * 1000,
      sameSite: "lax",
      path: "/"
    });

    res.json({ session: JSON.parse(encodeSessionPublicJSON(session)) });
  } catch (err) {
    console.error("Error creating session:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);

function verifyRequestOrigin(method: string, originHeader: string): boolean {
  if (ENV !== "production") return true;
  if (method === "GET" || method === "HEAD") return true;

  return originHeader === ORIGIN;
}

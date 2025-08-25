import { Router } from "express";
import { encodeSessionPublicJSON } from "../security/security-utils.js";
import { loginUser, registerUser } from "../services/auth-service.js";
import { createSession } from "../services/session-service.js";
import { Pool } from "pg";
import { PublicUser } from "../models/user.js";
import { LoginRequest, RegisterRequest } from "../models/request-bodies.js";

const ENV = process.env.NODE_ENV;
const ORIGIN = "http://localhost:3000";

export default function authRoutes(db: Pool) {
  const router = Router();

  router.post("/register", async (req, res) => {
    const { name, email, password } = req.body as RegisterRequest;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing name, email, or password" });
    }

    try {
      const user: PublicUser = await registerUser(db, name, email, password);
      res.status(201).json({ user });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body as LoginRequest;
    const origin = req.get("origin") || req.get("referer") || "";

    if (!verifyRequestOrigin(req.method, origin)) {
      return res.status(403).json({ error: "Invalid request origin" });
    }

    try {
      const user = await loginUser(db, email, password);
      const session = await createSession(db, user.id);

      res.cookie("session_token", session.token, {
        httpOnly: true,
        secure: ENV === "production",
        maxAge: 86400 * 1000,
        sameSite: "lax",
        path: "/"
      });

      res.json({ session: encodeSessionPublicJSON(session) });
    } catch (err: any) {
      console.error("Error creating session:", err);
      const status = err.message.includes("not valid") ? 401 : 500;
      res.status(status).json({ error: err.message || "Internal server error" });
    }
  });

  function verifyRequestOrigin(method: string, originHeader: string): boolean {
    if (ENV !== "production") return true;
    if (method === "GET" || method === "HEAD") return true;

    return originHeader === ORIGIN;
  }

  return router;
}

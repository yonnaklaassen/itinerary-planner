import { Router } from "express";
import { encodeSessionPublicJSON } from "../security/security-utils.js";
import { loginUser, registerUser } from "../services/auth-service.js";
import { createSession, deleteSession, getSession, getUserBySession, validateSessionToken } from "../services/session-service.js";
import { Pool } from "pg";
import { PublicUser } from "@shared/model/public-user";
import { LoginRequest, RegisterRequest } from "@shared/model/request-bodies.js";



const isProd = process.env.NODE_ENV == "production";
const sessionTime = 7 * 24 * 60 * 60 * 1000;

export default function authRoutes(db: Pool) {
  const router = Router();

  router.post("/register", async (req, res) => {
    const { name, email, password } = req.body as RegisterRequest;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing name, email, or password" });
    }

    try {
      const user: PublicUser = await registerUser(db, name, email, password);

      const session = await createSession(db, user.id);

      res.cookie("session_token", session.token, {
        httpOnly: true,
        secure: isProd,
        maxAge: sessionTime,
        sameSite: isProd ? "none" : "lax",
        path: "/"
      });

      res.status(201).json({ user, session: encodeSessionPublicJSON(session) });
    } catch (err: any) {
      console.error("Error registering user:", err);
      res.status(400).json({ error: err.message });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body as LoginRequest;

    try {
      const user = await loginUser(db, email, password);
      const session = await createSession(db, user.id);

      res.cookie("session_token", session.token, {
        httpOnly: true,
        secure: isProd,
        maxAge: sessionTime,
        sameSite: isProd ? "none" : "lax",
        path: "/"
      });

      res.json({ user, session: encodeSessionPublicJSON(session) });
    } catch (err: any) {
      console.error("Error creating session:", err);
      const status = err.message.includes("not valid") ? 401 : 500;
      res.status(status).json({ error: err.message || "Internal server error" });
    }
  });

  router.post("/logout", async (req, res) => {
    const sessionToken = req.cookies["session_token"];
    try {
      if (sessionToken) {
        
        await deleteSession(db, sessionToken);

        res.clearCookie("session_token", {
          httpOnly: true,
          secure: isProd, 
        sameSite: isProd ? "none" : "lax",
        });
      }

      res.json({ message: "Logged out successfully" });
    } catch (err: any) {
      console.error("Error deleting session:", err);
      const status = err.message.includes("not valid") ? 401 : 500;
      res.status(status).json({ error: err.message || "Internal server error" });
    }
  });

  router.get("/me", async (req, res) => {
    const sessionToken = req.cookies["session_token"];
    if (!sessionToken) return res.json({ user: null });

    try {
      const session = await validateSessionToken(db, sessionToken);
      if (!session) return res.json({ user: null });

      const user = await getUserBySession(db, session);
      res.json({ user });
    } catch {
      res.json({ user: null });
    }
  });

  return router;
}

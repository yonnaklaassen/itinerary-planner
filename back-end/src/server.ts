import express from "express";
import cookieParser from "cookie-parser";
import { createDbConnection } from "./database/db-connection.js";
import authRoutes from "./routes/auth-routes.js";
import cors from "cors";

const db = await createDbConnection();
const app = express();
const PORT = Number(process.env.BACKEND_PORT) || 3080;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use("/auth", authRoutes(db))
app.use("/trip", authRoutes(db))
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
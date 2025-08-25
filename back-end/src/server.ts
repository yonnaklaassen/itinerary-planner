import express from "express";
import cookieParser from "cookie-parser";
import { createDbConnection } from "./database/db-connection.js";
import authRoutes from "./routes/auth-routes.js";

const db = createDbConnection();
const app = express();
const PORT = Number(process.env.BACKEND_PORT) || 4080;

app.use("/auth", authRoutes(db))
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

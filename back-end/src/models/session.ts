import { PublicUser } from "./user.js";

export interface Session {
  id: string;
  secretHash: Uint8Array;
  createdAt: Date;
}

export interface SessionWithToken extends Session {
  token: string;
}

interface SessionData {
  user: PublicUser;
  token: string;
}

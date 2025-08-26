export interface Session {
  id: string;
  userId: number;
  secretHash: string;
  createdAt: Date;
}

export interface SessionWithToken extends Session {
  token: string;
}

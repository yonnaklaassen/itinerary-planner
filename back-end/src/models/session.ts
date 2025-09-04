export interface Session {
  readonly id: string;
  readonly userId: string;
  readonly secretHash: string;
  readonly createdAt: Date;
}

export interface SessionWithToken extends Session {
    readonly token: string;
}

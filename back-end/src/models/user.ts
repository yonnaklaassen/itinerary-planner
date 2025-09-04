export interface User {
  readonly id: string;
  name: string;
  email: string;
  hashed_password: string;
  readonly created_at: Date;
}

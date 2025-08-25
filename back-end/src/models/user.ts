export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string; 
  created_at: Date;
}

export interface PublicUser {
  id: number;
  name: string;
  email: string;
}


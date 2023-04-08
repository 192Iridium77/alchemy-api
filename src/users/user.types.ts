export enum UserRole {
  BASIC = "basic",
  ADMIN = "admin",
}

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  created_at?: string; // iso datestring
  updated_at?: string; // iso datestring
}

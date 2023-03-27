export enum UserRole {
  BASIC = "basic",
  ADMIN = "basic",
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  created_at?: string; // iso datestring
  updated_at?: string; // iso datestring
}

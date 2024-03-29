export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
}

export interface RegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface InfSession {
  token: string;
  user: User;
}
export type UserRole = "admin" | "user";
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  status: 1 | 2; // 1  validation email - 2 not validation email yet
  createdAt: string;
  updatedAt: string;
  id: string;
  socialType: string;
  roles: UserRole[];
  connectionStatus: 1 | 2; // 1 online 2-offline
  lastSeenAt: string | null;
}

export interface EmailConfirmBody {
  hash: string | any;
}

export interface RestPasswordBody {
  password: string;
  hash: any;
}
export interface ForgotPasswordBody {
  email: string;
}

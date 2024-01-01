import { User } from "@/services/auth/type";

export function hasRole(user: User, role: "admin" | "user"): boolean {
  return user.roles.includes(role);
}

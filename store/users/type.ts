import { User } from "@/services/auth/type";
import { Column } from "@/services/types";

export interface IUsers {
  columns: Column<User>[];
}

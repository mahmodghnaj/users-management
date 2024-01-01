import { IPaginationOptions } from "../types";

export interface ListUsersParams extends IPaginationOptions {}

export type EventUserStatus = {
  id: string;
  status: 1 | 2;
  lastSeenAt: string | null;
};

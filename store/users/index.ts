import { StateCreator } from "zustand";
import { IUsers } from "./type";
import storeApp from "..";
import { formatDate } from "@/utils/date";

export const formattedRoles = (rolesArray: any[]) => {
  if (rolesArray.length === 0) {
    return ["User Normal"];
  }
  return rolesArray.map((role) => {
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  });
};
export const usersStore: StateCreator<IUsers> = (set) => ({
  columns: [
    {
      name: "firstName",
      label: "First Name",
      filed: (col) => col.firstName,
    },
    {
      name: "lastName",
      label: "Last Name",
      filed: (col) => col.firstName,
    },
    {
      name: "email",
      label: "Email",
      filed: (col) => col.email,
    },
    {
      name: "connectionStatus",
      label: "Status",
      filed: (col) => (col.connectionStatus !== 1 ? "Offline" : "Online"),
      classes: (col) =>
        col.connectionStatus === 1 ? "text-success" : "text-error",
    },
    {
      name: "lastSeenAt",
      label: "last Seen At",
      filed: (col) => formatDate(col.lastSeenAt || ""),
    },
    {
      name: "roles",
      label: "Roles",
      filed: (col) => formattedRoles(col.roles),
    },
    {
      name: "createdAt",
      label: "Created At",
      filed: (col) => formatDate(col.createdAt),
    },
  ],
});

export const usersSelectors = {
  columns: () => storeApp((state) => state.users.columns),
};

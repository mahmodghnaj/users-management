import { api } from "@/lib/axios/api";
import { useQuery } from "react-query";
import { ListUsersParams } from "./type";
import { InfinityPaginationResultType } from "../types";
import { User } from "../auth/type";

export const useListUsers = (params: ListUsersParams) =>
  useQuery<InfinityPaginationResultType<User>>(
    ["listUsers", params],
    async () => {
      const { data } = await api.get("/users", { params });
      return data;
    }
  );

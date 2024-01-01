import { create } from "zustand";
import { IAuth } from "./auth/type";
import { authSelectors, authStore } from "./auth";
import { logger } from "./middleware/logger";
import namespace from "./middleware/namespace";
import { IUsers } from "./users/type";
import { usersStore, usersSelectors } from "./users";

// @ts-ignore
const createStore: typeof create = (fn: any) => {
  return create(logger(fn));
};

type AppState = {
  auth: IAuth;
  users: IUsers;
};

const storeApp = createStore<AppState>((...a) => {
  const auth = namespace("auth", authStore)(...a);
  const users = namespace("users", usersStore)(...a);
  return {
    auth,
    users,
  };
});

export const selectors = {
  auth: { ...authSelectors },
  users: { ...usersSelectors },
};
export default storeApp;

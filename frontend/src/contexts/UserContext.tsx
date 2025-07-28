import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { UserShortType, UserType } from "../types/Types.ts";
import { useFetch } from "../hooks/useFetch.ts";
import { APIRoutesNames } from "../utils/RoutesNames.ts";
import { getFromLocalStorage, LocalStorageStores } from "../utils/manageLocalStorage.ts";

interface UserContextType {
  user: UserShortType | null;
  roles: string[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<UserShortType | null>(null);
  const { fetchData } = useFetch<UserType>();
  const [roles, setRoles] = useState<string[]>([]);

  async function getUserData() {
    const res = await fetchData({
      url: APIRoutesNames.USER_PROFILE()
    });

    if (res !== null) {
      setUser(res?.user!);
      setRoles(res!.roles || []);
      return res;
    }
    return null;
  }

  useEffect(() => {
    const authkey = getFromLocalStorage<string>(LocalStorageStores.TOKEN);
    if (authkey) {
      getUserData();
    }
  }, []);

  const value = useMemo<UserContextType>(
    () => ({
      user,
      roles
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}

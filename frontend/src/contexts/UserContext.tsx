import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { UserType } from "../types/Types.ts";
import { useFetch } from "../hooks/useFetch.ts";
import { APIRoutesNames } from "../utils/RoutesNames.ts";
import { getFromLocalStorage, LocalStorageStores } from "../utils/manageLocalStorage.ts";

interface UserContextType {
  user: UserType | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<UserType | null>(null);
  const { fetchData } = useFetch<UserType>();

  async function getUserData() {
    const res = await fetchData({
      url: APIRoutesNames.USER_PROFILE()
    });

    if (res !== null) {
      setUser(res!);
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
      user
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

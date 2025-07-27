import { useCallback, useState } from "react";
import type { ApiResultFormat } from "../types/ApiResultFormat.ts";
import { useToast } from "../contexts/ToastContext.tsx";
import { type APIRoutesNames, RoutesNames } from "../utils/RoutesNames.ts";
import { getFromLocalStorage, LocalStorageStores } from "../utils/manageLocalStorage.ts";
import { useNavigate } from "react-router";

type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchParams<BodyType = undefined> {
  url: (typeof APIRoutesNames)[keyof typeof APIRoutesNames];
  method?: FetchMethod;
  body?: BodyType extends undefined ? never : BodyType;
}

export function useFetch<TResultType, TBodyType = undefined>() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [data, setData] = useState<TResultType | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async ({ url, method = "GET", body }: FetchParams<TBodyType>) => {
    setLoading(true);
    setMessage("");
    setData(null);

    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };
    const authkey = getFromLocalStorage<string>(LocalStorageStores.TOKEN);
    if (authkey) {
      headers["Authorization"] = `Bearer ${getFromLocalStorage(LocalStorageStores.TOKEN)}`;
    }

    try {
      const response: Response = await fetch(url as string, {
        method,
        headers,
        body: method !== "GET" ? JSON.stringify(body) : undefined,
        credentials: "include"
      });

      if (!response.ok) {
        const errorData: ApiResultFormat<null> = await response.json();
        showToast(errorData.message ?? "Something went wrong", "error");
        return null;
      }

      if (!response.ok && response.status === 401) {
        showToast("Unauthorized access. Please log in again.", "error");
        return navigate(RoutesNames.LOGIN);
      }

      if (!response.ok && response.status === 403) {
        showToast("Forbidden access. You do not have permission to perform this action.", "error");
        return navigate(RoutesNames.HOME);
      }

      const data: ApiResultFormat<TResultType> = await response.json();

      if (response.ok && data.status === "success") {
        setData(data.data ?? null);
        return data.data;
      } else {
        showToast(data.message ?? "Something went wrong", "error");
      }
    } catch (err) {
      console.log("Fetch error:", err);
      showToast(err instanceof Error ? err.message : "Unknown error", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, message, loading, fetchData };
}

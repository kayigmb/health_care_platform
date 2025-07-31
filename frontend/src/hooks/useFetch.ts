import { useCallback, useState } from "react";
import type { ApiResultFormat } from "../types/ApiResultFormat.ts";
import { useToast } from "../contexts/ToastContext.tsx";
import { type APIRoutesNames, RoutesNames } from "../utils/RoutesNames.ts";
import {
  clearLocalStorage,
  getFromLocalStorage,
  LocalStorageStores
} from "../utils/manageLocalStorage.ts";
import { useNavigate } from "react-router";

type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchParams<BodyType = undefined> {
  url: (typeof APIRoutesNames)[keyof typeof APIRoutesNames];
  method?: FetchMethod;
  body?: BodyType extends undefined ? never : BodyType;
}

export function useFetch<TResultType, TBodyType = undefined>() {
  const { showToast } = useToast();
  const apiBase = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [data, setData] = useState<TResultType | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async ({ url, method = "GET", body }: FetchParams<TBodyType>) => {
      setLoading(true);
      setMessage("");
      setData(null);

      const headers: Record<string, string> = {
        "Content-Type": "application/json"
      };
      const token = getFromLocalStorage<string>(LocalStorageStores.TOKEN);
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const api = (u: string) =>
        import.meta.env.MODE === "production" ? `${apiBase}${u}` : `/api${u}`;

      try {
        const res = await fetch(api(url as string), {
          method,
          headers,
          body: method !== "GET" ? JSON.stringify(body) : undefined
        });

        if (!res.ok) {
          if (res.status === 401) {
            showToast("Unauthorized access. Please log in again.", "error");
            clearLocalStorage();
            navigate(RoutesNames.LOGIN);
            return null;
          } else if (res.status === 403) {
            showToast(
              "Forbidden access. You do not have permission to perform this action.",
              "error"
            );
            navigate(RoutesNames.HOME);
            return null;
          }
        }

        const parsed: ApiResultFormat<TResultType> = await res.json();

        if (parsed.status === "error") {
          console.log("Error data:", parsed);
          showToast(parsed.message ?? "Something went wrong", "error");
          return null;
        }

        setData(parsed.data ?? null);
        return parsed.data ?? null;
      } catch (err) {
        console.error("Fetch error:", err);
        showToast(err instanceof Error ? err.message : "Unknown error", "error");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [navigate, showToast]
  );

  return { data, message, loading, fetchData };
}

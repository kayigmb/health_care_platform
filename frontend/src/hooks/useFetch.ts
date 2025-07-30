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

    return fetch(`/api${url as string}`, {
      method,
      headers,
      body: method !== "GET" ? JSON.stringify(body) : undefined
    })
      .then((res) => {
        setLoading(false);
        if (!res.ok) {
          if (res.status === 401) {
            showToast("Unauthorized access. Please log in again.", "error");
            clearLocalStorage();
            return navigate(RoutesNames.LOGIN);
          } else if (res.status === 403) {
            showToast(
              "Forbidden access. You do not have permission to perform this action.",
              "error"
            );
            return navigate(RoutesNames.HOME);
          }
        }
        return res.json();
      })
      .then((data: ApiResultFormat<TResultType>) => {
        setLoading(false);
        if (data.status === "success") {
          setData(data.data ?? null);
          return data.data;
        } else {
          console.log("Error data:", data);
          showToast(data.message ?? "Something went wrong", "error");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        showToast(err instanceof Error ? err.message : "Unknown error", "error");
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, message, loading, fetchData };
}

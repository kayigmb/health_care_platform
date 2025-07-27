import { Navigate, Outlet } from "react-router";
import { RoutesNames } from "../utils/RoutesNames.ts";
import { getFromLocalStorage, LocalStorageStores } from "../utils/manageLocalStorage.ts";

function isAuthenticated() {
  return getFromLocalStorage(LocalStorageStores.TOKEN) !== null;
}

export function ProtectedRoutes() {
  return isAuthenticated() ? <Outlet /> : <Navigate to={RoutesNames.LOGIN} replace />;
}

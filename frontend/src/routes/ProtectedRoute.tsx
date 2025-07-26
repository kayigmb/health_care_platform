import {Navigate, Outlet} from "react-router";
import {RoutesNames} from "../utils/RoutesNames.ts";

function isAuthenticated() {
    return true
}

export function ProtectedRoute() {
    return isAuthenticated() ? <Outlet/> : <Navigate to={RoutesNames.LOGIN} replace/>;
}

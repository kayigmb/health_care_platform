import { Outlet } from "react-router";
import { UserContextProvider } from "../../contexts/UserContext.tsx";

export function LayoutPage() {
  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  );
}

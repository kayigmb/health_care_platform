import React from "react";
import { useUserContext } from "../contexts/UserContext.tsx";

type Role = "user" | "doctor" | "admin";

interface RoleGuardProps {
  allowed: Role[];
  children: React.ReactNode;
}

/*
 * RoleGuard component checks if the user has one of the allowed roles.
 */
export function RoleGuard({ allowed, children }: Readonly<RoleGuardProps>) {
  const { roles } = useUserContext();
  const hasAccess: boolean = roles.some((role: string): boolean => allowed.includes(role as Role));
  return <>{hasAccess ? children : null}</>;
}

export const RoutesNames = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROTECTED: "/protected",
  USERS: "users",
  DOCTORS: "doctors",
  ADMIN: "admin"
} as const;

export const APIRoutesNames = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  USERS: "/users",
  USER_PROFILE() {
    return `${this.USERS}/me`;
  }
};

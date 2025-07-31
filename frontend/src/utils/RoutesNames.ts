export const RoutesNames = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROTECTED: "/protected",
  USERS: "users",
  DOCTORS: "doctors",
  ADMIN: "admin",
  PROTECTED_USERS() {
    return `${this.PROTECTED}/${this.USERS}`;
  },
  PROTECTED_DOCTORS() {
    return `${this.PROTECTED}/${this.DOCTORS}`;
  },
  PROTECTED_ADMIN() {
    return `${this.PROTECTED}/${this.ADMIN}`;
  }
} as const;

export const APIRoutesNames = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  USERS: "/users",
  ROLES: "/roles",
  ROLE_SCOPES: "/roles-scopes",
  HOSPITALS: "/hospitals",
  MEDICAL_RECORDS: "/medical-records",
  APPOINTMENTS: "/appointments",
  USER_PROFILE() {
    return `${this.USERS}/me`;
  }
};

import { api } from "./api";

export const userModel = {
  me: () => api("/auth/me"),
  authenticate: (register, credentials) =>
    api(`/auth/${register ? "register" : "login"}`, "POST", credentials),
  logout: () => api("/auth/logout", "POST"),
};

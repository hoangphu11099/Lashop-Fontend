import { api } from "./api";

export const orderModel = {
  list: () => api("/orders"),
  create: (shipping) => api("/orders", "POST", shipping),
};

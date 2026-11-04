import { api } from "./api";

export const cartModel = {
  list: () => api("/cart"),
  update: (id, quantity) => api(`/cart/${id}`, "PUT", { quantity }),
};

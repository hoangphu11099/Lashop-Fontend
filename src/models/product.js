import { api } from "./api";

export const empty = {
  name: "",
  description: "",
  category: "Công nghệ",
  price: 100000,
  stock: 10,
  image: "",
};

export const productModel = {
  list: () => api("/products"),
  save: (product) =>
    api(
      `/products${product.id ? `/${product.id}` : ""}`,
      product.id ? "PUT" : "POST",
      product,
    ),
  remove: (id) => api(`/products/${id}`, "DELETE"),
};

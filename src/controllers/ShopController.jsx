import React, { createContext, useContext, useEffect, useState } from "react";
import { userModel } from "../models/user";
import { cartModel } from "../models/cart";
import { orderModel } from "../models/order";
import { empty, productModel } from "../models/product";

const ShopContext = createContext(null);
export function ShopProvider({ children }) {
  const [user, setUser] = useState(null),
    [products, setProducts] = useState([]),
    [cart, setCart] = useState([]),
    [orders, setOrders] = useState([]),
    [page, setPage] = useState("shop"),
    [search, setSearch] = useState(""),
    [category, setCategory] = useState("Tất cả"),
    [sort, setSort] = useState("new"),
    [modal, setModal] = useState(null),
    [register, setRegister] = useState(false),
    [edit, setEdit] = useState(empty),
    [detail, setDetail] = useState(null),
    [notice, setNotice] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(true);
  const notify = (s) => {
    setNotice(s);
    setTimeout(() => setNotice(""), 4000);
  };
  const loadProducts = () => productModel.list().then(setProducts);
  const loadPrivate = () =>
    Promise.all([
      cartModel.list().then(setCart),
      orderModel.list().then(setOrders),
    ]);
  useEffect(() => {
    Promise.all([
      loadProducts(),
      userModel
        .me()
        .then((u) => {
          setUser(u);
          return loadPrivate();
        })
        .catch(() => {}),
    ])
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  async function run(fn) {
    setError("");
    setBusy(true);
    try {
      await fn();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  function requireLogin() {
    setError("");
    setRegister(false);
    setModal("auth");
  }
  async function quantity(p, q) {
    if (!user) {
      requireLogin();
      return;
    }
    await run(async () => {
      await cartModel.update(p.id, q);
      setCart(await cartModel.list());
      notify(q ? "Đã cập nhật giỏ hàng" : "Đã xóa khỏi giỏ");
    });
  }
  async function authenticate(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    await run(async () => {
      const u = await userModel.authenticate(register, values);
      setUser(u);
      await loadPrivate();
      setModal(null);
      notify("Xin chào, " + u.name + "!");
    });
  }
  const categories = ["Tất cả", ...new Set(products.map((p) => p.category))];
  let visible = products.filter(
    (p) =>
      (category === "Tất cả" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );
  if (sort !== "new")
    visible.sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price,
    );
  const total = cart.reduce((s, p) => s + p.price * p.quantity, 0),
    count = cart.reduce((s, p) => s + p.quantity, 0);

  const logout = () =>
    run(async () => {
      await userModel.logout();
      setUser(null);
      setCart([]);
      setOrders([]);
      setPage("shop");
      notify("Đã đăng xuất");
    });
  const checkout = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    run(async () => {
      const order = await orderModel.create(data);
      await Promise.all([loadPrivate(), loadProducts()]);
      setPage("orders");
      notify("Đặt hàng thành công! Mã đơn #" + order.id);
    });
  };
  const removeProduct = (p) => {
    if (confirm("Xóa sản phẩm “" + p.name + "”?"))
      run(async () => {
        await productModel.remove(p.id);
        await Promise.all([loadProducts(), loadPrivate()]);
        notify("Đã xóa sản phẩm");
      });
  };
  const saveProduct = (e) => {
    e.preventDefault();
    run(async () => {
      await productModel.save(edit);
      await loadProducts();
      setModal(null);
      notify("Đã lưu sản phẩm");
    });
  };

  return (
    <ShopContext.Provider
      value={{
        user,
        setUser,
        products,
        setProducts,
        cart,
        setCart,
        orders,
        setOrders,
        page,
        setPage,
        search,
        setSearch,
        category,
        setCategory,
        sort,
        setSort,
        modal,
        setModal,
        register,
        setRegister,
        edit,
        setEdit,
        detail,
        setDetail,
        notice,
        setNotice,
        error,
        setError,
        busy,
        loading,
        notify,
        loadProducts,
        loadPrivate,
        run,
        requireLogin,
        quantity,
        authenticate,
        categories,
        visible,
        total,
        count,
        logout,
        checkout,
        removeProduct,
        saveProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw Error("useShop requires ShopProvider");
  return context;
}

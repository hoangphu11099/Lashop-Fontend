import { useShop } from "../../controllers/ShopController";

export default function Header() {
  const { user, page, setPage, requireLogin, count, logout } =
    useShop();
  return (
    <>
      <div className="announcement">
        Một chút tinh giản. Một ngày tốt hơn.{" "}
        <span>Khám phá bộ sưu tập mới ↗</span>
      </div>
      <header>
        <a className="logo" href="#" onClick={() => setPage("shop")}>
          lá<span>shop.</span>
        </a>
        <nav>
          <button
            className={page === "shop" ? "selected" : ""}
            onClick={() => setPage("shop")}>
            Cửa hàng
          </button>
          {user && <button onClick={() => setPage("orders")}>Đơn hàng</button>}
          {user?.role === "admin" && (
            <button onClick={() => setPage("admin")}>Quản trị</button>
          )}
        </nav>
        <div className="account">
          {user ? (
            <>
              <span className="username">Chào, {user.name}</span>
              <button onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <button onClick={requireLogin}>Đăng nhập ↗</button>
          )}
          <button
            className="cart-button"
            onClick={() => (user ? setPage("cart") : requireLogin())}>
            Giỏ hàng <b>{count}</b>
          </button>
        </div>
      </header>
    </>
  );
}

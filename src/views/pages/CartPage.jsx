import { useShop } from "../../controllers/ShopController";
import { money } from "../../utils/money";
import Art from "../components/Art";

export default function CartPage() {
  const { user, cart, setPage, busy, quantity, total, checkout } = useShop();
  return (
    <section>
      <div className="section-title">
        <h1>
          Giỏ hàng của bạn<span>.</span>
        </h1>
        <button onClick={() => setPage("shop")}>Tiếp tục mua sắm ↗</button>
      </div>
      {!cart.length ? (
        <div className="empty">
          Giỏ hàng đang trống. Hãy chọn một món đồ bạn yêu thích.
        </div>
      ) : (
        <div className="checkout-layout">
          <div>
            {cart.map((p, i) => (
              <div className="cart-row" key={p.id}>
                <Art p={p} index={i} />
                <div>
                  <h3>{p.name}</h3>
                  <p>{money(p.price)}</p>
                  <small>Còn {p.stock} sản phẩm</small>
                </div>
                <div className="quantity">
                  <button
                    disabled={busy}
                    onClick={() => quantity(p, p.quantity - 1)}>
                    −
                  </button>
                  <span>{p.quantity}</span>
                  <button
                    disabled={busy || p.quantity >= p.stock || p.quantity >= 99}
                    onClick={() => quantity(p, p.quantity + 1)}>
                    +
                  </button>
                </div>
                <button disabled={busy} onClick={() => quantity(p, 0)}>
                  Xóa
                </button>
              </div>
            ))}
          </div>
          <form className="panel" onSubmit={checkout}>
            <h2>Thông tin giao hàng</h2>
            <label>
              Họ tên
              <input
                name="name"
                required
                maxLength={100}
                defaultValue={user?.name}
              />
            </label>
            <label>
              Số điện thoại
              <input
                name="phone"
                type="tel"
                required
                minLength={8}
                maxLength={30}
              />
            </label>
            <label>
              Địa chỉ
              <textarea name="address" required minLength={5} maxLength={500} />
            </label>
            <p className="total">
              Tổng thanh toán <strong>{money(total)}</strong>
            </p>
            <p>Thanh toán khi nhận hàng (COD).</p>
            <button className="primary full" disabled={busy}>
              {busy ? "Đang xử lý…" : "Đặt hàng →"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

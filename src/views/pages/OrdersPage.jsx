import React from "react";
import { useShop } from "../../controllers/ShopController";
import { money } from "../../utils/money";
import { empty } from "../../models/product";

export default function OrdersPage() {
  const { user, orders, quantity, total } = useShop();
  return (
    <section>
      <div className="eyebrow">ĐƠN HÀNG</div>
      <h1>
        {user?.role === "admin" ? "Tất cả đơn hàng" : "Lịch sử mua hàng"}.
      </h1>
      {!orders.length ? (
        <div className="empty">Chưa có đơn hàng nào.</div>
      ) : (
        orders.map((o) => (
          <article className="order panel" key={o.id}>
            <div className="section-title">
              <h3>Đơn #{o.id}</h3>
              <span className="badge">Chờ xác nhận · COD</span>
            </div>
            <small>{new Date(o.created_at).toLocaleString("vi-VN")}</small>
            <p>
              {o.name} · {o.phone}
              <br />
              {o.address}
            </p>
            {o.items.map((it, i) => (
              <div className="order-item" key={i}>
                <span>
                  {it.name} × {it.quantity}
                </span>
                <strong>{money(it.price * it.quantity)}</strong>
              </div>
            ))}
            <p className="total">
              Tổng cộng <strong>{money(o.total)}</strong>
            </p>
          </article>
        ))
      )}
    </section>
  );
}

import React from "react";
import { useShop } from "../../controllers/ShopController";
import Dialog from "./Dialog";
import Art from "./Art";
import { money } from "../../utils/money";

export default function ProductDetailDialog() {
  const { cart, category, detail, setDetail, busy, quantity } = useShop();
  return (
    <Dialog titleId="detail-title" onClose={() => setDetail(null)}>
      <Art p={detail} />
      <p className="eyebrow">{detail.category}</p>
      <h2 id="detail-title">{detail.name}</h2>
      <p>{detail.description}</p>
      <h3>{money(detail.price)}</h3>
      <p>Còn {detail.stock} sản phẩm</p>
      <button
        className="primary full"
        disabled={busy || !detail.stock}
        onClick={() => {
          setDetail(null);
          quantity(
            detail,
            (cart.find((c) => c.id === detail.id)?.quantity || 0) + 1,
          );
        }}
      >
        Thêm vào giỏ +
      </button>
    </Dialog>
  );
}

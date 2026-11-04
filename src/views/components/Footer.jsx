import React from "react";
import { useShop } from "../../controllers/ShopController";

export default function Footer() {
  const { setPage } = useShop();
  return (
    <footer>
      <a className="logo" href="#" onClick={() => setPage("shop")}>
        Lá<span>shop.</span>
      </a>
      <span>Chọn điều giản đơn. Sống điều bạn thích.</span>
      <small>© 2026 Lá Shop · Thời Trang & Công Nghệ</small>
    </footer>
  );
}

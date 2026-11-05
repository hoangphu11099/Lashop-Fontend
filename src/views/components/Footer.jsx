import { useShop } from "../../controllers/ShopController";

export default function Footer() {
  const { setPage } = useShop();
  return (
    <footer>
      <a className="logo" href="#" onClick={() => setPage("shop")}>
        Lá<span>Shop.</span>
      </a>
      <span>Tối ưu lựa chọn. Sống điều bạn thích.</span>
      <small>© 2026 Lá Shop · Thời Trang & Công Nghệ</small>
    </footer>
  );
}

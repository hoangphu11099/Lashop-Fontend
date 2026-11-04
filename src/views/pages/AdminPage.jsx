import React from "react";
import { useShop } from "../../controllers/ShopController";
import { money } from "../../utils/money";
import { empty } from "../../models/product";

export default function AdminPage() {
  const {
    products,
    orders,
    category,
    setModal,
    setEdit,
    busy,
    total,
    removeProduct,
  } = useShop();
  return (
    <section>
      <div className="section-title">
        <div>
          <div className="eyebrow">QUẢN TRỊ CỬA HÀNG</div>
          <h1>Quản lý sản phẩm.</h1>
        </div>
        <button
          className="primary"
          onClick={() => {
            setEdit({ ...empty });
            setModal("product");
          }}
        >
          + Tạo sản phẩm
        </button>
      </div>
      <div className="stats">
        <div>
          <strong>{products.length}</strong>Sản phẩm
        </div>
        <div>
          <strong>{orders.length}</strong>Đơn hàng
        </div>
        <div>
          <strong>{money(orders.reduce((s, o) => s + o.total, 0))}</strong>Tổng
          giá trị đơn
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{money(p.price)}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    onClick={() => {
                      setEdit({ ...p });
                      setModal("product");
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="danger"
                    disabled={busy}
                    onClick={() => removeProduct(p)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!products.length && <div className="empty">Chưa có sản phẩm.</div>}
    </section>
  );
}

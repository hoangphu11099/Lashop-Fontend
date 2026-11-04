import React from "react";
import { useShop } from "../../controllers/ShopController";
import { money } from "../../utils/money";
import { empty } from "../../models/product";
import Art from "../components/Art";

export default function ShopPage() {
  const {
    products,
    cart,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    setDetail,
    error,
    busy,
    loading,
    loadProducts,
    run,
    quantity,
    categories,
    visible,
  } = useShop();
  return (
    <>
      <section className="hero">
        <div>
          <div className="eyebrow">THIẾT YẾU CHO MỖI NGÀY / 2026</div>
          <h1>
            Ít hơn một chút.
            <br />
            <em>Vừa vặn hơn nhiều.</em>
          </h1>
          <p>
            Những món đồ bạn cần, trong thiết kế bạn yêu.
            <br />
            Khám phá lựa chọn nhỏ cho cuộc sống đầy cảm hứng.
          </p>
          <a className="primary" href="#collection">
            Khám phá sản phẩm <span>↗</span>
          </a>
          <div className="hero-note">
            <i /> Chọn kỹ từng sản phẩm · Đồng hành mỗi ngày
          </div>
        </div>
        <div className="hero-art">
          <div className="orbit" />
          <div className="headphone">
            <div className="band" />
            <div className="ear left" />
            <div className="ear right" />
          </div>
          <span className="art-tag">ÂM THANH CỦA RIÊNG BẠN</span>
          <div className="floating-label">
            Daily essentials <span>01 — 06</span>
          </div>
        </div>
      </section>
      <div className="benefits">
        <span>✧ Thiết kế có chọn lọc</span>
        <span>◇ Chất lượng mỗi ngày</span>
        <span>↗ Đặt hàng dễ dàng</span>
        <span>♡ Chăm chút từng chi tiết</span>
      </div>
      <section id="collection">
        <div className="section-title">
          <div>
            <div className="eyebrow">THE COLLECTION</div>
            <h2>
              Góc nhỏ, nhiều lựa chọn<span>.</span>
            </h2>
          </div>
          <span>{products.length} sản phẩm được chọn lọc</span>
        </div>
        <div className="filters">
          <div className="tabs">
            {categories.map((c) => (
              <button
                key={c}
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="search-sort">
            <input
              aria-label="Tìm sản phẩm"
              placeholder="Tìm sản phẩm…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              aria-label="Sắp xếp"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="new">Mới nhất</option>
              <option value="asc">Giá tăng dần</option>
              <option value="desc">Giá giảm dần</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="empty">Đang tải sản phẩm…</div>
        ) : visible.length ? (
          <div className="grid">
            {visible.map((p, i) => (
              <article className="product" key={p.id}>
                <button className="image-button" onClick={() => setDetail(p)}>
                  <Art p={p} index={i} />
                  <span className="stock">
                    {p.stock ? "CÒN HÀNG" : "HẾT HÀNG"}
                  </span>
                </button>
                <div className="product-meta">
                  {p.category}
                  <span>↗</span>
                </div>
                <h3>
                  <button onClick={() => setDetail(p)}>{p.name}</button>
                </h3>
                <div className="product-bottom">
                  <strong>{money(p.price)}</strong>
                  <button
                    disabled={busy || !p.stock}
                    aria-label={"Thêm " + p.name + " vào giỏ"}
                    onClick={() =>
                      quantity(
                        p,
                        (cart.find((c) => c.id === p.id)?.quantity || 0) + 1,
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">
            Không có sản phẩm phù hợp.{" "}
            {error && (
              <button onClick={() => run(loadProducts)}>Thử tải lại</button>
            )}
          </div>
        )}
      </section>
      <section className="story">
        <span>CHỌN CÓ CHỦ ĐÍCH</span>
        <h2>
          Đồ dùng tốt.
          <br />
          Những ngày thật đẹp.
        </h2>
        <p>
          Không cần quá nhiều để có một cuộc sống đủ đầy.
          <br />
          Bắt đầu từ những điều nhỏ bạn dùng mỗi ngày.
        </p>
      </section>
    </>
  );
}

import { useShop } from "../../controllers/ShopController";
import Dialog from "./Dialog";

export default function ProductDialog() {
  const { edit, setEdit, error, busy, saveProduct, setModal } =
    useShop();
  return (
    <Dialog busy={busy} onClose={() => setModal(null)}>
      <>
        <h2 id="dialog-title">{edit.id ? "Sửa sản phẩm" : "Tạo sản phẩm"}</h2>
        <form onSubmit={saveProduct}>
          {[
            ["name", "Tên sản phẩm", "text"],
            ["category", "Danh mục", "text"],
            ["price", "Giá (VNĐ)", "number"],
            ["stock", "Tồn kho", "number"],
            ["image", "URL ảnh HTTPS (tùy chọn)", "url"],
          ].map(([key, label, type]) => (
            <label key={key}>
              {label}
              <input
                type={type}
                required={key !== "image"}
                min={key === "price" ? 1 : 0}
                max={
                  key === "price"
                    ? 1000000000
                    : key === "stock"
                      ? 100000
                      : undefined
                }
                maxLength={key === "image" ? 1000 : key === "name" ? 200 : 100}
                value={edit[key]}
                onChange={(e) =>
                  setEdit({
                    ...edit,
                    [key]:
                      type === "number"
                        ? Number(e.target.value)
                        : e.target.value,
                  })
                }
              />
            </label>
          ))}
          <label>
            Mô tả
            <textarea
              maxLength={10000}
              value={edit.description}
              onChange={(e) =>
                setEdit({ ...edit, description: e.target.value })
              }
            />
          </label>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button className="primary full" disabled={busy}>
            {busy ? "Đang lưu…" : "Lưu sản phẩm"}
          </button>
        </form>
      </>
    </Dialog>
  );
}

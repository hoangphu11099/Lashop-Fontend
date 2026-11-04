import React from "react";
import { useShop } from "../../controllers/ShopController";
import Dialog from "./Dialog";

export default function AuthDialog() {
  const {
    register,
    setRegister,
    error,
    setError,
    busy,
    authenticate,
    setModal,
  } = useShop();
  return (
    <Dialog busy={busy} onClose={() => setModal(null)}>
      <>
        <div className="eyebrow">CHÀO MỪNG ĐẾN LÁ SHOP</div>
        <h2 id="dialog-title">
          {register ? "Tạo tài khoản mới" : "Rất vui gặp lại bạn."}
        </h2>
        <form onSubmit={authenticate}>
          {register && (
            <label>
              Họ và tên
              <input name="name" required maxLength={100} autoComplete="name" />
            </label>
          )}
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={190}
            />
          </label>
          <label>
            Mật khẩu
            <input
              name="password"
              type="password"
              required
              minLength={8}
              maxLength={72}
              autoComplete={register ? "new-password" : "current-password"}
            />
          </label>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button className="primary full" disabled={busy}>
            {busy ? "Đang xử lý…" : register ? "Đăng ký" : "Đăng nhập"}
          </button>
        </form>
        <p>
          {register ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
          <button
            className="link"
            onClick={() => {
              setRegister(!register);
              setError("");
            }}
          >
            {register ? "Đăng nhập" : "Đăng ký ngay"}
          </button>
        </p>
      </>
    </Dialog>
  );
}

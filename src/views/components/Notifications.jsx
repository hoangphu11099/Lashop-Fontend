import React from "react";
import { useShop } from "../../controllers/ShopController";

export default function Notifications() {
  const { notice, error, setError } = useShop();
  return (
    <>
      {notice && (
        <div className="toast" role="status">
          ✓ {notice}
        </div>
      )}
      {error && (
        <div className="error" role="alert">
          {error}
          <button onClick={() => setError("")} aria-label="Đóng thông báo">
            ×
          </button>
        </div>
      )}
    </>
  );
}

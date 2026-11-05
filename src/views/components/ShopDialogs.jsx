import { useShop } from "../../controllers/ShopController";
import AuthDialog from "./AuthDialog";
import ProductDialog from "./ProductDialog";
import ProductDetailDialog from "./ProductDetailDialog";

export default function ShopDialogs() {
  const { modal, detail } = useShop();
  return (
    <>
      {modal === "auth" && <AuthDialog />}
      {modal === "product" && <ProductDialog />}
      {detail && <ProductDetailDialog />}
    </>
  );
}

import React from "react";
import { ShopProvider, useShop } from "./controllers/ShopController";
import Header from "./views/components/Header";
import Footer from "./views/components/Footer";
import Notifications from "./views/components/Notifications";
import ShopDialogs from "./views/components/ShopDialogs";
import ShopPage from "./views/pages/ShopPage";
import CartPage from "./views/pages/CartPage";
import OrdersPage from "./views/pages/OrdersPage";
import AdminPage from "./views/pages/AdminPage";

function ShopView() {
  const { page, user } = useShop();
  return (
    <>
      <Header />
      <main>
        <Notifications />
        {page === "shop" && <ShopPage />}
        {page === "cart" && user && <CartPage />}
        {page === "orders" && user && <OrdersPage />}
        {page === "admin" && user?.role === "admin" && <AdminPage />}
      </main>
      <Footer />
      <ShopDialogs />
    </>
  );
}
export default function App() {
  return (
    <ShopProvider>
      <ShopView />
    </ShopProvider>
  );
}

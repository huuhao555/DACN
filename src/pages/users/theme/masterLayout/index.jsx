// src/pages/users/theme/masterLayout.js
import { memo } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Footer from "../footer";
import Header from "../header";
import { UserProvider } from "../../../../middleware/UserContext";
import { CartProvider } from "../../../../middleware/CartContext";

const MasterLayout = (props) => {
  return (
    <UserProvider>
      <CartProvider>
        <div {...props}>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
};

export default memo(MasterLayout);

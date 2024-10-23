// src/pages/users/theme/masterLayout.js
import { memo } from "react";
import Footer from "../footer";
import Header from "../header";
import { UserProvider } from "../../../../middleware/UserContext";
import { CartProvider } from "../../../../middleware/CartContext";


const MasterLayout = ({ children, ...props }) => {
  return (
    <UserProvider>
      <CartProvider>
      <div {...props}>
        <Header />
        {children}
        <Footer />
      </div>
      </CartProvider>
    </UserProvider>
  );
};

export default memo(MasterLayout);

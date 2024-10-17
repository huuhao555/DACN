// src/pages/users/theme/masterLayout.js
import { memo } from "react";
import Footer from "../footer";
import Header from "../header";
import { UserProvider } from "../../../../middleware/UserContext";

const MasterLayout = ({ children, ...props }) => {
  return (
    <UserProvider>
      <div {...props}>
        <Header />
        {children}
        <Footer />
      </div>
    </UserProvider>
  );
};

export default memo(MasterLayout);

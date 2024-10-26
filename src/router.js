// src/router.js
import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/users/homePage";
import MasterLayout from "./pages/users/theme/masterLayout";
import ProfilePage from "./pages/users/profilePage";
import LoginPage from "./pages/users/auth/login/Login";
import ProductPage from "./pages/users/productPage";
import SignUpPage from "./pages/users/auth/signup/Signup";
import ProductDetailsPage from "./pages/users/productDetailsPage";
import CartPage from "./pages/users/cartPage";
import { CartProvider } from "./middleware/CartContext";
import PaymentPage from "./pages/users/paymentPage";
import ProductType from "./pages/users/productType";

const renderUserRouter = () => {
  const userRouter = [
    {
      path: ROUTERS.USER.HOME,
      component: <HomePage />
    },
    {
      path: ROUTERS.USER.PRODUCTS,
      component: <ProductPage />
    },
    {
      path: ROUTERS.USER.PROFILE,
      component: <ProfilePage />
    },
    {
      path: ROUTERS.USER.DETAILS,
      component: <ProductDetailsPage />
    },
    {
      path: ROUTERS.USER.CART,
      component: <CartPage />
    },
    {
      path: ROUTERS.USER.LOGIN,
      component: <LoginPage />
    },
    {
      path: ROUTERS.USER.SIGNUP,
      component: <SignUpPage />
    },
    {
      path: ROUTERS.USER.PAYMENT,
      component: <PaymentPage />
    },
    {
      path: ROUTERS.USER.PRODUCT_TYPE,
      component: <ProductType />
    }
  ];

  return (
    <CartProvider>
      <MasterLayout>
        <Routes>
          {userRouter.map((item, key) => (
            <Route key={key} path={item.path} element={item.component} />
          ))}
        </Routes>
      </MasterLayout>
    </CartProvider>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;

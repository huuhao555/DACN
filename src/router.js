import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";

import HomePage from "./pages/users/homePage";
import MasterLayout from "./pages/users/theme/masterLayout";
import LoginPage from "./pages/users/auth/login/Login";
import ProductPage from "./pages/users/productPage";
import SignUpPage from "./pages/users/auth/signup/Signup";
import ProductDetailsPage from "./pages/users/productDetailsPage";
import CartPage from "./pages/users/cartPage";
import ProductType from "./pages/users/productType";

import ProductListAdmin from "./component/admin/ProductList/ProductList.jsx";
import ManageStaffAdmin from "./component/admin/StaffManagement/StaffManagement.jsx";
import ManageProductsAdmin from "./component/admin/ProductManagement/ProductManagement.jsx";
import RevenueStatistics from "./component/admin/RevenueStatistics/index.jsx";
import PurchaseHistoryAdmin from "./component/admin/PurchaseHistory/PurchaseHistory.jsx";
import AdminLayout from "./pages/admin/theme/adminLayout";
import CreateProductAdmin from "./component/admin/CreateProduct/index.jsx";
import Dashboard from "./component/admin/Dashboard/index.jsx";
import UpdateProduct from "./component/admin/UpdateProduct/index.jsx";
import UpdateUser from "./pages/admin/auth/UpdateUser/index.jsx";
import DeleteUser from "./pages/admin/auth/DeleteUser/index.jsx";
import ProfilePageLayout from "./pages/users/theme/profileLayout";
import ContactPage from "./pages/users/contactPage/index.jsx";
import AccountInfo from "./pages/users/profilePage/accountInfo/index.jsx";
import OrderManagement from "./pages/users/profilePage/orderManagement/index.jsx";
import ViewedProducts from "./pages/users/profilePage/viewedProducts/index.jsx";
import AddressBook from "./pages/users/profilePage/addressUser/index.jsx";
import ChangePassword from "./pages/users/auth/changePassword/index.jsx";
import OrderLookup from "./pages/users/orderLoockup/index.jsx";
import ProductDetail from "./component/admin/ProductDetail/index.jsx";
import VerifyOtp from "./pages/users/auth/VerifyOtp/index.jsx";
import OrderPage from "./pages/users/paymentPage/index.jsx";
import OrderStorage from "./pages/users/orderdetailpage/index.jsx";
import OrderManagementAdmin from "./component/admin/OrderManagement/index.jsx";
import AddReview from "./component/user/AddReview/index.jsx";
import NotFoundPage from "./component/general/NotFoundPage/index.jsx";

const RouterCustom = () => {
  return (
    <Routes>
      <Route path={ROUTERS.NOTFOUND} element={<NotFoundPage />} />

      <Route element={<AdminLayout />}>
        <Route path={ROUTERS.ADMIN.DASHBOARD} element={<Dashboard />} />
        <Route
          path={ROUTERS.ADMIN.PRODUCT_LIST}
          element={<ProductListAdmin />}
        />
        <Route
          path={ROUTERS.ADMIN.MANAGE_STAFF}
          element={<ManageStaffAdmin />}
        />
        <Route
          path={ROUTERS.ADMIN.MANAGE_PRODUCTS}
          element={<ManageProductsAdmin />}
        />
        <Route
          path={ROUTERS.ADMIN.CREATE_PRODUCT}
          element={<CreateProductAdmin />}
        />
        <Route
          path={ROUTERS.ADMIN.REVENUE_STATS}
          element={<RevenueStatistics />}
        />
        <Route
          path={ROUTERS.ADMIN.MANAGER_ORDER}
          element={<OrderManagementAdmin />}
        />
        <Route
          path={ROUTERS.ADMIN.PURCHASE_HISTORY}
          element={<PurchaseHistoryAdmin />}
        />
        <Route
          path={`${ROUTERS.ADMIN.UPDATE_USER}/:id`}
          element={<UpdateUser />}
        />
        <Route
          path={`${ROUTERS.ADMIN.PRODUCTS_DETAIL}/:id`}
          element={<ProductDetail />}
        />
        <Route path={ROUTERS.ADMIN.DELETE_USER} element={<DeleteUser />} />
        <Route
          path={`${ROUTERS.ADMIN.UPDATE_PRODUCT}/:id`}
          element={<UpdateProduct />}
        />
      </Route>

      <Route element={<MasterLayout />}>
        <Route path={ROUTERS.USER.HOME} element={<HomePage />} />
        <Route path={ROUTERS.USER.PRODUCTS} element={<ProductPage />} />
        <Route path={ROUTERS.USER.CONTACTS} element={<ContactPage />} />
        <Route path={ROUTERS.USER.ORDERLOOKUP} element={<OrderLookup />} />

        <Route path={ROUTERS.USER.ADD_REVIEW} element={<AddReview />} />
        <Route path={ROUTERS.USER.ORDER_STORAGE} element={<OrderStorage />} />
        <Route
          path={`${ROUTERS.USER.DETAILS}/:id`}
          element={<ProductDetailsPage />}
        />
        <Route path={`${ROUTERS.USER.CART}/:id`} element={<CartPage />} />
        <Route path={ROUTERS.USER.LOGIN} element={<LoginPage />} />
        <Route path={ROUTERS.USER.VERITYOTP} element={<VerifyOtp />} />
        <Route path={ROUTERS.USER.SIGNUP} element={<SignUpPage />} />
        <Route path={ROUTERS.USER.ORDER_DETAIL} element={<OrderPage />} />
        <Route path={ROUTERS.USER.PRODUCT_TYPE} element={<ProductType />} />
      </Route>

      <Route element={<ProfilePageLayout />}>
        <Route
          path={ROUTERS.USERPROFILE.ACCOUNT_INFO}
          element={<AccountInfo />}
        />
        <Route
          path={ROUTERS.USERPROFILE.ORDER_MANAGERMENT}
          element={<OrderManagement />}
        />
        <Route
          path={ROUTERS.USER.CHANGEPASSWORD}
          element={<ChangePassword />}
        />
        <Route
          path={ROUTERS.USERPROFILE.VIEW_PRODUCTS}
          element={<ViewedProducts />}
        />
        <Route
          path={ROUTERS.USERPROFILE.ADDRESS_BOOK}
          element={<AddressBook />}
        />
      </Route>
    </Routes>
  );
};

export default RouterCustom;

import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaMapMarkerAlt, FaEye, FaChessKing } from "react-icons/fa";
import { IoLockClosed, IoLogOut } from "react-icons/io5";
import { MdShoppingBag } from "react-icons/md";
import { ROUTERS } from "../../../../utils/router";
import { UserContext } from "../../../../middleware/UserContext";
import LogOutDiaLog from "../logOutDiaLog";
import "./style.scss";

const SideBarProfile = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();
  const { user, updateUser } = useContext(UserContext);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    updateUser(null);
    setShowLogoutDialog(false);
    navigate(ROUTERS.USER.HOME);
  };

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className="left-sidebar">
      <div className="sidebar-avatar">
        <div className="avatar-wrapper">
          <div className="icon">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/dacn-714e1.appspot.com/o/download.png?alt=media&token=651323e5-2c2d-4e1b-b49f-ce93017de6cb"
              alt="User Avatar"
              style={{ width: "1.3em", height: "auto", color: "grey" }}
            />
          </div>
          <div className="info">
            <div className="customer-name">
              {user?.dataUser?.name || "Guest"}
            </div>
          </div>
        </div>
      </div>

      <ul className="sidebar-list">
        <li
          className={`tab ${currentPath === ROUTERS.USERPROFILE.ACCOUNT_INFO ? "active" : ""}`}
        >
          <Link to={ROUTERS.USERPROFILE.ACCOUNT_INFO}>
            <span className="icon">
              <FaUser />
            </span>
            <span className="text">Thông tin tài khoản</span>
          </Link>
        </li>

        <li
          className={`tab ${currentPath === ROUTERS.USERPROFILE.ORDER_MANAGERMENT ? "active" : ""}`}
        >
          <Link to={ROUTERS.USERPROFILE.ORDER_MANAGERMENT}>
            <span className="icon">
              <MdShoppingBag />
            </span>
            <span className="text">Quản lý đơn hàng</span>
          </Link>
        </li>
        <li
          className={`tab ${currentPath === ROUTERS.USERPROFILE.VIEW_PRODUCTS ? "active" : ""}`}
        >
          <Link to={ROUTERS.USERPROFILE.VIEW_PRODUCTS}>
            <span className="icon">
              <FaEye />
            </span>
            <span className="text">Sản phẩm đã xem</span>
          </Link>
        </li>
        <li
          className={`tab ${currentPath === ROUTERS.USERPROFILE.ADDRESS_BOOK ? "active" : ""}`}
        >
          <Link to={ROUTERS.USERPROFILE.ADDRESS_BOOK}>
            <span className="icon">
              <FaMapMarkerAlt />
            </span>
            <span className="text">Địa chỉ</span>
          </Link>
        </li>
        {user && user.dataUser.isAdmin && (
          <li
            className={`tab-admin tab ${currentPath === ROUTERS.ADMIN.DASHBOARD ? "active" : ""}`}
          >
            <Link to={ROUTERS.ADMIN.DASHBOARD}>
              <span className="icon">
                <FaChessKing />
              </span>
              <span className="text">Quản lý cửa hàng</span>
            </Link>
          </li>
        )}
        <li className="tab">
          <button
            onClick={() => {
              navigate(ROUTERS.USER.CHANGEPASSWORD);
            }}
            className="button-bottom"
          >
            <span className="icon">
              <IoLockClosed />
            </span>
            <span className="text">Đổi mật khẩu</span>
          </button>
          <button onClick={handleLogout} className="button-bottom">
            <span className="icon">
              <IoLogOut />
            </span>
            <span className="text">Đăng xuất</span>
          </button>
        </li>
      </ul>
      <LogOutDiaLog
        isOpen={showLogoutDialog}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default SideBarProfile;

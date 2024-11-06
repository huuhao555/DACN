import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaMapMarkerAlt, FaEye } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdShoppingBag } from "react-icons/md";
import { ROUTERS } from "../../../../utils/router";
import { UserContext } from "../../../../middleware/UserContext";
import LogOutDiaLog from "../logOutDiaLog"
import "./style.scss";

const SideBarProfile = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);
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
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="1.5em"
                            width="1.3em"
                            color="grey"
                        >
                            <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
                        </svg>
                    </div>
                    <div className="info">
                        <div className="customer-name">ĐỒ ÁN CHUYÊN NGHÀNH</div>
                    </div>
                </div>
            </div>
            <ul className="sidebar-list">
                <li className={`tab ${currentPath === ROUTERS.USERPROFILE.ACCOUNT_INFO ? 'active' : ''}`}>
                    <Link to={ROUTERS.USERPROFILE.ACCOUNT_INFO}>
                        <span className="icon"><FaUser /></span>
                        <span className="text">Thông tin tài khoản</span>
                    </Link>
                </li>
                <li className={`tab ${currentPath === ROUTERS.USERPROFILE.ORDER_MANAGERMENT ? 'active' : ''}`}>
                    <Link to={ROUTERS.USERPROFILE.ORDER_MANAGERMENT}>
                        <span className="icon"><MdShoppingBag /></span>
                        <span className="text">Quản lý đơn hàng</span>
                    </Link>
                </li>
                <li className={`tab ${currentPath === ROUTERS.USERPROFILE.VIEW_PRODUCTS ? 'active' : ''}`}>
                    <Link to={ROUTERS.USERPROFILE.VIEW_PRODUCTS}>
                        <span className="icon"><FaEye /></span>
                        <span className="text">Sản phẩm đã xem</span>
                    </Link>
                </li>
                <li className={`tab ${currentPath === ROUTERS.USERPROFILE.ADDRESS_BOOK ? 'active' : ''}`}>
                    <Link to={ROUTERS.USERPROFILE.ADDRESS_BOOK}>
                        <span className="icon"><FaMapMarkerAlt /></span>
                        <span className="text">Sổ địa chỉ</span>
                    </Link>
                </li>
                <li className="tab">
                    <button onClick={handleLogout} className="logout-button">
                        <span className="icon"><IoLogOut /></span>
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
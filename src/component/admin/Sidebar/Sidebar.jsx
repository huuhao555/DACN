import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";
import "./style.scss";

function Sidebar() {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    setActiveItem((prev) => (prev === item ? null : item));
  };

  return (
    <div className="sidebar-admin">
      <ul>
        <li
          className={activeItem === "dashboard" ? "active" : ""}
          onClick={() => handleClick("dashboard")}
        >
          <Link to={ROUTERS.ADMIN.DASHBOARD}>Trang chủ</Link>
        </li>
        <li
          className={activeItem === "create_product" ? "active" : ""}
          onClick={() => handleClick("create_product")}
        >
          <Link to={ROUTERS.ADMIN.CREATE_PRODUCT}>Thêm sản phẩm</Link>
        </li>
        <li
          className={activeItem === "product_list" ? "active" : ""}
          onClick={() => handleClick("product_list")}
        >
          <Link to={ROUTERS.ADMIN.PRODUCT_LIST}>Danh sách sản phẩm</Link>
        </li>
        <li
          className={activeItem === "manage_products" ? "active" : ""}
          onClick={() => handleClick("manage_products")}
        >
          <Link to={ROUTERS.ADMIN.MANAGE_PRODUCTS}>Quản lý sản phẩm</Link>
        </li>
        <li
          className={activeItem === "manage_staff" ? "active" : ""}
          onClick={() => handleClick("manage_staff")}
        >
          <Link to={ROUTERS.ADMIN.MANAGE_STAFF}>Quản lý nhân sự</Link>
        </li>
        <li
          className={activeItem === "manager_order" ? "active" : ""}
          onClick={() => handleClick("manager_order")}
        >
          <Link to={ROUTERS.ADMIN.MANAGER_ORDER}>Quản lý đơn hàng</Link>
        </li>
        <li
          className={activeItem === "revenue_stats" ? "active" : ""}
          onClick={() => handleClick("revenue_stats")}
        >
          <Link to={ROUTERS.ADMIN.REVENUE_STATS}>Thống kê doanh thu</Link>
        </li>

        <li
          className={activeItem === "purchase_history" ? "active" : ""}
          onClick={() => handleClick("purchase_history")}
        >
          <Link to={ROUTERS.ADMIN.PURCHASE_HISTORY}>Lịch sử</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";
import "./style.scss";
function Sidebar() {
  return (
    <div className="sidebar-admin">
      {/* <h2>Trang Admin</h2> */}
      <ul>
        <li>
          <Link to={ROUTERS.ADMIN.DASHBOARD}>Trang chủ</Link>
        </li>
        <li>
          <Link to={ROUTERS.ADMIN.CREATE_PRODUCT}>Thêm sản phẩm</Link>
        </li>
        <li>
          <Link to={ROUTERS.ADMIN.PRODUCT_LIST}>Danh sách sản phẩm</Link>
        </li>

        <li>
          <Link to={ROUTERS.ADMIN.MANAGE_PRODUCTS}>Quản lý sản phẩm</Link>
        </li>
        <li>
          <Link to={ROUTERS.ADMIN.MANAGE_STAFF}>Quản lý nhân sự</Link>
        </li>
        <li>
          <Link to={ROUTERS.ADMIN.REVENUE_STATS}>Thống kê doanh thu</Link>
        </li>
        <li>
          <Link to={ROUTERS.ADMIN.PURCHASE_HISTORY}>Lịch sử </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

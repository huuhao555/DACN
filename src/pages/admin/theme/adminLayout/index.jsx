import "./style.scss";
import { memo } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../../component/admin/Sidebar/Sidebar";
import HeaderAdmin from "../header/header";
const AdminLayout = (props) => {
  return (
    <div {...props} className="container-layout">
      <div className="row">
        <HeaderAdmin />
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default memo(AdminLayout);

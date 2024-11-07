import "./style.scss";
import { memo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../../../component/admin/Sidebar/Sidebar";
import HeaderAdmin from "../header/header";
import { UserProvider } from "../../../../middleware/UserContext";
import { NotificationProvider } from "../../../../middleware/NotificationContext";

const AdminLayout = (props) => {
  return (
    <UserProvider>
      <NotificationProvider>
        <div {...props} className="container-layout">
          <HeaderAdmin />
          <div className="row">
            <div className="col-lg-3">
              <Sidebar />
            </div>
            <div className="col-lg-9 main-content">
              <Outlet />
            </div>
          </div>
        </div>
      </NotificationProvider>
    </UserProvider>
  );
};

export default memo(AdminLayout);

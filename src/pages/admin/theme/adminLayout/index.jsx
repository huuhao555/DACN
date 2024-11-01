// AdminLayout.js
import "./style.scss";
import { memo, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../../../component/admin/Sidebar/Sidebar";
import HeaderAdmin from "../header/header";
import { UserProvider, UserContext } from "../../../../middleware/UserContext";
import { NotificationProvider } from "../../../../middleware/NotificationContext";

const AdminLayout = (props) => {
  // const { user } = useContext(UserContext);
  // const navigate = useNavigate();
  // console.log();
  // useEffect(() => {
  //   if (!user || !user.dataUser.isAdmin) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

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

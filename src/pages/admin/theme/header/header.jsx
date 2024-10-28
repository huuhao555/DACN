import { memo, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./headerAdmin.scss";

import { Link } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";

const HeaderAdmin = () => {
  return (
    <>
      <div className="header-main-admin">
        <div className="container-fixed-admin ">
          <div className="row">
            <div className="col-xl-3">
              <div className="header-logo">
                <Link to={ROUTERS.ADMIN.DASHBOARD}>
                  <img src={require("../../../../assets/users/header/1.png")} />
                </Link>
              </div>
            </div>
            <div className="col-xl-6"></div>
            <div className="col-xl-3">
              <div className="log-out">
                <Link to="/">Đăng xuất</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(HeaderAdmin);

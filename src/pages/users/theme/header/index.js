import { memo, useState, useEffect } from "react";
import "./style.scss";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineRight,
  AiOutlinePhone,
  AiOutlineProfile,
  AiOutlineUser
} from "react-icons/ai";
import { Link, Route } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";

const Header = () => {
  const [isShowProfile, setShowProfile] = useState(false);
  const [menusHeader, setMenusHeader] = useState([
    {
      name: "Trang chủ",
      path: ROUTERS.USER.HOME
    },
    {
      name: "Sản phẩm",
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Liên hệ",
      path: ROUTERS.USER.CONTACTS
    },
    {
      name: "Tra cứu",
      path: ROUTERS.USER.ORDERLOOKUP
    }
  ]);

  return (
    <>
      {/* <div className="header-top">
        <div className="container">
          <div className="header-pr">
            <ul>
              <li>Miễn phí giao hàng toàn quốc</li>
              <li>Sản phẩm chính hãng</li>
              <li>Xuất biên lai VAT</li>
              <li>Thu cũ - Đổi mới - Lên đời</li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className="header-main">
        <div className="container-fixed ">
          <div className="row">
            <div className="col-xl-3">
              <div className="header-logo">
                <Link to={ROUTERS.USER.HOME}>
                  <img
                    style={{ width: "200px", height: "auto" }}
                    src={require("../../../../assets/users/header/1.png")}
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-6">
              <nav className="header-menu">
                <ul>
                  {menusHeader?.map((menu, menuKey) => {
                    return (
                      <li
                        key={menuKey}
                        className={menuKey === 0 ? "active" : ""}
                      >
                        <Link to={menu.path}>{menu?.name}</Link>
                        {menu.child && menu.child.length > 0 && (
                          <ul className="header-menu-dropdown">
                            {menu.child.map((childItem, childKey) => (
                              <li
                                key={`${menuKey}-${childKey}`}
                                className={menuKey === 0 ? "active" : ""}
                              >
                                <Link to={childItem.path}>
                                  {childItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="col-xl-3">
              <div className="header-cart">
                <ul>
                  <li>
                    <Link to="">
                      <AiOutlineHeart />
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <AiOutlineShoppingCart />
                    </Link>
                  </li>
                  <li
                    className="profile-user"
                    onClick={() => {
                      setShowProfile(!isShowProfile);
                    }}
                  >
                    <Link to="">
                      <AiOutlineUser />
                    </Link>
                    {isShowProfile && (
                      <ul className="sub-profile">
                        <li><Link to={ROUTERS.USER.LOGIN}>Đăng nhập</Link></li>
                        <li><Link to={ROUTERS.USER.SIGNUP}>Đăng kí</Link></li>
                        {/* <li>
                          <Link to={ROUTERS.USER.PRODUCTS}>Đăng xuất</Link>
                        </li> */}
                      </ul>
                    )}
                  </li>
                  <li>
                    <Link to="">
                      {/* <span>Đăng nhập</span> */}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Header);

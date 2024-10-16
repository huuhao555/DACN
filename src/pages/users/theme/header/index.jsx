import { memo, useState } from "react";
import "./style.scss";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
import Login from "../../auth/login/Login";
import SignUp from "../../auth/signup/Signup";
const Header = () => {
  const [isShowProfile, setShowProfile] = useState(false);
  const [isShowLoginForm, setShowLoginForm] = useState(false);
  const [isShowSignUpForm, setShowSignUpForm] = useState(false);

  const menusHeader = [
    { name: "Trang chủ", path: ROUTERS.USER.HOME },
    { name: "Sản phẩm", path: ROUTERS.USER.PRODUCTS },
    { name: "Liên hệ", path: ROUTERS.USER.CONTACTS },
    { name: "Tra cứu", path: ROUTERS.USER.ORDERLOOKUP }
  ];

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
  };
  const handleSignUpClick = () => {
    setShowSignUpForm(true);
  };

  const closeSignUpForm = () => {
    console.log(123);
    setShowSignUpForm(false);
  };
  const handleProfileClick = () => {
    alert("Vui lòng đăng nhập");
  };
  return (
    <>
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
                  {menusHeader?.map((menu, menuKey) => (
                    <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                      <Link to={menu.path}>{menu?.name}</Link>
                    </li>
                  ))}
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
                    onClick={() => setShowProfile(!isShowProfile)}
                  >
                    <Link to="">
                      <AiOutlineUser />
                    </Link>
                    {isShowProfile && (
                      <ul className="sub-profile">
                        <li onClick={handleProfileClick}>Thông tin cá nhân</li>
                        <li onClick={handleLoginClick}>Đăng nhập</li>
                        <li onClick={handleSignUpClick}>Đăng kí</li>
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Login
        isShowLoginForm={isShowLoginForm}
        closeLoginForm={closeLoginForm}
      />
      <SignUp
        isShowSignUpForm={isShowSignUpForm}
        closeSignUpForm={closeSignUpForm}
      />
    </>
  );
};

export default memo(Header);

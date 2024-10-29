import { memo, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser
} from "react-icons/ai";
import Login from "../../auth/login/Login";
import SignUp from "../../auth/signup/Signup";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
import { UserContext } from "../../../../middleware/UserContext"; // Import UserContext

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isShowProfile, setShowProfile] = useState(false);
  const [isShowLoginForm, setShowLoginForm] = useState(true);
  const [isShowSignUpForm, setShowSignUpForm] = useState(false);
  const menusHeader = [
    { name: "Trang chủ", path: ROUTERS.USER.HOME },
    { name: "Sản phẩm", path: ROUTERS.USER.PRODUCTS },
    { name: "Liên hệ", path: ROUTERS.USER.CONTACTS },
    { name: "Tra cứu", path: ROUTERS.USER.ORDERLOOKUP }
  ];

  const location = useLocation();
  const { product } = location.state || {};

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
    setShowSignUpForm(false);
  };
  const handleLogOutClick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };
  const handleProfileClick = () => {
    navigate(ROUTERS.USER.PROFILE);
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
                    <Link to={ROUTERS.USER.CART} state={{ product }}>
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
                    {user
                      ? isShowProfile && (
                          <ul className="sub-profile">
                            <li onClick={handleProfileClick}>
                              Thông tin cá nhân
                            </li>
                            <li onClick={handleLogOutClick}>Đăng xuất</li>
                          </ul>
                        )
                      : isShowProfile && (
                          <ul className="sub-profile">
                            <li onClick={handleLoginClick}>Đăng nhập</li>
                            <li onClick={handleSignUpClick}>Đăng kí</li>
                          </ul>
                        )}
                  </li>
                  <li className="text-user">{user ? user.name : " "}</li>
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

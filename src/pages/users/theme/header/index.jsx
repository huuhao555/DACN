import { memo, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import Login from "../../auth/login/Login";
import SignUp from "../../auth/signup/Signup";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
import { UserContext } from "../../../../middleware/UserContext";
import ForgetPassword from "../../auth/ForgetPassword";

const Header = () => {
  const { user, countCart, updateCartCount } = useContext(UserContext);
  const [isShowProfile, setShowProfile] = useState(false);
  const [isShowLoginForm, setShowLoginForm] = useState(false);
  const [isShowSignUpForm, setShowSignUpForm] = useState(false);
  const [isShowForgetForm, setShowForgetForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCart = async () => {
      if (!user || !user.dataUser) return;

      const id = user.dataUser.id;
      try {
        const response = await fetch(
          `http://localhost:3001/api/cart/get-cart/${id}`
        );
        if (!response.ok) throw new Error(response.statusText);
        const dataCart = await response.json();
        updateCartCount(dataCart?.products?.length || 0);
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    };
    getAllCart();
  }, [user, updateCartCount]);

  const menusHeader = [
    { name: "Trang chủ", path: ROUTERS.USER.HOME },
    { name: "Sản phẩm", path: ROUTERS.USER.PRODUCTS },
    { name: "Liên hệ", path: ROUTERS.USER.CONTACTS },
    { name: "Tra cứu", path: ROUTERS.USER.ORDERLOOKUP }
  ];
  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowProfile(false);
    setShowSignUpForm(false);
    setShowForgetForm(false);
  };

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false);
    setShowProfile(false);
    setShowForgetForm(false);
  };

  const handleForgetClick = () => {
    setShowForgetForm(true);
    setShowLoginForm(false);
    setShowSignUpForm(false);
    setShowProfile(false);
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
  };
  const closeForgetForm = () => {
    setShowForgetForm(false);
  };

  const closeSignUpForm = () => {
    setShowSignUpForm(false);
  };

  const handleProfileClick = () => {
    if (user) {
      navigate(ROUTERS.USERPROFILE.ACCOUNT_INFO);
    } else {
      setShowProfile(!isShowProfile);
    }
  };
  const handleCart = () => {
    user
      ? navigate(`${ROUTERS.USER.CART}/${user.dataUser.id}`)
      : alert("Vui lòng đăng nhập");
  };

  return (
    <div className="wrap">
      <div className="container-header">
        <div className="row">
          <div className="header-main">
            <div className="col-xl-3">
              <div className="header-logo">
                <Link to={ROUTERS.USER.HOME}>
                  <img
                    style={{ width: "200px", height: "auto" }}
                    src={require("../../../../assets/users/header/1.png")}
                    alt="Logo"
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-6">
              <nav className="header-menu">
                <ul>
                  {menusHeader.map((menu, index) => (
                    <li key={index} className={index === 0 ? "active" : ""}>
                      <Link to={menu.path}>{menu.name}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="col-xl-3">
              <div className="header-cart">
                <ul>
                  <li>
                    <button onClick={handleCart}>
                      <AiOutlineShoppingCart />
                    </button>
                    <span className="count-cart">{countCart}</span>
                  </li>
                  <div className="account-info">
                    <li className="profile-user" onClick={handleProfileClick}>
                      <button>
                        <AiOutlineUser />
                      </button>
                      {isShowProfile && !user && (
                        <ul className="sub-profile">
                          <li onClick={handleLoginClick}>Đăng nhập</li>
                          <li onClick={handleSignUpClick}>Đăng kí</li>
                          <li onClick={handleForgetClick}>Quên mật khẩu</li>
                        </ul>
                      )}
                    </li>
                    <li
                      className="text-user"
                      onClick={() => {
                        navigate(ROUTERS.USERPROFILE.ACCOUNT_INFO);
                      }}
                    >
                      {user && user.dataUser ? `${user.dataUser.name}` : ""}
                    </li>
                  </div>
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
      <ForgetPassword
        isShowVerifyForm={isShowForgetForm}
        closeVerifyForm={closeForgetForm}
      />
    </div>
  );
};

export default memo(Header);
